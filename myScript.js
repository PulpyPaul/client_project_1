var selectDiv;
var choiceData;
var dataLength;

// Will be moved to a separate file and called through AJAX request
var choices = {
  "choices": [
    {
      "key": "Main",
      "option_1": "Ferrari",
      "option_2": "Lamborghini",
      "description": "Select a Car Brand",
      "depth": 0
    },
    {
      "key": "Ferrari",
      "option_1": "Enzo",
      "option_2": "Italia",
      "description": "Select a Ferrari Model",
      "depth": 1
    },
    {
      "key": "Lamborghini",
      "option_1": "Aventador",
      "option_2": "Veneno",
      "description": "Select a Lamborghini Model",
      "depth": 1
    },
    {
      "key": "Enzo",
      "option_1": "Red",
      "option_2": "Black",
      "description": "Select an Enzo Color",
      "depth": 2
    },
    {
      "key": "Italia",
      "option_1": "Blue",
      "option_2": "Pink",
      "description": "Select an Italia Color",
      "depth": 2
    },
    {
      "key": "Aventador",
      "option_1": "Green",
      "option_2": "Purple",
      "description": "Select an Aventador Color",
      "depth": 2
    },
    {
      "key": "Veneno",
      "option_1": "Orange",
      "option_2": "Grey",
      "description": "Select a Veneno Color",
      "depth": 2
    }
  ]
}

function init() {
   currentKeys = [];
   choiceData = choices.choices;
   selectDiv = document.getElementById('selectDiv');
   dataLength = Object.keys(choiceData).length;
   createSelectElement('Main');
};

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
        
        selectList.onchange = reloadSelect;
    }
};

// Re-creates the selected based on previous choice
function reloadSelect() {
    removeElements(this.className);
    createSelectElement(this.value);
};

// Removes all child elements from the select div
function clearSelect(){
    
    // Checks if a firstChild exists, if so, remove that child
    while(selectDiv.firstChild){
        selectDiv.removeChild(selectDiv.firstChild);
    }
};

function removeElements(elementDepth){
    
    var currentDepth = parseInt(elementDepth);
        
    for (var i = 2; i > currentDepth; i--){
        var elementsToDelete = document.getElementsByClassName(i);
        while(elementsToDelete.length > 0){
            elementsToDelete[0].parentNode.removeChild(elementsToDelete[0]);
        }
    }
    
    
};


window.onload = init;