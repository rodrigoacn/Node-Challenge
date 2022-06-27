import * as Character from "../models/character.model.js"

export var search = async (req, res) => {
	try{
		var searchCharacter
		if(Object.keys(req.query).length === 0){
			searchCharacter = await Character.list()
		} else if(typeof req.query.id !== "undefined"){
			searchCharacter = await Character.detail(req.query.id)
		} else if(typeof req.query.name !== "undefined"){
			searchCharacter = await Character.search("name", req.query.name)
		} else if(typeof req.query.age !== "undefined"){
			searchCharacter = await Character.search("age", req.query.age)
		} else if(typeof req.query.weight !== "undefined"){
			searchCharacter = await Character.search("weight", req.query.weight)
		} else if(typeof req.query.movie !== "undefined"){
			searchCharacter = await Character.search("movie", req.query.idMovie)
		}
		res.send(searchCharacter)
	} catch(error){
		res.send(error)
	}
}

export var insert = async (req, res) => {
	try{
		var createImage = await Character.createImage(req.body.image.path, req.body.image.name)
		var characterBody = {
			image: req.body.image.name,
			name: req.query.name,
			age: req.query.age,
			weight: req.query.weight,
			story: req.query.story
		}
		var insertCharacter = await Character.insert(characterBody)
		var createRelationsWithMovies = await Character.createCharacterMovies(insertCharacter.id, req.query.moviesIds)
		res.send(insertCharacter)
	} catch(error){
		res.send(error)
	}
}

export var update = async (req, res) => {
	try{
		var imageName = await Character.searchImage(req.query.id).image
		Character.deleteImage(imageName)
		Character.createImage(req.body.image.path, req.body.image.name)
		var deleteRelationsWithMovies = await Character.deleteCharacterMovies(req.query.id)	
		var createRelationsWithMovies = await Character.createCharacterMovies(req.query.id, req.query.moviesIds)
		var characterBody = {
			id: req.query.id,
			image: req.body.image.name,
			name: req.query.name,
			age: req.query.age,
			weight: req.query.weight,
			story: req.query.story
		}
		var updateCharacter = await Character.update(characterBody)
		res.send(updateCharacter)
	} catch(error){
		res.send(error)
	}
}

export var deleteCharacter = async (req, res) => {
	try{
		var imageName = await Character.searchImage(req.query.id).image
		Character.deleteImage(imageName)
		var deleteRelationsWithMovies = await Character.deleteCharacterMovies(req.query.id)
		var deleteCharacter = await Character.deleteCharacter(req.query.id)
		res.send(deleteCharacter)
	} catch(error){
		res.send(error)
	}
}