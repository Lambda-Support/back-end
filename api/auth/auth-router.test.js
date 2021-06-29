<<<<<<< HEAD
const server = require('../server')
const db = require('../../data/dbConfig')
const request = require('supertest')


describe('register', () => {

    it('should give 201 status', async () => {
        const res = await request(server)
        .post("/users/register")
        .send({ name: "Eddie Van Halen", username: "Jump", password: "Van Halen 1"})
    expect(res.status).toBe(201)
    })

    it('should add a user and return it', async () => {
        await request(server)
        .post("/users/register")
        .send({name: "David Lee Roth", username: "Panama", password: "Van Halen 2"})
    expect({username: "David Lee Roth"})
    })

    beforeEach(async () => {
        await db("users").truncate()
    })
})

describe("user login", () => {

    it('Should give a 200 status', async() => {
        await request(server)
        .post("/users/login")
        .send({username: "Panama", password: "Van Halen 2"})
    expect(200)
    })

    it('should respond with a token', async() => {
        const res = await request(server)
            .post("/users/login")
            .send({username: "Panama", password: "Van Halen 2"})
        expect(res.body.token)
=======
const server = require("../server")
const db = require("../../data/dbConfig")
const request = require("supertest")

describe('register', () => {

    it("should give status 201", async() => {
        const res = await request(server)
            .post("/users/register")
            .send({ name: "Eddie Van Halen Jr", username: "Jump2", password: "banana"})

        expect(res.status).toBe(201)
>>>>>>> 207c8793bb130a35dd5125987ba2ab6744a47b1a
    })
})