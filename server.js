require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const reservationsRouter = require('./routes/reservations')
app.use('/reservations', reservationsRouter)

app.use(express.static(path.join(__dirname, 'home_page')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home_page', 'index.html'))
})

const PORT = 3000
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))