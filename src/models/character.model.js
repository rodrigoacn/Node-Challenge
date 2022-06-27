/* 
-------------------------------------------
PERSONAJE 
-------------------------------------------
*/
import fs from "fs"
import {sequelize, characters, movies, charactermovies} from "./../../config/db.config.js"

export var list = () => {
	return characters.findAll({ attributes: ["image", "name"] })
}

export var detail = id => {
	return characters.findOne({ 
		where: {
			id: id
		},
		attributes: ["image", "name", "age", "weight", "story"],
		include: {
			model: movies,
			attributes: ["title"]
		} 
	})
}

export var search = (filterType, filter) => {
	switch(filterType){
		case "name":
			return characters.findOne({
				where: {
		    		name: filter,
		  		}
		  	})
			break
		case "age":
			return characters.findAll({
				where: {
		    		age: filter
		  		}
		  	})
			break
		case "weight":
			return characters.findAll({
				where: {
		    		weight: filter
		  		}
		  	})
			break
		case "movies":
			return characters.findAll({
		    	include: {
		    		model: movies,
		    		attributes: ["title"],
		    		where: {
		    			id: filter
		    		},
		    		through: {attributes: []}
		    	}
		  	})
			break
		default:
			console.log("Choose a filter") 
	}
}

export var insert = newCharacter => {
	return characters.create({
		image: newCharacter.image,
		name: newCharacter.name,
		age: newCharacter.age,
		weight: newCharacter.weight,
		story: newCharacter.story
	})
}

export var update = newCharacter => {
	return characters.update(
	 	{
	 		image: newCharacter.image,
			name: newCharacter.name,
			age: newCharacter.age,
			weight: newCharacter.weight,
			story: newCharacter.story
	 	},
	  	{ where: { id: newCharacter.id } }
	)
}

export var deleteCharacter = id => {
	return characters.destroy({
 		where: { id: id }
	})
}

export var searchImage = id => {
	return characters.findOne({
		where: {
			id: id
		}, 
		attributes: ["image"]
	})
}

export var createImage = (path, name) => {
	fs.rename(path, "./../../images/characters/" + name, (err) => {
		if (err) console.log(err)
	})
}

export var deleteImage = imageName => {
	fs.unlink("./../../images/characters/" + imageName, (err) => {
  		if(err){
  			console.log(err)
  		}
  		console.log("delete!")
	})
}

export var createCharacterMovies = (characterId, characterMoviesIds) => {
	var arr = []
	for (var i = 0; i < characterMoviesIds.length; i++) {
		var objectString = JSON.parse("{characterId: " + characterId + ", movieId: " + characterMoviesIds[i] + "}")
	    arr.push(objectString)
	}	
	return CharacterMovies.bulkCreate(arr)
}

export var deleteCharacterMovies = characterId => {
	return CharacterMovies.destroy({
		where: { characterId: characterId }
	})
}