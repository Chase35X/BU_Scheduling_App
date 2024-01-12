// database.js
define(['mongodb'], function(mongodb){
    const { MongoClient } = mongodb

    const uri = 'mongodb+srv://BUReserve:V5z9WZ0HUtl1zPVf@bu-reserve.ojgejkf.mongodb.net/?retryWrites=true&w=majority';

    let instance = null;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    async function getInstance() {
        if (instance === null) {
            instance = await client.connect();
        }
        return instance;
    }

    module.exports = {
        getInstance: getInstance
    };
});