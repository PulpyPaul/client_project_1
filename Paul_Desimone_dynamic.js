var selectDiv;      // div element which contains all dynamically created select elements
var choiceData;     // JSON of all possible choices
var dataLength;     // length of the objects in the JSON data for choices
var canvas;         // canvas element
var ctx;            // 2D context of the canvas element
var submitBtn;      // Button used to submit data
var firstNameInput; // holds input field of users first name
var lastNameInput;  // holds input field of users last name
var images;         // array of image objects
var savedData;      // div element that contains cookie and local storage data
var clearStorageBtn;// button used to clear cookie and local storage data
var recentSelection;// element containing the most recent selected value
var circles;        // array of circle objects

// Initializes many variables, called when window loads
function init() {
    
    // Checks for a valid browser, if it is not valid redirects to new browser page
    if (!checkValidBrowser()) {
        window.location.href = "Paul_Desimone_newBrowser.html";
        return;
    }
        
    // Gets JSON data from choiceData.js
    choiceData = choices.choices;
    
    // Gets the length of data from the JSON object
    dataLength = Object.keys(choiceData).length;
    
    // Element assignments by ID
    selectDiv = document.getElementById('selectDiv');
    submitBtn = document.getElementById('submitBtn');
    firstNameInput = document.getElementById('firstName');
    lastNameInput = document.getElementById('lastName');
    savedData = document.getElementById('savedData');
    clearStorageBtn = document.getElementById('clearStorageBtn');
    
    // Onclick event initializations
    clearStorageBtn.onclick = clearLocalStorage;
    submitBtn.onclick = validateData;
    
    // Initializes images array
    images = [];
    
    // Creates the images
    createImages();
    
    // Creates the first select element
    createSelectElement('Main');
    
    // If local storage or cookies contain any data, display it    
    if (window.localStorage || document.cookie){
        if (localStorage.length != 0)
        displaySavedProfiles();
    }
        
    // Gets reference to the canvas and its 2D context
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    
    // Intializes circles array and creates them
    circles = [];
    createCircles();
    
    // Sets default color to grey
    ctx.fillStyle = "rgba(125, 125, 125, 0.4)";
    
    // Draws circles to the canvas
    drawCircles();
    
    // Starts animating the circles
    requestAnimationFrame(update);
    
};

// Function constructor used to create new circles
function Circle() {
    this.radius = 20;
    this.x = getRandomInt(20, canvas.width - 20),
    this.y = getRandomInt(20, canvas.height - 20),
    this.velocityX = 1,
    this.velocityY = 1,
    this.speed = 2
};

// Updates position values for each circle
function update() {
    
    // Loops through the circle array
    for (var i = 0; i < circles.length; i++) {
        
        // Updates x and y positions based on circle velocity and speed
        circles[i].x += circles[i].velocityX * circles[i].speed;
        circles[i].y += circles[i].velocityY * circles[i].speed;
        
        // If a circle touches the x axis, reverse its x velocity
        if (circles[i].x > canvas.width - circles[i].radius || circles[i].x < circles[i].radius) {
            circles[i].velocityX *= -1;
        }
        
        // If a circle touches the y axis, reverse its y velocity
        if (circles[i].y > canvas.height - circles[i].radius || circles[i].y < circles[i].radius) {
            circles[i].velocityY *= -1;
        }
    }
    
    // Draws circles to the screen
    drawCircles();
    
    // Recursive call for animation
    requestAnimationFrame(update);
};

// Creates 20 circle objects and adds them to an array
function createCircles() {
    
    // Loops 20 times to create 20 circles
    for (var i = 0; i < 20; i++) {
        
        // Creates a new circle object
        var circle = new Circle();
        
        // Randomly picks a velocityX, either 1 or -1
        if ((Math.floor(Math.random() * 2)) == 1) {
            circle.velocityX *= -1;
        }
        
        // Randomly picks a velocityY, either 1 or -1
        if ((Math.floor(Math.random() * 2)) == 1) {
            circle.velocityY *= -1;
        }
        
        // Adds circle to array of circles
        circles.push(circle);
    }
}

