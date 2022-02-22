const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
// const db = require('../server/database')
// const mysql = require("mysql2");
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

// app.get('/users', (req, res) => {
//
//     let state = `SELECT * FROM cloudscratch.tablescratch;`;
//
//     db.query(state, function(err, result) {
//         console.log(result);
//         res.send(result);
//     })
// })


app.use(express.json())
const posts = [
    {username: 'Jeff',
title1:'Post 1'},
    {username: 'Alex',
title1:'Post 2'}
]

const users = [ //usually stored in a db
    
]

app.get('/users',(req, res) => { //route needs to be removed since we don't want to expose user name and password 
    res.json(users)
}
)

app.post('/users',async(req,res) => {// adding a user
    try{

        const hashedPassword = await bcrypt.hash(req.body.password,10) // 10 is const salt = await bcrypt.genSalt()
        console.log(hashedPassword)

        const user = {user:req.body.name, password:hashedPassword}
        users.push(user)
        res.status(201).send()
        hash(salt + 'password123') //hashing the password "password"
        //we should add a salt cplumn to the db, bcrypyt handles storing the salt and password for us as the salt is saved inside the password
        //hashedPassword = salt.hashed password
    }
    catch{ 
        res.status(500).send()

    }
})


app.get('/posts',authenticateToken,(req, res) => {
    req.user
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login',(req,res) =>{
    //authenticate the user
    const username = req.body.username
    const user = {name:username}
    // console.log(req.body.username)
// for some reason sign(user) has more 1.2.3 parts
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)//passes the object we want to serialize
    res.json({accessToken:accessToken})
        
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    }
    )
}

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, '../client/public', 'index.html')); 
})

//getting the email and passowrd from the form
app.post("/Login", (req,res) => {
   
    let email = req.body.email;
    let password = req.body.password;
    //check passwords and emails here then return request
    console.log("Sucess!!");
})

//getting the email and passowrd from the form
app.post("/Signup", (req,res) => {
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    //Store passwords and emails here
    console.log("Sucess!");
})


app.post('/users/login', async(req,res) =>{
    const user = users.find(user => user.name = req.body.name) //suggested === but it fails if you do
    if (user == null){
        return res.status(400).send('Cannot find user')
    }
    try{
       if(await bcrypt.compare(req.body.password, user.password)){//helps prevent timing attempts
        res.send('Success')
    }
        else{
            res.send('Not Allowed')
        }
    }
    catch{
        res.status(500).send()
    }
}
)
//https://youtu.be/mbsmsi7l3r4?t=871 to see how JWT are useful since they can be used at two different ports
// continue from https://youtu.be/mbsmsi7l3r4?t=949 he explains that you can have an authorization server and a login sever separated and the use of refresh tokens
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));