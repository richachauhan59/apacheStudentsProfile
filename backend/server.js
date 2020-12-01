const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/user")
const Auth = require('./models/loginData')
const cors = require("cors")
const app = express()
const userRoute = require("./routes/users") 
const Students = require('./student')
const authRoute = require("./routes/auth");
const path = require('path')

app.use("/uploads", express.static("uploads"));

// app.use("/uploads",  express.static(  path.join(__dirname + "uploads") ))
app.use(express.json())
app.use(cors())
dotenv.config()


mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, db) => {
    if (err) console.log(err);
    else console.log("database is connected")
})

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, db) => {
    if (err) console.log(err);
    else console.log("database is connected")
})

app.use("/api/auth", authRoute);

app.use(`/api/user`,userRoute)

app.listen(5000, () => {
    console.log('Server is running up at port 5000')
})