// Gets a random integer between a a given min and max --- BOTH VALUES ARE INCLUSIVE
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

// Renders the circles to the canvas
function drawCircles() {
    
    // Clears the canvas of any previous drawings from the last frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Checks if the recent selection, if not, updates the images and circle color
    if (recentSelection != null) {
        updateImages(recentSelection);    
    }
    
    // Draws circles to the canvas based on their properties
    for (var i = 0; i < circles.length; i++) {
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2 * Math.PI);
        ctx.fill();
    }
};

// Creates an array of images
function createImages() {
    for (var i = 0; i < 10; i++) {
        
        // Create new image
        var img = new Image();
        
        // Add image to array
        images.push(img);
        
        // Give image a source from the imageData array in imageData.js
        images[i].src = imgPaths[i];
    }
};

// Removes all child nodes from saved data
function clearSavedData() {
    
    // While saved data contains a first child node
    while(savedData.firstChild){
        
        // Remove that first child node
        savedData.removeChild(savedData.firstChild);
    }
};

// Clears localstorage
function clearLocalStorage() {
    localStorage.clear();
    
    // Removes text of any saved items
    clearSavedData();
};

// Dynamically creates select elements based on a key
function createSelectElement(dataKey){
    
    for (var i = 0; i < dataLength; i++) {
        
        // If choice does not match key, skip this data point
        if (choiceData[i].key != dataKey)
            continue;
        
        // Creates a header to label the specific select menu
        var h2 = document.createElement('h2');
        var textNode = document.createTextNode(choiceData[i].description);
        h2.className = choiceData[i].depth;
        h2.appendChild(textNode);
        selectDiv.appendChild(h2);
        
        // Creates the select list element
        var selectList = document.createElement('select');
        selectList.id = choiceData[i].key;
        selectList.name = choiceData[i].description;
        selectList.className = choiceData[i].depth;
        selectDiv.appendChild(selectList);
        
        // Creates null Select option
        var nullOption = document.createElement('option');
        nullOption.text = "Select an Option";
        nullOption.selected = this;
        nullOption.disabled = true;
        selectList.appendChild(nullOption);                
        
        // Creates option 1
        var newOption1 = document.createElement('option');
        newOption1.value = choiceData[i].option_1;
        newOption1.text = choiceData[i].option_1;
        selectList.appendChild(newOption1);
        
        // Creates option 2
        var newOption2 = document.createElement('option');
        newOption2.value = choiceData[i].option_2;
        newOption2.text = choiceData[i].option_2;
        selectList.appendChild(newOption2);
        
        // Hooks up an event to reload the choices whenever the select value is changed
        selectList.onchange = reloadSelect;
    }
};

// Re-creates the select elements based on previous choice
function reloadSelect() {
    
    // removes any elements if necessary
    removeElements(this.className);
    
    // creates new select elements
    createSelectElement(this.value);
    
    // assigns the most recent selection value
    recentSelection = this;
};

// Removes all child elements from the select div
function clearSelect(){
    
    // Checks if a firstChild exists, if so, remove that child
    while(selectDiv.firstChild){
        selectDiv.removeChild(selectDiv.firstChild);
    }
};

// Removes elements based on the depth of the question
function removeElements(elementDepth){
    
    // gets the current depth from the parameter
    var currentDepth = parseInt(elementDepth);
    
    // Loops through any elements that have a depth deeper than the previously changed select option
    for (var i = 2; i > currentDepth; i--){
        
        // Gets all elements of a given depth
        var elementsToDelete = document.getElementsByClassName(i);
        
        // Deletes all elements that are the targeted depth
        while(elementsToDelete.length > 0){
            elementsToDelete[0].parentNode.removeChild(elementsToDelete[0]);
        }
    }
};

