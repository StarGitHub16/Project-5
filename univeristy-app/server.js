// imports 
var express = require('express');
var mysql = require('mysql');


var bcrypt = require('bcrypt'); //Dealing with crypting a password
var saltRounds = 10;            //Dealing with bcrypt

var app = express();
var cors = require('cors');


app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

 
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shinysecret130",
    database: "universityapp"
});
 

//db.connect(function(err) {
    //if (err) throw err;
    //console.log("Connected!");
//});


//Login Code Section


app.post('/register', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {
       
       
        if (err) {
            console.log(err);
        }

        db.query("INSERT INTO userinfo (username, password) VALUES (?, ?)", 
        [username, hash], 
        (err, result) => {
                console.log(err);
            }
        );

    })

})

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM userinfo WHERE username = ?;", 
    username,
    (err, result) => {
            if(err) {
                res.send({err: err})
            } 
            
            if(result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        res.send(result)
                    } else {
                        res.send({message: "Wrong username/password combination."});
                    }
                })
            } else {
                res.send({message: "User is not registered" });
            }
        }
    );
});




app.get('/message', function(req, res) {
    res.json({ message: "Connection Successful!" });
});


app.listen(8000, function() {
    console.log('Listening on Port 8000')
});