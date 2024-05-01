const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/',(req,res) => {
    res.send('Hello world!')
})

app.get('/attractions',(req,res) =>{
    connection.query(
        'SELECT * FROM attractions',
        function(err,results,fields){
            res.send(results)
        }
    )
})

app.get('/attractions/id', (req, res) => {
    const detailId = req.params.id;
    connection.query(
        'SELECT name, detail, coverimage FROM attractions WHERE id = ?',[detailId],
        function(err, results, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results);
        }
    );
});

app.post('/create/attractions', (req, res) => {
    connection.query(
        'INSERT INTO attractions (name, detail, coverimage) VALUES(?, ?, ?)',
        [req.body.name, req.body.detail, req.body.coverimage],
         function (err, results, fields) {
            if (err) {
                console.error('Error in POST /users:', err);
                res.status(500).send('Error adding user');
            } else {
                res.status(201).send(results);
            }
        }
    )
})







app.listen(process.env.PORT || 3001 , () =>{
    console.log('Example app listening on port 3001')
})
