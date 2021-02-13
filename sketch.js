var player, playerIMG;
var enemy, enemyIMG, enemyGroup;
var barrier;
var bluelaser, laserGroup, laserSound;
var hp=100,bar;
var score=0;

var back, backIMG;

var gameState=0;
var backStory=0;
var start=1;
var play=2;
var end=3;
var ammo=10;

function preload(){
  
  playerIMG= loadImage("Spaceship.png");
  playerDIMG=loadImage("blast.png")
  
  backIMG= loadImage("space.jpg")
  
  enemyIMG= loadImage("enemy.png");
  
  blueIMG= loadImage("bluelaser.png");
  
  laserSound= loadSound("heat-vision.mp3")
  blastSound= loadSound("Explosion+3.mp3")

  bar1= loadImage("hp100.png")
  bar2= loadImage("hp80.png")
  bar3= loadImage("hp60.png")
  bar4= loadImage("hp40.png")
  bar5= loadImage("hp20.png")  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  back=createSprite(200,200,20,20);
  back.addImage(backIMG);
  back.scale=2.5; 
  back.velocityY=2
  
  
  player=createSprite(width/2,height-100,20,20);
  player.addImage(playerIMG)
  player.scale=0.3;
  
  barrier= createSprite(width/2,height-50,width,10);
  barrier.visible=false;

  


  enemyGroup=new Group();
  laserGroup= new Group();
  

}

function draw() {
  background("white");

 
  
  if(back.y>400){
    back.y=200;
  }


  if(player.x<0||player.x>width){
    if(player.x<0){
      player.x=10;
    }
    if(player.x>width){
      player.x=width-10;
    }
    
  }
  
  if(gameState==start){
    

    
    if(keyDown("s")||keyDown("S")){
      gameState=play;
   
    }
  }else
    
  if(gameState==play){
      if(keyDown("LEFT_ARROW")){
    player.velocityX=-16;
  }
  
   if(keyDown("RIGHT_ARROW")){
    player.velocityX=16;
  }
  

  
  if(keyWentUp("LEFT_ARROW")||keyWentUp("RIGHT_ARROW")){
    player.velocityX=0;
  }

  if(enemyGroup.isTouching(laserGroup)){
    enemyGroup.destroyEach();
    laserGroup.destroyEach();
    score++;
    ammo++;
  }

  if(enemyGroup.isTouching(barrier)){
    enemyGroup.destroyEach();
    hp=hp-20;
    
  }

  
  
    if((hp==0)||(ammo==0)){
      gameState=end;
      
    }
  
  blueLaser();
  createEnemy();
  
  } else
    
  if(gameState==end){
    
    back. velocityY=0;
    player.velocityX=0;
    player.addImage(playerDIMG);

    
    
    //setTimeout(function() { if(gameState==end){ blastSound.stop();}}, 1000);
    

    
    if(keyDown("r")||keyDown("R")){

      blastSound.play()

      setTimeout(function() {  
        gameState=start;
        hp=100;
        score=0;
        player.x=width/2;
        back.velocityY=2;
        player.addImage(playerIMG)
        ammo=10;
  }, 1000);
     
    }
  }  
  

  
  
  drawSprites();

  strokeWeight(5)
  stroke("black")
  textSize(20)
  push ();
   fill ("red")
  
  text("score:"+score,20,20);
  text("hp:"+hp,width-100,height-600);
  pop ();

  push ();
  fill("lightGreen")
  text("Ammo:"+ammo,width-725,height-600)
  pop ();
  
  if(gameState==backStory){
   
    push();
    fill("lightBlue")
    text("⚠ Aliens are invading Earth ⚠",width-800,100);
    text("Protect your Planet",width-750,150)
    text("Use space to shoot and arrows to move",width-825,250);
    pop ();
    push();
    fill("yellow")
    text("Press C to continue",width-750,300);

    
    
    if(keyWentDown("c")||keyWentDown("C")){
     gameState=start;
    }
  }

  if(gameState==start){
    push();
    fill("red");
  
    text("As the game progresses:",width-775,100);
pop ();

push();
fill("white")
    text("Your weapon speed increases, but ammo depletes",width-900,150);
    text("The Aliens get faster ships",width-790,200);
    text("If Aliens are too close they damage your ship",width-870,250)
    text("As you hit Aliens your Ammo increases",width-825,300)
    text("If your ammo is over or ship HP=0, the ship will explode",width-915,350)
    pop();
    push();
    fill("yellow")
    text("Press S to start",width-725,400);
  }
  
  if(gameState==end){
    push();
    fill("red")
    text("Game Over!",width-700,100);
    text("SpaceShip Destroyed!",width-750,150)
    pop();

    push();
    fill("yellow")
    text("Press R to retry",width-725,200);
    pop();
  }
  
}

function createEnemy(){
  
  if(frameCount%100==0){
    enemy=createSprite(random(25,width-25),-50,20,20);
    enemy.addImage(enemyIMG);
    enemy.scale=0.5;
    
    enemy.velocityY=(3+(score/5));
    
    enemy.lifeTime=125;
    
    
    //enemy.debug=true;
    
    enemyGroup.add(enemy);
  }
}

function blueLaser(){
  
  if(keyWentDown("space")){

    bluelaser=createSprite(player.x,player.y-10,20,20);
    bluelaser.addImage(blueIMG);
    bluelaser.scale=0.15;
    
    bluelaser.velocityY=-6-(score/2);
    
    laserSound.play();
    
    //bluelaser.debug=true
    bluelaser.setCollider("rectangle",0,0,30,20)
   
    laserGroup.add(bluelaser);
    ammo=ammo-1;

  }
}














