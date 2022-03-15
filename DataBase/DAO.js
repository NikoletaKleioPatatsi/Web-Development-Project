const uuser = require('./user');

var users = [];

/* check if the email already exist */
function checkEmail(email){  

    if(users.find(user => user.email === email)){
        return false;
    }
    return true;

}

/* register an user from json parameter */
function registerUser(user){
    var u = new uuser.User(user.firstName, user.lastName, user.address, user.phoneNumber, user.email, user.password, user.studiesLevel, user.graduateAt, user.department, user.univeristy, user.direct, user.knowledge)
    users.push(u);
    console.log("register of user " + u.email + " completed.");
}

/* check if the login data are correct */
function loginStatus(u){

    //check is email and password is the same with the server
    if(users.find(user => user.email === u.email)){
        if(users.find(user => user.psw == u.password)){
            return true;
        }else{
            return false;
        }   
    }else{
        return false;
    }

}

/* get all the data for this user email */
function getData(email){
    console.log("get data for email: " + email);

    let found = users.find(user => user.email === email)
    return found

}

// eslint-disable-next-line no-undef
module.exports = {
    checkEmail: checkEmail,
    registerUser: registerUser,
    loginStatus: loginStatus,
    getData: getData
};
