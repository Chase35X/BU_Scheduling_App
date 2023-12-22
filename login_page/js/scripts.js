
function login(email){
    const { MongoClient } = require("mongodb");

    // Replace the uri string with your connection string.
    const uri = 'mongodb+srv://BUReserve:V5z9WZ0HUtl1zPVf@bu-reserve.ojgejkf.mongodb.net/?retryWrites=true&w=majority';

    const client = new MongoClient(uri);

    const database = client.db('BU-Reserve');
    const users = database.collection('Users');

    if (users.findOne({email: email})){
        console.log("Found email")
        window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    }

    else{
        console.log("Email not in database.")


    }
}

