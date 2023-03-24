// import  library
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const sqlite3 = require('sqlite3').verbose();

// database area 
const db = new sqlite3.Database('database/users.db');


// set area
app.set("view engine", "ejs");

// user area
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));

// http process
app.get("/", (req, res) => {
    console.log("[+]---> Server is activated\n[+]---> PORT: 3000");
    res.render("index");
})

app.post("/", (req, res) => {
    userEmail = req.body["email"];
    userPassword = req.body["psw"];

    // search user in database
    db.get(`SELECT * FROM USERS WHERE userEmail = ? AND userPassword = ?`, [userEmail, userPassword], (err, row) => {
        if (err) {
            console.error(err.message);
        } else if (row) {
            res.render('home');
        } else {
            console.log('Kullanıcı Bulunamadı!');
        }
    });


});

// port
app.listen(3000);