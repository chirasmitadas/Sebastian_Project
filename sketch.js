var boundary1,boundary2,boundary3,boundary4,boundary5;
var wall1,wall2,wall3,wall4;
var rabit,rabitImg1,rabitImg2,rabitImg3;
var wallImg;
var vegetable1,vegetable1Img,vegetable2Img;
var vegetable3,vegetable3Img;
var vegetable4,vegetable4Img;
var vegetable5,vegetable5Img;
var vegetableCount=0;
var vegetables;
var foxCount =0;
var foxes,foxImg1,foxImg2;
var score = 0 ;
var walls;
var gate;
var timer = 30;
var gameState ="play";
function preload(){
   rabitImg1=loadImage("assets/bunny2.png");
   rabitImg2=loadImage("assets/bunny1.png")
   rabitImg3=loadImage("assets/bunny3.png")
   wallImg=loadImage("assets/grass.png")
   vegetable1Img=loadImage("assets/vegetable (1).png")
   vegetable2Img=loadImage("assets/vegetable (2).png")
   vegetable3Img=loadImage("assets/vegetable (3).png")
   vegetable4Img=loadImage("assets/vegetable (4).png")
   vegetable5Img=loadImage("assets/vegetable (5).png")

   foxImg1=loadImage("assets/Fox1.png");
   foxImg2=loadImage("assets/Fox2.png")

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  walls = new Group()
  boundary1 = createSprite(width/2,height-(height-100),width-180,20);
  walls.add(boundary1)
  boundary2 = createSprite(width-(width-100),height/2,20,height-180);
  walls.add(boundary2)
  boundary3 = createSprite(width-100,height/2,20,height-180);
  walls.add(boundary3)
  boundary4 = createSprite(width/4-40,height-100,boundary1.width/3,20);
  walls.add(boundary4)
  boundary5 = createSprite(width-(width/4-40),height-100,boundary1.width/3,20);
  walls.add(boundary5)
  wall1 = createSprite(width/4,height/2-100, 350,15);
  wall1.addImage(wallImg);
  wall1.scale=0.45;
  walls.add(wall1);
  wall2 = createSprite(width-width/4,height/2-100,350,15);
 wall2.addImage(wallImg);
  wall2.scale=0.4;
  walls.add(wall2)
  wall3 = createSprite(width/4,height/2+100,350,15);
  wall3.addImage(wallImg);
  wall3.scale=0.4;
  walls.add(wall3);
  wall4 = createSprite(width-width/4,height/2+100,350,15);
   wall4.addImage(wallImg);
   wall4.scale=0.4;
   walls.add(wall4)

   gate=createSprite(width/2,height-100,boundary1.width/3,20)
   gate.visible = false;

  rabit=createSprite(width/2,height-50,20,20);
  rabit.addImage("Right",rabitImg1);
  rabit.addImage("Left",rabitImg3);
  rabit.scale=0.7;

  
  setInterval(reduceTimer, 1000);

 vegetables = new Group()
 foxes = new Group()
 
  /*vegetable1.addImage("veg",vegetable1Img);
  vegetable1.scale=0.2;*/
}

function draw() 
{
  
  background(30);
  drawScore();
  handleMotoin();
  spawnVegetables();
  foxes.bounceOff(gate)
 foxes.bounceOff(walls);
  rabit.collide(vegetables,removeVeg)

 
  rabit.collide(wall1);
  rabit.collide(wall2);
  rabit.collide(wall3);
  rabit.collide(wall4);

  rabit.collide(boundary1);
  rabit.collide(boundary2);
  rabit.collide(boundary3);
  rabit.collide(boundary4);
  rabit.collide(boundary5);

 
  checkTimer();
   spawnFox();
  drawSprites();
}
function handleMotoin(){
  if(keyIsDown(LEFT_ARROW)){
    rabit.changeImage("Left")
    rabit.x=rabit.x-10;
  }
  if(keyIsDown(RIGHT_ARROW)){
    rabit.changeImage("Right")
    rabit.x=rabit.x+10;
  }
  if(keyIsDown(UP_ARROW)){
    rabit.y=rabit.y-10;
  }
  if(keyIsDown(DOWN_ARROW)){
    rabit.y=rabit.y+10;
  }
}
  function spawnVegetables(){
    if(frameCount%60 === 0 && vegetableCount<=8){
      vegetable1=createSprite((width-width/4)+120,height-102,20,20);
      vegetable1.x=Math.round(random(200,width-200))
      vegetable1.y=Math.round(random(200,height-200))
      vegetableCount=vegetableCount+1;
      var rand= Math.round(random(1,5))
      switch(rand){
        case 1:vegetable1.addImage(vegetable1Img); break;
        case 2:vegetable1.addImage(vegetable2Img); break;
        case 3:vegetable1.addImage(vegetable3Img); break;
        case 4:vegetable1.addImage(vegetable4Img); break;
        case 5:vegetable1.addImage(vegetable5Img); break;

      }
      vegetable1.scale=0.25;

      vegetables.add(vegetable1);
    }
  }
  function removeVeg(rabitSprite,vegetable){
   
   vegetable.remove();
   score=score+1;
  }
 function spawnFox(){
   var fox;
   if(foxCount < 2){
     if(frameCount%100 === 0){
      fox=createSprite((width-width/4)+120,height-102,20,20);
      fox.x=Math.round(random(200,width-200))
      fox.y=Math.round(random(200,height-200))
      foxCount=foxCount+1;
      fox.velocityX=2;
      fox.velocityY=3.5;
      fox.lifeTime = 40000;
      foxes.add(fox);
      fox.addImage(foxImg1);
     }

     if(foxCount === 1 && frameCount%200 === 0){
     fox=createSprite((width-width/4)+120,height-102,20,20);
     fox.x=Math.round(random(200,width-200))
     fox.y=Math.round(random(200,height-200))
     foxCount=foxCount+1;
     fox.velocityX=-2;
     fox.velocityY=-2.5;
     fox.lifeTime = 40000;
     foxes.add(fox);
     fox.addImage(foxImg1);
    }
    
   }
 }
 function reset(){
   score = 0;
 }
 function drawScore(){
  textSize(25)
  text("Score :  "+ score,width-(width-180),height-(height-50))

  textSize(25)
  text("Timer :  "+ timer+" seconds",width-(width-180),height-(height-85))
  
 }
function reduceTimer(){

  if(gameState === "play"){
    timer = timer-1;  
  }
  
}

function checkTimer(){
 if(timer <= 0){
    console.log("done");
    gameState = "end";
 }
}
