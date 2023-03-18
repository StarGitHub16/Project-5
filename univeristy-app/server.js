// imports 
var express = require('express');
var mysql = require('mysql');


var bcrypt = require('bcrypt'); //Dealing with crypting a password
var saltRounds = 10;            //Dealing with bcrypt

var app = express();
var cors = require('cors');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var session = require('express-session') //will keep the user logged in.


app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "", //Need to be a hard text that cant be guessed easily.
    resave: false,
    saveUninitialized: false,
    cookie: {

        expires: 60 * 60 * 24,
    },
}))


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

app.get('/login', (req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false });
    }
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
                        req.session.user = result;
                        console.log(req.session.user);
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