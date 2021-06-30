const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// middleware here
const db = require("../data/dbConfig");
const authenticate = require("./auth/authenticate-mw");
const authRouter = require("./auth/auth-router");
const ticketRouter = require("./tickets/ticket-router");

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
server.use("/tickets", authenticate, ticketRouter);

module.exports = server;