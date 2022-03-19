const express = require("express");
const db = require("../database");
const mail = require("nodemailer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const AdminController = express.Router()

AdminController.use(express.json());
AdminController.use(cookieParser());
AdminController.use(cors({credentials: true, origin: 'http://localhost:3000'}));
AdminController.use(express.static(path.join(__dirname, "../client/build")));
AdminController.use(express.static(__dirname + "../client/public/"));
AdminController.use(bodyParser.urlencoded({extended: true}));
AdminController.use(bodyParser.json())
AdminController.use(express.static('dist'));


AdminController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let sendEmail = (fName, lName, email) => {
    const transporter = mail.createTransport({
        service: "gmail",
        auth: {
            user: "noreply.COVID19site@gmail.com",
            pass: "COVID19#2022"
        }
    });

    const mailOptions = {
        from: "COVID 19 WEBSITE",
        to: email,
        subject: "Your Account Has Been Invalidated",
        text: "Dear " + fName + " " + lName + ",\n\n" + "We regret to inform you that your account has been invalidated.\n\nRegards,\n\nCOVID 19 Website"
    }

    transporter.sendMail(mailOptions);
}


// Gets validated doctor first name, last name, phone number to the admin
AdminController.get("/adminViewingValidatedDoctorData", (req, res) => {

    db.query("SELECT Udoctor.Fname, Udoctor.Lname, Udoctor.Phone, Udoctor.Validated, Udoctor.ID, D.License FROM 390db.users Udoctor, 390db.doctors D WHERE Udoctor.ID = D.ID AND Udoctor.Validated = 1;", (err, result) => {
        if (err) {

            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Gets unvalidated doctor first name, last name, phone number to the admin
AdminController.get("/adminViewingUnvalidatedDoctorData", (req, res) => {
        db.query("SELECT Udoctor.Fname, Udoctor.Lname, Udoctor.Phone, Udoctor.Validated, Udoctor.ID, D.License FROM 390db.users Udoctor, 390db.doctors D WHERE Udoctor.ID = D.ID AND Udoctor.Validated = 0;", (err, result) => {

            if (err) {

                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }
);

// Gets patient first name, last name, phone number to the admin
AdminController.get("/adminViewingPatientData", (req, res) => {
    db.query("SELECT Upatient.Fname, Upatient.Lname, Upatient.Phone, Udoctor.Fname AS docFname, Udoctor.Lname AS docLname FROM 390db.users Upatient, 390db.patients P, 390db.users Udoctor WHERE Upatient.ID = P.ID AND P.DoctorID = Udoctor.ID;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Post to validate doctor in database
AdminController.post("/validateDoctor", (req, res) => {
    let DoctorID = req.body.DoctorID;
    db.query("UPDATE 390db.users SET Validated = 1 WHERE ID = ?", [DoctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Doctor validated!");
        }
    })
});


AdminController.post("/invalidateDoctor", (req, res) => {
    //Delete from the database
    let DoctorID = req.body.DoctorID;
    console.log(DoctorID);
    var fName;
    var lName;
    var email;
    db.query("SELECT Udoctor.Fname, Udoctor.Lname, Udoctor.Email FROM 390db.users Udoctor, 390db.doctors D WHERE Udoctor.ID = D.ID AND D.ID = ?", [DoctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            fName = result[0].Fname;
            lName = result[0].Lname;
            email = result[0].Email;
            console.log(email);
        }
    });

    db.query("DELETE FROM 390db.Doctors WHERE ID = ?", [DoctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted from Doctors table"); //This will eventually send an email to the invalidated doctor
        }
    })

    db.query("DELETE FROM 390db.users WHERE ID = ?", [DoctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted from Users Table");
            sendEmail(fName, lName, email); //This sends an email to the invalidated doctor
        }
    })
});

module.exports = AdminController;