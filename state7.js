var distance = 300;
var speed = 4;
var stars;

var max = 200; // tähtede maksimaalne arv
var xx = []; 
var yy = [];
var zz = [];

demo.state7=function (){};
demo.state7.prototype = {
	preload: function () {
		game.load.image('star', 'lill3.png'); // tähe pilt
	},
	create: function () {
		addChangeStateEventListeners(); // mängufaaside vaheline vahetamine
		   if (game.renderType === Phaser.WEBGL)
			{
				max = 2000; // tähtede maksimaalne arv
			}

			var sprites = game.add.spriteBatch();  // 

			stars = [];

			for (var i = 0; i < max; i++) // tekitatakse tähtede asukohad ekraanil
			{
				xx[i] = Math.floor(Math.random() * 800) - 400; // x-koordinaadid kasutades juhuslikkuse funktsiooni 'Math.random'
				yy[i] = Math.floor(Math.random() * 600) - 300; // y-koordinaadid
				zz[i] = Math.floor(Math.random() * 1700) - 100; // z-koordinaadid

				var star = game.make.sprite(0, 0, 'star');  // lisatakse täht
				star.anchor.set(0.5); 

				sprites.addChild(star); // lisatakse täht

				stars.push(star);
			}
	},
	update: function () {
		for (var i = 0; i < max; i++) // tähtede kuvamine ruumilise perspektiivis
		{
			stars[i].perspective = distance / (distance - zz[i]); // arvutatakse perspektiiv
			stars[i].x = game.world.centerX + xx[i] * stars[i].perspective; // määratakse tähe x-koordinaat
			stars[i].y = game.world.centerY + yy[i] * stars[i].perspective; // määratakse tähe y-koordinaat

			zz[i] += speed; // muudetakse z-koordinaati suuremaks

			if (zz[i] > 290) // kui z-koordinaat on liikunud ekraani esiossa, siis nihutatakse täht nö tahapoole
			{
				zz[i] -= 600;
			}

			stars[i].alpha = Math.min(stars[i].perspective / 2, 1); // määratakse tähe läbipaistvus
			stars[i].scale.set(stars[i].perspective / 2); // määratakse tähe suurus
			stars[i].rotation += 0.1; // määratakse tähe pöörlemine

		}
	}
};