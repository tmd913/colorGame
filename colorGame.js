//Color Guessing Game

/*****************************************************
    variables
*****************************************************/
//DOM variables
var body = document.querySelector("body");
var bodyColor = body.style.backgroundColor;
var squares = document.querySelectorAll(".square"); //all 6 squares
var easySquares = [squares[0], squares[1], squares[2]]; //will later represent first 3 squares
var hardSquares = document.querySelectorAll(".hard"); //final 3 squares
var winningColorDisplay = document.querySelector("#winningColor"); //color player must guess
var jumbotron = document.querySelector(".jumbotron"); //jumbotron will change to winning color when guessed correctly
var jumbotronColor = jumbotron.style.backgroundColor;
var message = document.querySelector("#message"); //message to player
var newColorsButton = document.querySelector("#new"); //select new colors
var easyButton = document.querySelector("#easy"); //change difficulty to easy (3 colors)
var hardButton = document.querySelector("#hard"); //change difficulty to hard (6 colors)

//game variables
var winningColor;
var guessedColor;
var clickedColor;
var gameOver = false;

/*****************************************************
    functions
*****************************************************/
//create 3 random colors to represent red, green, and blue
//returns string rgb(x, y, z)
function createRandRGB() {
    var randRed = Math.floor(Math.random() * 256);
    var randGreen = Math.floor(Math.random() * 256);
    var randBlue = Math.floor(Math.random() * 256);
    return "rgb(" + randRed + ", " + randGreen + ", " + randBlue + ")";
}

//assigns random color to each of the squares
function createRandSquares(arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    console.log(randIndex);
    for (var i = 0; i < arr.length; i++) {
        if (i === randIndex) {
            arr[i].style.backgroundColor = winningColor;
        } else {
            arr[i].style.backgroundColor = createRandRGB();
        }
    }
    jumbotron.style.backgroundColor = jumbotronColor;
    newColorsButton.textContent = "New Colors";
    message.textContent = "";
}

//creates screen that displays when player selects correct color
function createWinScreen(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.backgroundColor = winningColor;
    }
    message.textContent = "Correct!";
    jumbotron.style.backgroundColor = winningColor;
    newColorsButton.textContent = "Play again?";
}

/*****************************************************
    content
*****************************************************/
//create initial game state
winningColor = createRandRGB(); 
winningColorDisplay.textContent = winningColor; 
createRandSquares(squares);

//create click functionality for "new game" button
newColorsButton.addEventListener("click", function () {
    winningColor = createRandRGB();
    winningColorDisplay.textContent = winningColor;
    createRandSquares(squares);
})

//create click functionality for "easy" button
easyButton.addEventListener("click", function () {
    this.classList.add("selected");
    hardButton.classList.remove("selected");
    winningColor = createRandRGB();
    winningColorDisplay.textContent = winningColor;
    for (var i = 0; i < 3; i++) {
        hardSquares[i].style.backgroundColor= bodyColor;
    }
    squares = easySquares;
    createRandSquares(squares);
})

//create click functionality for "hard" button
hardButton.addEventListener("click", function () {
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    winningColor = createRandRGB();
    winningColorDisplay.textContent = winningColor;
    squares = document.querySelectorAll(".square");
    createRandSquares(squares);
})

//create click functionality for squares button
for (var i = 0; i < squares.length; i++) {
    if (!gameOver) {
        squares[i].addEventListener("click", function () {
            clickedColor = this.style.backgroundColor;
            if (clickedColor === winningColor) {
                createWinScreen(squares);
                gameOver = true;
            } else {
                this.style.backgroundColor = bodyColor;
                message.textContent = "Incorrect";
            }
        });
    }
}






