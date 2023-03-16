// imports 
var express = require('express');
var app = express();


var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


//Testing code will need to take this out later


var questions = [
 {
    id: 1,
    question: "What Math classes are good at OSU?",
    answer: " I personally like Calculus"
 }
]

app.use(express.json());

app.get('/message', function(req, res) {
    res.json({message: 'Hello World'});
});


app.listen(8000, function() {
    console.log('Listening on Port 8000')
});