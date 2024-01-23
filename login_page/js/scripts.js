// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri = 'mongodb+srv://BUReserve:V5z9WZ0HUtl1zPVf@bu-reserve.ojgejkf.mongodb.net/?retryWrites=true&w=majority';

// const client = new MongoClient(uri);

// const database = client.db('BU-Reserve');
// const users = database.collection('Users');


// async function login(email){

//     if (await users.findOne({email: email})){
//         console.log("Found email")
//         localStorage.setItem('email', email)
//         window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
//     }

//     else{
//         console.log("Email not in database.")
//         var emailBox = document.getElementById("email")
//         var emailError = document.getElementById("errorEmail")

//         emailBox.style.border = 'red'
//         emailError.style.display = 'block'
//         emailBox.value = ""


//         setTimeout(function() {
//             emailBox.style.border = 'black';
//             emailError.style.display = 'none';
//           }, 5000);



//     }
// }

getUserURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getUser'

async function login(email){

    email = email.toLowerCase()

    args = '?arg1=' + email
    url = getUserURL + args
    
    let response = await fetch(url)
        .then(data => {
            return data;
        })           //api for the get request
    
    const user = await response.json() 
    console.log(user)
    console.log(response)

    if (user == null){
        console.log("Email not in database.")
        var emailBox = document.getElementById("email")
        var emailError = document.getElementById("errorEmail")

        emailBox.style.borderColor = 'red'
        emailError.style.display = 'block'
        emailBox.value = ""


        setTimeout(function() {
            emailBox.style.borderColor = 'black';
            emailError.style.display = 'none';
        }, 5000);
    }

    else{
        console.log("Found email")
        localStorage.setItem('email', email)
        window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    }
    
    

    
    
    
    

}



