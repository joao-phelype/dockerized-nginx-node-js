const express = require('express');
const mysql = require('mysql');
const faker = require('@faker-js/faker')
const app = express();
const conn = mysql.createConnection({
    host     : 'db',
    user     : 'root',
    password : 'root',
    database : 'nodedb'
});
const selectNameSql = 'SELECT * from nodedb.people'
app.get('/', (req, res) => {
    const insertNameSql = `INSERT INTO nodedb.people(name) VALUES('${faker.faker.name.firstName()}')`
    conn.query(insertNameSql)
    conn.query(selectNameSql, function (error, results, fields) {
        if (error) throw error;
        let names = ''
        results.forEach(row => {
            names += `\n <h2>${row.name}<h2>`
        })
        res.send(`<h1>Full Cicle<h1> ${names}`)
    });
})

app.listen(3000, () => console.log('Server is up and running'));