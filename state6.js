demo.state6=function (){};
demo.state6.prototype = {
	preload: function () {
		game.load.image('vulkaan','vulkaan.png'); // laeme vulkaani pildi
		game.load.image('punapall','punanepall.png'); // laeme punase palli pildi
		game.load.image('rohepall','rohelinepall.png'); // laeme rohelise palli pildi
	},
	create: function () {
		game.stage.backgroundColor = '#8000ff';
		addChangeStateEventListeners();
		game.add.sprite(centerX,1000,'vulkaan').anchor.setTo(0.5,1); // lisame vulkaani pildi
		var kiirgaja=game.add.emitter(centerX,400,2000); // lisame kiirgaja vulkaani kraatrisse
		kiirgaja.makeParticles(['punapall','rohepall'],0,5000,false,true); // tekitame punase ja rohelise palli osakesed
		kiirgaja.maxParticleSpeed.set(300,-300); // määratleme maksimaalse kiiruse
		kiirgaja.minParticleSpeed.set(-300,-100); // määratleme minimaalse kiiruse
		game.time.events.add(2000,function ()  // lisame ajafunktsioonid
		{
			kiirgaja.start(false,5000, 20);		// lisame kiirgajale hilistumise - st kiirgaja asub tööle veidi aega pärast seda, kui mäng on laetud
			game.time.events.loop(500, function () // aktiveerime ja deaktiveerime kiirgaja
			{
				if (kiirgaja.on)
				{
					kiirgaja.on=false;
				}
				else
				{
					kiirgaja.on=true;
				}
			});
		});
	},
	update: function () {}
};