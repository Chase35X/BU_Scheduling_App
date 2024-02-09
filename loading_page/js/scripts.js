addEventListener("DOMContentLoaded", (event) => {

    if (localStorage.getItem('email')) {
        console.log('logged in')

        window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    }


    else if(document.cookie != ''){
        console.log(document.cookie)

        cookie = document.cookie

        email_list = cookie.split('=')

        email = email_list[1]

        console.log(email)

        window.location.href = '/BU_Scheduling_App/dashboard_page/index.html'
    }

    else{
        window.location.href = '/BU_Scheduling_App/login_page/index.html'
    }

    

});