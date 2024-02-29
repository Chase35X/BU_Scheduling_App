
var reservationsPresent=0;

addEventListener("DOMContentLoaded", (event) => {

    var hallSelect = document.getElementById("hall-select");
    var timeSelect = document.getElementById("time-select");
    var daySelect = document.getElementById("day-select");


    hallSelect.selectedIndex = 0;
    timeSelect.selectedIndex = 0;
    daySelect.selectedIndex = 0;

    document.getElementById("reservation-boxes").style.display = "none";
    document.getElementById("confirmReservation").style.display = "none";

    var reservationButtons = document.getElementsByClassName("reservation-button");
    for (var i = 0; i < 8; i++) {
        reservationButtons[i].addEventListener("click", selectReservation);
        reservationButtons[i].addEventListener("click", checkForConfirm);
        reservationButtons[i].addEventListener("click", clearRoomSelection);
    }

    // Location dropdown function that puts in the locations that users are able to reserve
    setLocations()

});

function checkInputs() {
    var hallSelect = document.getElementById("hall-select");
    var timeSelect = document.getElementById("time-select");
    var daySelect = document.getElementById("day-select");
  
    if (hallSelect.value !== "selection" && timeSelect.value !== "selection" && daySelect.value !== "selection") {

        var oneHourReservations = get1HourReservations(timeSelect.value, daySelect.value, hallSelect.value)
        var twoHourReservations = get2HourReservations(timeSelect.value, daySelect.value, hallSelect.value)
        var reservationAvailability1 = getReservationAvailability(oneHourReservations, hallSelect.value)
        var reservationAvailability2 = getReservationAvailability(twoHourReservations, hallSelect.value)

        setReservationView(oneHourReservations, reservationAvailability1, twoHourReservations, reservationAvailability2)
        

        document.getElementById("reservation-boxes").style.display = "block";
        document.getElementById("confirmReservation").style.display = "block";
        document.getElementById('room').style.display = "block";
        clearSelection();
    } else {
        document.getElementById("reservation-boxes").style.display = "none";
        document.getElementById("confirmReservation").style.display = "none";
        document.getElementById('room').style.display = "none";
    }
}

function setReservationView(reservationList, reservationAvailability1, reservationList2, reservationAvailability2){
    

    reservationAvailability1.then((value) => {

        if (value.includes(true)) {
            oneHourHTML = ''

            for(var i = 0; i<reservationList.length; i++){

                var reservation_value = idToTime(reservationList[i])
                var button = document.getElementsByClassName('button1-' + i)
                button = button[0]
                button.id = reservationList[i]
                button.innerHTML = reservation_value

                if(value[i] == true){
                    
                }
        
                else{
                    button.classList.add('crossed-out')
                    button.disabled = true
                }
            }

            if (reservationList.length == 2){
                var button = document.getElementsByClassName('button1-' + '2')
                button[0].disabled = true

                button = document.getElementsByClassName('button1-' + '3')
                button[0].disabled = true
            }

            if (reservationList.length == 3){
                var button = document.getElementsByClassName('button1-' + '3')
                button[0].disabled = true
            }
        
            
        }
        
        else{
            document.getElementById("oneHourReservations").innerHTML = '<p>No reservations available around this time.</p>'
        }
    })

     
    reservationAvailability2.then((value2) => {

        if (value2.includes(true)){
            twoHourHTML = ''

            for(var i = 0; i<reservationList2.length; i++){

                var reservation_value = idToTime(reservationList2[i])
                var button = document.getElementsByClassName('button2-' + i)
                button = button[0]
                button.id = reservationList2[i]
                button.innerHTML = reservation_value


                if(value2[i]==true){
                    
                }

                else{
                    button.classList.add('crossed-out')
                    button.disabled = true
                }
            }

            if (reservationList2.length == 2){
                var button = document.getElementsByClassName('button2-' + '2')
                button[0].disabled = true

                button = document.getElementsByClassName('button2-' + '3')
                button[0].disabled = true
            }

            if (reservationList2.length == 3){
                var button = document.getElementsByClassName('button2-' + '3')
                button[0].disabled = true
            }
        }
        
        else{
            document.getElementById("twoHourReservations").innerHTML = '<p>No reservations available around this time.</p>'
        }
    })

    

}

