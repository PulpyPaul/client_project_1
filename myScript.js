var selectDiv;
var choiceData;
var dataLength;
var canvas;
var ctx;
var submitBtn;
var firstNameInput;
var lastNameInput;
var profileInfo;
var images;
var carImg;
var savedData;
var clearStorageBtn;

function init() {
    
    if (!checkValidBrowser()) {
        window.location.href = "newBrowser.html";
        return;
    }
        
    choiceData = choices.choices;
    selectDiv = document.getElementById('selectDiv');
    dataLength = Object.keys(choiceData).length;
    createSelectElement('Main');
    submitBtn = document.getElementById('submitBtn');
    firstNameInput = document.getElementById('firstName');
    lastNameInput = document.getElementById('lastName');
    savedData = document.getElementById('savedData');
    clearStorageBtn = document.getElementById('clearStorageBtn');
    clearStorageBtn.onclick = clearLocalStorage;
    submitBtn.onclick = validateData;
    images = [];
    createImages();
    
    if (window.localStorage){
        if (localStorage.length != 0)
        displaySavedProfiles();
    }
        
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    ctx.font = "100px Arial";
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

// Creates
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
    removeElements(this.className);
    createSelectElement(this.value);
    updateCanvas(this);
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
function updateCanvas(element) {
    
    // Clears the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draws an image to the canvas based on the element's value
    switch(element.value) {
        case "Ferrari":
            ctx.drawImage(images[0], canvas.width / 2 - images[0].width / 2, canvas.height / 2 - images[0].height / 2);
            break;
        case "Lamborghini":
            ctx.drawImage(images[1], canvas.width / 2 - images[1].width / 2, canvas.height / 2 - images[1].height / 2);
            break;
        case "Enzo":
            ctx.drawImage(images[4], canvas.width / 2 - images[4].width / 2, canvas.height / 2 - images[4].height / 2);
            break;
        case "Italia":
            ctx.drawImage(images[2], canvas.width / 2 - images[2].width / 2, canvas.height / 2 - images[2].height / 2);
            break;
        case "Aventador":
            ctx.drawImage(images[9], canvas.width / 2 - images[9].width / 2, canvas.height / 2 - images[9].height / 2);
            break;
        case "Veneno":
            ctx.drawImage(images[7], canvas.width / 2 - images[7].width / 2, canvas.height / 2 - images[7].height / 2);
            break;
        case "Red":
            ctx.drawImage(images[4], canvas.width / 2 - images[4].width / 2, canvas.height / 2 - images[4].height / 2);
            break;
        case "Black":
            ctx.drawImage(images[5], canvas.width / 2 - images[5].width / 2, canvas.height / 2 - images[5].height / 2);
            break;
        case "Blue":
            ctx.drawImage(images[3], canvas.width / 2 - images[3].width / 2, canvas.height / 2 - images[3].height / 2);
            break;
        case "Pink":
            ctx.drawImage(images[2], canvas.width / 2 - images[2].width / 2, canvas.height / 2 - images[2].height / 2);
            break;
        case "Green":
            ctx.drawImage(images[8], canvas.width / 2 - images[8].width / 2, canvas.height / 2 - images[8].height / 2);
            break;
        case "Purple":
            ctx.drawImage(images[9], canvas.width / 2 - images[9].width / 2, canvas.height / 2 - images[9].height / 2);
            break;
        case "Orange":
            ctx.drawImage(images[6], canvas.width / 2 - images[6].width / 2, canvas.height / 2 - images[6].height / 2);
            break;
        case "Grey":
            ctx.drawImage(images[7], canvas.width / 2 - images[7].width / 2, canvas.height / 2 - images[7].height / 2);
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