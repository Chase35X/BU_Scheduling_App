
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
    }

});

function checkInputs() {
    var hallSelect = document.getElementById("hall-select");
    var timeSelect = document.getElementById("time-select");
    var daySelect = document.getElementById("day-select");
  
    if (hallSelect.value !== "selection" && timeSelect.value !== "selection" && daySelect.value !== "selection") {

        var oneHourReservations = get1HourReservations(timeSelect.value, daySelect.value)
        var twoHourReservations = get2HourReservations(timeSelect.value, daySelect.value)
        var reservationAvailability1 = getReservationAvailability(oneHourReservations)
        var reservationAvailability2 = getReservationAvailability(twoHourReservations)

        setReservationView(oneHourReservations, reservationAvailability1, twoHourReservations, reservationAvailability2)
        

        document.getElementById("reservation-boxes").style.display = "block";
        document.getElementById("confirmReservation").style.display = "block";
        clearSelection();
    } else {
        document.getElementById("reservation-boxes").style.display = "none";
        document.getElementById("confirmReservation").style.display = "none";
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
        }
        
        else{
            document.getElementById("twoHourReservations").innerHTML = '<p>No reservations available around this time.</p>'
        }
    })

    

}

async function getReservationAvailability(reservationList){
    var getReservationAvailability = []
    getReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getReservation'


    for(var i = 0; i<reservationList.length; i++){
        args = '?arg1=' + reservationList[i]
        url = getReservationURL + args

        let response = await fetch(url)
            .then(data => {
                return data;
            })           //api for the get request
        
        const reservation = await response.json() 


        getReservationAvailability.push(reservation.status)
    }

    return getReservationAvailability
}

function get1HourReservations(time, day){

    var day_lower = day.substring(0,1).toLowerCase() + day.substring(1)

    if(time == "12:00am")
        return [day_lower + "-12:00am1:00am", day_lower + "-1:00am2:00am"]
    
    if(time == "1:00am")
        return [day_lower + "-12:00am1:00am", day_lower + "-1:00am2:00am", day_lower + "-2:00am3:00am"]

    if(time == "12:00pm")
        return [day_lower + "-10:00pm11:00pm", day_lower + "-11:00pm12:00pm"]
        
    if(time == "11:00pm")
        return [day_lower + "-9:00pm10:00pm", day_lower + "-10:00pm11:00pm", day_lower + "-11:00pm12:00pm"]


    var reservationsList = [minus1Time(minus1Time(time)), minus1Time(time), add1Time(time), add1Time(add1Time(time))]

    reservationsList[0] = reservationsList[0] + reservationsList[1]
    reservationsList[1] = reservationsList[1] + time
    reservationsList[3] = reservationsList[2] + reservationsList[3]
    reservationsList[2] = time + reservationsList[2]
    

    reservationsList[0] = day_lower + '-' + reservationsList[0]
    reservationsList[1] = day_lower + '-' + reservationsList[1]
    reservationsList[2] = day_lower + '-' + reservationsList[2]
    reservationsList[3] = day_lower + '-' + reservationsList[3]

    currentDate = new Date(); 
    currentDayOfWeek = currentDate.getDay();


    return reservationsList
}

