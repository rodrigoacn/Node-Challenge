import Sequelize from "sequelize"
import {env} from "./../config.js"

export var sequelize = new Sequelize(process.env.DATABASE, "root", "v6h470fdz0", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate()
.then(() => {
    console.log("Connected")
})
.catch(err => {
    console.log("Connection error")
})

export var users = sequelize.define("users", {
    email: {type: Sequelize.STRING, primaryKey: true},
    password: Sequelize.STRING
}, { timestamps: false })

export var movies = sequelize.define("movies", {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    createdAt: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    score: {type: Sequelize.BIGINT, min: 1, max: 5},
    genreId: Sequelize.BIGINT
}, { timestamps: false })


export var characters = sequelize.define("characters", {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    image: Sequelize.STRING,
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    weight: Sequelize.DOUBLE,
    story: Sequelize.STRING
}, { timestamps: false })

export var genres = sequelize.define("genres", {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
    image: {type: Sequelize.STRING}
}, { timestamps: false })

export var charactermovies = sequelize.define("charactermovies", {})

genres.hasMany(movies)
movies.belongsTo(genres)
characters.belongsToMany(movies, {through: charactermovies})
movies.belongsToMany(characters, {through: charactermovies})

export var characterId, movieId, genreId
sequelize.sync()
.then((data) => {
    if(process.env.DATABASE === "challengenodetest"){
        charactermovies.destroy({
            where: {},
            restartIdentity: true
        }).then((data1) => {
            characters.destroy({
                where: {},
                restartIdentity: true
            }).then((data2) => {
                movies.destroy({
                    where: {},
                    restartIdentity: true
                }).then((data3) => {
                    genres.destroy({
                        where: {},
                        restartIdentity: true
                    }).then((data4) => {
                        genres.create({
                            name: "Animation",
                            image: "test.gif"
                        }).then((data5) => {
                            movies.create({
                                image: "test.gif",
                                title: "Toy Story",
                                score: 5,
                                genreId: data5.id
                            }).then((data6) => {
                                characters.create({
                                    image: "test.gif",
                                    name: "Mickey Mouse",
                                    age: 20,
                                    weight: 30.5,
                                    story: "History of Mickey Mouse"
                                }).then((data7) => {
                                    charactermovies.create({
                                        characterId: data7.id,
                                        movieId: data7.id
                                    }).then((data8) => {
                                        genreId = data5.id
                                        movieId = data6.id
                                        characterId = data6.id
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }    
})