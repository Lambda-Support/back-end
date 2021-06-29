const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("./auth-model");

const authenticate = require("./authenticate-mw");
const secrets = require("../../data/config/secret");

router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200)
                .json(users);
        })
        .catch(error => {
            res.status(500)
                .json({ message: `failed to get users - ${error}`})
        })
});

router.get("/:id", (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            res.status(200)
                .json(user)
        })
        .catch(error => {
            res.status(500)
                .json({ message: `failed to get user - ${error}` })
        })
});

router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            const token = generateToken(user);
            res.status(201)
                .json({ message: "register successful" })
        })
        .catch(error => {
            console.log(error)
            res.status(500)
                .json({ error: error, errorMessage: error.message })
        })
});

router.post("/login", (req, res) => {
    let{ username, password } = req.body;
    Users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200)
                    .json({ token: token });
            } else {
                res.status(401)
                    .json({ message: "invalid credentials" });
            }
        })
        .catch(error => {
            res.status(500).json( {error: error} )
        })
});

router.put("/", (req, res) => {
    Users.edit(req.decodedToken.user.id, req.body)
        .then(count => {
            if(count){
                res.status(200)
                    .json({ message: "update successful" , data: req.body })
            } else {
                res.status(404)
                    .json( { message: "ID not found" })
            }
        })
        .catch(error => {
            res.status(500)
                .json( { error: error.message} )
        })
})

router.delete("/", (req, res) => {
    Users.remove(req.decodedToken.user.id)
        .then(deleted => {
            res.status(200)
                .json({ message: "delete successful" })
        })
        .catch( error => {
            res.status(500)
                .json({ message: `unable to delete user - ${error}`})
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