const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// middleware here
const db = require("../data/dbConfig");
const authRouter = require("./auth/auth-router");
const commentsRouter = require("./comments/comments-router");

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

server.use("/users", authRouter);
server.use("/comments", commentsRouter);

module.exports = server;