// Do this next, have function call pass location from dropdown, change requests and args for requests
async function getReservationAvailability(reservationList, location){
    var getReservationAvailabilityList = []

    var getReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getReservation'
    var roomList;

    var locationUpper = location.substring(0,1).toUpperCase() + location.substring(1)
    console.log(locationUpper)


    if(location == 'kilachand'){
        roomList = ['910', '911', '912']
    }

    else if(location == 'myles'){
        roomList = []
    }

    else{
        roomList = ['1', '2', '3']
    }

    console.log(reservationList)

    for(var i = 0; i<reservationList.length; i++){

        var reservation_status = false
        var reservationID = reservationList[i]

        for(var k = 0; k<roomList.length; k++){
            var room = roomList[k]

            var args = '?arg1=' + reservationID + "-" + room + '&arg2=' + locationUpper + '&arg3=' + room
            url = getReservationURL + args

            let response = await fetch(url)
                .then(data => {
                    return data;
            })           //api for the get request
            
            var reservation = await response.json() 

            console.log(response)
            console.log(reservation)


            if(reservation.status == true){
                reservation_status = true
                break
            }
        }


        getReservationAvailabilityList.push(reservation_status)
        console.log(getReservationAvailabilityList)
    }

    return getReservationAvailabilityList
}

function get1HourReservations(time, day, hall){

    var day_lower = day.substring(0,1).toLowerCase() + day.substring(1)
    var hall_lower = hall.substring(0,1).toLowerCase() + hall.substring(1)

    if(time == "12:00am")
        return [day_lower + "-12:00am1:00am-" + hall_lower, day_lower + "-1:00am2:00am-" + hall_lower]
    
    if(time == "1:00am")
        return [day_lower + "-12:00am1:00am-" + hall_lower, day_lower + "-1:00am2:00am-" + hall_lower, day_lower + "-2:00am3:00am-" + hall_lower]

    if(time == "12:00pm")
        return [day_lower + "-10:00pm11:00pm-" + hall_lower, day_lower + "-11:00pm12:00pm-" + hall_lower]
        
    if(time == "11:00pm")
        return [day_lower + "-9:00pm10:00pm-" + hall_lower, day_lower + "-10:00pm11:00pm-" + hall_lower, day_lower + "-11:00pm12:00pm-" + hall_lower]


    var reservationsList = [minus1Time(minus1Time(time)), minus1Time(time), add1Time(time), add1Time(add1Time(time))]

    reservationsList[0] = reservationsList[0] + reservationsList[1]
    reservationsList[1] = reservationsList[1] + time
    reservationsList[3] = reservationsList[2] + reservationsList[3]
    reservationsList[2] = time + reservationsList[2]
    

    reservationsList[0] = day_lower + '-' + reservationsList[0] + '-' + hall_lower
    reservationsList[1] = day_lower + '-' + reservationsList[1] + '-' + hall_lower
    reservationsList[2] = day_lower + '-' + reservationsList[2] + '-' + hall_lower
    reservationsList[3] = day_lower + '-' + reservationsList[3] + '-' + hall_lower

    currentDate = new Date(); 
    currentDayOfWeek = currentDate.getDay();


    return reservationsList
}

function get2HourReservations(time, day, hall){

    var day_lower = day.charAt(0).toLowerCase() + day.substring(1)
    var hall_lower = hall.substring(0,1).toLowerCase() + hall.substring(1)

    if (time.length == 6){
        firstNum = time.substring(0,1)
    }

    else{
        firstNum = time.substring(0,2)
    }

    if(parseInt(firstNum) % 2 !== 0){
        time = add1Time(time);
    }

    if(time == "12:00am")
        return [day_lower + "-12:00am2:00am-" + hall_lower, day_lower + "-2:00am4:00am-" + hall_lower]
    
    if(time == "2:00am")
        return [day_lower + "-12:00am2:00am-" + hall_lower, day_lower + "-2:00am4:00am-" + hall_lower, day_lower + "-4:00am6:00am-" + hall_lower]

    if(time == "12:00pm")
        return [day_lower + "-8:00pm10:00pm-" + hall_lower, day_lower + "-10:00pm12:00pm-" + hall_lower]
        
    if(time == "10:00pm")
        return [day_lower + "-6:00pm8:00pm-" + hall_lower, day_lower + "-8:00pm10:00pm-" + hall_lower, day_lower + "-10:00pm12:00pm-" + hall_lower]


    var reservationsList = [minus2Time(minus2Time(time)), minus2Time(time), add2Time(time), add2Time(add2Time(time))]

    reservationsList[0] = reservationsList[0] + reservationsList[1]
    reservationsList[1] = reservationsList[1] + time
    reservationsList[3] = reservationsList[2] + reservationsList[3]
    reservationsList[2] = time + reservationsList[2]
    

    reservationsList[0] = day_lower + '-' + reservationsList[0] + '-' + hall_lower
    reservationsList[1] = day_lower + '-' + reservationsList[1] + '-' + hall_lower
    reservationsList[2] = day_lower + '-' + reservationsList[2] + '-' + hall_lower
    reservationsList[3] = day_lower + '-' + reservationsList[3] + '-' + hall_lower


    return reservationsList
}

