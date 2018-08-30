// JavaScript source code
var firstSelect;
var submit;
var ferModelOptions;
var lamModelOptions;

function init() {
    ferModelOptions = ["F Model 1", "F Model 2"];
    lamModelOptions = ["L Model 1", "L Model 2"];

    firstSelect = document.getElementById("firstSelect");
    submit = document.getElementById("submitBtn");
    submit.onclick = CreateModelSelect;
};

function CreateModelSelect() {
    if (firstSelect.value == "Ferrari") {
        console.log("create ferrari");
    } else {
        console.log("create lamb");
    }
};

function createSelectList(itemArray) {
    for (var i = 0; i < itemArray.count; i++) {

    };
};

window.onload = init;