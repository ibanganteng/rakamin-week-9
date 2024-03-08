const express = require('express')
const bodyParser = require('body-parser')
const jwt = require ('jsonwebtoken')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi   = require('swagger-ui-express')
const pool = require ('./queries')

var morgan =require('morgan')

var app = express()

app.use(morgan('common')) //atau common atau tiny


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const movies =require('./movies')
app.use('/movies',movies)

app.listen(3000, (req,res)=> {
    console.log('conected by 3000')
})

// start json web token
app.get('/',(req,res)=> {
    const token = jwt.sign(
        {
            userId: 23,
            role: 'admin',
        },
        'kodeyangsangatrahasia',
        {expiresIn: '1h'}
    )
    res.json({
        token: token,
    })
})



app.get('/verify/:token',(req,res)=> {
    const data = jwt.verify(
       req.params.token,
        'kodeyangsangatrahasia',
        )
    res.json({
        data: data,
    })
})






//end json web token


// start swager methode
const swaggerOptions ={
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'movie gue',
            version: '1.0.0',
            description:
            'This is ibang aplications with a simple CRUD Api documen and swagger'
        }
    },
    apis:['./routes/*.js']
}


const swaggerDocs = swaggerJsdoc(swaggerOptions)
console.log(swaggerDocs)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))




app.get('/movies',(req,res)=>{
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


app.post('/movies',(req,res)=>{
    const {title,genres} = req.body
    pool.query(
        `INSERT INTO movies (title,genres) VALUES ($1, $2) RETURNING *`, [title,genres],
        (error,results) => {
            if(error){
                console.log('Error inserting data:', error)
            }
            res.json(results.rows[0])
        }
    )
})


app.get('/movies/:id',(req,res)=>{
    const { id } = req.params
    pool.query(
        `SELECT * FROM movies WHERE id = $1`,[id],
        (error,results) => {
            if(error){
                throw error
            }
            res.json(results.rows[0])
        }
    )
})



app.put('/movies/:id',(req,res)=>{
    const {id} = req.params
    const {title, genres} = req.body
    pool.query(
        `UPDATE movies SET title = $1, genres = $2 WHERE id = $3 RETURNING *`, [title, genres, id],
        (error,results) => {
            if(error){
                throw error
            }
            res.json(results.rows[0])
        }
    )
})

app.delete('/movies/:id',(req,res)=>{
const {id} = req.params
    pool.query(
        `DELETE FROM movies WHERE id = $1`,[id],
        (error,results) => {
            if(error){
                res.status(500).json({error: 'terjadi kesalahan saat menghapus data'})
            }else {
                
                res.json({message: 'data berhasil di hapus'})
            }

        }
    )
})




// end swager methode

