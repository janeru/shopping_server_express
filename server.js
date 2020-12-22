const express = require("express");
const cors = require('cors')
require('dotenv').config();
const app = express();
const connectToMongoDB = require("./config/db");
const fs = require('fs');
const https = require('https');
// const key = fs.readFileSync('./https/server.key');
// const cert = fs.readFileSync('./https/server.crt');

// const server = https.createServer({ key: key, cert: cert }, app);
// Accept incoming request
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(cors())

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use("/api/products", require("./routes/api/products"));


// Run the server
app.listen(5000, () => console.log(`Server running in 5000`));
// server.listen(5000, () => console.log(`Server running in 5000`));