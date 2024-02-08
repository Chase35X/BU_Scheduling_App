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


addEventListener("DOMContentLoaded", (event) => {

    if (localStorage.getItem('email')) {
        console.log('logged in')

        login(localStorage.getItem('email'))
    }


    else if(document.cookie != null){
        console.log(document.cookie)

        cookie = document.cookie

        email_list = cookie.split('=')

        email = email_list[1]

        console.log(email)

        login(email)
    }

    else{
        console.log('no email found in cookie or local storage')
    }

    

});

getUserURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getUser'

async function login(email){

    email = email.toLowerCase()

    if (!(email.includes('@bu.edu'))){
        sendLoginError('bu email')
    }

    else{
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
            sendLoginError('not found')
        }

        else{
            console.log("Found email")
            localStorage.setItem('email', email)

            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000 * 60 * 60 * 24 * 365 // cookie expires in 1 year
            now.setTime(expireTime);

            document.cookie = "username=" + email +  ";expires=" + now.toUTCString() + ";path=/";
            window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
        }
    }

}

function sendLoginError(error){
    var emailBox = document.getElementById("email")
    var emailError = document.getElementById("errorEmail")

    if(error == 'bu email'){
        emailError.innerHTML = 'Error. Please use a BU email.'
    }

    else if(error == 'not found'){
        emailError.innerHTML = 'Error. Email is not in database.'
    }

    emailBox.style.borderColor = 'red'
    emailError.style.display = 'block'
    emailBox.value = ""

    setTimeout(function() {
        emailBox.style.borderColor = 'black';
        emailError.style.display = 'none';
    }, 5000);
}



