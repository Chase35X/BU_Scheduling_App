

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[name="reservation"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', checkButtonState);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    console.log(localStorage.getItem('email'))
    setDashboard()
});


function checkButtonState() {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[name="reservation"]');
    let isAtLeastOneChecked = false;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            isAtLeastOneChecked = true;
        }
    });

    // Enable or disable the delete button based on the checkbox state
    const deleteButton = document.getElementById('delete-btn');
    deleteButton.disabled = !isAtLeastOneChecked;
}

function deleteSelected() {
    // Logic to delete selected reservations goes here
    console.log("Deleting selected reservations...");
}

async function setDashboard(){
    var emailDisplay = document.getElementById("email-display");

    if (localStorage.getItem('email')) {
        emailDisplay.innerHTML = localStorage.getItem('email');
    } else {
        emailDisplay.innerHTML = "N/A";
    }

    var email = localStorage.getItem('email')

    getUserURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getUser'
    args = '?arg1=' + email
    url = getUserURL + args

    let response = await fetch(url)
        .then(data => {
            return data;
        })           //api for the get request
    
    const user = await response.json() 
    console.log(user)
    console.log(response)

    var numReservations = user.reservation_count
    var locations = user.locations
    var accountType = user.role
    var maxReservations = user.max_reservations

    if (maxReservations==999)
        maxReservations = '∞'

    var reservationDisplay = document.getElementById("reservation-display");
    var locationDisplay = document.getElementById("location-display");
    var accountDisplay = document.getElementById("account-display");
    var maxReserveDisplay = document.getElementById("max-reserve-display");

    reservationDisplay.innerHTML = numReservations
    locationDisplay.innerHTML = locationHelperFunction(locations)
    accountDisplay.innerHTML = accountType
    maxReserveDisplay.innerHTML = maxReservations






}

function locationHelperFunction(locationsList){
    var stringDisplay = ""

    if (locationsList.length == 0){
        return stringDisplay;
    }

    else if (locationsList.length == 1){
        stringDisplay = locationsList[0]
        return stringDisplay;
    }

    else{
        for(var i=0; i<locationsList.length;i++){
            if (i==locationsList.length-1){
                stringDisplay = stringDisplay + locationsList[i]
            }

            else{
                stringDisplay = stringDisplay + locationsList[i] + ", "
            }
        }
    }

    return stringDisplay
}


