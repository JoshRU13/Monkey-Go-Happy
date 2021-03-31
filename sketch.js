var monkey,monkeyImage
var ground,backImage
var survivalTime
var back
var score
var bananaG,obstacleG
var gameState = "play"
function preload(){
  backImage=loadImage("jungle.jpg")
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  bananaImage=loadImage("banana.png")
  obstacleImage=loadImage("stone.png")
}
function setup(){
  createCanvas(400,400);
  back=createSprite(200,200,400,400)
back.addImage("jungle",backImage)
//back.scale=0.2
back.velocityX=-4
back.x=back.width/2
score = 0
  
  
monkey = createSprite(100,325,20,50);
monkey.addAnimation("monkey",monkeyImage)
monkey.scale = 0.2
//monkey.debug=true
monkey.setCollider("circle",0,0,175)
ground = createSprite(400,380,800,10);
ground.velocityX = -4;
ground.x=ground.width/2;
ground.visible = false;
survivalTime = 0;
bananaG=new Group();
obstacleG= new Group();
}

function draw(){
  background(255);
  if(gameState==="play"){
if(ground.x<0){
  ground.x=ground.width/2;
}
if(back.x<0){
  back.x=back.width/2;
}

if(keyDown("space")&&monkey.y>320){
  monkey.velocityY=-20
}
monkey.velocityY=monkey.velocityY+1
spawnObstacles()
spawnBanana() 
if(bananaG.isTouching(monkey)){
  bananaG.destroyEach()
  score = score+1
}
survivalTime=Math.ceil(frameCount/frameRate())
monkey.collide(ground);
  }
  drawSprites();
  if(gameState==="end"){
  bananaG.setVelocityXEach(0)
obstacleG.setVelocityXEach(0)
  bananaG.setLifetimeEach(-1)
  obstacleG.setLifetimeEach(-1)
  monkey.velocityY=0
}
  //if(gameState==="play"){
    stroke("black");
textSize(20);
fill("black");
text("Survival Time: "+survivalTime,50,50);
text("Score:"+score,250,50);
if(obstacleG.isTouching(monkey)){
text("GAME OVER",150,100)
back.velocityX=0
gameState="end"
}
  //}
}

function spawnBanana() {
  if(frameCount%100===0){
    var banana = createSprite(400,random(100,200),20,20);
    banana.addImage("Banana",bananaImage);
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.scale = 0.1
    bananaG.add(banana)
  }
}
function spawnObstacles() {
  if(frameCount%300===0){
    var obstacle = createSprite(400,380,20,20);
    obstacle.addImage("Stone",obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.13
    obstacleG.add(obstacle)
    //obstacle.debug=true
    obstacle.setCollider("circle",0,0,100)
  }
}