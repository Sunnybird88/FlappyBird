
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var flapyBird, flappyBirdImg;
var ground;
var clouds;
var background1, backgroundImg;
var obstaclesGroup1, obstaclesGroup2, PipeImg1, PipeImg2;
var gameState = 0;
var score = 0;
var restart, restartImg;
var scoreObject, scoreGroup;

function preload() {
	
	flappyBirdImg = loadImage("flappybird2.png");
	PipeImg1 = loadImage("flappybirdpipes2.png");
	PipeImg2 = loadImage("flappybirdpipes1.png");
	backgroundImg = loadImage("FlappyBackground.png");
	restartImg = loadImage("restart.png");

	
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	//fill("lightblue");
	//background1 = createSprite(400, 350, 800, 700);
	fill("black");
	flappyBird = createSprite(400, 400, 20, 20);
	flappyBird.addImage(flappyBirdImg);
	flappyBird.scale = 0.05
	ground = createSprite(400, 680, 800, 40);

	restart = createSprite(450, 400, 50, 50);

	obstaclesGroup1 = new Group();
	obstaclesGroup2 = new Group();
	scoreGroup = new Group();
	

	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
	rectMode(CENTER);
	background(backgroundImg);
	if (gameState === 0) {
		ground.visible = false;
		restart.visible = false;

		if (keyDown("space") || keyDown("up_arrow")) {

			flappyBird.velocityY = -4;
		}

		flappyBird.velocityY = flappyBird.velocityY + 0.2

		flappyBird.collide(ground);

		obstacles();

		flappyBird.collide(obstaclesGroup1);
		flappyBird.collide(obstaclesGroup2);

		if (obstaclesGroup1.isTouching(flappyBird) || obstaclesGroup2.isTouching(flappyBird)) {
			gameState = 1;
		}


		if (flappyBird.isTouching(scoreGroup)) {
			score = score + 1;
		}
	}


	if (gameState === 1) {
		textSize(30);
		text("Game Over!", 390, 340);
		textSize(25);
		text("Your score: " + score, 390, 370);
		restart.visible = true;
		restart.addImage(restartImg);
		restart.scale = 0.1
		obstaclesGroup1.destroyEach();
		obstaclesGroup2.destroyEach();
		obstaclesGroup1.setVelocityXEach(0);
		obstaclesGroup2.setVelocityXEach(0);
	}

	if (mousePressedOver(restart)) {
		gameState = 0;
		obstaclesGroup1.visible = true;
		obstaclesGroup2.visible = true;
		flappyBird.x = 400
		flappyBird.y = 400

    }
  
  drawSprites();
 
}

function obstacles() {
	if (frameCount % 80 === 0) {

		var rand1 = random(450, 900);
		var rand2 = random(0.6, 1.0);
		var rand3 = random(0.8, 1.2);

		var scoreObject = createSprite(400, 400, 2, 800);
		scoreObject.visible = false;

		var obstacle1 = createSprite(800, 10, 50, 500);
		obstacle1.addImage(PipeImg1);
		obstacle1.scale = rand3;
		
		var obstacle2 = createSprite(850, 680, 50, 500);
		obstacle2.addImage(PipeImg2);
		obstacle2.scale = rand2

		flappyBird.depth = obstacle1.depth;
		flappyBird.depth = obstacle2.depth;
		flappyBird.depth = flappyBird.depth + 1;

		obstaclesGroup1.add(obstacle1);
		obstaclesGroup2.add(obstacle2);
		scoreGroup.add(scoreObject);

		obstacle1.velocityX = -5;
		obstacle2.velocityX = -5;
		scoreObject.velocityX = -5;

		obstacle1.lifeTime = 160;
		obstacle2.lifeTime = 160;
		scoreObject.lifeTime = 160;

		obstacle1.height = rand1;
		obstacle2.height = rand1;





	}

}

