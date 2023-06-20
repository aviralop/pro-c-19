var play=1
var emd=0
var gameState=play


var monkey, monkey_running
var  score=0
var forest
var gameOver, restart
var ground
var forest
var download



function preload(){

monkey = loadImage("monkey.png")
monkey_running=loadImage("monkey_running.jpg")
download=loadImage("download.jpg")
forest=loadImage("forest.png")
gameOver=loadImage("gameOver.png")
ground=loadImage("ground.png")
restrat=loadImage("restart.png")
}

function setup() {
 createCanvas(windowWidth,windowHeight)

 monkey = createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.5

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300,140);
  restart.addImage(restartImg);



  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

downloadGroup = newGroup()

 score=0

}

function draw() {
 
    background(255);
    text("Score: "+ score, 500,50);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);

        if(touches.length>0 || keyDown("space") && monkey.y >= 159) {
            trex.velocityY = -12;
            touches=[]
          }
          monkey.velocityY = monkey.velocityY + 0.8

          if (ground.x < 0){
            ground.x = ground.width/2;
          }

          trex.collide(invisibleGround);
         spawnDownloads()

          if(downloadGroup.isTouching(monkey)){
            gameState = END;
        }
      }
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;

        ground.velocityX = 0;
    trex.velocityY = 0;
    downloadGroup.setVelocityXEach(0)
    
    monkey.changeAnimation("monkey.png")

    downloadGroup.setLifetimeEach(-1)

    if(mousePressedOver(restart)) {
        reset();
      }
    }


drawSprites()

}

function spawnDownloads() {

    if(frameCount % 60 === 0) {
        var download = createSprite(600,165,10,40);
        download.velocityX = -(6 + 3*score/100);

        var rand = Math.round(random(1,6))

        switch(rand) {
            case 1: download.addImage(download);
                        break;
                        default: break;
        }
        download.scale = 0.5;
        download.lifetime = 300;
        downloadGroup.add(download);
      }
    }


    function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        downloadGroup.destroyEach();
        
        monkey.changeAnimation("running",monkey_running);
        
       
        
        score = 0;
        
      }





                