function minus1Time(time){
    if(time == "1:00am")
        return "12:00am"
    else if(time == "2:00am")
        return "1:00am"
    else if(time == "3:00am")
        return "2:00am"
    else if(time == "4:00am")
        return "3:00am"
    else if(time == "5:00am")
        return "4:00am"
    else if(time == "6:00am")
        return "5:00am"
    else if(time == "7:00am")
        return "6:00am"
    else if(time == "8:00am")
        return "7:00am"
    else if(time == "9:00am")
        return "8:00am"
    else if(time == "10:00am")
        return "9:00am"
    else if(time == "11:00am")
        return "10:00am"
    else if(time == "12:00pm")
        return "11:00am"
    else if(time == "1:00pm")
        return "12:00pm"
    else if(time == "2:00pm")
        return "1:00pm"
    else if(time == "3:00pm")
        return "2:00pm"
    else if(time == "4:00pm")
        return "3:00pm"
    else if(time == "5:00pm")
        return "4:00pm"
    else if(time == "6:00pm")
        return "5:00pm"
    else if(time == "7:00pm")
        return "6:00pm"
    else if(time == "8:00pm")
        return "7:00pm"
    else if(time == "9:00pm")
        return "8:00pm"
    else if(time == "10:00pm")
        return "9:00pm"
    else if(time == "11:00pm")
        return "10:00pm"
    else if(time == "12:00pm")
        return "11:00pm"

}

function add1Time(time){
    if(time == "12:00am")
        return "1:00am"
    else if(time == "1:00am")
        return "2:00am"
    else if(time == "2:00am")
        return "3:00am"
    else if(time == "3:00am")
        return "4:00am"
    else if(time == "4:00am")
        return "5:00am"
    else if(time == "5:00am")
        return "6:00am"
    else if(time == "6:00am")
        return "7:00am"
    else if(time == "7:00am")
        return "8:00am"
    else if(time == "8:00am")
        return "9:00am"
    else if(time == "9:00am")
        return "10:00am"
    else if(time == "10:00am")
        return "11:00am"
    else if(time == "11:00am")
        return "12:00pm"
    else if(time == "12:00pm")
        return "1:00pm"
    else if(time == "1:00pm")
        return "2:00pm"
    else if(time == "2:00pm")
        return "3:00pm"
    else if(time == "3:00pm")
        return "4:00pm"
    else if(time == "4:00pm")
        return "5:00pm"
    else if(time == "5:00pm")
        return "6:00pm"
    else if(time == "6:00pm")
        return "7:00pm"
    else if(time == "7:00pm")
        return "8:00pm"
    else if(time == "8:00pm")
        return "9:00pm"
    else if(time == "9:00pm")
        return "10:00pm"
    else if(time == "10:00pm")
        return "11:00pm"
    else if(time == "11:00pm")
        return "12:00pm"

}

