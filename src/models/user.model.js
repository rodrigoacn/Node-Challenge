import {sequelize, users} from "./../../config/db.config.js"

export var login = (email, password) => {
	return users.findOne({
		where: {
    		email: email,
    		password: password
  		}
  	})
}

export var register = (email, password) => {
	return users.create({
		email: email,
		password: password
	})
}