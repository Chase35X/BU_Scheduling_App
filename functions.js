
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = 'mongodb+srv://BUReserve:V5z9WZ0HUtl1zPVf@bu-reserve.ojgejkf.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const database = client.db('BU-Reserve');
const users = database.collection('Users');
const monday_reservations = database.collection('Monday-Reservations');
const tuesday_reservations = database.collection('Tuesday-Reservations');
const wednesday_reservations = database.collection('Wednesday-Reservations');
const thursday_reservations = database.collection('Thursday-Reservations');
const friday_reservations = database.collection('Friday-Reservations');
const saturday_reservations = database.collection('Saturday-Reservations');
const sunday_reservations = database.collection('Sunday-Reservations');






async function test(){

    reservations.rename('Monday-Reservations')

//     var test = await users.findOne({ name: 'Chase Lenhart' })
//     console.log(test)

//     console.log()
//     await users.insertOne({ name: 'test' });    
}


function insertAll(){

    wednesday_reservations.insertMany([
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-12am12:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-12:30am1am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-1am1:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-1:30am2am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-2am2:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-2:30am3am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-3am3:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-3:30am4am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-4am4:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-4:30am5am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-5am5:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-5:30am6am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-6am6:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-6:30am7am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-7am7:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-7:30am8am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-8am8:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-8:30am9am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-9am9:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-9:30am10am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-10am10:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-10:30am11am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-11am11:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-11:30am12pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-12pm12:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-12:30pm1pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-1pm1:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-1:30pm2pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-2pm2:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-2:30pm3pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-3pm3:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-3:30pm4pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-4pm4:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-4:30pm5pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-5pm5:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-5:30pm6pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-6pm6:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-6:30pm7pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-7pm7:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-7:30pm8pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-8pm8:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-8:30pm9pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-9pm9:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-9:30pm10pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-10pm10:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-10:30pm11pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-11pm11:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"wednesday-11:30pm12am","status":"","length":{"$numberInt":"30"}}
    ])


    thursday_reservations.insertMany([
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-12am12:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-12:30am1am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-1am1:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-1:30am2am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-2am2:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-2:30am3am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-3am3:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-3:30am4am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-4am4:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-4:30am5am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-5am5:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-5:30am6am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-6am6:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-6:30am7am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-7am7:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-7:30am8am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-8am8:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-8:30am9am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-9am9:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-9:30am10am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-10am10:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-10:30am11am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-11am11:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-11:30am12pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-12pm12:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-12:30pm1pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-1pm1:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-1:30pm2pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-2pm2:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-2:30pm3pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-3pm3:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-3:30pm4pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-4pm4:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-4:30pm5pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-5pm5:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-5:30pm6pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-6pm6:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-6:30pm7pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-7pm7:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-7:30pm8pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-8pm8:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-8:30pm9pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-9pm9:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-9:30pm10pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-10pm10:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-10:30pm11pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-11pm11:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"thursday-11:30pm12am","status":"","length":{"$numberInt":"30"}}
    ])

    friday_reservations.insertMany([
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-12am12:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-12:30am1am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-1am1:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-1:30am2am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-2am2:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-2:30am3am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-3am3:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-3:30am4am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-4am4:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-4:30am5am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-5am5:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-5:30am6am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-6am6:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-6:30am7am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-7am7:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-7:30am8am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-8am8:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-8:30am9am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-9am9:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-9:30am10am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-10am10:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-10:30am11am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-11am11:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-11:30am12pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-12pm12:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-12:30pm1pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-1pm1:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-1:30pm2pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-2pm2:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-2:30pm3pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-3pm3:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-3:30pm4pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-4pm4:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-4:30pm5pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-5pm5:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-5:30pm6pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-6pm6:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-6:30pm7pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-7pm7:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-7:30pm8pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-8pm8:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-8:30pm9pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-9pm9:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-9:30pm10pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-10pm10:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-10:30pm11pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-11pm11:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"friday-11:30pm12am","status":"","length":{"$numberInt":"30"}}
    ])

    saturday_reservations.insertMany([
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-12am12:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-12:30am1am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-1am1:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-1:30am2am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-2am2:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-2:30am3am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-3am3:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-3:30am4am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-4am4:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-4:30am5am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-5am5:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-5:30am6am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-6am6:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-6:30am7am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-7am7:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-7:30am8am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-8am8:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-8:30am9am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-9am9:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-9:30am10am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-10am10:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-10:30am11am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-11am11:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-11:30am12pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-12pm12:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-12:30pm1pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-1pm1:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-1:30pm2pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-2pm2:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-2:30pm3pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-3pm3:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-3:30pm4pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-4pm4:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-4:30pm5pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-5pm5:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-5:30pm6pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-6pm6:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-6:30pm7pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-7pm7:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-7:30pm8pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-8pm8:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-8:30pm9pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-9pm9:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-9:30pm10pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-10pm10:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-10:30pm11pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-11pm11:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"saturday-11:30pm12am","status":"","length":{"$numberInt":"30"}}
    ])

    sunday_reservations.insertMany([
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-12am12:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-12:30am1am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-1am1:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-1:30am2am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-2am2:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-2:30am3am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-3am3:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-3:30am4am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-4am4:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-4:30am5am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-5am5:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-5:30am6am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-6am6:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-6:30am7am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-7am7:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-7:30am8am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-8am8:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-8:30am9am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-9am9:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-9:30am10am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-10am10:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-10:30am11am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-11am11:30am","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-11:30am12pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-12pm12:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-12:30pm1pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-1pm1:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-1:30pm2pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-2pm2:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-2:30pm3pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-3pm3:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-3:30pm4pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-4pm4:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-4:30pm5pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-5pm5:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-5:30pm6pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-6pm6:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-6:30pm7pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-7pm7:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-7:30pm8pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-8pm8:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-8:30pm9pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-9pm9:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-9:30pm10pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-10pm10:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-10:30pm11pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-11pm11:30pm","status":"","length":{"$numberInt":"30"}},
        {"datetime_created":"","reservation_datetime":"","room":"","user_email":"","reservation_id":"sunday-11:30pm12am","status":"","length":{"$numberInt":"30"}}
    ])


}

