// importing express
const express = require("express");
const app = express();
const port = 8000;


// Make sure these lines are above any app.get or app.post code blocks
app.use(express.json());

// Faker App
const { faker } = require("@faker-js/faker");

// Create Two Classes: User + Company

// User Class: id, fName, lName, email, phoneNumber, password
class User {
    constructor() {
        this._id = faker.random.numeric(8);
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.email = faker.internet.email(this.firstName, this.lastName);
        this.phoneNumber = faker.phone.number();
        this.password = faker.random.alphaNumeric(8);
    }
}

// Company Class: id, companyName, address(street, city, state, zip, country)
class Company {
    constructor() {
        this._id = faker.random.numeric(7);
        this.name = faker.company.companyName();
        this.address = {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        };
    }
}

// req is short for request
// res is short for response 
app.get("/api", (req, res) => {
    res.send("Our express api server is now sending this over to the browser");
});

// Routes - Get New User 

app.get("/api/users/new", (req, res) => {
    let newUser = new User();
    res.json(newUser);
});

// Routes - Get New Company

app.get("/api/companies/new", (req, res) => {
    let newCompany = new Company();
    res.json(newCompany);
});

// Create return request for both New User and New Company

app.get("/api/user/company", (req, res) => {
    let newCompany = new Company();
    let newUser = new User();
    res.json({ newCompany, newUser });
});

// Code must be at bottom of file
const server = app.listen(port, () => {
    console.log(`server set and match on port ${server.address().port}!`);
})