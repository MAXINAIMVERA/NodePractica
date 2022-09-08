const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: './.env'})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((error) => {
    if (error) {
        console.log(error)
    }
    console.log('SQL CONNECTED')
})

const app = express()

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'hbs')

app.use('/', require('./router/routes'))
app.use('/auth', require('./auth'))

app.listen(4000, () => {
    console.log('SERVIDOR INICIADO')
})