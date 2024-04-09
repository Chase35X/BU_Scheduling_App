

document.addEventListener('DOMContentLoaded', function() {

    if (localStorage.getItem('email')) {
        setAdmin()
    }

    else if(document.cookie != ''){
        console.log(document.cookie)

        cookie = document.cookie

        email_list = cookie.split('=')

        email = email_list[1]

        console.log(email)

        setAdmin()
    }

    else{
        window.location.href = '/BU_Scheduling_App/login_page/index.html'
    }


    const checkboxes = document.querySelectorAll('input[name="reservation"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', checkButtonState);
    });
});

function checkButtonState(){
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
        var location_res = reservationID_list[2]
        location_res = location_res.substring(0,1).toUpperCase() + location_res.substring(1)

        var args = '?arg1=' + reservation_id + '&arg2=' + location_res + '&arg3=' + room
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

        args += '&arg5=' + location_res + '&arg6=' + room


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


async function setAdmin(){

    var emailDisplay = document.getElementById("email-display");

    if (localStorage.getItem('email')) {
        var email = localStorage.getItem('email')
    } else {
        var email = document.cookie
        email = email.substring(9)
    }

    emailDisplay.innerHTML = email

    getUserURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getUser'
    args = '?arg1=' + email
    url = getUserURL + args

    let response = await fetch(url)
        .then(data => {
            return data;
    })           //api for the get request
    
    const user = await response.json() 
    var accountType = user.role

    if(accountType != "admin" && accountType != "founder"){
        window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    }

    // var adminPW = localStorage.getItem('password')

    // if(adminPW != "chaselenhart123"){
    //     window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    // }

    var numReservations = user.reservation_count
    var locations = user.locations
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

    setAllReservations()
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

            var reservationItem = reservation_location + ' Room ' + reservation_room + ' - ' + reservation_day + ', ' + reservation_time
            reservations += '<li><input type="checkbox" name="reservation" value="' + reservationList[i-1] + '" onchange="checkButtonState()">   ' + reservationItem + '</li>'
        }

        reservationHTML = '<ul id="reservations-list">' + reservations + '</ul><!-- Delete button to remove selected reservations --><button id="delete-btn" onclick="deleteSelected()" disabled>Delete Selected</button>'
    }

    return reservationHTML;
}





async function setAllReservations(){
    var allDataURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/allData'
    url = allDataURL

    let response = await fetch(url)
        .then(data => {
            return data;
    })           //api for the get request
    
    const allData = await response.json() 

    const users = allData.user_doc
    const kilachand_910 = allData.reservation_documents_kilachand_910
    const kilachand_911 = allData.reservation_documents_kilachand_911
    const kilachand_912 = allData.reservation_documents_kilachand_912

    var allLocations = [kilachand_910, kilachand_911, kilachand_912]
    var allReservationHTML = ''

    var anyReservation = false;

    for (var l = 0; l < allLocations.length; l++){

        var location = allLocations[l]

        for(var i = 0; i < location.length; i++){
            var reservationDocument = location[i];
            var user_email = reservationDocument.user_email;
            var reservationID = reservationDocument.reservation_id;

            var datetime = reservationID.split('-')
            datetime = datetime[0] + ", " + datetime[1]

            if((reservationDocument.status == false) && (user_email != 'overlay')){
                allReservationHTML += '<div class="col-12 allReservation"><div class="leftSide col-6"><div class="email col-12">Email: <span>' + user_email + '</span></div><div class="col-12 linebreak">---</div><div class="reservationID col-12">Reservation ID: <span>' + reservationID + '</span></div><div class="col-12 linebreak">---</div><div class="datetime_created col-12">Date & Time: <span>' + datetime + '</span></div></div><div class="rightSide col-6"><button class="allReservationButton col-12 cancelAllButton" value="' + reservationID + '">Cancel reservation</button></div></div>'
                anyReservation = true;
            }
        }
    }  

    var reservationAllList = document.getElementById('all-reservation-list-container')

    if(anyReservation){
        reservationAllList.innerHTML = allReservationHTML;
    }

    else{
        reservationAllList.innerHTML = '<p>No reservations found in system.</p>';
    }

    var cancelButtons = document.getElementsByClassName('cancelAllButton')

    for(var b = 0;  b < cancelButtons.length; b++){
        var button =  cancelButtons[b];

        button.addEventListener('click', remove_all_reservation)
    }


}

