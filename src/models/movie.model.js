/* 
-------------------------------------------
PELICULA O SERIE 
-------------------------------------------
*/
import fs from "fs"
import {sequelize, movies, genres, characters, charactermovies} from "./../../config/db.config.js"

export var list = () => {
	return movies.findAll({ attributes: ["image", "title", "createdAt"] })
}

export var detail = id => {
	return movies.findOne({
		where: {
			id: id
		}, 
		attributes: ["image", "title", "createdAt", "score"],
		include: [{
		    		model: characters,
		    		as: "characters",
		    		attributes: ["name"],
		    		through: {attributes: []}
		    	},
		    	{
		    		model: genres,
		    		as: "genres",
		    		attributes: ["id", "name", "image"]	
		    	}]
	})
}

export var search = (filterType, filter) => {
	switch(filterType){
		case "title":
			return movies.findOne({where: {
		    	title: filter,
		  	}})
			break;
		case "genre":
			return movies.findAll({
				include: {
		    		model: genres,
		    		attributes: ["name"],
		    		where: {
		    			id: filter
		    		}
		    	}
		  	})
			break;
		case "order":
			return movies.findAll({
				order: [["createdAt", filter]]
		  	})
			break;
		default:
			console.log("Choose a filter"); 
	}
}

export var insert = newMovie => {
	return movies.create({
		image: newMovie.image,
		title: newMovie.title,
		score: newMovie.score,
		genreId: newMovie.genreId
	})
}

export var update = newMovie => {
	return movies.update(
	 	{
	 		image: newMovie.image,
	 		title: newMovie.title,
	 		score: newMovie.score,
	 		genreId: newMovie.genreId
	 	},
	  	{ where: { id: newMovie.id } }
	)
}

export var deleteMovie = id => {
	return movies.destroy({
 		where: { id: id },
	})
}

export var searchImage = id => {
	return movies.findOne({
		where: {
			id: id
		}, 
		attributes: ["image"]
	})
}

export var createImage = (path, name) => {
	fs.rename(path, "./../../images/movies/" + name, (err) => {
		if (err) console.log(err)
	})
}

export var deleteImage = imageName => {
	fs.unlink("./../../images/movies/" + imageName, (err) => {
  		if(err){
  			console.log(err)
  		}
  		console.log("delete!")
	})
}

export var createCharacterMovies = (movieId, characterMoviesIds) => {
	var arr = []
	for (var i = 0; i < characterMoviesIds.length; i++) {
		var objectString = JSON.parse("{characterId: " + characterMoviesIds[i] + ", movieId: " + movieId + "}")
	    arr.push(objectString)
	}	
	return CharacterMovies.bulkCreate(arr)
}

export var deleteCharacterMovies = movieId => {
	return CharacterMovies.destroy({
		where: { movieId: movieId }
	})
}