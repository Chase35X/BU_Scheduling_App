

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

async function deleteSelected() {
    // Logic to delete selected reservations goes here
    console.log("Deleting selected reservations...");

    // Get all checkboxes
    var checkboxes = document.getElementsByName('reservation');
            
    // Filter checked checkboxes
    var checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    
    // Extract values from checked checkboxes
    var checkedValues = checkedCheckboxes.map(checkbox => checkbox.value);

    console.log(checkedValues)

    if (localStorage.getItem('email')) {
        var email = localStorage.getItem('email')
    } else {
        var email = document.cookie
        console.log(email)
        email = email.substring(9)
    }

    for (var i = 0; i<checkedValues.length; i++){
        var reservation_id = checkedValues[i]

        var getReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getReservation'

        var reservationID_list = reservation_id.split('-')
        var room = reservationID_list[3]

        args = '?arg1=' + reservation_id + '&arg2=Kilachand' + '&arg3=' + room
        url = getReservationURL + args
        
        let response = await fetch(url)
            .then(data => {
                return data;
            })           //api for the get request
        
        const reservation = await response.json() 

        var removeReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/removeReservation'
        var args = '?arg1=' + email + '&arg2=' + reservation_id

        // Find the 1 or 2 Overlays

        // If reservation is 1 hour long
        if (reservation.length == 1){
            args += '&arg3=' + reservation.overlap[0]
        }

        // If reservation is 2 hours long
        else{
            args += '&arg3=' + reservation.overlap[0] + '&arg4=' + reservation.overlap[1]
        }

        args += '&arg5=Kilachand' + '&arg6=' + room


        url = removeReservationURL + args;
    
        const options = {
            method: 'PUT'
        };
    
        await fetch(url, options)
            .then(response => {
            // Handle the response
            })
            .catch(error => {
            // Handle the error
        });

        
    }

    location.reload()
}

async function setDashboard(){
    var emailDisplay = document.getElementById("email-display");

    if (localStorage.getItem('email')) {
        emailDisplay.innerHTML = localStorage.getItem('email');
        var email = localStorage.getItem('email')
    } else {
        var email = document.cookie
        console.log(email)
        email = email.substring(9)
        emailDisplay.innerHTML = email;
    }

    

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
    var reservationList = user.current_reservations

    if (maxReservations==999)
        maxReservations = '∞'

    var reservationDisplay = document.getElementById("reservation-display");
    var locationDisplay = document.getElementById("location-display");
    var accountDisplay = document.getElementById("account-display");
    var maxReserveDisplay = document.getElementById("max-reserve-display");
    var reservationListDisplay = document.getElementById("reservation-list-container")

    reservationDisplay.innerHTML = numReservations
    locationDisplay.innerHTML = locationHelperFunction(locations)
    accountDisplay.innerHTML = accountType
    maxReserveDisplay.innerHTML = maxReservations
    reservationListDisplay.innerHTML = reservationHelperFunction(reservationList)






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


function reservationHelperFunction(reservationList){
    var reservationHTML = ''

    if (reservationList.length == 0) {
        reservationHTML = '<p>No reservations made.</p><div class="container"><div class="row"><div class="col times"><a class="d-flex justify-content-center" href="/BU_Scheduling_App/schedule_page"><button class="buttonError" style="vertical-align:middle"><span>Schedule Page</span></button></a></div></div></div>'
    }

    else{

        var reservations = ''

        for (var i = 1; i<=reservationList.length; i++){
            var split_list = reservationList[i-1].split('-')

            var reservation_day = split_list[0];
            reservation_day = reservation_day.charAt(0).toUpperCase() + reservation_day.substring(1)

            var time = split_list[1]
            var reservation_time

            if ((time.includes('am')) && !(time.includes('pm'))) {
                var split_list2 = time.split('am')
                reservation_time = split_list2[0] + 'am - ' + split_list2[1] + 'am'
            }

            else if ((time.includes('pm')) && !(time.includes('am'))) {
                var split_list2 = time.split('pm')
                reservation_time = split_list2[0] + 'pm - ' + split_list2[1] + 'pm'
            }

            else{
                var split_list2 = time.split('am')
                reservation_time = split_list2[0] + 'am - ' + split_list2[1] + 'pm'
            }

            var reservation_location = split_list[2]
            var reservation_room = split_list[3]

            console.log(split_list)

            var reservationItem = reservation_location + ' Room ' + reservation_room + ' - ' + reservation_day + ', ' + reservation_time
            reservations += '<li><input type="checkbox" name="reservation" value="' + reservationList[i-1] + '" onchange="checkButtonState()">   ' + reservationItem + '</li>'
        }

        reservationHTML = '<ul id="reservations-list">' + reservations + '</ul><!-- Delete button to remove selected reservations --><button id="delete-btn" onclick="deleteSelected()" disabled>Delete Selected</button>'
    }

    return reservationHTML;
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function logout(){
    localStorage.removeItem("email");
    document.cookie = "username"+'=; Max-Age=-99999999;'; 
    window.location.href = '/BU_Scheduling_App/login_page/index.html'
}

var logoutButton = document.getElementById('logout-btn')
logoutButton.addEventListener('click', logout);

