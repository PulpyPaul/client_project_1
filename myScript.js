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

function init() {
    choiceData = choices.choices;
    selectDiv = document.getElementById('selectDiv');
    dataLength = Object.keys(choiceData).length;
    createSelectElement('Main');
    submitBtn = document.getElementById('submitBtn');
    firstNameInput = document.getElementById('firstName');
    lastNameInput = document.getElementById('lastName');
    profileInfo = document.getElementById('profileInfo');
    submitBtn.onclick = validateData;
    images = [];
    createImages();
        
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    ctx.font = "100px Arial";
};

function createImages() {
    for (var i = 0; i < 10; i++) {
        var img = new Image();
        images.push(img);
    }
    
    images[0].src = "img/ferrari_logo.png";
    images[1].src = "img/lamborghini_logo.png";
    //images[2] = "img/ferarri"
    
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

function validateData() {
    if (firstNameInput.value != "" && lastNameInput.value != ""){
        localStorage.setItem(lastNameInput.value, firstNameInput.value);
        updateProfile();
    } else {
        alert("Please fill out both fields");
    }
};

function updateProfile() {
    var profile = document.createElement('h3');
    var textNode = document.createTextNode("Current User: " + lastNameInput.value + " " + firstNameInput.value);
    profile.appendChild(textNode);
    profileInfo.appendChild(profile);    
    console.dir(localStorage);
};


function createCookie(name, data, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(data);
    if (typeof daysToLive === "number") {
        cookie += "; max-age=" + (daysToLive*60*60*24);
    }
    document.cookie = cookie;
};

function updateCanvas(element) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    switch(element.value) {
        case "Ferrari":
            ctx.drawImage(images[0], canvas.width / 2 - images[0].width / 2, canvas.height / 2 - images[0].height / 2);
            break;
        case "Lamborghini":
            ctx.drawImage(images[1], canvas.width / 2 - images[0].width / 2, canvas.height / 2 - images[0].height / 2);
        default:
            break;
    }
};

window.onload = init;