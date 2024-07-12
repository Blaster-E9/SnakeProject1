//Game colours
const canvas_border = "black";
const canvas_background = "lightblue";
const snake_colour = "cyan";
const snake_border = "black";
const apple_colour = "red";
const apple_border = "darkred";


//Specify the initial location of our snake on the canvas using an array of coordinates
// first coordinates represents the head
let snake = [
    {x: 300, y: 300,},
    {x: 290, y: 300,},
    {x: 280, y: 300,},
    {x: 270, y: 300,},
    {x: 260, y: 300}
]

let score = 0;
//Horizontal Velocity
let dx = 10;
//Vertical Velocity
let dy = 0;


//Get the canvas element using the id snakeCanvas
const snakeCanvas = document.getElementById("snakeCanvas");
//Get the canvas 2dcontext = it will be drawn into a 2D space
const snakeCanvas_context = snakeCanvas.getContext("2d");

//Start game
main();



//Control the snake
document.addEventListener("keydown", change_direction);

gen_apples();
 //clearCanvas() called inside setTimeout to remove previous snake position
 //Main function called repeatedly to keep game running
 function main() {

    if(has_Game_Ended()) return alert
    (`GameOver! Your score was: ${score}`);
    
    setTimeout(function onTick() { 
    clearCanvas(); 
    move_snake(); 
    drawApple();
    drawSnake();
    
    //Calling main again
    main();
    }, 100)
 }

//Draw a border around the canvas
function clearCanvas(){ 
    //colour to fill the drawing
    snakeCanvas_context.fillStyle = canvas_background;
    //colour for the border of the canvas
    snakeCanvas_context.strokeStyle = canvas_border;
    //Draw filled rectangle to cover the whole canvas
    snakeCanvas_context.fillRect(0, 0, snakeCanvas.clientWidth, snakeCanvas.height);
    //Draw a border around the whole canvas
    snakeCanvas_context.strokeRect(0, 0, snakeCanvas.clientWidth, snakeCanvas.height);
}


//function that prints the parts
function drawSnake() {
//Draw each part    
    snake.forEach(drawSnakePart);
}



//function to draw a rectangle for each pair of coordinates
function drawSnakePart(snakePart) {
    //ser the colour of the snake part
    snakeCanvas_context.fillStyle = snake_colour;
    //set the border colour of the snake part
    snakeCanvas_context.strokeStyle = snake_border;
    //Draw a filled rectangle to represent the snake part at the coordinates the part is located
    snakeCanvas_context.fillRect(snakePart.x, snakePart.y, 10, 10);
    //Draw a border around the snake part
    snakeCanvas_context.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawApple() {
    snakeCanvas_context.fillStyle = apple_colour;
    snakeCanvas_context.strokeStyle = apple_border;
    snakeCanvas_context.fillRect(apple_x, apple_y, 10, 10);
    snakeCanvas_context.strokeRect(apple_x, apple_y, 10, 10);
}

// Random Gen to spawn the apples in random coordinates
function random_apple(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_apples() {
    //Generating a random number for food x-coordinates 
    apple_x = random_apple(0, snakeCanvas.width - 10);
    //Generating a random number for food x-coordinates 
    apple_y = random_apple(0, snakeCanvas.height - 10);
    //generate new food location if its generated where the snake is
    snake.forEach(function has_snake_eaten_apple(part) {
        const has_eaten_apple = part.x == apple_x && part.y == apple_y
        if (has_eaten_apple) gen_apples();
    });
}


function has_Game_Ended() {
    for(let i = 4; i < snake.length; i++){

    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if (has_collided) 
        return true
    }
    //snake[0].x and snake[0].y represent the coordinates of the snakes head
    //snakeCanvas.width and snakeCanvas.height define the boundaries of the game
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall 
}

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

// Prevent the snake from reversing
    
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
        if (keyPressed === LEFT_KEY && !goingRight){
            dx = -10;
            dy = 0;
        }

        if (keyPressed === UP_KEY && !goingDown){
            dx = 0;
            dy = -10;

        }
        if (keyPressed === RIGHT_KEY && !goingLeft){
            dx = 10;
            dy = 0;
        }
        
        if (keyPressed === DOWN_KEY && !goingUp){
            dx = 0;
            dy = 10;
        }
    }

//Function to change direction of snake.
//dx is the horizontal velocity of the snake.
//created a new head for the snake then added a new head to the beginningof the snake with snake.unshift
//and removed the last element of the snake using snake.pop.
function move_snake() {
    //Create the new snake head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    //Add the new head to the beginning of the snake body
    snake.unshift(head);
    const has_eaten_apple = snake[0].x === apple_x && snake[0].y === apple_y;
    if(has_eaten_apple) {
        // Increase score +1
        score += 1;
        //Display score
        document.getElementById("score").innerHTML = score;
        // Gen new food location
        gen_apples();
    } else {
    //Remove the last part of the snake body
    snake.pop();
    }
}




 


