var accel=400, platvorm, platvormid; // defineerime muutujad 'accel', 'platvorm', 'platvormid'
demo.state5=function (){};
demo.state5.prototype = {
	preload: function () {
			 game.load.image('platvorm','platvorm.png'); // laeme 'platvormi' pildi
			 game.load.image('lill','lill3.png'); // laeme 'lille' pildi
	},
	create: function () {
		game.stage.backgroundColor = '#0040ff';
		addChangeStateEventListeners();
		n1=game.add.sprite(20, 100, 'lill'); // lisame lille ja defineerime muutuja 'n1'
		n1.scale.setTo(0.5); // muudame lille pildi poole väiksemaks
		platvorm=game.add.sprite(0, 600, 'platvorm'); // lisame platvormi
		platvormid=game.add.group(); // lisame platvormide grupi
		platvormid.create(600, 400,'platvorm'); // lisame platvormide grupi esimese platvormi
		platvormid.create(1000, 700,'platvorm'); // lisame platvormide grupi teise platvormi
		game.physics.enable([n1, platvorm, platvormid]); // aktiveerime muutujate 'n1', 'platvorm' ja 'platvormid' füüsika 
		n1.body.gravity.y=500; // lisame muutujale 'n1' gravitatsiooni
		n1.body.drag.x=400; // lisame muutujale 'n1' tirimise
		n1.body.bounce.y=0.5; // lisame muutujale 'n1' põrkamise
		n1.body.collideWorldBounds = true; // defineerime, et maailma piiridest väljapoole liikida ei saa
		platvorm.body.immovable = true; // määratleme, et 'platvorm' ei ole liikuv
		platvormid.setAll('body.immovable',true); // määratleme, et 'platvormid' ei ole liikuvad
	},
	update: function () {
		game.physics.arcade.collide(n1,[platvorm,platvormid]); // määratleme, et muutuja 'n1' võib muutujatega 'platvorm' ja 'platvormid' põrkuda
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) // kui vajutatakse klaviatuurile vasakule liikumise nuppu
		{
			n1.body.acceleration.x=-accel; // 'n1' kiirendab x-suunas vasakule
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) // kui vajutatakse klaviatuuril paremale liikumise nuppu
		{
			n1.body.acceleration.x=accel; // 'n1' kiirendab x-suunas paremale
		}
		else // kui nupulevajutus lõpeb, muutub kiirendus 0ks
		{
			n1.body.acceleration.x=0;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) // kui vajutatakse klaviatuuril ülesse liikumise nuppu
		{
			n1.body.velocity.y=-300; // 'n1' kiirendab y-suunas üles
		}
	}
};