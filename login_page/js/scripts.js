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

        window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    }


    else if(document.cookie != ''){

        cookie = document.cookie

        email_list = cookie.split('=')

        email = email_list[1]

        console.log(email)

        window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    }

    else{
        console.log('no email found in cookie or local storage')
    }

    

});

getUserURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getUser'

async function login(email, password){

    email = email.toLowerCase()

    if (!(email.includes('@bu.edu'))){
        sendLoginError('bu email')
    }

    else{
        args = '?arg1=' + email + '&arg2=' + true
        url = getUserURL + args
        
        let response = await fetch(url)
            .then(data => {
                return data;
            })           //api for the get request
        
        const user = await response.json() 
        

        if (user == null){
            sendLoginError('not found')
        }

        else if(user.role == 'founder' || user.role == 'admin'){

            var password = document.getElementById('password')
            
            if(password.value == ''){
                var passwordInput = document.getElementById('password')
                passwordInput.style.display = 'block'
            }

            else{
                if(password.value == user.password){
                    localStorage.setItem('email', email)
                    localStorage.setItem('password', password.value)

                    var now = new Date();
                    var time = now.getTime();
                    var expireTime = time + 1000 * 60 * 60 * 24 * 365 // cookie expires in 1 year
                    now.setTime(expireTime);

                    document.cookie = "username=" + email + ";expires=" + now.toUTCString() + ";path=/";
                    document.cookie = "password=" + password.value + ";expires=" + now.toUTCString() + ";path=/";
                    console.log(document.cookie.split(';'))
                    window.location.href = '/BU_Scheduling_App/admin_page/index.html'
                }

                else{
                    sendLoginError('wrong pw')
                }
            }
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
    var passwordBox = document.getElementById("password")

    if(error == 'bu email'){
        emailError.innerHTML = 'Error. Please use a BU email.'
        emailBox.style.borderColor = 'red'
        emailError.style.display = 'block'
        emailBox.value = ""
    }

    else if(error == 'not found'){
        emailError.innerHTML = 'Error. Email is not in database.'
        emailBox.style.borderColor = 'red'
        emailError.style.display = 'block'
        emailBox.value = ""
    }

    else if(error == 'wrong pw'){
        emailError.innerHTML = 'Wrong password. Try again.'
        passwordBox.value = ""
        passwordBox.style.borderColor = 'red'
        emailError.style.display = 'block'
    }

    setTimeout(function() {
        emailBox.style.borderColor = 'black';
        emailError.style.display = 'none';
    }, 5000);
}



