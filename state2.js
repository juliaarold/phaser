demo.state2=function (){};
var alus, toru, nooled, kiirus=1000, jargmine=0,laskekiirus=200, vaenlane, vaenlased, centerX=750, centerY=500;
demo.state2.prototype = {
	preload: function () {
	 game.load.image('alus','alus.png'); // pilt laskepuldi aluse jaoks
	 game.load.image('toru','toru.png'); // pilt laskepuldi toru jaoks
	 game.load.image('vaenlane','vaenlane.png'); // vaenlase pilt
	 game.load.image('lill','lill.png'); // laskepuldi laskemoona pilt
	},
	create: function () {
		game.stage.backgroundColor = '#40ff00';
		addChangeStateEventListeners(); 
		addkeyCallback(Phaser.Keyboard.THREE,changeState,0);
		alus=game.add.sprite(centerX,centerY,'alus'); // laskepuldi alus pannakse meie mänguala keskele
		alus.anchor.setTo(0.5); // kuna joonistama hakatakse mänguala keskpunktist, siis tuleb meil alust veidi nihutada - pool tema laiusest ja pool tema kõrgusest
		alus.scale.setTo(2); // teeme aluse 2 korda suuremaks, kui ma ta meil originaalpildi peal on

		lilled=game.add.group(); // lisame oma laskemoona (NB! tegu on grupiga, mis tähendab, et sellel on mitmeid ühesugused elemendid ja neid käsitletakse koos
		lilled.enableBody=true; // aktiveerime laskemoona grupi kõigi elementide füüsika
		lilled.physicsBodyType=Phaser.Physics.ARCADE; // kasutame juba tuttavat ARCADE'i
		lilled.createMultiple(50,'lill'); // tekitame laskemoona gruppi 50 elementi, mille aluseks on muutuja 'lill', mis vastab pildile 'lill.png'
		lilled.setAll('checkWorldBounds',true); // laskemoona grupi kõigi elementide puhul kontrollitakse maailma piirides olekut
		lilled.setAll('outOfBoundsKill',true); // kui on maailma piiridest väljas, siis element kustutatakse
		lilled.setAll('anchor.y',0.6); // nihutame laskemoona elemendid mänguala keskele y-suunas - ehk siis veidi ülespoole
		lilled.setAll('anchor.x',0.5); // nihutame laskemoona elemendid mänguala keskele x-suunas - ehk siis veidi vasakule
		lilled.setAll('scale.x',0.6); // muudame laskemoona elementide kõrgust - 0,6 esialgsest kõrgusest
		lilled.setAll('scale.y',0.6); // muudame laskemoona elementide laiust - 0,6 esialgsest laiusest

		toru=game.add.sprite(centerX,centerY,'toru'); // lisame laskepuldi toru mänguala keskele
		toru.anchor.setTo(0.1,0.6); // nihutame laskepuldi toru veidi vasakule ja natuke rohkem üles
		toru.scale.setTo(1.5,0.75); // muudame laskepuldi toru mõõtmeid

		vaenlane=game.add.sprite(100,200,'vaenlane'); // lisame ühe vaenlase laskepuldist vasakule
		vaenlane.scale.setTo(0.5); // muudame vaenlase poole väiksemaks
		game.physics.enable(vaenlane); // aktiveerime vaenlase füüsika 
		vaenlased=game.add.group(); // lisame vaenlaste grupi
		vaenlased.enableBody=true; // aktiveerima vaenlaste grupi elementide kehad
		vaenlased.physicsBodyType=Phaser.Physics.ARCADE; // kasutame juba tuttavat ARCADE'i
		for (i=0;i<5;i++) // for-tsükkel vaenlaste grupi elementide jaoks - neid on 5, loendamine algab nullist (0)
		{
			vaenlased.create(1300,150*i+100,'vaenlane'); // paigutame vaenlaste grupi elemendid laskepuldist paremale, üksteise alla, kusjuures vaenlase asukoha kõrgust pildil on 100 pikslit ekraani ülemisest servast + 150*i (esimese asukoht siis 100 piksli kaugusel, teise 250 jne)
		}
		vaenlased.setAll('anchor.y',0.5); // nihutame vaenlaste grupi elemendid ülespoole 
		vaenlased.setAll('anchor.x',0.5); // nihutame vaenlaste grupi elemendid vasakule
		vaenlased.setAll('scale.y',0.2); // muudame vaenlaste grupi elementide laiust
		vaenlased.setAll('scale.x',0.2); // muudame vaenalste grupi elementide kõrgust
	},
	update: function () {
		toru.rotation = game.physics.arcade.angleToPointer(toru); // aktiveerime toru pöörlemise hiire liikumise suunas 
		alus.rotation = game.physics.arcade.angleToPointer(alus); // aktiveerime aluse pöörlemise hiire liikumise suunas
		lilled.forEach(function(lill){lill.angle+=10}); // aktiveerime laskemoona grupi elementide pöörlemise 10 kraadi võrra
		if (game.input.activePointer.isDown) // kui hiire klavile vajutatakse
		{ 
			this.fire(); // toimub tulistamine - vt osa 'fire', read 58-69
		}
		game.physics.arcade.overlap(lilled,vaenlane,this.sainPihta); // kui lilled tabavad vaenlast, toimub vaenlase kustutamine - vt osa 'sainPihta'
		game.physics.arcade.overlap(lilled,vaenlased,this.sainPihta1); // kui lilled tabavad vaenlaste grupi elementi, kustutatakse vaenlase grupi element - vt osa 'sainPihta1'
	}, 
	fire: function ()  // tulisamise osa
	{
		if (game.time.now>jargmine) // on vajalik selleks, et saaks hakkama olemasoleva laskemoonaga - st et laskmine toimuks teatud aja tagant (mitte pidevalt), kasutatakse mänguaja võrdlemist
		{
		 jargmine=game.time.now+laskekiirus; // mänguaeg nö nullitakse
		 console.log('saatsin teele'); // konsoolile kirjutatakse 'saatsin teele'
		 var lill=lilled.getFirstDead(); // võetakse esimene kustutatud element laskemoona grupist
		 lill.reset(toru.x, toru.y); // laskemoona grupi elementide algpunktiks on toru keskkoht
		 game.physics.arcade.moveToPointer(lill, kiirus); // et laskemoona grupi element liiguks hiirevajutuse suunas kiirusega 'kiirus'
		 lill.rotation = game.physics.arcade.angleToPointer(lill); // laskemoona grupi element pöörleb hiire liikumise suunas
		}
	},
	sainPihta: function(vaenlane,lilled) // kui laskemoona grupi element tabab vaenlast
	{
		console.log('pihtas'); // konsoolile kuvatakse 'pihtas'
		vaenlane.kill(); // muudatakse vaenlane nähtamatuks
		lilled.kill(); // muudetakse laskemoona grupi konkreetne element nähtamatuks
	},
	sainPihta1: function (v, l) // kui laskemoona grupi element tabab vaenlaste grupi elementi
	{
		console.log('muutusid nähtamatuks'); // konsoolile kuvatakse 'muutus nähtamatuks'
		v.kill(); // vaenlaste grupi element muudatakse nähtamatuks
		l.kill(); // muudetakse laskemoona grupi konkreetne element nähtamatuks 
	}
};