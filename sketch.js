var bird, birdImage, start, startImage, edges, deadSound, pipesGroup, beep, obstacle, obstacle1, score;
var PLAY=1;
var END=0;
var gameState;

function preload(){
  
  birdImage = loadImage("animate-bird-preview.jpg");
  startImage = loadImage("press to start.png");
  deadSound = loadSound("roblox-death-sound_1.mp3")
  beep = loadSound("beep-07.mp3");
}

function setup() {
  createCanvas(400,400);
  
  start = createSprite(200,200);
  start.addImage(startImage);
  start.scale=0.1;
  
  bird = createSprite(50,200,30,30);
  bird.addImage(birdImage);
  bird.scale=0.2;
  
  gameState=END
  
  edges = createEdgeSprites();
  
  pipesGroup = new Group();
  
  score = 0;

}

function draw() {
  background("white");
  
  text("Distance flown: " + score, 200, 15);
  
  bird.setCollider("circle",0,0,40);
  
  if (gameState===PLAY) {
    
    score = score + Math.round(frameCount/100);
    
    bird.velocityY = bird.velocityY + 0.8;
  
    if (keyDown("space") || touches.length > 0) {
      bird.velocityY = -8;
      touches = {}
      beep.play();
    }
    
    start.visible = false;
    
    if (bird.isTouching(edges)) {
      gameState = END;
      deadSound.play();
    }
    
    pipes();
    
    if (bird.isTouching(pipesGroup)) {
      gameState = END;
      deadSound.play();
    }
  } 
  
  else if (gameState === END) {
    
    bird.velocityX = 0;
    bird.velocityY = 0;
    
    start.visible = true;
    
    bird.x = 50;
    bird.y = 200;
    
    pipesGroup.setVelocityXEach(0);
    pipesGroup.lifetime = -1;
    pipesGroup.destroyEach();
    
    if (mousePressedOver(start) || touches.length>0) {
      gameState = PLAY;
      score = 0;
      touches = []
    }
  }
  
  drawSprites();
}

function pipes() {
  if (frameCount%100===0){
  obstacle = createSprite(430, 0, 30, 250);
  obstacle1 = createSprite(430, 385,30, 75);
  r=Math.round(random(1,5));
    if (r == 1) {
      obstacle.height = 495;
      obstacle1.y = 385;
      obstacle1.height = 75;
    } else if (r == 2) {    
      obstacle.height = 155;
      obstacle1.y = 385;
      obstacle1.height = 420;
    } else if (r == 3) {
      obstacle.height = 290;
      obstacle1.y = 385;
      obstacle1.height = 265;
    } else if (r == 4) {
      obstacle.height = 60;
      obstacle1.y = 385;
      obstacle1.height = 500;
    } else if (r == 5) {
      obstacle.height = 570;
      obstacle1.y = 390;
      obstacle1.height = 23;
    }
   
    obstacle.velocityX = -(6 + score/3000);
    obstacle1.velocityX = -(6 + score/3000);
    obstacle.setLifetime=100;
    obstacle1.setLifetime=100;
    
    pipesGroup.add(obstacle);
    pipesGroup.add(obstacle1);
   }
}

