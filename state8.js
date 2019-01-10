var kuul, relv, cursors, laskmisnupp, kuulikraad;

demo.state8=function (){};
demo.state8.prototype = {
	preload: function () {
		game.load.image('kuul', 'punanepall.png'); // pilt 'kuuli' jaoks - kasutame pilti 'punanepall.png'
		game.load.image('laev', 'laev.png'); // 'pilt 'laeva' jaoks - kasutamine pilt 'laev.png'
	},
	create: function () {
		addChangeStateEventListeners();
		relv= game.add.weapon(30, 'kuul'); // lisame relvale 30 'kuuli'
		relv.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; // kuul tapetakse, kui ta välja maailma piiridest
		relv.bulletSpeed = 600; // laskmiskiirus
		relv.bulletSpeedVariance=50; // laskmiskiiruse variatsioon
		relv.fireRate = 100; // laskmistihedus

		kuul = this.add.sprite(400, 300, 'laev'); // lisame 'kuuli' pildi
		kuul.anchor.set(0.5); // nihutame ka punkti keskpaika

		game.physics.arcade.enable(kuul); // aktiveerime kuuli füüsika

		kuul.body.drag.set(70); //
		kuul.body.maxVelocity.set(200);

		relv.trackSprite(kuul, 0, 0, true); // 'relv' järgib 'kuuli' pöörlemist

		cursors = this.input.keyboard.createCursorKeys(); // aktiveeritakse lühikoodid klaviatuuri kasutamiseks

		laskmisNupp = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR); // tulistamiseks kasutatakse 'spacebar' ehk 'tühiku' klahvi
		kuulikraad=game.add.text(25,25,'laeva kraad: '+Math.round(kuul.angle),  { fontSize: '24px', fill: '#FFF', font: 'Courier New' }); // kuvatakse laeva kraadi nurk

	},
	update: function () {

		   if (cursors.up.isDown) // kui klaviatuuril vajutatakse ülesse liikumise nuppu
			{
				game.physics.arcade.accelerationFromRotation(kuul.rotation, 500, kuul.body.acceleration); // nii 'laev' kui ka 'kuul' liiguvad edasi
			}

		   else if (cursors.down.isDown) // kui klaviatuuril vajutatakse alla liikumise nuppu
			{
				game.physics.arcade.accelerationFromRotation(kuul.rotation, -500, kuul.body.acceleration); // nii 'laev' kui ka 'kuul' liiguvad edasi
			}
			else
			{
				kuul.body.acceleration.set(0);
			}

			if (cursors.left.isDown) // // kui klaviatuuril vajutatakse vasakule liikumise nuppu
			{
				kuul.body.angularVelocity = -500; // 'laev' ja 'kuul' pöörlevad vastupäeva
			}
			else if (cursors.right.isDown) // kui klaviatuuril vajutatakse paremale liikumise nuppu
			{
				kuul.body.angularVelocity = 500; // 'laev' ja 'kuul' pöörlevad päripäeva
			}
			else
			{
				kuul.body.angularVelocity = 0;
			}

			if (laskmisNupp.isDown) // kui vajutatakse 'tühiku' nuppu
			{
				relv.fire(); // tulistatakse relvast
			}

			game.world.wrap(kuul,25); // kui 'laev' ja 'kuul' väljuvad maailma piiridest, ilmavad need uuesti ekraanile 25 pikslit nihutatuna  
			kuulikraad.setText('kuuli kraad: '+Math.round(kuul.angle)); // kuvatakse 'kuuli kraadi' väärtus antud ajahetkel
			
	},
	render: function () {	
		   game.debug.text('laskekoht: x='+Math.round(relv.x)+', y='+Math.round(relv.y), 25, 75);
		   game.debug.text('kuulide arv: '+relv.shots, 25,100);
		   game.debug.text('aktiivseid kuule: '+relv.bullets.total,25,125);
	}
};