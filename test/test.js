import {characterId, movieId, genreId} from "./../config/db.config.js"
import {app} from "./../server.js"
import chai from "chai"
import chaiHttp from "chai-http"
import request from "supertest"
chai.should()
chai.use(chaiHttp)

var characterObj = {
    id: characterId,
    image: "test.gif",
    name: "Mickey Mouse",
    age: 20,
    weight: 30.5,
    story: "History of Mickey Mouse" 
}

var movieObj = {
    id: movieId,
    image: "test.gif",
    title: "Toy Story",
    score: 5,
    genre: genreId
}

describe("Characters", () => {
    describe("List Characters", () => {
        it("it should get all characters", (done) => {
            request(app)
            .get("/characters")
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                Object.keys(res.body).length.should.be.eql(0)
                done()
            })
        })
    })

    describe("Detail Character", function(){
        it("it should detail a character by given id", function(done){
            request(app)
            .get("/characters")
            .query({id: characterId})
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("image")
                res.body.should.have.property("name")
                res.body.should.have.property("age")
                res.body.should.have.property("weight")
                res.body.should.have.property("story")
                res.body.should.have.property("id")
                done()
            })  
        })
    })

    describe("Search Character", () => {
        it("it should get a character by given name", (done) => {
            request(app)
            .get("/characters")
            .query({name: "Mickey Mouse"})
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("image")
                res.body.should.have.property("name").eql("Mickey Mouse")
                res.body.should.have.property("age")
                res.body.should.have.property("weight")
                res.body.should.have.property("story")
                res.body.should.have.property("id")
                done()
            })
        })
    })

    describe("/GET Characters", () => {
        it("it should GET characters by the given property", (done) => {
            var keys = Object.keys(characterObj)
            var key = keys[Math.floor(Math.random() * keys.length)]
            var value = characterObj[keys[ keys.length * Math.random() << 0]]
            var obj = {
                [key]: value
            }
            request(app)
            .get("/characters")
            .query(obj)
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("image")
                res.body.should.have.property("name")
                res.body.should.have.property("age")
                res.body.should.have.property("weight")
                res.body.should.have.property("story")
                res.body.should.have.property("id")
                done()
            })
        })
    })

    describe("/POST character", () => {
        it("it should not POST a character without image", (done) => {
            request(app)
            .post("/characters")
            .query({
                name: "Mickey Mouse",
                age: 20,
                weight: 30.5,
                story: "History of Mickey Mouse",
                moviesIds: []
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("errors")
                res.body.errors.should.have.property("image")
                res.body.errors.image.should.have.property("kind").eql("required")
                done()
            })
        })

        it("it should POST a character ", (done) => {
            request(app)
            .post("/characters")
            .query({
                image: "test.gif",
                name: "Mickey Mouse",
                age: 20,
                weight: 30.5,
                story: "History of Mickey Mouse",
                moviesIds: []
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.insertshould.be.a("object")
                res.body.insertshould.have.property("image")
                res.body.insertshould.have.property("name")
                res.body.insertshould.have.property("age")
                res.body.insertshould.have.property("weight")
                res.body.insertshould.have.property("story")
                done()
            })
        })
    })

    describe("/PUT character", () => {
        it("it should UPDATE a character given the id", (done) => {
            request(app)
            .put("/characters")
            .query({
                id: characterId,
                image: "test.gif",
                name: "Mickey Mouse Updated",
                age: 27,
                weight: 40.5,
                story: "History of Mickey Mouse Updated",
                moviesIds: []
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.updateshould.be.a("object")
                res.body.updateshould.have.property("age").eql(27)
                done()
            })
        })
    })

    describe("/DELETE character", () => {
        it("it should DELETE a book given the id", (done) => {
            request(app)
            .delete("/characters")
            .query({
                id: characterId
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.deleteshould.be.a("object")
                done()
            })
        })
    })
})

describe("Movies", () => {
    describe("List Movies", () => {
        it("it should get all movies", (done) => {
            request(app)
            .get("/movies")
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                Object.keys(res.body).length.should.be.eql(0)
                done()
            })
        })
    })

    describe("Detail Movie", () => {
        it("it should detail a movie by given id", (done) => {
            request(app)
            .get("/movies")
            .query({id: movieId})
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("image")
                res.body.should.have.property("name")
                res.body.should.have.property("age")
                res.body.should.have.property("weight")
                res.body.should.have.property("story")
                res.body.should.have.property("id")
                done()
            })
        })    
    })

    describe("Search Movie", () => {
        it("it should get a movie by given title", (done) => {
            request(app)
            .get("/movies")
            .query({title: "Toy Story"})
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("image")
                res.body.should.have.property("name").eql("Toy Story")
                res.body.should.have.property("age")
                res.body.should.have.property("weight")
                res.body.should.have.property("story")
                res.body.should.have.property("id")
                done()
            })
        })
    })

    describe("/GET Movies", () => {
        it("it should GET movies by the given property", (done) => {
            var keys = Object.keys(movieObj)
            var key = keys[Math.floor(Math.random() * keys.length)]
            var value = movieObj[keys[ keys.length * Math.random() << 0]]
            var obj = {
                [key]: value
            }
            request(app)
            .get("/movies")
            .query(obj)
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("image")
                res.body.should.have.property("name")
                res.body.should.have.property("age")
                res.body.should.have.property("weight")
                res.body.should.have.property("story")
                res.body.should.have.property("id")
                done()
            })
        })
    })

    describe("/POST movie", () => {
        it("it should not POST a movie without genre", (done) => {
            request(app)
            .post("/movies")
            .query({
                image: "test.gif",
                title: "Toy Story",
                score: 5,
                charactersIds: []
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("errors")
                res.body.errors.should.have.property("genre")
                res.body.errors.image.should.have.property("kind").eql("required")
                done()
            })
        })
            
        it("it should POST a movie ", (done) => {
            request(app)
            .post("/movies")
            .query({
                image: "test.gif",
                title: "Toy Story",
                score: 5,
                genre: genreId,
                charactersIds: []
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.insertshould.be.a("object")
                res.body.insertshould.have.property("image")
                res.body.insertshould.have.property("name")
                res.body.insertshould.have.property("age")
                res.body.insertshould.have.property("weight")
                res.body.insertshould.have.property("story")
                done()
            })
        })
    })

    describe("/PUT movie", () => {
        it("it should UPDATE a movie given the id", (done) => {
            request(app)
            .put("/movies")
            .query({
                id: movieId,
                image: "test.gif",
                name: "Mickey Mouse Updated",
                age: 27,
                weight: 40.5,
                story: "History of Mickey Mouse Updated",
                genre: genreId,
                charactersIds: []
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.updateshould.have.property("age").eql(27)
                done()
            }) 
        })
    })

    describe("/DELETE movie", () => {
        it("it should DELETE a book given the id", (done) => {
            request(app)
            .delete("/movies")
            .query({
                id: movieId
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                res.should.have.status(200)
                res.body.deleteshould.be.a("object")
                done()
            })
        })
    })
})