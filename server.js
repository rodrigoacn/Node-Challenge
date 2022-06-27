import express from "express"
import bodyParser from "body-parser"
import formidable from "express-formidable"
import session from "express-session"
import esMain from "es-main"
import cors from "cors"
import * as userController from "./src/controllers/user.controller.js"
import * as characterController from "./src/controllers/character.controller.js"
import * as movieController from "./src/controllers/movie.controller.js"

var app = express()

const port = 5000

if (esMain(import.meta)) {
	app.listen(port, () => {
		console.log("Escuchando servidor en el puerto: " + port)
	})
}

app.use(formidable())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors("*"))

app.use(session({
  	secret: "node challenge",
  	resave: false,
  	saveUninitialized: false
}))

var authToken = app.get("/auth/login", userController.login)
authToken = app.get("/auth/register", userController.register)

if(authToken || process.env.DATABASE === "challengenodetest"){
	app.get("/characters", characterController.search)
	app.delete("/characters", characterController.deleteCharacter)
	app.put("/characters", characterController.update)
	app.post("/characters", characterController.insert)
	app.get("/movies", movieController.search)
	app.delete("/movies", movieController.deleteMovie)
	app.put("/movies", movieController.update)
	app.post("/movies", movieController.insert)
	app.get("/", (req, res) => {
		res.send("Hello " + req.session.email)
	})
	console.log("paso")
} else{
	app.all("*", (req,res) => {
		res.send("Login first to use the system")
	})
}

export {app}