function minus2Time(time){
    if(time == "2:00am")
        return "12:00am"
    else if(time == "3:00am")
        return "1:00am"
    else if(time == "4:00am")
        return "2:00am"
    else if(time == "5:00am")
        return "3:00am"
    else if(time == "6:00am")
        return "4:00am"
    else if(time == "7:00am")
        return "5:00am"
    else if(time == "8:00am")
        return "6:00am"
    else if(time == "9:00am")
        return "7:00am"
    else if(time == "10:00am")
        return "8:00am"
    else if(time == "11:00am")
        return "9:00am"
    else if(time == "12:00pm")
        return "10:00am"
    else if(time == "1:00pm")
        return "11:00am"
    else if(time == "2:00pm")
        return "12:00pm"
    else if(time == "3:00pm")
        return "1:00pm"
    else if(time == "4:00pm")
        return "2:00pm"
    else if(time == "5:00pm")
        return "3:00pm"
    else if(time == "6:00pm")
        return "4:00pm"
    else if(time == "7:00pm")
        return "5:00pm"
    else if(time == "8:00pm")
        return "6:00pm"
    else if(time == "9:00pm")
        return "7:00pm"
    else if(time == "10:00pm")
        return "8:00pm"
    else if(time == "11:00pm")
        return "9:00pm"
    else if(time == "12:00pm")
        return "10:00pm"
}

function add2Time(time){
    if(time == "12:00am")
        return "2:00am"
    else if(time == "1:00am")
        return "3:00am"
    else if(time == "2:00am")
        return "4:00am"
    else if(time == "3:00am")
        return "5:00am"
    else if(time == "4:00am")
        return "6:00am"
    else if(time == "5:00am")
        return "7:00am"
    else if(time == "6:00am")
        return "8:00am"
    else if(time == "7:00am")
        return "9:00am"
    else if(time == "8:00am")
        return "10:00am"
    else if(time == "9:00am")
        return "11:00am"
    else if(time == "10:00am")
        return "12:00pm"
    else if(time == "11:00am")
        return "1:00pm"
    else if(time == "12:00pm")
        return "2:00pm"
    else if(time == "1:00pm")
        return "3:00pm"
    else if(time == "2:00pm")
        return "4:00pm"
    else if(time == "3:00pm")
        return "5:00pm"
    else if(time == "4:00pm")
        return "6:00pm"
    else if(time == "5:00pm")
        return "7:00pm"
    else if(time == "6:00pm")
        return "8:00pm"
    else if(time == "7:00pm")
        return "9:00pm"
    else if(time == "8:00pm")
        return "10:00pm"
    else if(time == "9:00pm")
        return "11:00pm"
    else if(time == "10:00pm")
        return "12:00pm"
}

function idToTime(reservation_id){
    var split_list = reservation_id.split('-')

    var reservation_day = split_list[0];
    reservation_day = reservation_day.charAt(0).toUpperCase() + reservation_day.substring(1)

    var time = split_list[1]

    var reservation_time

    console.log(split_list)

    if ((time.includes('am')) && !(time.includes('pm'))) {
        var split_list2 = time.split('am')
        reservation_time = split_list2[0] + 'am <br> - <br>' + split_list2[1] + 'am'
    }

    else if ((time.includes('pm')) && !(time.includes('am'))) {
        var split_list2 = time.split('pm')
        reservation_time = split_list2[0] + 'pm <br> - <br>' + split_list2[1] + 'pm'
    }

    else{
        var split_list2 = time.split('am')
        reservation_time = split_list2[0] + 'am <br> - <br>' + split_list2[1]
    }

    console.log(split_list2)
    console.log(reservation_day, ' | ', reservation_time)

    var reservationItem = reservation_day + ', ' + reservation_time

    return reservation_time
}

function clearSelection(event) {

    // Remove the "selected" class from all buttons
    var buttons = document.getElementsByClassName("reservation-button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("selected");
    }

}

function clearCrossedOut(){
    // Remove the "crossed-out" class from all buttons
    var buttons = document.getElementsByClassName("reservation-button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("crossed-out");
      buttons[i].disabled = false;
    }
}

