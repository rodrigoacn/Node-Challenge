import * as User from "../models/user.model.js"
import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rconejerosnavea@gmail.com",
        pass: "r20a12c94n"
    }
})

var message = "Welcome to Disney movies system, here you can see detailed info about characters, movies and genres of Disney"

export var login = async (req, res) => {
	try{
        var loginUser = await User.login(req.query.email, req.query.password)
        res.send(loginUser)
        return loginUser.email
    } catch(error){
        res.send(error)
    }
}

export var register = async (req, res) => {
    try{
    	var registerUser = await User.register(req.query.email, req.query.password)
        var mailOptions = {
            from: "rconejerosnavea@gmail.com",
            to: data.email,
            subject: "Disney system welcome",
            text: message
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                res.send(error)
            }
        })
        res.send(registerUser)
        return loginUser.email
    } catch(error){
        res.send(error)
    }
}