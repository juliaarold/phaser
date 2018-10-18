var demo={}; // uue objekti, mille nimi on 'demo' deklareerimine
var tegija; // uus muutuja, nimega 'tegija'
demo.state0=function (){}; // objekti 'demo' omadusele (property) 'state0' omistatakse funktsioon (alamprogramm) 'function(){};'
demo.state0.prototype = { // objekti 'demo' omadusele (property) 'state0' lisatakse uued osad - Phaser'i mängu 3 põhiosa - preload, creat, update
	preload: function () { // 'preload' osa algus, mida kasutatakse selleks, et alglaadimisi teha, peamiselt piltide lisamiseks (mängu taust, tegelased jne)
		game.load.spritesheet('tegija','nagu_animatsioon.png',320,320); // laetakse pildijada failist 'nagu_animatsioon.png' ja mängus omistatakse sellele nimi 'tegija', iga üksiku kaadri laius on 320 pikslit ja kõrgus samuti 320 pikslit
	}, // 'preload' osa lõpp, erinevaid osi eraldavad komad
	create: function () { // 'create' osa algus, mida kasutatakse selleks, et luua mängu jaoks vajalikud toimingud ja tegevused
		console.log('state0'); // kui veebilehel vajutada hiire paremat klahvi ja valida 'Inspect element' või 'Inspekteeri' ja avaneva akna ülemisest menüüst valida 'Console', siis siia lisatud tekst kuvatakse sellesse aknasse - antud juhul siis 'state0'
		game.stage.backgroundColor="#990000"; // muudame mänguvälja tausta, kasutades 'hex color'it', mis on 16nend-süsteemis (numbrid 0 kuni 9 ja tähed A kuni F), värvisüsteem on Red+Green+Blue, milles 2 esimest numbrit tähistavad 'punast' värvi, 2 keskmist numbrist 'rohelist' värvi ja 2 viimast numbrit 'sinist' värvi
		game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState,null,null,1); // kui klaviatuuril vajutatakse klahvile, millel on nr 1, muudetakse mängufaasi funktsioon 'changeState' abil - vt read 17-19 - ja uueks mängufaasiks on 'state1'	
		game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL; // mänguala kohandub vastavalt ekraanisuurusele
		tegija=game.add.sprite(1500/2,900/2,'tegija'); // muutujale 'tegija' omistatakse element 'tegija', mis paigutatakse mänguala keskele (mänguala laius on 1500 pikslit ja see jagatakse 2ga, mänguala kõrgus on 900 pikslit ja see jagatakse 2ga)
		tegija.anchor.x=0.5; // 'tegija' nihutatakse x-suunas 0,5 laiuse võrra vasakule
		tegija.anchor.y=0.5; // 'tegija' nihutatakse y-suunas 0,5 laiuse võrra ülespoole
		tegija.animations.add('liikumine',[0,1,2]); // 'tegija' juurde lisatakse animatsioon, nimega 'liikumine', mis sisaldab esimest, teist ja kolmandat kaadrit animatsioonist - NB! kaadri numeratsioon algab nullist
		}, // 'create' osa lõpp
	update: function () { // 'update' osa algus, mida kasutatakse selleks, et mängupilti muuta
	   if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) // kui klaviatuuril vajutatakse paremale liikumise noolt ->
	   {
		   tegija.x+=10; // 'tegija' nihkub iga nupuvajutuse puhul paremale
		   tegija.animations.play('liikumine',50,true); // käivitatakse animatsioon 'liikumine', kiirusega 50 (võimalik kiirusevahemik on 1-60, kus 1 on kõige aeglasem ja 60 on kõige kiirem), animatsiooni teostatakse lõpmatult (sulgudes väärtus 'true')- kui sulgudes oleks viimane väärtus 'false', siis teostataks animatsiooni vaid 1 kord
 	   }
	   else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) // kui klaviatuuril vajutatakse vasakule liikumise noolt <-
	   {
		   tegija.x-=10; // 'tegija' nihkub iga nupuvajutuse puhul vasakule
		   tegija.animations.play('liikumine',4,true); // käivitatakse animatsioon 'liikumine', kiirusega 4 (võimalik kiirusevahemik on 1-60, kus 1 on kõige aeglasem ja 60 on kõige kiirem), animatsiooni teostatakse lõpmatult (sulgudes väärtus 'true')- kui sulgudes oleks viimane väärtus 'false', siis teostataks animatsiooni vaid 1 kord
	   }
	   else // kuna animatsioonid jäävad käima ka pärast nupulevajutuse lõppu, on vaja animatsioon peatada, selleks kasutame 'else' lauset
	   {
		   tegija.animations.stop('liikumine'); // 'tegija' animatsioon 'liikumine' peatatakse
		   tegija.frame=0; // 'tegija' jaoks kuvatakse kõige esimene kaader
	   }
	   if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) // kui klaviatuuril vajutatakse üles liikumise noolt
	   {
		   tegija.y-=4; // 'tegija' nihkub iga nupuvajutuse puhul üles
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