async function clearRoomSelection(){
    // Select the dropdown element

    var dropdown = document.getElementById("room-select");

    var location = document.getElementById("hall-select").value;

    var locationUpper = location.substring(0,1).toUpperCase() + location.substring(1)

    var getReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getReservation'

    var roomList;

    if(location == 'kilachand'){
        roomList = ['910', '911', '912']
    }

    else if(location == 'myles'){
        roomList = []
    }

    else{
        roomList = ['1', '2', '3']
    }

    // Clear existing options

    dropdown.innerHTML = "";

    var newHTML = '<option selected value="selection">Select a room...</option>'

    var reservationID = ''
    var reservationButtons = document.getElementsByClassName("reservation-button");
    for (var i = 0; i < 8; i++) {
        if (reservationButtons[i].classList.contains('selected')){
            reservationID = reservationButtons[i].id
            break
        }
    }

    if (reservationID == ''){
        dropdown.innerHTML = newHTML
    }

    else{

        for(var r = 0; r<roomList.length; r++){
            var args = '?arg1=' + reservationID + '-' + roomList[r] + '&arg2=' + locationUpper + '&arg3=' + roomList[r]
            url = getReservationURL + args

            let response = await fetch(url)
                .then(data => {
                    return data;
            })           //api for the get request
            
            var reservation = await response.json() 

            console.log(reservation)
            console.log(response)

            if (reservation.status == true){
                newHTML += '<option value="' + roomList[r] + '">' + roomList[r] + '</option>'
            }
        }

        dropdown.innerHTML = newHTML

    
    }

}

// Get the confirm reservation button and terms and conditions checkbox elements
const confirmReservationButton = document.getElementById("confirm-reservation");
const termsConditionsCheckbox = document.getElementById("terms-conditions");
const roomSelection = document.getElementById("room-select").value;



// Add an event listener to the confirm reservation button
confirmReservationButton.addEventListener("click", () => {
  // Handle the confirm reservation button click event
  // You can add your own logic here, such as sending a request to the server to confirm the reservation
    setReservation()
});

async function setReservation(){

    var confirmButton = document.getElementById('confirm-reservation')
    confirmButton.disabled = true



    var reservationID = ''
    var room = ''
    var location = document.getElementById('hall-select').value
    var locationUpper = location.substring(0,1).toUpperCase() + location.substring(1)

    room = document.getElementById('room-select').value

    var reservationButtons = document.getElementsByClassName("reservation-button");
    for (var i = 0; i < 8; i++) {
        if (reservationButtons[i].classList.contains('selected')){
            reservationID = reservationButtons[i].id
            break
        }
    }

    if (localStorage.getItem('email')) {
        var email = localStorage.getItem('email')
    } else {
        var email = document.cookie
        console.log(email)
        email = email.substring(9)
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

    var maxReservations = user.max_reservations
    var reservationList = user.current_reservations

    if(reservationID == '...'){
        sendError('...')
    }

    else if(reservationList.length >= maxReservations){
        sendError('max_res')
    }

    else{
        var getReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getReservation'

        var args = '?arg1=' + reservationID + '-' + room + '&arg2=' + locationUpper + '&arg3=' + room
        url = getReservationURL + args

        let response = await fetch(url)
            .then(data => {
                return data;
            })           //api for the get request
        
        var reservation = await response.json() 

        if(reservation.status == false){
            window.location.href = '/BU_Scheduling_App/error_page'
        }

        else{
            var overlayList = reservation.overlap


            var setReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/setReservation'

            if (localStorage.getItem('email')) {
                var email = localStorage.getItem('email')
            } else {
                var email = document.cookie
                email = email.substring(9)
            }

            var args = '?arg1=' + email + '&arg2=' + reservationID + '&arg3=' + overlayList[0]
        
            if(overlayList[1] != ''){
                args += '&arg4=' + overlayList[1]
            }

            args += '&arg5=' + locationUpper + '&arg6=' + room
        
            var url = setReservationURL + args

            const options = {
                method: 'PUT'
            };
        
            let set_response = await fetch(url, options)
                .then(data => {
                    return data;
            })           //api for the get request
            

            const set_return = await set_response.json()
            console.log(set_return)


            if (set_return.status == 200)
                window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'

            else
                sendError('misc')
        }
    }
    
}

function sendError(error){
    var reservationButton = document.getElementById("confirm-reservation")
    var reservationError = document.getElementById("reservationError")

    if(error == 'misc'){
        reservationError.innerHTML = "An error occurred while trying to make your reservation."
    }

    else if(error == '...'){
        reservationError.innerHTML = "Hollup. Restart the app or get a stable connection before making a reservation."
    }

    else if(error == 'max_res'){
        reservationError.innerHTML = "You are at the maximum number of reservations you can reserve." 
    }


    reservationButton.style.borderColor = 'black'
    reservationError.style.display = 'block'

    setTimeout(function() {
        reservationButton.style.borderColor = 'red';
        reservationError.style.display = 'none';
    }, 5000);
}

function checkForConfirm(){
    var reservationSelected = false

    var buttons = document.getElementsByClassName("reservation-button");

    for (var i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains("selected")){
            reservationSelected=true
        }
    }

    var checkboxSelected = termsConditionsCheckbox.checked
    var roomDropdown = document.getElementById("room-select")
    console.log(roomDropdown)
    var roomSelected = false

    let selecetedIndex = roomDropdown.selectedIndex;
    console.log("Selected index is: " + selecetedIndex);
    let selectedOption = roomDropdown.options[selecetedIndex];
    console.log("Selected option is: " + selectedOption.outerHTML);
    console.log("Selected value is: " + selectedOption.value);
    console.log("Selected text is: " + selectedOption.text);

    if(selecetedIndex != 0){
        roomSelected = true
    }
    

    if(reservationSelected && checkboxSelected && roomSelected){
        confirmReservationButton.disabled = false
        confirmReservationButton.style.opacity = 1
    }

    else{
        confirmReservationButton.disabled = true
        confirmReservationButton.style.opacity = 0.5
    }
}

