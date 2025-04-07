const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectMongo = require("./connect");

connectMongo("mongodb://localhost:27017/subscription").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})

const findRoute = require("./routes/findRoute");
const loginRoute = require("./routes/loginRoute");
const personRoute = require("./routes/personRoute")

app.use("/finder", findRoute);
app.use("/loger", loginRoute);
app.use("/personer", personRoute)


module.exports = app;