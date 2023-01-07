const express = require('express');
const mysql = require('mysql');
const app = express();
const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodedb'
});
conn.connect();
const sql = `INSERT INTO nodedb.people(name) VALUES('Phelype')`
conn.query(sql)
app.get('/', (req, res) => {
    conn.query('SELECT * from nodedb.people', function (error, results, fields) {
        if (error) throw error;
        res.send(`<h1>Full Cicle<h1> \n <h2>${results[0].name}<h2>`)
    });
})

server = app.listen(3000, () => console.log('Server is up and running'));

process.on('SIGINT', function() {
    console.log("closing connection")
    conn.end()
    console.log("closing server")
    server.close()
});