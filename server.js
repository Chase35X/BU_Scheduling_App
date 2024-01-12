require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

//connect db
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

//reservation middleware
const reservationsRouter = require('./routes/reservations')
app.use('/reservations', reservationsRouter)

//
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath));

const folders = fs.readdirSync(path.join(publicPath, 'BU_Scheduling_App'));

folders.forEach((folder) => {
    console.log(folder)
    const folderPath = path.join(publicPath,'BU_Scheduling_App', folder)
    const stats = fs.statSync(folderPath)

    if (stats.isDirectory()) {
        app.use(`/${folder}`, express.static(folderPath))
        app.get(`/${folder}`, (req, res) => {
            res.sendFile(path.join(folderPath, 'index.html'))
        });
    }
});

// app.get('/', (req, res) => {
//     res.sendFile(`${publicPath}/home_page/index.html`)
// })
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'home_page', 'index.html'))
// })

const PORT = 3000
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))