// Saves data to local storage
function saveData(){
    
    // array used to hold the data
    var data = [];
    
    // adds first and last name values to the array
    data.push(firstNameInput.value);
    data.push(lastNameInput.value);
    
    // loops through all elements that have a depth in their classname
    for (var i = 0; i < 3; i++){
        
        // gets the list of elements
        var depthElements = document.getElementsByClassName(i.toString());
        
        // adds the select element value to the data array
        data.push(depthElements[1].value);
    }
    
    // If cookies are enabled, create a cookie based on the data
    if (navigator.cookieEnabled) {
        document.cookie = JSON.stringify(data);
    } 
    
    // stores the item with the last name as a key in local storage
    localStorage.setItem(lastNameInput.value, JSON.stringify(data));
};

// Validates data before it is saved to local storage
function validateData() {
    
    // Checks for both name fields being filled out
    if (firstNameInput.value != "" && lastNameInput.value != ""){
        
        // Gets all elements of a 2 depth by classname
        var depth2Elements = document.getElementsByClassName("2");
        
        // Loops through the elements to check if all select elements were filled out and a value was selected
        for (var i = 0; i < depth2Elements.length; i++){
            
            // if all select elements are filled out, save the data to local storage
            if (depth2Elements[i].tagName === 'SELECT' && depth2Elements[i].value != "Select an Option"){
                saveData();
                displaySavedProfiles();
                return;
            }
        }
        alert("Please fill out all select fields");
        
    } else {
        alert("Please fill out both name fields");
    }
};

// Updates the canvas based on a given elements value
function updateImages(element) {
    
    // Draws an image to the canvas based on the element's value and changes the color of the circles
    switch(element.value) {
        case "Ferrari":
            ctx.fillStyle = "rgb(255, 255, 0, 0.4)";
            ctx.drawImage(images[0], canvas.width / 2 - images[0].width / 2, canvas.height / 2 - images[0].height / 2);
            break;
        case "Lamborghini":
            ctx.drawImage(images[1], canvas.width / 2 - images[1].width / 2, canvas.height / 2 - images[1].height / 2);
            ctx.fillStyle = "rgb(0, 0, 0, 0.4)";
            break;
        case "Enzo":
            ctx.drawImage(images[4], canvas.width / 2 - images[4].width / 2, canvas.height / 2 - images[4].height / 2);
            ctx.fillStyle = "rgb(255, 0, 0, 0.4)";
            break;
        case "Italia":
            ctx.drawImage(images[2], canvas.width / 2 - images[2].width / 2, canvas.height / 2 - images[2].height / 2);
            ctx.fillStyle = "rgb(204, 0, 153, 0.4)";
            break;
        case "Aventador":
            ctx.drawImage(images[9], canvas.width / 2 - images[9].width / 2, canvas.height / 2 - images[9].height / 2);
            ctx.fillStyle = "rgb(153, 0, 153, 0.4)";
            break;
        case "Veneno":
            ctx.drawImage(images[7], canvas.width / 2 - images[7].width / 2, canvas.height / 2 - images[7].height / 2);
            ctx.fillStyle = "rgb(217, 217, 217, 0.4)";
            break;
        case "Red":
            ctx.drawImage(images[4], canvas.width / 2 - images[4].width / 2, canvas.height / 2 - images[4].height / 2);
            ctx.fillStyle = "rgb(255, 0, 0, 0.4)";
            break;
        case "Black":
            ctx.drawImage(images[5], canvas.width / 2 - images[5].width / 2, canvas.height / 2 - images[5].height / 2);
            ctx.fillStyle = "rgb(0, 0, 0, 0.4)";
            break;
        case "Blue":
            ctx.drawImage(images[3], canvas.width / 2 - images[3].width / 2, canvas.height / 2 - images[3].height / 2);
            ctx.fillStyle = "rgb(0, 153, 255, 0.4)";
            break;
        case "Pink":
            ctx.drawImage(images[2], canvas.width / 2 - images[2].width / 2, canvas.height / 2 - images[2].height / 2);
            ctx.fillStyle = "rgb(204, 0, 153, 0.4)";
            break;
        case "Green":
            ctx.drawImage(images[8], canvas.width / 2 - images[8].width / 2, canvas.height / 2 - images[8].height / 2);
            ctx.fillStyle = "rgb(170, 255, 128, 0.4)";
            break;
        case "Purple":
            ctx.drawImage(images[9], canvas.width / 2 - images[9].width / 2, canvas.height / 2 - images[9].height / 2);
            ctx.fillStyle = "rgb(153, 0, 153, 0.4)";
            break;
        case "Orange":
            ctx.drawImage(images[6], canvas.width / 2 - images[6].width / 2, canvas.height / 2 - images[6].height / 2);
            ctx.fillStyle = "rgb(255, 153, 102, 0.4)";
            break;
        case "Grey":
            ctx.drawImage(images[7], canvas.width / 2 - images[7].width / 2, canvas.height / 2 - images[7].height / 2);
            ctx.fillStyle = "rgb(217, 217, 217, 0.4)";
            break;
        default:
            break;
    }
};

