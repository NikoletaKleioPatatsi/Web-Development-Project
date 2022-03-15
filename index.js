/* server init */
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// server object for all users 
let users = require('./DataBase/DAO'); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// public use for front end
app.use('/', express.static(__dirname + '/public'));

/* post method for user register */
app.post('/html/register', function(req , res){

    console.log("received post request from web")

    /* json format body */
    let u = req.body;
    let email = u.email;


    /* if checkEmail(email) === true then email does not exist at the server */
    if (users.checkEmail(email)){
        users.registerUser(u); 
        res.status(201).send();
        console.log("user has been registered -- 201");
    }else{
        res.type('aplication/json')
        res.status(409).send();
        console.log("user with this email address has already exist -- 409");
    }
    
})

/* post method for user register */
app.post('/html/profile', function(req , res){

    console.log("received post request from web")

    /* json format body */
    let u = req.body;
    let ps = u.password;

    if (users.loginStatus(u)){
        res.status(201).send();
        console.log("login status accepted-- 201");
    }else{
        res.type('aplication/json')
        res.status(403).send();
        console.log("login data are not right -- 403");
    }
    
})

// get method for user data>
app.get('/html/profile/:email' , (req,res) => {
    
    console.log("received get request from web")

    //email pass from uri
    var email = req.params.email;
    let data = users.getData(email);

    res.status(201);
    res.json(data);

});

/* listener server */
app.listen(port);
console.log("Up and running at port "+port);