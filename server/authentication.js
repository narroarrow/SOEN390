//https://www.youtube.com/watch?v=Ud5xKCYQTjM&t=0s
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = [ //usually stored in a db
    
]

app.get('/users',(req, res) => { //route needs to be removed since we don't want to expose user name and password 
    res.json(users)
}
)

app.post('/users',async(req,res) => {// adding a user
    try{

        const hashedPassword = await bcrypt.hash(req.body.password,10) // 10 is const salt = await bcrypt.genSalt()
        const user = {user:req.body.name, password:hashedPassword}
        users.push(user)
        res.status(201).send()

        //we should add a salt cplumn to the db, bcrypyt handles storing the salt and password for us as the salt is saved inside the password
        //hashedPassword = salt.hashed password
    }
    catch{ 
        res.status(500).send()

    }
})

app.post('/users/login', async(req,res) =>{//only allows for 1 successful login

    const user = users.find(user => user.name = req.body.name) //suggested === but it fails if you do
    //console.log("user info\n"+user)
    // console.log( user.name +'\t\t'+ req.body.name)
    if (user == null){
        return res.status(400).send('Cannot find user')
    }
    // console.log(user.password + '\n'+ req.body.password)
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

app.listen(9000)