async function email_filter(){
    var email = document.getElementById('email-input').value

    if(email == ''){
        sendFilterError('noInput')
    }

    else{
        getUserURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getUser'
        args = '?arg1=' + email
        url = getUserURL + args

        let response = await fetch(url)
            .then(data => {
                return data;
        })           //api for the get request
        
        const user = await response.json() 
        

        if(user == null){
            sendFilterError('noEmailFound')
        }

        else{
            var user_email = user.email;
            var reservationList = user.current_reservations

            allReservationHTML = ''

            if(reservationList.length == 0){
                allReservationHTML = '<p>This user has no reservations made.</p>'
            }

            else{
                for(var i = 0; i < reservationList.length; i++){
                    var reservationDocument = reservationList[i]
                    var reservationID = reservationDocument
                    var datetime = reservationID.split('-')
                    datetime = datetime[0] + ", " + datetime[1]

                    allReservationHTML += '<div class="col-12 allReservation"><div class="leftSide col-6"><div class="email col-12">Email: <span>' + user_email + '</span></div><div class="col-12 linebreak">---</div><div class="reservationID col-12">Reservation ID: <span>' + reservationID + '</span></div><div class="col-12 linebreak">---</div><div class="datetime_created col-12">Date & Time: <span>' + datetime + '</span></div></div><div class="rightSide col-6"><button class="allReservationButton col-12 cancelAllButton" value="' + reservationID + '">Cancel reservation</button></div></div>'
                }
            }

            var reservationAllList = document.getElementById('all-reservation-list-container')
            reservationAllList.innerHTML = allReservationHTML;
        }

        var cancelButtons = document.getElementsByClassName('cancelAllButton')

        for(var b = 0;  b < cancelButtons.length; b++){
            var button =  cancelButtons[b];

            button.addEventListener('click', remove_all_reservation)
        }
    }
}

async function remove_all_reservation(){
    
    if (localStorage.getItem('email')) {
        var email = localStorage.getItem('email')
    } else {
        var email = document.cookie
        console.log(email)
        email = email.substring(9)
    }

    var reservation_id = this.value;
    console.log(reservation_id)

    var getReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getReservation'

    var reservationID_list = reservation_id.split('-')
    var room = reservationID_list[3]
    var location_res = reservationID_list[2]
    location_res = location_res.substring(0,1).toUpperCase() + location_res.substring(1)

    var args = '?arg1=' + reservation_id + '&arg2=' + location_res + '&arg3=' + room
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

    args += '&arg5=' + location_res + '&arg6=' + room


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

    location.reload()

        
}




function sendFilterError(error){

    var email_input = document.getElementById('email-input')
    var reservationAllList = document.getElementById('all-reservation-list-container')

    if(error == 'noInput'){
        email_input.innerHTML = 'Please enter an email address.'
    }

    else if(error == 'noEmailFound'){
        email_input.value = ''
        reservationAllList.innerHTML = '<p>No user found.</p>'
    }

    email_input.style.borderColor = 'red'
    email_input.style.color = 'red'

    setTimeout(function() {
        email_input.style.borderColor = 'black';
        email_input.style.color = 'black';
        email_input.innerHTML = ""
    }, 5000);
}

function logout(){
    localStorage.removeItem("email");
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/BU_Scheduling_App/login_page/index.html'
}

var logoutButton = document.getElementById('logout-btn')
logoutButton.addEventListener('click', logout);

var emailInputButtom = document.getElementById('searchButton')
emailInputButtom.addEventListener('click', email_filter)

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
