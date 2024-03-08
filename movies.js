const express =require('express')
const router = express.Router()
const pool = require ('./queries')

// start mengolah data dummy
const movies = [
    {id: 101,name:"fight club",year:1999,rating:8.1},
    {id: 102,name:"incception",year:2010,rating:8.7},
    {id: 103,name:"dark knight",year:2008,rating:9},
    {id: 104,name:"12 angry man",year:1957,rating:8.9}


]

router.get('/:id([0-9]{3,})', function(req,res){
    var currMovie = movies.filter(function(movie){
        if(movie.id == req.params.id) {
            return true
        }
    })
    if(currMovie.length == 1) {
        res.json(currMovie[0])
    }else {
        res.status(404)
        res.json({message: 'not found'})
    }
})

router.post('/',function (req, res) {
    if (
        !req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)
        
    ) {
res.status(400)
res.json({message : "Bad Request"})
    }else {
        var newId = movies[movies.length - 1].id + 1
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating,
        })
        res.json({message: "new movies created", location: "/movies/" + newId})
    }
})

router.delete('/:id',function(req,res){
    var removeIndex = movies
    .map(function(movie){
        return movie.id
    })
    .indexOf(req.params.id)
    if(removeIndex === -1) {
        res.json({message:"not found"})
    }else {
        movie.splice(removeIndex, 1)
        res.send({message: "Movie id" + removeIndex.params.id + "remove"})
    }
})

router.put('/:id', function(req,res){
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)){
            res.status(400)
            res.json({message: "bad request"})
        }else {
            var UpdateIndex = movies.map(function(movie){
                return movie.id
            }).indexOf(parseInt(req.params.id))

            if(UpdateIndex === -1){
                movies.push({
                    id: req.params.id,
                    name: req.body.name,
                    year:req.body.year,
                    rating: req.body.rating
                })
                res.json({message: "new movie created",location: "/movies/" + req.params.id})
            }else {
                movies[UpdateIndex] = {
                    id: req.params.id,
                    name: req.body.name,
                    year: req.body.year,
                    rating: req.body.rating
                }
                res.json({message: "movie id" + req.params.id + "update", location: "/movies/" + req.params.id})
                
            }
        }
})

// end mengolah data dummy

// start mengola database(pg) methode page

router.get('/pag-m', function(req,res){
    pool.query(
        `SELECT * FROM movies ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
        (error,results) => {
            if(error){
                throw error
            }
            res.json(results.rows)
        }
    )
})

router.get('/pag-u', function(req,res){
    pool.query(
        `SELECT * FROM users ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
        (error,results) => {
            if(error){
                throw error
            }
            res.json(results.rows)
        }
    )
})

// end mengola database(pg) methode page

pool.connect((err,res)=> {
    console.log(err)
    console.log("connected ");
})


module.exports=router