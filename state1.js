var cursors, rohi, kivid; // defineeritakse muutujad 'cursors', 'rohi', 'kivid'
demo.state1=function (){};
demo.state1.prototype = {
	preload: function () {
		game.load.tilemap('aluspind','aluspind.json',null,Phaser.Tilemap.TILED_JSON); // Programmist Tiled eksporditud kaart, mis on json formaadis
		game.load.image('rohi','rohi.png'); // rohukasti fail
		game.load.image('taust1','taust1.png'); // kividekasti fail
		game.load.image('tegija','tegija.png'); // tegija fail
	},
	create: function () {
		//game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor="#F3D303";
		addkeyCallback(Phaser.Keyboard.TWO,changeState,0); // pöördumine funktsiooni 'addkeyCallback' poole (read 21-23 failis 'state0.js'), mille tulemusena, kui klaviatuuril vajutatakse klahvile, millel on nr 2, muudetakse funktsiooni 'changeState' abil (read 17-19 failis 'state0.js') mängufaasiks 'state0' 
		var map=game.add.tilemap('aluspind'); // lisame mängule kaardi - kuna see on kõige alumine kiht mängus, siis see lisatakse esimesena
		map.addTilesetImage('rohi'); // kaardile lisatakse rohukast (peab olema sama kast, mida kasutati kaardi joonistamisel rohukastina ja peab olema kaardifaili osa ehk 'embedded')
		map.addTilesetImage('taust1'); // kaardile lisatakse taustakast (peab olema sama kast, mida kasutati kaardi joonistamisel kividekastina ja peab olema kaardifaili osa ehk 'embedded')
		rohi=map.createLayer('rohi'); // kaardile luuakse kiht 'rohi' - Tiled'is loodud kaardil peab ka kiht 'rohi'
		kivid=map.createLayer('kivid'); //kaardile luuakse kiht 'kivid' - Tiled'is loodud kaardil peab ka kiht 'kivid'
		map.setCollisionBetween(3,11,true,'kivid'); // 'aluspind.json' faili kihis 'kivid' põhiväärtustest erinevad väärtused - lisatud failis on väärtusi 3 ja 11 vahel - need kastid esindavad kive
		map.setCollision(1,true,'rohi'); // 'aluspind.json' faili kihis 'rohi' põhiväärtustest erinev väärtus - erinevaid väärtusi on vaid 1 - st kõige rohkem on väärtust 2, aga meil on vaja erinevust, siis on meie jaoks vajalik number 1
		tegija=game.add.sprite(0,0,'tegija'); // lisatakse 'tegija'
		game.physics.enable(tegija); // 'tegija' füüsika aktiveeritakse
		cursors=game.input.keyboard.createCursorKeys(); // võetakse kasutusele kursori mõiste, mis vastab klaviatuurivajutustele
		},
	update: function () {
		game.physics.arcade.collide(tegija,kivid,function () {console.log('kivid'); }); // kui 'tegija' puutub kokku kastiga 'kivid', kuvatakse konsoolile sõna 'kivid'
		game.physics.arcade.collide(tegija,rohi,function () {console.log('rohi'); }); // kui 'tegija' puutub kokku kastiga 'rohi', kuvatakse konsoolile sõna 'rohi'
		if (cursors.up.isDown) // kui klaviatuuril vajutatakse ülesliikumise nuppu, liigub tegelane üles
		{
			tegija.body.velocity.y=-500;
		}
		else if (cursors.down.isDown) // kui klaviatuuril vajutatakse allaliikumise nuppu, liigub tegelane alla
		{
			tegija.body.velocity.y=500;
		}	
		else if (cursors.left.isDown) // kui klaviatuuril vajutatakse vasakule liikumise nuppu, liigub tegelane vasakule
		{
			tegija.body.velocity.x=-500;
		}	
		else if (cursors.right.isDown) // kui klaviatuuril vajutatakse paremale liikumise nuppu, liigub tegelane paremale
		{
			tegija.body.velocity.x=500;
		}
		else // kui ühtegi eelnimetatud nuppudest ei vajutata, peatatakse tegelane
		{
			tegija.body.velocity.x=0;
			tegija.body.velocity.y=0;
		}
	}
};