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
app.post("/Login", async(req,res) => {
try{   
     //fields were provided by the front end form
    let email = req.body.email;
    let password = req.body.password;

    //query statement
    state = `SELECT U.Email, U.Password FROM users U WHERE U.Email = "${email}";`;

    //console.log(state) // used to verify the query


    db.query(state, async(err, result) =>{ 
        if(err){
        console.log(err)} //indicator for errors when executing a query 
        else{
            if(await bcrypt.compare(password,result[0].Password)&& email ===result[0].Email){ //await needs "async" in the 'parent' 
                //success will send to next page

                console.log("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            }
            else{
                console.log("Wrong Password")
            }
        res.send(result);
        }
    }
    )
}
catch{
    res.status(500).send()
}
})

//getting the email and passowrd from the form
app.post("/Signup", async(req,res) => {

    try{
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        let userRole = req.body.userRole
        let phoneNumber = req.body.phoneNumber
        const uid = Math.floor(Math.random()*100000)
        const salt = await bcrypt.genSalt(10)//hashes with 10 rounds
        const hashedPassword = await bcrypt.hash(password,salt)

        let Validated = 0
        state = `INSERT INTO 390db.users (ID, FName, LName, Email, Password, Validated, Phone, Role) VALUES (?,?,?,?,?,?,?,?);`;//figure out how to pass variables i created in 

        //console.log(state) //used to verify proper SQL format

        if (userRole==='Patient'){//all other user types should to be approved
            Validated = 1;
        }
        console.log(userRole)
        
        db.query(state, [uid,firstName,lastName,email,hashedPassword,Validated,phoneNumber,userRole], function(err, result) {//ID might be removed since it should be auto indent
            if(err){
                console.log(err)}
            else{
                
                }
        })




        if(userRole == 'Patient'){

            state = `SELECT p.DoctorID FROM 390db.patients p Group By P.DoctorID order by Count(p.ID) asc Limit 1;`;
            db.query(state, function(err, result) {//finds the doctor with the least amount of patients 
                if(err){
                    console.log(err)}
                else{
                    let docID = result[0].DoctorID 
                    // console.log("DoctorID:\t\t"+docID)


                    // console.log("userID:\t\t"+ uid)
                    patientState = `INSERT INTO 390db.patients (ID, DoctorID, Flagged) VALUES (?,?,?);`;
                    db.query(patientState, [uid,docID,0], function(err, result) {//inserts a new patient with an auto assigned doctor
                        if(err){
                            console.log("\ninserting into patient \n"+err)}
                        else{
                        }
                    })
                    }
            })
            

        }
// final send
        res.send(result);
    }
    catch{ 
        res.status(500).send()

    }
})
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));