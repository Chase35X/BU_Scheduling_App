const mongoose = require ('mongoose')

const reservationSchema = new mongoose.Schema({
    datetime_created: {
        type: Date,
        //required: true,
        default: Date.now
    },
    reservation_datetime: {
        type: Date,
        //required: true
    },
    room: {
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true
    },
    reservation_id:{
        type: String,
        unique: true,
        //required: true
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    length:{
        type: Number,
        //required: true,
        default: 30
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)