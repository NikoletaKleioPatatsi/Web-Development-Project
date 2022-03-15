/* init local host and request header*/
let localhost = "http://localhost:8080/";
let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');

/* initialize object */
let init = { method: "GET", headers: myHeaders }

/* Fuction for get all Categories */
function getCategories(){

    console.log("sent get request to server");   

    fetch('https://elearning-aueb.herokuapp.com/categories', init)
    .then((response) =>{
        return response.json()
    })
    .then(function(obj){
        console.log('Received object', obj)

        /* viewing method that create dynamic html list for the categories */
        viewCategories(obj);

    })
    .catch(function(error){
        console.log('Received error', error)
    })

}

/* Fuction for get Courses by title search */
function getCoursesByTitle(){

    console.log("sent get request to server"); 

    // init title from html
    let title = document.getElementById("CoursesText").value;

    fetch('https://elearning-aueb.herokuapp.com/courses/search?title=' + title, init)
    .then((response) =>{
        return response.json()
    })
    .then(function(obj){
        console.log('Received object', obj)

        /* viewing method that create dynamic html table for the courses */
        viewTable(obj);
    })
    .catch(function(error){
        console.log('Received error', error)
    })

}

/* Fuction for get Courses by category */
function getCoursesByCategory(id){

    console.log("sent get request to server"); 
    
    fetch('https://elearning-aueb.herokuapp.com/courses/search?category=' + id, init)
    .then((response) =>{
        return response.json()
    })
    .then(function(obj){
        console.log('Received object', obj);

        /* viewing method that create dynamic html table for the courses */
        viewCoursesByCategoryId(obj);
    })
    .catch(function(error){
        console.log('Received error', error)
    })

}

/* Fuction event_listener */
window.addEventListener('load', function(){

    let btnCT = document.getElementById('CoursesButton');
    if (btnCT){
        btnCT.onclick = getCoursesByTitle;
    }


    let btnC = document.getElementById('CategoriesButton');
    if (btnC){
        btnC.onclick = getCategories;
    }

})

/* Fuction for viewing courses table */
function viewTable(obj) {

    /* check if the object has zero length */
    if( Object.keys(obj).length === 0){
        document.getElementById("emptyResponse").style.display = '';
        document.getElementById("courses-handlebars-table").style.display = 'none';
        document.getElementById("emptyResponse").innerHTML = "No Results For this Search";
    }else{

        let template = document.getElementById('courses-table-template').innerHTML;
        let compiled_template = Handlebars.compile(template); 
        let templatesData = compiled_template( {array: obj} );

        document.getElementById("emptyResponse").style.display = "none";
        document.getElementById("courses-handlebars-table").style.display = '';
        document.getElementById("courses-handlebars-table").innerHTML = templatesData;
    }
}

/* Function  for viewing categories*/
function viewCategories(obj){
    
    /* check if the object is empty */
    if( Object.keys(obj).length === 0){
        document.getElementById("emptyCategories").innerHTML = "There are not categories.";
    }

    let template = document.getElementById("categories-list-template").innerHTML;
    let compiled_template = Handlebars.compile(template); 
    let templatesData = compiled_template( {array: obj} );

    document.getElementById("categories-handlebars-list").innerHTML = templatesData;
    
}


/* Function  for viewing courses at course.html by category id*/
function viewCoursesByCategoryId(obj){

    // console.log(categories);
    let categoryId = Object.values(obj)[0].category;

    // function for view the Category Name as header
    viewCategoryName(categoryId);

    /* check if the object has zero length */
    if( Object.keys(obj).length === 0){
        document.getElementById("emptyResponse").innerHTML = "No Results For this Search";
    }        

    /* view the template for the courses */
    let template = document.getElementById('courses-table-template').innerHTML;
    let compiled_template = Handlebars.compile(template); 
    let templatesData = compiled_template( {array: obj} );

    document.getElementById("courses-handlebars-table").innerHTML = templatesData;
          
}

/* Fuction for get and view the category name for course.html */
function viewCategoryName(id){

    fetch('https://elearning-aueb.herokuapp.com/categories', init)
    .then((response) =>{
        return response.json()
    })
    .then(function(obj){
        
        /* for loop that connect category id with category title */
        for (let i = 0; i < Object.keys(obj).length; i++) {
            if (obj[i].id === id ){
                var CategoryName = obj[i].title;
            }
        }
  
        /* view the category name */
        document.getElementById("categoryName").innerHTML = CategoryName;
        
    })
    .catch(function(error){
        console.log('Received error', error)
    })

}