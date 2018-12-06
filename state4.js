var i; // defineerima muutuja 'i'

demo.state4=function (){};
demo.state4.prototype = {
	preload: function () {
			 game.load.image('lill1','lill1.png'); // lill1 pildi laadimine
			 game.load.image('lill2','lill2.png'); // lill2 pildi laadimine
			 game.load.image('lill3','lill3.png'); // lill3 pildi laadimine
			 game.load.image('lill4','lill4.png'); // lill4 pildi laadimine
			 game.load.image('lill5','lill5.png'); // lill5 pildi laadimine
	},
	create: function () {
		game.stage.backgroundColor = '#00ffff';
		addChangeStateEventListeners();
		n1=game.add.sprite(20, 100, 'lill1'); // lill1 pildi lisamine
		n2=game.add.sprite(120, 100, 'lill2'); // lill2 pildi lisamine
		n3=game.add.sprite(220, 100, 'lill3'); // lill3 pildi lisamine
		n4=game.add.sprite(320, 100, 'lill4'); // lill4 pildi lisamine
		n5=game.add.sprite(420, 100, 'lill5'); // lill5 pildi lisamine
		 
		game.add.tween(n1).to({y: 400},2000,'Linear', true); // objekti 'n1' nihutatakse y-suunas, asukohale (NB! 'to'), mille y väärtus on 400 px, 2000 millisekundi jooksul ehk 2 sekundi jooksul, liikumismustriga 'Linear' ja liikumine aktiveeritakse automaatselt - 'true' 
		i=game.add.tween(n2).to({x: 100, y: 400},2000,'Bounce'); // objekti 'n2' saab aktiveerida, kui konsoolil sisestada 'i.start()' - NB! puudub neljas argument, liikumise automaatseks alustamiseks
		game.add.tween(n3).from({x: 300, y: 400},4000,'Elastic', true); // objekti 'n3' nihutatakse asukohast (NB! 'from') koordinaatidega 300 ja 400 esialgsesse asukohta
		game.add.tween(n4.anchor).to({x:2, y:2},3000,'Circ', true, 500, 3, true); // objekti 'n4' 3 korda tema kahekordse laiuse ja kõrguse võrra, viivutusega 0,5 sekundit ja ta liigub tagasi oma esialgsesse asukohta
		//game.add.tween(n4).to({y: 300, x: 300},1000,'Circ', true, 1000, false, true).loop(); // lõpmatult korratakse seda liikumist
		game.add.tween(n5).to({alpha: 0},5000,'Linear', true); // objekt 'n5' muudetakse nähtamatuks
		game.add.tween(n1).to({y: '+100'},3000,'Linear', true, 4000); // objekti 'n1' nihutatakse 100 px võrra allapoole
		game.add.tween(n5).to({alpha: 1},5000,'Linear', true, 10000); // objekt 'n5' muudetakse taas nähtavaks
	},
	update: function () {
		
	}
};