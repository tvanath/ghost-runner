var ghost,ghostImg;
var tower,towerImg;
var climber,climberImg;
var door,doorImg;
var spooky;

var over,overImg;
var reset,resetImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var climberG,doorG

function preload(){
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  overImg = loadImage("you lose.png");
  resetImg = loadImage("restart1.png");
  
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  if(gameState === PLAY){
    spooky.play();
  }
  
  tower = createSprite(300,300,20,20);
  tower.addImage("tower",towerImg);
  
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;
  ghost.setCollider("circle",20,0,140);
  //ghost.debug = true;
  
  over = createSprite(300,300,20,20);
  over.addImage("over",overImg);
  
  reset = createSprite(300,450,30,30);
  reset.addImage("reset",resetImg);
  reset.scale = 0.3;
  reset.setCollider("rectangle",0,0,450,200);
  //reset.debug = true;
  
  climberG = new Group();
  doorG = new Group();
  
}

function draw(){
  background(220);
  
  createEdgeSprites();
  
  if(gameState === PLAY){
    
    ghost.visible = true;
    over.visible = false;
    reset.visible = false;
    
    
    
    tower.velocityY = 2;
    
    createDoor();
    
    ghost.velocityY = ghost.velocityY+0.6;
    
    if(keyDown("space")){
      ghost.velocityY = -2;
    }
    
    if(keyDown("right")){
      ghost.x = ghost.x+5;
    }
    
    if(keyDown("left")){
      ghost.x = ghost.x-5;
    }
    
    
    if(tower.y>600){
      tower.y = 300
    }
    
    if(ghost.isTouching(climberG) || ghost.y>650){
      gameState = END;
    }
    
    
  }
  
  if(gameState === END){
    
    ghost.visible = false;
    over.visible = true;
    reset.visible = true;
    
    tower.velocityY = 0;
    
    doorG.destroyEach();
    climberG.destroyEach();
    
  if(mousePressedOver(reset)){
    gameState = PLAY;
    ghost.visible = true;
    ghost.y = 300;
    ghost.velocityY = 0;
    ghost.velocityY = ghost.velocityY+0.6;
  }
    
  }
  
  drawSprites();
  
  if(gameState === END){
    textSize(40);
    fill("red");
    //text("press R to restart",160,460);
  }
  
}

function createDoor(){
  if(frameCount%200 === 0){
    door = createSprite(Math.round(random(200,400),-500,20,20));
    climber = createSprite(20,50,20,20);
    
    door.addImage("door",doorImg)
    climber.addImage("climber",climberImg);
    
    climber.x = door.x;
    
    door.velocityY = 2;
    climber.velocityY = 2;
    
    
    doorG.add(door);
    climberG.add(climber);
    
  }
}


