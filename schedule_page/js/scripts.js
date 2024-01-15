
var reservationsPresent=0;

addEventListener("DOMContentLoaded", (event) => {
    var hallSelect = document.getElementById("hall-select");
    var timeSelect = document.getElementById("time-select");
    var daySelect = document.getElementById("day-select");


    hallSelect.selectedIndex = 0;
    timeSelect.selectedIndex = 0;
    daySelect.selectedIndex = 0;

    

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

        var reservationButtons = document.getElementsByClassName("reservation-button");
        console.log(reservationButtons)
        console.log(reservationButtons.length)
        console.log(reservationsPresent)
        for (var i = 0; i < reservationsPresent; i++) {
            console.log('test')
            reservationButtons[i].addEventListener("click", selectReservation);
        }

        function selectReservation(event) {

            event.preventDefault(); // Prevent the default behavior
        
            // Remove the "selected" class from all buttons
            var buttons = document.getElementsByClassName("reservation-button");
            for (var i = 0; i < buttons.length; i++) {
              buttons[i].classList.remove("selected");
            }
        
            console.log('here')
          
            // Add the "selected" class to the clicked button
            event.target.classList.add("selected");
        }
        

        document.getElementById("reservation-boxes").style.display = "block";
    } else {
        document.getElementById("reservation-boxes").style.display = "none";
    }
}

function setReservationView(reservationList, reservationAvailability1, reservationList2, reservationAvailability2){

    console.log(reservationAvailability1)

    

    reservationAvailability1.then((value) => {

        if (value.includes(true)) {
            console.log(value)
            oneHourHTML = ''

            for(var i = 0; i<reservationList.length; i++){
                console.log(i)
                console.log(value[i])
                if(value[i] == true){
                    oneHourHTML += '<div class="col-3"><button type="button" id="' + idToNiceDate(reservationList[i]) + '" class="reservation-button"><span>' + idToNiceDate(reservationList[i]) + '</span></button></div>'
                    reservationsPresent+=1;
                }
        
                else{
                    oneHourHTML += '<div class="col-3"><button type="button" id="' + idToNiceDate(reservationList[i]) + '" class="crossed-out" disabled><span>' + idToNiceDate(reservationList[i]) + '</span></button></div>'
                }
            }
        
            document.getElementById("oneHourReservations").innerHTML = oneHourHTML
        }
        
        else{
            document.getElementById("oneHourReservations").innerHTML = '<p>No reservations available around this time.</p>'
        }
    })

     
    reservationAvailability2.then((value2) => {

        if (value2.includes(true)){
            twoHourHTML = ''

            for(var i = 0; i<reservationList2.length; i++){
                console.log(i)
                console.log(value2[i])
                if(value2[i]==true){
                    twoHourHTML += '<div class="col-3"><button type="button" id="' + idToNiceDate(reservationList2[i]) + '" class="reservation-button"><span>' + idToNiceDate(reservationList2[i]) + '</span></button></div>'
                    reservationsPresent+=1;
                }

                else{
                    twoHourHTML += '<div class="col-3"><button type="button" id="' + idToNiceDate(reservationList2[i]) + '" class="crossed-out" disabled><span>' + idToNiceDate(reservationList2[i]) + '</span></button></div>'
                }
            }

            document.getElementById("twoHourReservations").innerHTML = twoHourHTML 
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

        console.log(reservation)

        getReservationAvailability.push(reservation.status)
    }

    console.log('res list: ' + reservationList)
    console.log('res avail list : ' + getReservationAvailability)

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

    console.log(reservationsList)

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

function idToNiceDate(reservation_id){
    var split_list = reservation_id.split('-')

    var reservation_day = split_list[0];
    reservation_day = reservation_day.charAt(0).toUpperCase() + reservation_day.substring(1)

    var time = split_list[1]
    var reservation_time

    console.log(split_list)

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
        reservation_time = split_list2[0] + 'am - ' + split_list2[1]
    }

    console.log(split_list2)
    console.log(reservation_day, ' | ', reservation_time)

    var reservationItem = reservation_day + ', ' + reservation_time

    return reservationItem
}