function get2HourReservations(time, day){

    var day_lower = day.charAt(0).toLowerCase() + day.substring(1)

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
        return [day_lower + "-12:00am2:00am", day_lower + "-2:00am4:00am"]
    
    if(time == "2:00am")
        return [day_lower + "-12:00am2:00am", day_lower + "-2:00am4:00am", day_lower + "-4:00am6:00am"]

    if(time == "12:00pm")
        return [day_lower + "-8:00pm10:00pm", day_lower + "-10:00pm12:00pm"]
        
    if(time == "10:00pm")
        return [day_lower + "-6:00pm8:00pm", day_lower + "-8:00pm10:00pm", day_lower + "-10:00pm12:00pm"]


    var reservationsList = [minus2Time(minus2Time(time)), minus2Time(time), add2Time(time), add2Time(add2Time(time))]

    reservationsList[0] = reservationsList[0] + reservationsList[1]
    reservationsList[1] = reservationsList[1] + time
    reservationsList[3] = reservationsList[2] + reservationsList[3]
    reservationsList[2] = time + reservationsList[2]
    

    reservationsList[0] = day_lower + '-' + reservationsList[0]
    reservationsList[1] = day_lower + '-' + reservationsList[1]
    reservationsList[2] = day_lower + '-' + reservationsList[2]
    reservationsList[3] = day_lower + '-' + reservationsList[3]


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

    return time;

    // var reservation_time

    // console.log(split_list)

    // if ((time.includes('am')) && !(time.includes('pm'))) {
    //     var split_list2 = time.split('am')
    //     reservation_time = split_list2[0] + 'am - ' + split_list2[1] + 'am'
    // }

    // else if ((time.includes('pm')) && !(time.includes('am'))) {
    //     var split_list2 = time.split('pm')
    //     reservation_time = split_list2[0] + 'pm - ' + split_list2[1] + 'pm'
    // }

    // else{
    //     var split_list2 = time.split('am')
    //     reservation_time = split_list2[0] + 'am - ' + split_list2[1]
    // }

    // console.log(split_list2)
    // console.log(reservation_day, ' | ', reservation_time)

    // var reservationItem = reservation_day + ', ' + reservation_time

    // return reservationItem
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

// Get the confirm reservation button and terms and conditions checkbox elements
const confirmReservationButton = document.getElementById("confirm-reservation");
const termsConditionsCheckbox = document.getElementById("terms-conditions");



// Add an event listener to the confirm reservation button
confirmReservationButton.addEventListener("click", () => {
  // Handle the confirm reservation button click event
  // You can add your own logic here, such as sending a request to the server to confirm the reservation
    setReservation()
});

async function setReservation(){
    var reservationID = ''

    var reservationButtons = document.getElementsByClassName("reservation-button");
    for (var i = 0; i < 8; i++) {
        if (reservationButtons[i].classList.contains('selected')){
            reservationID = reservationButtons[i].id
            break
        }
    }

    var getReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getReservation'

    var args = '?arg1=' + reservationID
    url = getReservationURL + args

    let response = await fetch(url)
        .then(data => {
            return data;
        })           //api for the get request
    
    const reservation = await response.json() 

    if(reservation.status == false){
        window.location.href = '/BU_Scheduling_App/error_page'
    }

    else{
        var overlayList = reservation.overlap


        var setReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/setReservation'
        var args = '?arg1=' + localStorage.getItem('email') + '&arg2=' + reservationID + '&arg3=' + overlayList[0]
    
        if(overlayList[1] != ''){
            args += '&arg4=' + overlayList[1]
        }
    
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

        

        window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    }
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

    if(reservationSelected && checkboxSelected){
        confirmReservationButton.disabled = false
        confirmReservationButton.style.opacity = 1
    }

    else{
        confirmReservationButton.disabled = true
        confirmReservationButton.style.opacity = 0.5
    }
}

function selectReservation(event) {

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

termsConditionsCheckbox.addEventListener("change", () => {
    checkForConfirm()
});

var timeSelect = document.getElementById('time-select')
var hallSelect = document.getElementById('hall-select')
var daySelect = document.getElementById('day-select')

timeSelect.addEventListener("change", () => {
    termsConditionsCheckbox.checked = false
    clearSelection()
    clearCrossedOut()
    checkForConfirm()
});

hallSelect.addEventListener("change", () => {
    termsConditionsCheckbox.checked = false
    clearSelection()
    clearCrossedOut()
    checkForConfirm()
});

daySelect.addEventListener("change", () => {
    termsConditionsCheckbox.checked = false
    clearSelection()
    clearCrossedOut()
    checkForConfirm()
});



