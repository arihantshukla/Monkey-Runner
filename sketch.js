var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0;
var ground
var survivaltime = 0;
var forest,forestImage
var gameState="play"
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  foodImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestImage=loadImage("animated forest.jpg")

}



function setup() {
  createCanvas(600, 600)
  background("white") 
  
  forest=createSprite(400,300,800,400)
  forest.addImage("forest",forestImage)
  forest.x=forest.width/2
  
  
  
  
  ground = createSprite(400, 530, 800, 10)
  ground.x = ground.width / 2
ground.visible=false;
  
  
  monkey = createSprite(100, 530, 30, 30)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.11
  
 
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  score=0;
}

function draw() {
  //console.log(frameCount)
  background("white")
   console.log(monkey.y)
 
  
  if(gameState==="play"){
    ground.velocityX = -5;
  if (ground.x > 200) {
    ground.x = ground.width / 2;
  }
    
  
  forest.velocityX= - 5;
  if(forest.x>100){
    forest.x=forest.width/2;
  }
  if (keyDown("space") && monkey.y >= 491) {
    monkey.velocityY = -14;

    
  }
  //increasesize();
    
  monkey.velocityY = monkey.velocityY + 0.6
  

  // console.log(ground.y)
  banana1();
  OBSTACLES1();
  //  increasesize();
  
  score1();
    if(monkey.isTouching(obstacleGroup)){
         gameState="end"
      
    }
  }
  else if(gameState==="end");{
    background("black")
   textSize(20)
    fill("green")
    text("Game Over...",300,400)
    
    if(keyDown("space")&&gameState==="end"){
      reset();
    }
   // console.log(gameState)
    
  }
  monkey.collide(ground)
  
  
  //console.log(monkey.y)

  drawSprites();
  stroke("white")
  textSize(20);
  fill("white")
  text("Score: "+ score, 500,50);
  

}

function banana1() {
  if (frameCount % 80 === 0) {
    food = createSprite(300, 400, 200, 200)
    food.addImage(foodImage)
    food.scale = 0.1
    food.y = Math.round(random(270, 390))

    food.velocityX = -5;
    food.lifetime = 300;
    foodGroup.add(food);
  }


}

function OBSTACLES1() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 485, 200, 200)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2

     if(survivaltime%10===0){
       obstacle.velocityX=obstacle.velocityX+3
     }
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
  }

}
function increasesize(){
 if(score===10||(score===20)){
   monkey.scale=monkey.scale+0.01
 }
  if(score===30||(score===40)){
   monkey.scale=monkey.scale+0.01
 }
  if(score===50||(score===60)){
   monkey.scale=monkey.scale+0.01
 }
  if(score===70||(score===80)){
   monkey.scale=monkey.scale+0.01
 }
  
}
function reset(){
  forest=createSprite(400,300,800,400)
  forest.velocityX=5;
  forest.addImage("forest",forestImage)
  monkey.x=100;
  monkey.y=530;
  score=0;
  ground.x=400
    ground.y=530
  ground.velocityX=-5
  monkey.depth=forest.depth;
  monkey.depth=monkey.depth+1
  monkey.collide(ground)
  ground.visible=true;
  
  gameState="play"
  
}


function score1(){
  
  if(monkey.isTouching(foodGroup)){
    score=score+1
    foodGroup.destroyEach();
  }
}