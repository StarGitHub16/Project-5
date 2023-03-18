// imports 
var express = require('express');
var mysql = require('mysql');


var app = express();
var cors = require('cors');


app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

 
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "universityapp"
});
 

//db.connect(function(err) {
    //if (err) throw err;
    //console.log("Connected!");
//});


//Testing code will need to take this out later


//Login Code Section


app.post('/register', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    db.query("INSERT INTO userinfo (username, password) VALUES (?, ?)", 
    [username, password], 
    (err, result) => {
            console.log(err);
        }
    );
});

app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM userinfo WHERE username = ? AND password = ?", [username, password], (err, result) => {
            if(err) {
                res.send({err: err})
            } 
            
            if(result.length > 0) {
                res.send(result)
            } else {
                res.send({message: "Wrong username/password combination."})
                
            }
        }
    )
})




app.get('/message', function(req, res) {
    res.json({ message: "Connection Successful!" });
});


app.listen(8000, function() {
    console.log('Listening on Port 8000')
});