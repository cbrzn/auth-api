const app = require("../app");
const request = require("supertest");
let jwt
jest.mock("../controllers/user")
jest.mock("../middlewares/tokenVerify")

const signUpTest = async () => {
    const response = await request(app)
    .post("/v1/users/signup/request")
    .send({ email: "test", password: "test" })
    expect(response.body.status).toBe(200)
}

const logInTest = async () => {
    const response = await request(app)
    .post("/v1/users/login")
    .send({ email: "test", password: "test" })
    const { status, token } = response.body
    expect(status).toBe(200)
    jwt = token
}

const accessTest = async () => {
    const response = await request(app)
    .get("/v1/")
    .set("Authorization", `Bearer ${jwt}`)
    expect(response.body.status).toBe(200)
}

const logOutTest = async () => {
    const response = await request(app)
    .post("/v1/users/logout")
    .send({ jwt })
    expect(response.body.status).toBe(200)
    jwt = null
}

const signUp = test("Signup func", signUpTest)
const logIn = test("Login func", logInTest)
const authTestingFunc = [signUp, logIn]

const access = test("Access func" , accessTest)

const logOut = test("Logout func", logOutTest)


describe("Auth set", () => [...authTestingFunc])
describe("Access app", () => access)
describe("Logout", () => logOut)



