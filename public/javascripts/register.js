// init local host and request header
let localhost = "http://localhost:8080/";
var postHeaders = new Headers();
postHeaders.append('Content-Type', 'application/json');

/*  check if first and second password is the same */
function Validate() {
    
    var password = document.getElementById("psw").value;
    var confirmPassword = document.getElementById("psw-repeat").value;
    var cpassword = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (password === ""){
        alert("Password is empty.");
        return false;
    }

    if(!(password.match(cpassword))){
        alert("Password invalid! Please match the requested format.")
        return false;
    }

    return true;
}

/* Fuction event_listener */
window.addEventListener('load', function(){

    /* check is submit button clicked */
    document.getElementById('submit').addEventListener("click", function(){  
        
        if (Validate()){
            let fname = document.getElementById("fname").value;
            let lname = document.getElementById("lname").value;
            let address = document.getElementById("address").value;
            let phone = document.getElementById("phone").value;
            let email = document.getElementById("email").value;
            let psw = document.getElementById("psw").value;
            let studies = document.getElementById("studies").value;
            let graduationyear = document.getElementById("graduationyear").value;
            let depst = document.getElementById("depst").value;
            let university = document.getElementById("university").value;
            let direct = document.getElementById("direct").value;
            let knowledge = document.getElementById("knowledge").value;
        
            postData(fname,lname,address,phone,email,psw,studies,graduationyear,depst,university,direct,knowledge);
        }
        
    })

})


/* fetch with the server to post the user data */
function postData(fname, lname, address, phone, email, psw, studies, graduationyear, depst, university, direct,knowledge){

    console.log("sent post request to server");   

    /* init the message request */
    let u = {
        firstName: fname, 
        lastName: lname, 
        address: address, 
        phoneNumber: phone, 
        email: email, 
        password: psw, 
        studiesLevel: studies, 
        graduateAt: graduationyear, 
        department: depst, 
        univeristy: university, 
        direct: direct,
        knowledge: knowledge
    };
    console.log(u);
 

    fetch(localhost + 'html/register', 
        {method: 'POST', headers: postHeaders, body: JSON.stringify(u)}
    )
    .then(function(response){
        
        //201 => OK // 409 => email already exists.
        if(response.status === 409){
            alert("Email " + JSON.stringify(u.email) + "already exists. Please insert another email address");
            console.log ("409")
        }
        else if(response.status === 201){
            showHide();
            console.log ("201")
        }
    })
    .catch(err => console.log(err)
    
    )
}

/* show meesage that the register is completed */
function showHide() {
    if(Validate()){
        document.getElementById('hide').style.display = 'none';
        var div = document.getElementById('hidden_div');
        if (div.style.display == 'none') {
            div.style.display = '';
        }
        else {
            div.style.display = 'none';
        }
    }
} 