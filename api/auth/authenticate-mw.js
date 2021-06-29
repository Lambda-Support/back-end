const jwt = require("jsonwebtoken")

const {jwtSecret} = require("../../data/config/secret");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token){
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if(error) {
                res.status(401)
                    .json({ message: "authorization failed"} )
            } else {
                req.decodedToken = decodedToken
                next();
            }
        })
    } else {
        res.status(400)
            .json({ message: "no credentials provided" })
    }
}