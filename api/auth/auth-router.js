const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("./auth-model");

// add authenticate mw later
const secrets = require("../../data/config/secret");

router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            const token = generateToken(user);
            res.status(201).json({ message: "register successful" })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error, errorMessage: error.message })
        })
})

function generateToken(user) { 
    const payload = {
        user: user,
        userid: user.id
    };
    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;