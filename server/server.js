const express = require('express')
const app = express()

app.use(express.json())

const path = require('path');
const bodyParser = require('body-parser')
const db = require('../server/database')
const mysql = require("mysql2");
const cors = require('cors');
const bcrypt = require('bcrypt')
require('dotenv').config()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(__dirname + "../client/public/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('dist'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//below is a test server function
app.get('/api', (req, res) => {
    res.json({"users":["userOne", "userTwo", "userThree"]})

})

// example of using DB query

app.get('/users', (req, res) => {

    let state = `SELECT * FROM 390db.users;`;

    db.query(state, function(err, result) {
        console.log(result);
        res.send(result);
    })
})


//https://youtu.be/mbsmsi7l3r4 start from 00:00


//getting the email and passowrd from the form
app.post("/Login", (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    //check passwords and emails here then return request
    console.log("Sucess!!");
})

//getting the email and passowrd from the form
app.post("/Signup", async(req,res) => {
    let counter = 1;
    //Store passwords and emails here
    try{
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;

        const hashedPassword = await bcrypt.hash(password,10) // 10 is const salt = await bcrypt.genSalt()
        const user = {firstName:firstName, lastName:lastName,email:email, password:hashedPassword}
        //users.push(user) 
        //above used for adding to array


        state = `INSERT INTO 390db.users (ID, FName, LName, Email, Password, Validated, Phone, Role) VALUES (?,?,?,?,?,?,?,?);`;//figure out how to pass variables i created in 
//SELECT * FROM 390db.admins;
// (1, ${firstName}, ${lastName}, ${email}, 'passwrod', '1', '5146256619', 'Doctor')
        console.log(state)
        counter++;
        db.query(state, ['69',firstName,lastName,email,hashedPassword,1,'5146256619', 'Doctor'], function(err, result) {
            console.log(err)
            res.send(result);
        })
        
    }
    catch{ 
        res.status(500).send()

    }
//INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Role`) VALUES ('2', 'Alex', 'Bara', 'a.bara@engcomm.ca', 'pass123', '1', '5146256619', 'Doctor');

})

//https://youtu.be/mbsmsi7l3r4?t=871 to see how JWT are useful since they can be used at two different ports
// continue from https://youtu.be/mbsmsi7l3r4?t=949 he explains that you can have an authorization server and a login sever separated and the use of refresh tokens
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));