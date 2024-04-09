
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    determineAvailability('Kilachand', ['910', '911', '912'])

});


async function determineAvailability(location, roomList){
    const d = new Date()
    var day = d.getDay()
    var time = d.getHours()
    var daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    var day = daysOfWeek[day]
    var am = true;

    if (time > 12){
        time = time - 12;
        var am = false;
    }

    time = time.toString() + ':00'

    if (am){
        time += 'am'
    }

    else{
        time += 'pm'
    }

    var time2 = add1Time(time)

    var availabilityList = []


    for (var r = 0; r<roomList.length; r++){
        var reservationID = day + '-' + time + time2 + '-' + location.toLowerCase() + '-' + roomList[r];

        var room = roomList[r]

        var getReservationURL = 'https://us-east-1.aws.data.mongodb-api.com/app/bu_reserve-hmgbd/endpoint/getReservation'

        var args = '?arg1=' + reservationID + '&arg2=' + location + '&arg3=' + room
        var url = getReservationURL + args

        let response = await fetch(url)
            .then(data => {
                return data;
        })           //api for the get request
        
        var reservation = await response.json() 

        console.log(response)
        console.log(reservation)


        if(reservation.status == true){
            availabilityList.push(true)
        }

        else{
            availabilityList.push(false)
        }
    }

    console.log(availabilityList)

    var status_dot = document.getElementsByClassName('k_studyroom_status')

    if (availabilityList.includes(true)){
        status_dot[0].style.color = 'green';
    }

    else{
        status_dot[0].style.color = 'red';
    }




    console.log(day)
    console.log(time)
    console.log()
    console.log(time)
    console.log(time2)
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
