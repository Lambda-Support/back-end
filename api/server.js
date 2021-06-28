const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// middleware here

const server = express();

server.use(helmet());
server.use(express.json());
server.use(
    cors({
        origin: "*",
        credentials: true,
    })
)

server.get("/", (req, res) => {
    res.status(200).json({ server: "Up and running..."});
})

module.exports = server;