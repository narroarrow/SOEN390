function admin(req, res, next) {

    if (!req.cookies.role.includes("Admin")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function patient(req, res, next) {
    console.log('yo ')
    console.log(req.cookies.role);
    if (!req.cookies.role.includes("Patient")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

 function doctor(req, res, next) {
    console.log('happen');
    if (!req.cookies.role.includes("Doctor")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}


module.exports = { admin, patient, doctor };