demo.state1=function (){};
demo.state1.prototype = {
	preload: function () {

	},
	create: function () {
		console.log('state1');
		game.stage.backgroundColor="#F3D303";
		addkeyCallback(Phaser.Keyboard.TWO,changeState,0); // pöördumine funktsiooni 'addkeyCallback' poole (read 21-23 failis 'state0.js'), mille tulemusena, kui klaviatuuril vajutatakse klahvile, millel on nr 2, muudetakse funktsiooni 'changeState' abil (read 17-19 failis 'state0.js') mängufaasiks 'state0' 
		},
	update: function () {
		
	}
};