// Dynamically creates text to display saved data in local storage
function displaySavedProfiles() {
    
    // Clears the previous text
    clearSavedData();
    
    // Creates a header node to represent the saved data
    var headerNode = document.createElement('h3');
    var textNode = document.createTextNode("Saved Data Profiles Local Storage");
    headerNode.appendChild(textNode);
    savedData.appendChild(headerNode);
    
    // Loops through all objects in local storage
    for (var i = 0; i < localStorage.length; i++){
        
        // Parses the local storage content into an array of string
        var stringArray = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        // Loops through all string objects within each data piece in local storage
        for (var j = 0; j < stringArray.length; j++){
            
            // Creates a paragraph item for each string in the array
            var dataItem = document.createElement('p');
            var dataTextNode = document.createTextNode(stringArray[j]);
            dataItem.appendChild(dataTextNode);
            savedData.appendChild(dataItem);
        }
        
        // Creates a divider to separate different items in local storage
        var divider = document.createElement('p');
        var dividerText = document.createTextNode("-------------");
        divider.appendChild(dividerText);
        savedData.appendChild(divider);
    }
    
    // If there are any cookies, display them dynamically below the local storage data
    if (document.cookie){
        
        // Creates a paragraph item for the cookies
        var cookieHeader = document.createElement('h3');
        var cookieHeaderText = document.createTextNode("Saved Data Profiles Cookies");
        cookieHeader.appendChild(cookieHeaderText);
        savedData.appendChild(cookieHeader);
        
        // Creates a paragraph item for the cookies
        var cookieDataItem = document.createElement('p');
        var cookieDataTextNode = document.createTextNode(document.cookie);
        cookieDataItem.appendChild(cookieDataTextNode);
        savedData.appendChild(cookieDataItem);
    }
};

// Used to check if the user has valid browser
function checkValidBrowser() {
    
    // Assigns the user agent object
    var sUsrAg = navigator.userAgent;
    
    // Returns true if the browser is valid, false if it is invalid
    if (sUsrAg.indexOf("Firefox") > -1) {
        return true;
    } else if (sUsrAg.indexOf("Opera") > -1) {
        return false;
    } else if (sUsrAg.indexOf("Trident") > -1) {
        return false;
    } else if (sUsrAg.indexOf("Edge") > -1) {
        return false;
    } else if (sUsrAg.indexOf("Chrome") > -1) {
        return true;
    } else if (sUsrAg.indexOf("Safari") > -1) {
        return false;
    } else if (sUsrAg.indexOf("MSIE") > -1) {
        return false;
    } else {
        return true;
    }
};

window.onload = init;