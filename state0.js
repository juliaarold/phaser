var demo = {};
var centerX=1500/2;
var centerY=1000/2;
var naer, speed=10;
demo.state0=function (){};
demo.state0.prototype = {
	preload: function () {
		/* game.load.image('naeratus','assets/sprites/vasakule.png'); */
		game.load.spritesheet('naeratus','assets/spritesheets/parle.png', 320, 320);
		game.load.image('taust','assets/backgrounds/taust.png');
	},
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#ff4000';
		console.log('state0');
		addChangeStateEventListeners();
		game.world.setBounds(0,0,3320,1000);
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		var taust=game.add.sprite(0,0,'taust');
		naer=game.add.sprite(centerX, centerY,'naeratus');
		/* naer.anchor.x=0.5;
		naer.anchor.y=0.5; */
		naer.anchor.setTo(0.5,0.5);
		naer.scale.setTo(0.75,0.75);
		game.physics.enable(naer);
		naer.body.collideWorldBounds=true;
		naer.animations.add('jaluta',[0,1,2]);
		game.camera.follow(naer);
		game.camera.deadzone= new Phaser.Rectangle(centerX-300,0,600,1000);
	},
	update: function () {
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			naer.scale.setTo(-0.75,0.75);
			naer.x -= speed;
			naer.animations.play('jaluta',10,true);
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			naer.scale.setTo(0.75,0.75);
			naer.x += speed;
			naer.animations.play('jaluta',10,true);
		}
		else
		{
			naer.animations.stop('jaluta');
			naer.frame=0;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			naer.y-= speed;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
		{
			naer.y += speed;
		}
	}
};

function changeState(i, stateNum){
	console.log('state'+stateNum);
	game.state.start('state'+stateNum);
}

function addKeyCallback(key, fn, args){
		game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
		addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
		addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
		addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
		addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
		addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
		addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
		addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
		addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
		addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
		addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}