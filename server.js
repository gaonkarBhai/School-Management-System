// 16.06.2023

require('dotenv').config()
const http = require('http')
const app = require("./app/app")
const conn = require('./config/conn')
const PORT = process.env.PORT || 2023;

conn() // Database connection

const server = http.createServer(app)
server.listen(PORT, console.log(`Server is live`));