function selectReservation(event) {

    console.log("click res")

    event.preventDefault(); // Prevent the default behavior

    // Remove the "selected" class from all buttons
    var buttons = document.getElementsByClassName("reservation-button");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] !== event.target)
            buttons[i].classList.remove("selected");
    }

  
    // Toggle the "selected" class on the clicked button
    event.target.classList.toggle("selected");

    var reservationSelected = false;
    if (event.target.classList.contains("selected")) {
        reservationSelected = true;
    }

    termsConditionsCheckbox.checked = false

    // Select the confirm reservation button and terms and conditions checkbox
    confirmReservationButton.disabled = !termsConditionsCheckbox.checked || !reservationSelected;

    if(confirmReservationButton.disabled){
        confirmReservationButton.style.opacity = 0.5
    }

    else{
        confirmReservationButton.style.opacity = 1
    }
}

function clearButtonLabels(){
    var buttons = document.getElementsByClassName("reservation-button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].id = ''
      buttons[i].innerHTML = '...'
    }
}

var user;
async function setLocations(){
    if (localStorage.getItem('email')) {
        var email = localStorage.getItem('email')
    } else {
        var email = document.cookie
        email = email.substring(9)
    }

    getUserURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getUser'
    args = '?arg1=' + email
    url = getUserURL + args

    let response = await fetch(url)
        .then(data => {
            return data;
        })           //api for the get request
    
    user = await response.json();

    var locationHTML = '<option selected value="selection">Select a residance hall...</option>'

    var locationsList = user.locations

    for(var i = 0; i<locationsList.length; i++){
        var location = locationsList[i];

        var locationValue;

        if(location == 'Kilachand Hall'){
            locationValue = 'kilachand'
        }

        else if(location == 'Myles Hall'){
            locationValue = 'myles'
        }

        else{
            locationValue = 'test'
        }

        var locationString = '<option value="' + locationValue + '">' + location + '</option>'
        locationHTML += locationString
    }
    
    document.getElementById('hall-select').innerHTML = locationHTML
}

// When the user clicks on <div>, open the popup
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

termsConditionsCheckbox.addEventListener("change", () => {
    checkForConfirm()
});

var timeSelect = document.getElementById('time-select')
var hallSelect = document.getElementById('hall-select')
var daySelect = document.getElementById('day-select')
var roomSelect = document.getElementById('room-select')

timeSelect.addEventListener("change", () => {
    termsConditionsCheckbox.checked = false
    clearSelection()
    clearCrossedOut()
    checkForConfirm()
    clearButtonLabels()
});

hallSelect.addEventListener("change", () => {
    termsConditionsCheckbox.checked = false
    clearSelection()
    clearCrossedOut()
    checkForConfirm()
    clearButtonLabels()
});

daySelect.addEventListener("change", () => {
    termsConditionsCheckbox.checked = false
    clearSelection()
    clearCrossedOut()
    checkForConfirm()
    clearButtonLabels()
});

roomSelect.addEventListener("change", () => {
    termsConditionsCheckbox.checked = false
    checkForConfirm()
});





