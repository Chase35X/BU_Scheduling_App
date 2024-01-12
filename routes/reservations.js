const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')


//Different routes for:
//Getting all reservations
//get one reservation
//Creating 
//updating
// deleting


//getting all
router.get('/', async(req, res) => {
    res.render()
    try{
        const reservations = await Reservation.find()
        res.json(reservations)
    }
    catch(error){
        res.status(500).json({message: error.mesage})
    }
})

//getting one
router.get('/:id', getReservation, (req, res) => {
    res.json(res.reservation)
})

//create one
router.post('/', async(req, res) => {
    console.log(req.body)
    const reservation = new Reservation({
        user_email: req.body.user_email,
        room: req.body.room
    })
    try{
        const newReservation = await reservation.save()
        res.status(201).json(newReservation)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }

})

//updating one
router.patch('/:id', getReservation, (req, res) => {
    //can change later
})

//deleting one
router.delete('/:id', getReservation, async(req, res) => {
    try{
        console.log(res.reservation)
        await res.reservation.deleteOne()
        res.json({message: "Deleted reservation"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

async function getReservation(req, res, next){
    let reservation

    try{
        reservation = await Reservation.findById(req.params.id)
        if(reservation == null){
            return res.status(404).json({message: 'Cannot find reservation'})
        }
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }

    res.reservation = reservation
    next()
}

module.exports = router