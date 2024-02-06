//prevents arrow key page scrolling - credit https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


//closes the start game overlay
var startGameButton = function () {
    document.getElementById("remove1").style.display = "none";
}


//credit https://www.computerhope.com/issues/ch000178.htm
//menu page (about and scoreboard)
function windowClose() { //when used with close the tab (used for the about and scoreboard pages)
    window.open('','_parent','');
    window.close();
    }


//--------------------- game function ------------------------------
var sphereConsumer = function () {

    //making an array to store the canvas walls, ghosts and the food balls
    var walls = [];
    var foods = [];
    var badFoods = [];

    //game variables
    var move = 3; //distance the player moves per refresh
    var playerTime = 1; //set to 1 as it is 1 second behind otherwise

    //variables for playing sounds (credits to creators in about page)
    var eatFoodSound = new Audio('sounds/eatfood.ogg'); //making an audio for when the player eats food
    var loseGameSound = new Audio('sounds/die.wav'); //making an audio for when the player dies
    var winGameSound = new Audio('sounds/win.wav'); //making an audio for when the player wins

    //Art of silence by uniq
    //https://soundcloud.com/uniqofficial/
    //Attribution 4.0 International (CC BY 4.0)
    //https://creativecommons.org/licenses/by/4.0/
    //Music promoted by https://www.chosic.com/free-music/all/
    var backgroundMusic = new Audio('sounds/Art-Of-Silence_V2.mp3'); //background audio

    //constructors are credit to prac 4 collisions1.html
    //making a constructor to make many walls to be put into the array
    function Wall(x_loc,y_loc,wid,hig) {
        this.x=x_loc; //distance from left
        this.y=y_loc; //distance from top
        this.w=wid; //width of wall
        this.h=hig; //height of wall
        this.colour="#5454b8";
        this.draw_wall=draw_wall;
    }

    //making a constructor to make many food balls to be put into the array
    function Food(x_loc,y_loc,wid,hig) {
        this.x=x_loc; //distance from left
        this.y=y_loc; //distance from top
        this.w=wid; //width of food
        this.h=hig; //height of food (make same as width)
        this.colour="#1be014";
        this.draw_food=draw_food;
    }


    //making a constructor to make badFood to be put into an array 
    function badFood(x_loc,y_loc,wid,hig) {
        this.x=x_loc; //distance from left
        this.y=y_loc; //distance from top
        this.w=wid; //width of food
        this.h=hig; //height of food (make same as width)
        this.colour="#1be014";
        this.draw_badFood=draw_badFood;
    }


    //making a constructor to make a safe area for the player to see the badFood
    function safeArea(x_loc,y_loc,wid,hig) {
        this.x=x_loc; //distance from left
        this.y=y_loc; //distance from top
        this.w=wid; //width of food
        this.h=hig; //height of food (make same as width)
        this.colour="#dd4df0";
        this.draw_safeArea=draw_safeArea;
    }


    //making a constructor to make the player/character 
    function Character(x_loc,y_loc,wid,hig) {
        this.x=x_loc; //distance from left
        this.y=y_loc; //distance from top
        this.w=wid; //width of player
        this.h=hig; //height of player (make same as width)
        this.colour="#cef700";
        this.draw_character=draw_character;
    }



    //making the player character - with colour from persistent storage
    var playerModel = new Character (388,288,25,25);

    //safebox area
    var safeBox=new safeArea(350,275,100,50);


    //function to start the game (ran on the options menu button)
    function start_game() {

        //playing the background music and making it loop when it finishes
        backgroundMusic.play(); //plays the background music when page is opened
        backgroundMusic.loop=true; //makes the background audio loop when finished


        //canvas = 800w and 600h

        //clears the entire canvas
        ctx.clearRect(0, 0, mycanv.width, mycanv.height);

    
        //add all of the walls to an array
        //(xpos, ypos, width, height)

        //left wall-------------------------------------------------
        var a=new Wall(100,100,10,400); //creates wall
        walls.push(a); //puts it into the array
        //top wall
        var a=new Wall(100,100,600,10);
        walls.push(a); 
        //right wall
        var a=new Wall(700,100,10,400);
        walls.push(a); 
        //bottom wall
        var a=new Wall(100,500,610,10);
        walls.push(a); 


        //add all of the food to their array-------------------------
        //left->right
        var b=new Food(117,180,10,10); //creates food
        foods.push(b); //puts it into the array
        var b=new Food(120,250,10,10);
        foods.push(b);
        var b=new Food(122,320,10,10);
        foods.push(b);
        var b=new Food(125,439,10,10);
        foods.push(b);
        var b=new Food(155,150,10,10);
        foods.push(b);
        var b=new Food(158,224,10,10);
        foods.push(b);
        var b=new Food(160,278,10,10);
        foods.push(b);
        var b=new Food(160,366,10,10);
        foods.push(b);
        var b=new Food(190,200,10,10);
        foods.push(b);
        var b=new Food(200,412,10,10);
        foods.push(b);
        var b=new Food(210,130,10,10);
        foods.push(b);
        var b=new Food(220,250,10,10);
        foods.push(b);
        var b=new Food(234,330,10,10);
        foods.push(b);
        var b=new Food(247,171,10,10);
        foods.push(b);
        var b=new Food(247,436,10,10);
        foods.push(b);
        var b=new Food(265,124,10,10);
        foods.push(b);
        var b=new Food(270,243,10,10);
        foods.push(b);
        var b=new Food(270,346,10,10);
        foods.push(b);
        var b=new Food(274,473,10,10);
        foods.push(b);
        var b=new Food(295,156,10,10);
        foods.push(b);
        var b=new Food(300,205,10,10);
        foods.push(b);
        var b=new Food(304,276,10,10);
        foods.push(b);
        var b=new Food(317,337,10,10);
        foods.push(b);
        var b=new Food(323,441,10,10);
        foods.push(b);
        var b=new Food(324,145,10,10);
        foods.push(b);
        var b=new Food(326,212,10,10);
        foods.push(b);
        var b=new Food(355,173,10,10);
        foods.push(b);
        var b=new Food(359,245,10,10);
        foods.push(b);
        var b=new Food(362,366,10,10);
        foods.push(b);
        var b=new Food(375,422,10,10);
        foods.push(b);
        var b=new Food(400,142,10,10);
        foods.push(b);
        var b=new Food(404,226,10,10);
        foods.push(b);
        var b=new Food(410,342,10,10);
        foods.push(b);
        var b=new Food(412,393,10,10);
        foods.push(b);
        var b=new Food(429,435,10,10);
        foods.push(b);
        var b=new Food(430,122,10,10);
        foods.push(b);
        var b=new Food(450,164,10,10);
        foods.push(b);
        var b=new Food(460,290,10,10);
        foods.push(b);
        var b=new Food(469,457,10,10);
        foods.push(b);
        var b=new Food(474,231,10,10);
        foods.push(b);
        var b=new Food(478,393,10,10);
        foods.push(b);
        var b=new Food(500,131,10,10);
        foods.push(b);
        var b=new Food(502,219,10,10);
        foods.push(b);
        var b=new Food(506,306,10,10);
        foods.push(b);
        var b=new Food(510,470,10,10);
        foods.push(b);
        var b=new Food(532,251,10,10);
        foods.push(b);
        var b=new Food(540,363,10,10);
        foods.push(b);
        var b=new Food(547,462,10,10);
        foods.push(b);
        var b=new Food(548,122,10,10);
        foods.push(b);
        var b=new Food(562,216,10,10);
        foods.push(b);
        var b=new Food(570,312,10,10);
        foods.push(b);
        var b=new Food(575,403,10,10);
        foods.push(b);
        var b=new Food(583,443,10,10);
        foods.push(b);
        var b=new Food(603,137,10,10);
        foods.push(b);
        var b=new Food(607,212,10,10);
        foods.push(b);
        var b=new Food(612,264,10,10);
        foods.push(b);
        var b=new Food(615,365,10,10);
        foods.push(b);
        var b=new Food(625,413,10,10);
        foods.push(b);
        var b=new Food(636,478,10,10);
        foods.push(b);
        var b=new Food(648,136,10,10);
        foods.push(b);
        var b=new Food(654,179,10,10);
        foods.push(b);
        var b=new Food(658,234,10,10);
        foods.push(b);
        var b=new Food(665,345,10,10);
        foods.push(b);
        var b=new Food(670,384,10,10);
        foods.push(b);
        var b=new Food(672,419,10,10);
        foods.push(b);
        var b=new Food(680,451,10,10);
        foods.push(b);

        
        //add all of the bad food to the array------------------------
        //left->right
        var c=new badFood(115,120,10,10); //creates badFood
        badFoods.push(c); //puts it into the array
        var c=new badFood(160,460,10,10);
        badFoods.push(c);
        var c=new badFood(205,315,10,10);
        badFoods.push(c);
        var c=new badFood(250,210,10,10);
        badFoods.push(c);
        var c=new badFood(295,405,10,10);
        badFoods.push(c);
        var c=new badFood(340,130,10,10);
        badFoods.push(c);
        var c=new badFood(385,455,10,10);
        badFoods.push(c);
        var c=new badFood(430,210,10,10);
        badFoods.push(c);
        var c=new badFood(475,145,10,10);
        badFoods.push(c);
        var c=new badFood(495,350,10,10);
        badFoods.push(c);
        var c=new badFood(520,430,10,10);
        badFoods.push(c);
        var c=new badFood(565,185,10,10);
        badFoods.push(c);
        var c=new badFood(610,470,10,10);
        badFoods.push(c);
        var c=new badFood(655,310,10,10);
        badFoods.push(c);



        //amount of game refeshes per second - 60 times per second
        game_id=setInterval(game_loop, 16);

        //refreshing the time_score every second to increment player time
        time_id=setInterval(time_score,1000);

    }


    //this function is used to makes the value in the span tag = playerTime
    function time_score() {
        document.getElementById("time").innerHTML=playerTime;
        playerTime = playerTime + 1; //increments the playerTime by 1 each time the loop runs
    }



    function game_loop() {
        //this will redraw the game every 10ms

        //clear canvas
        ctx.clearRect(0, 0, mycanv.width, mycanv.height);


        //----------------------WALLS DRAW AND COLLISIONS(ALL SIDES)---------------------------------
        //Credit from prac 4 collisions1.html for loop logic
        //left of a wall
        for (i=0;i<walls.length;i++) { //for the length of walls
            walls[i].draw_wall(ctx); //draw the iterated wall
            if (xlWallCollides(walls[i],playerModel)) { //check for collision to left of wall with playerModel
                //if collision returns true
                playerModel.x -=3; //move playerModel 3 to the left
                // console.log("collide xl");
            }
        } 

        //Credit from prac 4 collisions1.html for loop logic
        //right of a wall
        for (i=0;i<walls.length;i++) {
            walls[i].draw_wall(ctx);
            if (xrWallCollides(walls[i],playerModel)) { //check for collision to right of wall with playerModel
                //if collision returns true
                playerModel.x +=3; //move playerModel 3 to the right 
                // console.log("collide xr");
            } 
        }

        //Credit from prac 4 collisions1.html for loop logic
        //top of a wall
        for (i=0;i<walls.length;i++) {
            walls[i].draw_wall(ctx);
            if (ytWallCollides(walls[i],playerModel)) { //check for collision to top of wall with playerModel
                //if collision returns true
                playerModel.y -=3; //move playerModel 3 up
                // console.log("collide yt");
            }
        }

        //Credit from prac 4 collisions1.html for loop logic
        //bottom of a wall
        for (i=0;i<walls.length;i++) {
            walls[i].draw_wall(ctx);
            if (ybWallCollides(walls[i],playerModel)) { //check for collision to bottom of wall with playerModel
                //if collision returns true
                playerModel.y +=3; //move playerModel 3 down
                // console.log("collide yb");
            }
       }


        //----------------------FOOD DRAW AND COLLISION---------------------------------
        //Credit from prac 4 collisions1.html for loop logic
        //a loop to draw the food and to check for collisions between them and the playerModel
        for (i=0;i<foods.length;i++) { //for the length of foods array
            foods[i].draw_food(ctx); //draw each iterated food
            if (foodCollides(foods[i],playerModel)) { //check for collision between food and playerModel
                //if collision returns true
                eatFoodSound.play();
                foods.splice(i, 1); //remove the collided food from the array
            }
       }



        //----------------------PLAYER IN SAFE AREA COLLISION and Draw Bad Food-------------------
        //Credit from prac 4 collisions1.html for loop logic
        //a loop to draw the bad food and to check for collisions between them and the playerModel
        for (i=0;i<badFoods.length;i++) { //for the length of badfoods array
            badFoods[i].draw_badFood(ctx); //draw each iterated bad food
            if(safeAreaCollides(safeBox,playerModel)) { //check for collision between safeArea and playerModel
                //if collision returns true
                badFoods[i].colour="#ff1100"; //if player is in the safebox, show the bad food as red
            } else {
                badFoods[i].colour="#1be014"; //else make it the same green as the normal food
            }
        }


    

        //these draw functions are how so that they don't draw onto canvas after a game-ending function has been called
        //draw the safe area
        safeBox.draw_safeArea(ctx);

        //draws the character model at the end of each gameloop
        playerModel.draw_character(ctx);
        


        //----------------------BAD FOOD DRAW AND COLLISION---------------------------------
        //Credit from prac 4 collisions1.html for loop logic
        //a loop to draw the food and to check for collisions between them and the playerModel
        for (i=0;i<badFoods.length;i++) { //for the length of foods array
            badFoods[i].draw_badFood(ctx); //draw each iterated food
            if (badFoodCollides(badFoods[i],playerModel)) { //check for collision between food and playerModel
            //if collision returns true
                loseGameSound.play(); //plays the lose game sound
                badFoods.splice(i, 1); //remove the collided food from the array
                failed_game(); //runs the failed_game function 
            }
        }


       //if array of food == empty, end the game
       if (foods.length == 0) {
        win_game(); //runs the stop_game() function
       }

       //end of start_game() function
    }
       
    


//-----------------------COLLISIONS--------------------------------
    //make wall collides with each side (l=left and r=right t=top (of wall) b=bottom (of wall))
    
    //I did these individually so that I could change the position of the player based on each interesection

    //Credit from prac 4 collisions1.html for collision logic
    //checking for collision with left of wall
    function xlWallCollides(wall,playerModel) {
        //if doesn't intersect with left of wall
        if (playerModel.x + playerModel.w < wall.x-5) return(false); 
        //if does intersect with left of wall
        return true;
    }
        
    //Credit from prac 4 collisions1.html for collision logic
    //checking for collision with right of wall
    function xrWallCollides(wall,playerModel) {
        //if doesn't intersect with right of wall
        if (playerModel.x > wall.x + wall.w-10) return(false);
        //if does intersect with right ofwall
        return true;
    }

    //Credit from prac 4 collisions1.html for collision logic
    //checking for collision with top of wall
    function ytWallCollides(wall,playerModel) {
        //if doesn't intersect with top of wall
        if (playerModel.y + playerModel.w < wall.y-10) return(false);
        //if does intersect with top of wall
        return true;
    }

    //Credit from prac 4 collisions1.html for collision logic
    //checking for collision with bottom of wall
    function ybWallCollides(wall,playerModel) {
        //if doesn't intersect with bottom of wall
        if (playerModel.y > wall.x + wall.w-10) return(false);
        //if does intersect with bottom of wall
        return true;
    }

    //Credit from prac 4 collisions1.html for collision logic
    function foodCollides(food,playerModel) {
        //checks for collisions between the character and food
        //checking that the player isn't intersecting with any of the food
        if (playerModel.y + playerModel.h < food.y) return(false);
        if (playerModel.y > food.y + food.h) return(false);
        if (playerModel.x + playerModel.w < food.x) return(false);
        if (playerModel.x > food.x + food.w) return(false);

        //if the playerModel intersects with any of the food, then return true.
        return true; 
    }


    //Credit from prac 4 collisions1.html for collision logic
    function badFoodCollides(badfood,playerModel) {
        //checks for collisions between the character and food
        //checking that the player isn't intersecting with any of the badfood
        if (playerModel.y + playerModel.h < badfood.y) return(false);
        if (playerModel.y > badfood.y + badfood.h) return(false);
        if (playerModel.x + playerModel.w < badfood.x) return(false);
        if (playerModel.x > badfood.x + badfood.w) return(false);

        //if the playerModel intersects with any of the badfood, then return true.
        return true; 
    }


    //Credit https://users.aber.ac.uk/eds/CS252_games/jab68/ftw/     - lines 307-342   - function checkLevelComplete()
    //renamed function, variable names and the names of the boxes that I was checking collision between
    function safeAreaCollides(safeBox,playerModel) {
        //checking if the top left of playerModel is inside the safe area
        var playerTouchXAxis = ((playerModel.x >= safeBox.x) && (playerModel.x <= (safeBox.x + safeBox.w)));
        var playerTouchyAxis = ((playerModel.y >= safeBox.y) && playerModel.y <= (safeBox.y + safeBox.h));

        //a variable for checking that the top left of the player intersects the safearea. only created when both variables == true
        var playerTopLeft = (playerTouchXAxis == true && playerTouchyAxis == true);



        //checking if the top right of playerModel is inside the safe area
        playerTouchXAxis = ((playerModel.x + playerModel.w) >= safeBox.x) && (playerModel.x + playerModel.w <=(safeBox.x + safeBox.w));
        playerTouchyAxis = ((playerModel.y >= safeBox.y) && playerModel.y <= (safeBox.y + safeBox.h));

        //a variable for checking that the top right of the player intersects the safearea. only created when both variables == true
        var playerTopRight = (playerTouchXAxis == true && playerTouchyAxis == true);



        //checking if the bottom right of playerModel is inside the safe area
        playerTouchXAxis = ((playerModel.x >= safeBox.x) && (playerModel.x <= (safeBox.x + safeBox.w)));
        playerTouchyAxis = (((playerModel.y + playerModel.h) >= safeBox.y) && (playerModel.y + playerModel.h) <= (safeBox.y + safeBox.h));

        //a variable for checking that the bottom right of the player intersects the safearea. only created when both variables == true
        var playerBottomRight = (playerTouchXAxis == true && playerTouchyAxis == true);



        //checking if the bottom left of playerModel is inside the safe area
        playerTouchXAxis = ((playerModel.x >= safeBox.x) && (playerModel.x <= (safeBox.x + safeBox.w)));
        playerTouchyAxis = (((playerModel.y + playerModel.h) >= safeBox.y) && (playerModel.y + playerModel.h) <= (safeBox.y + safeBox.h));

        //a variable for checking that the bottom left of the player intersects the safearea. only created when both variables == true
        var playerBottomLeft = (playerTouchXAxis == true && playerTouchyAxis == true);


        //now check and return true when all points of the player are within the safearea
        if ((playerTopLeft == true && playerTopRight == true) && (playerBottomRight == true && playerBottomLeft == true)) {
            return true;
        } else {
            return false;
        }
    }   





    //-------------------FUNCTIONS FOR DRAWING PLAYER, FOOD, BadFood AND Walls-------------------
    //Credit from prac 4 collisions1.html for drawing logic

    //drawing walls
    function draw_wall(ctx) {
        ctx.fillStyle=this.colour; //sets the colour I set in the walls constructor 
        ctx.fillRect(this.x, this.y, this.w, this.h); //fills in the space between points from each item in the array
    }

    //drawing food
    function draw_food(ctx) {
        ctx.fillStyle=this.colour; //sets the colour I set in the drawFood constructor 
        ctx.fillRect(this.x, this.y, this.w, this.h); //fills in the space between points from each item in the array
    }

    function draw_badFood(ctx) {
        ctx.fillStyle=this.colour; //sets the colour I set in the badFood constructor 
        ctx.fillRect(this.x, this.y, this.w, this.h); //fills in the space between points from each item in the array
    }


    function draw_safeArea(ctx) {
        ctx.fillStyle=this.colour; //sets the colour I set in the safeArea constructor 
        ctx.fillRect(this.x, this.y, this.w, this.h); //fills in the space between points from each item in the array
    }

    //drawing the character
    function draw_character(ctx) {
        ctx.fillStyle=this.colour; //sets the colour I set in the character constructor 
        ctx.fillRect(this.x, this.y, this.w, this.h); //fills in the space between points from each item in the array
    }



    //functions to change the player direction and movement around the canvas---------------------------
    //Credit from prac 4 collisions1.html for keypress logic
    //called when player uses left arrow
    function move_left() { 
        playerModel.x -= move; //moves player left by distance of move (3)
    }

    //called when player uses up arrow
    function move_up() {
        playerModel.y -= move; //moves player up by distance of move (3)
    }

    //called when player uses right arrow
    function move_right() {
        playerModel.x += move; //moves player right by distance of move (3)
    } 

    //called when player uses down arrow
    function move_down() {
        playerModel.y += move; //moves player down by distance of move (3)
    }
    
    


    //adding an event listener to look for keyboard inputs - credits keypress.html - prac4
    document.onkeydown= function(event) {
    
        //makes a variable to set equal to a keypress
        var keyCode;  
    
        if(event == null) {
            keyCode = window.event.keyCode; 
        } else {
            keyCode = event.keyCode; 
        }
        console.log(keyCode);
        switch(keyCode) {
            // left arrow pressed/held runs move_left() function
            case 37: move_left(); break; 
            // up arrow pressed/held runs move_up() function
            case 38: move_up(); break; 
            // right arrow pressed/held runs move_right() function
            case 39: move_right(); break; 
            // down arrow pressed/held runs move_down() function
            case 40: move_down(); break; 

            default: break; 
        } 
    }



    //setting up the canvas
    var mycanv=document.getElementById("gamecanvas");
    var ctx=mycanv.getContext("2d");


    //stopping the game (when array of food is empty)-------------------------------------------------
    function win_game() {
        //DO submit user time to scoreboard in <span> tag then clear
        clearInterval(game_id); //stops running the gameloop
        clearInterval(time_id); //stops running the timeloop
        ctx.clearRect(0, 0, mycanv.width, mycanv.height); //clears the canvas
        
        //plays the win game sound
        winGameSound.play();

        ctx.font='30px Arial'; //sets size of font for the canvas to 30px and font-family arial
        ctx.fillStyle="Black"; //sets the colour of text to black
        ctx.fillText("Congratz! Do you want to go again?", 155, 300); //writes message as x and y 

        //shows the button for winning the game
        document.getElementById("restartbtnDIVw").style.display = "block";
    }



    //if the players collides with badfood GAME END
    function failed_game() {
        //used to test a game win without actually eating all of the good food
        // foods.splice(0, foods.length); 
        badFoods.splice(0, badFoods.length); //empty the array of badfoods as would print them out when game ends
        clearInterval(game_id); //stops running the gameloop
        clearInterval(time_id); //stops running the timeloop
        ctx.clearRect(0, 0, mycanv.width, mycanv.height); //clears the canvas
        ctx.font="30px Arial"; //sets size of font for the canvas to 30px and font-family arial
        ctx.fillStyle="Black"; //sets the colour of text to black
        ctx.fillText("Not this time! Press button to go again!", 150, 300); //writes message as x and y 
        //shows the button for losing the game (different colour and functionality - no submit button)
        document.getElementById("restartbtnDIV").style.display = "block";
    }

 
    //restart game button that runs the restart game function and hides the button - win
    //called when plays clicks on the play again button after winning
    document.getElementById("restartbtnw").onclick = function () {
        restart_game(); //runs restart game function
        document.getElementById("restartbtnDIVw").style.display = "none"; //hides the button
    }


    //restart game button that runs the restart game function and hides the button - lose
    //called when plays clicks on the play again button after losing 
    document.getElementById("restartbtn").onclick = function () {
        restart_game(); //runs restart game funcr=tion
        document.getElementById("restartbtnDIV").style.display = "none"; //hides the button
    }


    //when players clicks on the toggle audio button...
    document.getElementById("playpauseBTN").onclick = function () {
        //allows for the user to play and pause the background music
        return backgroundMusic.paused ? backgroundMusic.play() : backgroundMusic.pause();
    }
    


    //restarts the game by resetting values to default
    function restart_game() {
        //resetting the playerTime to 1
        playerTime = 1; 
        //reinitialize the character to reset its location
        playerModel = new Character (388,288,25,25);
        //run start game function
        start_game();
    }
    

    return { 
        start_game: start_game
    }


}()