// insertAll()
// test()




function get_dict(){
    
    dict = {
        

        
    }


}

async function set_reservation(res_collection, reservation, user){

    // Sets reservation for user
    // Must check if reservation is available
    // If not -> send error to user
    // If yes -> set reservation, update user data, update reservation data, move to dashboard page



    var reservation_document =  await res_collection.findOne({reservation_id: reservation})
    var reservation_status = reservation_document.status;

    if (reservation_status){
        // send user to error page
    }

    else{

        var user_document = await users.findOne({email: user})

        if (user_document.max_reservation > length(user_document.current_reservations)){
            users.updateOne(
                {email: user},
                {$inc: {reservation_count: 1}},
                {$push: {reservation_history: reservation}},
                {$push: {current_reservations: reservation}}
            )
        }

        else{
            // send errors -> at max reservations allowed for user
        }

        
    }

    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //     const res = reservation_status; 
    //     resolve(res);
    //     }, 1000); // Simulating a delay of 1 second
    // });
}

async function remove_reservation(res_collection, reservation, user){

    // Cancels reservation for user when delete icon is clicked
    // Must check if reservation is the user's (error check for the code)
    // If yes -> remove reservation from user data, remove reservation from reservation data, stay/refresh on dashboard page
    // If no -> fix the code



    var user_document =  await users.findOne({email: user})

    var current_reservations = user_document.current_reservations

    if (reservation in current_reservations){
        users.updateOne(
            {email: user},
            {$pull: {current_reservations: reservation}}
        )
    }

    else{
        console.log('This reservation is not the users.')
        console.log('Fix da code')
    }


    

    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //     const res = reservation_status; 
    //     resolve(res);
    //     }, 1000); // Simulating a delay of 1 second
    // });
}

async function set_dashboard(user){
    var user_document = await users.findOne({email: user})
    var current_reserations = user_document.current_reserations
    var reservation_count = user_document.reservation_count
    var class_year = user_document.class
    var name = user_document.name

    var info_html = ""

    var reservation_html = ""


}

async function set_available_reservations(res_collection, time){
    // Used to show which reservations are available to user on schedule page
    // updates the HTML


}

async function set_calendar(res_collection){
    // sets reservation calendar HTML
}




async function check_availability_data(res_collection, reservation){
    var reservation_document =  await res_collection.findOne({reservation_id: reservation})
    console.log(reservation_document)

    var reservation_status = reservation_document.status;

    return new Promise((resolve) => {
        setTimeout(() => {
        const res = reservation_status; 
        resolve(res);
        }, 1000); // Simulating a delay of 1 second
    });
}




