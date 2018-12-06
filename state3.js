var heli; // defineerime muutuja 'heli'

demo.state3=function (){};
demo.state3.prototype = {
	preload: function () {
		game.load.image('nupp1','nupp1.png'); // nupp1 pildi laadimine
		game.load.image('nupp2','nupp2.png'); // nupp2 pildi laadimine
		game.load.image('nupp3','nupp3.png'); // nupp3 pildi laadimine
		game.load.image('nupp4','nupp4.png'); // nupp4 pildi laadimine
		game.load.audio('heli1','heli1.mp3'); // helifaili laadimine - NB! game.load.AUDIO ja NB! tegu on mp3 failiga
	},
	create: function () {
		game.stage.backgroundColor = '#00ff80'; // taustavärv
		addChangeStateEventListeners(); // klaviatuuriklahvide vajutamise jälgimine, et vahetada mängufaase
		heli=game.add.audio('heli1'); // heli lisamine
		heli.addMarker('algus',0.1,0.2); // helifaili "lõikamine" - märkides ära heli algus- ja lõpukoha helifailis
		heli.addMarker('lopp',0.3,0.4);  // helifaili "lõikamine" - märkides äraa heli algus- ja lõpukoha helifailis
		nupp1=game.add.button(150, 50,'nupp1', function() { // nupu 'nupp1' lisamine - kui sellele vajutatakse, aktiveeritakse mängufaas 1
			changeState(null,1); // pöördumine funktsiooni 'changeState' poole mängufaasi väärtusega 1
		});
		nupp2=game.add.button(150, 200,'nupp2', function() { // nupu 'nupp2' lisamine - kui sellele vajutatakse, aktiveeritakse mängufaas 2
			changeState(null,2); // pöördumine funktsiooni 'changeState' poole mängufaasi väärtusega 2
		});
		nupp3=game.add.button(450, 350,'nupp3', function() { // nupu 'nupp3' lisamine - kui sellele vajutatakse, aktiveeritakse mängufaas 3
			changeState(null,3); // pöördumine funktsiooni 'changeState' poole mängufaasi väärtusega 3
		});
		nupp4=game.add.button(450, 500,'nupp4', function() { // nupu 'nupp4' lisamine - kui sellele vajutatakse, aktiveeritakse mängufaas 4
			changeState(null,4); // pöördumine funktsiooni 'changeState' poole mängufaasi väärtusega 4
		});
		nupp1.onInputDown.add(this.tint,nupp1); // kui vajutatakse hiire klahviga nupu 'nupp1' peale, siis pöördutakse funktsiooni 'tint' poole, mis muudab nupu värvi ja aktiveerib heliefekti 'algus'
		nupp2.onInputDown.add(this.tint,nupp2); // kui vajutatakse hiire klahviga nupu 'nupp2' peale, siis pöördutakse funktsiooni 'tint' poole, mis muudab nupu värvi ja aktiveerib heliefekti 'algus'
		nupp3.onInputDown.add(this.tint,nupp3); // kui vajutatakse hiire klahviga nupu 'nupp3' peale, siis pöördutakse funktsiooni 'tint' poole, mis muudab nupu värvi ja aktiveerib heliefekti 'algus'
		nupp4.onInputDown.add(this.tint,nupp4); // kui vajutatakse hiire klahviga nupu 'nupp4' peale, siis pöördutakse funktsiooni 'tint' poole, mis muudab nupu värvi ja aktiveerib heliefekti 'algus'
		nupp1.onInputUp.add(this.untint,nupp1); // kui hiire klahvivajutus nupu 'nupp1' peal lõpeb, siis pöördutakse funktsiooni 'untint' poole, et taastada esialgne värv ja aktiveerida heliefekt 'lõpp'
		nupp2.onInputUp.add(this.untint,nupp2); // kui hiire klahvivajutus nupu 'nupp2' peal lõpeb, siis pöördutakse funktsiooni 'untint' poole, et taastada esialgne värv ja aktiveerida heliefekt 'lõpp'
		nupp3.onInputUp.add(this.untint,nupp3); // kui hiire klahvivajutus nupu 'nupp3' peal lõpeb, siis pöördutakse funktsiooni 'untint' poole, et taastada esialgne värv ja aktiveerida heliefekt 'lõpp'
		nupp4.onInputUp.add(this.untint,nupp4); // kui hiire klahvivajutus nupu 'nupp4' peal lõpeb, siis pöördutakse funktsiooni 'untint' poole, et taastada esialgne värv ja aktiveerida heliefekt 'lõpp'
	},
	update: function () {},
	tint: function () // funktsioon 'tint', et muuta nupu värvi ja lisada heliefekt
	{
		 this.tint=0xbbbbbb; // muudetakse nupu värv tumedamaks
		 heli.play('algus'); // mängitakse ette helilõik 'algus'
	},
	untint: function () // funktsioon 'untint', et taastada nupu esialgne värv ja mängida ette lõpu heliefekt
	{
		 this.tint=0xffffff; // taastatakse nupu esialgne värv
		 heli.play('lopp'); // mängitakse ette helilõik 'lõpp'
	}
};

function addKeyCallback(key, fn, args){ // klahviatuurivajutuste jälgimise funktsioon - kontrollitakse, millisele nupule vajutati - 'key' on klahvi koodi, 'fn' on funktsioon, mille poole pöördutakse ja 'args' on mängufaasi number
		game.input.keyboard.addKey(key).onDown.add(fn, null, null, args); 
}

function addChangeStateEventListeners(){ // jälgitakse klaviatuurivajutusi
		addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0); // kui vajutatakse klaviatuuril klahvile 0, siis muudetakse aktiivseks mängufaas 0
		addKeyCallback(Phaser.Keyboard.A, changeState, 0); // kui vajutatakse klaviatuuril klahvile A, siis muudetakse aktiivseks mängufaas 0
		addKeyCallback(Phaser.Keyboard.ONE, changeState, 1); // kui vajutatakse klaviatuuril klahvile 1, siis muudetakse aktiivseks mängufaas 1
		addKeyCallback(Phaser.Keyboard.B, changeState, 1); // kui vajutatakse klaviatuuril klahvile B, siis muudetakse aktiivseks mängufaas 1
		addKeyCallback(Phaser.Keyboard.TWO, changeState, 2); // kui vajutatakse klaviatuuril klahvile 2, siis muudetakse aktiivseks mängufaas 2
		addKeyCallback(Phaser.Keyboard.THREE, changeState, 3); // kui vajutatakse klaviatuuril klahvile 3, siis muudetakse aktiivseks mängufaas 3
		addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4); // kui vajutatakse klaviatuuril klahvile 4, siis muudetakse aktiivseks mängufaas 4
		addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5); // kui vajutatakse klaviatuuril klahvile 5, siis muudetakse aktiivseks mängufaas 5
		addKeyCallback(Phaser.Keyboard.SIX, changeState, 6); // kui vajutatakse klaviatuuril klahvile 6, siis muudetakse aktiivseks mängufaas 6
		addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7); // kui vajutatakse klaviatuuril klahvile 7, siis muudetakse aktiivseks mängufaas 7
		addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8); // // kui vajutatakse klaviatuuril klahvile 8, siis muudetakse aktiivseks mängufaas 8
}

function changeState(i, stateNum){ // funktsioon 'changeState' - soovitud mängufaasi aktiveerimiseks 
	console.log('state'+stateNum);
	game.state.start('state'+stateNum); // aktiveeritakse mängufaas, mille number on 'stateNum' - vt read 19, 22, 25, 28
}