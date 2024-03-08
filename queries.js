const Pool =require ('pg').Pool
const pool = new Pool ({
    user: 'postgres',
    host : 'localhost',
    database: 'restAPI',
    password:'123456',
    port:5432,

})



module.exports = pool