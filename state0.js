var demo={}; // uue objekti, mille nimi on 'demo' deklareerimine
var tegija; // uus muutuja, nimega 'tegija'
demo.state0=function (){}; // objekti 'demo' omadusele (property) 'state0' omistatakse funktsioon (alamprogramm) 'function(){};'
demo.state0.prototype = { // objekti 'demo' omadusele (property) 'state0' lisatakse uued osad - Phaser'i mängu 3 põhiosa - preload, creat, update
	preload: function () { // 'preload' osa algus, mida kasutatakse selleks, et alglaadimisi teha, peamiselt piltide lisamiseks (mängu taust, tegelased jne)
		game.load.image('taust','taust.png');
		game.load.image('tegija1','tegija.png'); // laetakse pilt, mis on failis 'tegija.png' ja mängus omistatakse sellele nimi 'tegija'
		game.load.spritesheet('tegija','nagu_animatsioon.png',320,320);
	}, // 'preload' osa lõpp, erinevaid osi eraldavad komad
	create: function () { // 'create' osa algus, mida kasutatakse selleks, et luua mängu jaoks vajalikud toimingud ja tegevused
		game.physics.startSystem(Phaser.Physics.ARCADE);
		addChangeStateEventListeners(); 
		console.log('state0'); // kui veebilehel vajutada hiire paremat klahvi ja valida 'Inspect element' või 'Inspekteeri' ja avaneva akna ülemisest menüüst valida 'Console', siis siia lisatud tekst kuvatakse sellesse aknasse - antud juhul siis 'state0'
		game.stage.backgroundColor="#990000"; // muudame mänguvälja tausta, kasutades 'hex color'it', mis on 16nend-süsteemis (numbrid 0 kuni 9 ja tähed A kuni F), värvisüsteem on Red+Green+Blue, milles 2 esimest numbrit tähistavad 'punast' värvi, 2 keskmist numbrist 'rohelist' värvi ja 2 viimast numbrit 'sinist' värvi
		game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState,null,null,1); // kui klaviatuuril vajutatakse klahvile, millel on nr 1, muudetakse mängufaasi funktsioon 'changeState' abil - vt read 17-19 - ja uueks mängufaasiks on 'state1'	
		game.world.setBounds(0,0,5277,1000);
		game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL; // mänguala kohandub vastavalt ekraanisuurusele
		var taust=game.add.sprite(0,0,'taust');
		tegija=game.add.sprite(1500/2,900/2,'tegija'); // muutujale 'tegija' omistatakse element 'tegija', mis paigutatakse mänguala keskele (mänguala laius on 1500 pikslit ja see jagatakse 2ga, mänguala kõrgus on 900 pikslit ja see jagatakse 2ga)
		tegija.anchor.x=0.5; // 'tegija' nihutatakse x-suunas 0,5 laiuse võrra vasakule
		tegija.anchor.y=0.5; // 'tegija' nihutatakse y-suunas 0,5 laiuse võrra ülespoole
		tegija.animations.add('liikumine',[0,1,2]);
		game.physics.enable(tegija);
		tegija.body.collideWorldBounds=true;
		game.camera.follow(tegija);
		game.camera.deadzone=new Phaser.Rectangle(1500/2-400,0,800,1000);
		}, // 'create' osa lõpp
	update: function () { // 'update' osa algus, mida kasutatakse selleks, et mängupilti muuta
	   if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) // kui klaviatuuril vajutatakse paremale liikumise noolt ->
	   {
		   tegija.x+=10; // 'tegija' nihkub iga nupuvajutuse puhul paremale
		   tegija.animations.play('liikumine',50,true);
	   }
	   else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) // kui klaviatuuril vajutatakse vasakule liikumise noolt <-
	   {
		   tegija.x-=10; // 'tegija' nihkub iga nupuvajutuse puhul vasakule
	   }
	   else 
	   {
		   tegija.animations.stop('liikumine');
		   tegija.frame=0;
	   }
	   if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) // kui klaviatuuril vajutatakse üles liikumise noolt
	   {
		   tegija.y-=4; // 'tegija' nihkub iga nupuvajutuse puhul üles
		   if (tegija.y<200)
		   {
			   tegija.y=200;
		   }
	   }
	   else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) // kui klaviatuuril vajutatakse alla liikumise noolt
	   {
		   tegija.y+=4; // 'tegija' nihkub iga nupuvajutuse puhul üles
	   }
	} // 'update' osa lõpp
}; // objekti 'demo' omaduse (property) 'state0' uute osade definitsiooni lõpp

function changeState(i,stateNum){ // realt 10 saadakse info selle kohta, et stateNum väärtus on '1'
	game.state.start('state'+stateNum); // muudetakse mängufaasi, kasutades käsku 'game.state.start' ja sõnale 'state' liidetakse 'stateNum' väärtus, mis on '1' ja tulemuseks saadakse 'state1'
}

function addkeyCallback(key,fn,args){ // funktsiooni poole pöördutakse failist 'state1.js', realt 9, ja väärtustega, kus 'key'='Phaser.Keyboard.TWO', 'fn'='changeState' ja 'args'='0' 
	game.input.keyboard.addKey(key).onDown.add(fn,null,null,args); // kui klaviatuuril vajutatakse klahvile, millel on 'key' väärtus, siis muudetakse mängufaasi 'fn' abil ja uueks mängufaasiks on 'state'+args
}