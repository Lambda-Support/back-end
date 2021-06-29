const server = require("../server")
const db = require("../../data/dbConfig")
const request = require("supertest")

describe('register', () => {

    it("should give status 201", async() => {
        const res = await request(server)
            .post("/users/register")
            .send({ name: "Eddie Van Halen Jr", username: "Jump2", password: "banana"})

        expect(res.status).toBe(201)
    })
})