//------------------------DATABASE FUNCTIONS------------------------
var canvas_game_db = function () {

    //refresh the table on page refresh
    function print_table() {

    }

    //credit prac4 ajax_form example (createnewperson function)
    //add the playerName and the playerScore (upon collecting all of the real food)
    function table_insert() {
        var playerNameScore = new FormData(document.getElementById("body")); //makes the body a new FormData
        var myAsyncCreateRequest = new XMLHttpRequest(); //creates XMLHttpRequest
        
        myAsyncCreateRequest.onreadystatechange = function() {

            if (this.readyState == 4) {
                if (this.status == 200) {
                        //run the update scoreboard function
                    } else {
                        //stuff
                    }
                }
            }
            //opens a post request to the scoreboard_insert.php file
            myAsyncCreateRequest.open("POST", "scoreboard_insert.php");
            //sends the playerNameScore variable 
            myAsyncCreateRequest.send(playerNameScore);
        }



    //credit prac4 ajax_form example (init_form function)
    function run_form() {
        // add a listener to create a new person entry
        var newPerson = document.getElementById("body");
        newPerson.addEventListener("submit",            //when a submit button is pressed (only one of the playagain button after a win)
            function (e) { e.preventDefault(); 
                            table_insert(newPerson);    //runs function table_insert with the value of newPerson
                            });
    }

    return {
        run_form: run_form
    }

}()





        
    