// init local host and request header
let localhost = "http://localhost:8080/";
var postHeaders = new Headers();
postHeaders.append('Content-Type', 'application/json');

/* get init*/
let initGet = { method: "GET", headers: postHeaders }

/* Fuction event_listener */
window.addEventListener('load', function(){

    /* check is submit button clicked */
    document.getElementById('submit_btn').addEventListener("click", function(){  
        let email = document.getElementById("email").value;
        let psw = document.getElementById("password").value;

        //function for check the login data
        loginStatus(email,psw);
    })
})

/* fetch with the server to check if the login is accepted */
function loginStatus(email,psw){

    console.log("sent post request to server");   

    /* init the message request */
    let u = {email: email, 
            password: psw};
    console.log(u);

    fetch(localhost + 'html/profile',
        {method: 'POST', headers: postHeaders,body: JSON.stringify(u)} 
    )
    .then(function(response){

        //201 => OK // 403 => data are not correct.
        if(response.status === 201){

            console.log("login status accepted-- 201");

            /* function for get the data from server*/
            getData(u.email);

        }else if(response.status === 403){
            
            console.log("login data are not right -- 403");
            alert("Email or Password invalid!");

        }
    }).catch(err => console.log(err))

}

/* fetch with the server to take the user data */
function getData(email){
    
    console.log("sent get request to server");  

    fetch(localhost + 'html/profile/'+ email , initGet)
    .then((response) =>{
        return response.json()
    })
    .then(function(obj){
        console.log("get request accepted-- 201");
        console.log('Received object', obj)

        /* viewing method that create dynamic html list for the categories */
        viewData(obj);

    })
    .catch(function(error){
        console.log('Received error', error)
    })

}


// /* Fuction for view the user data for profile.html */
function viewData(obj){

    //hide form and view user data
    document.getElementById('form').style.display = 'none';
    var div = document.getElementById('user_data');
    if (div.style.display == 'none') {
        div.style.display = '';
    }
    else {
        div.style.display = 'none';
    }

    /* view the template for the courses */
    let template = document.getElementById('user-data-template').innerHTML;
    let compiled_template = Handlebars.compile(template); 
    let templatesData = compiled_template(obj);

    document.getElementById("user-data-handlebars").innerHTML = templatesData;

}