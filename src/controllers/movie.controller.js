import * as Movie from "../models/movie.model.js"

export var search = async (req, res) => {
	try{
		var searchMovie
		if(Object.keys(req.query).length === 0){
			searchMovie = await Movie.list()
		} else if(typeof req.query.id !== "undefined"){
			searchMovie = await Movie.detail(req.query.id)
		} else if(typeof req.query.title !== "undefined"){
			searchMovie = await Movie.search("title", req.query.title)
		} else if(typeof req.query.genre !== "undefined"){
			searchMovie = await Movie.search("genre", req.query.genre)
		} else if(typeof req.query.order !== "undefined"){
			searchMovie = await Movie.search("order", req.query.order)
		}
		res.send(searchMovie)
	} catch(error){
		res.send(error)
	}
}

export var insert = async (req, res) => {
	try{
		Movie.createImage(req.body.image.path, req.body.image.name)
		var movieBody = {
			image: req.body.image.name,
			title: req.query.title,
			score: req.query.score,
			genreId: req.query.genre
		}
		var insertMovie = await Movie.insert(movieBody)
		var createRelationsWithCharacters = await Movie.createCharacterMovies(insertMovie.id, req.query.charactersIds)
		res.send(insertMovie)
	} catch(error){
		res.send(error)
	}
}

export var update = async (req, res) => {
	try{
		var imageName = await Movie.searchImage(req.query.id).image
		movie.deleteImage(imageName)
		movie.createImage(req.body.image.path, req.body.image.name)
		var deleteRelationsWithCharacters = await Movie.deleteCharacterMovies(req.query.id)	
		var createRelationsWithCharacters = await Movie.createCharacterMovies(req.query.id, req.query.charactersIds)
		var movieBody = {
			id: req.query.id,
			image: req.body.image.name,
			title: req.query.title,
			score: req.query.score,
			genreId: req.query.genre
		}
		var updateMovie = await Movie.update(movieBody)
		res.send(updateMovie)
	} catch(error){
		res.send(error)
	}
}

export var deleteMovie = async (req, res) => {
	try{
		var imageName = await Movie.searchImage(req.query.id).image
		movie.deleteImage(imageName)
		var deleteRelationsWithCharacters = await Movie.deleteCharacterMovies(req.query.id)
		var deleteMovie = await Movie.deleteMovie(req.query.id)
		res.send(deleteMovie)
	} catch(error){
		res.send(error)
	}
}