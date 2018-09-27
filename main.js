var game = new Phaser.Game(800, 600,Phaser.AUTO); //Phaser'i mänguala loomine - 800 pikslit lai, 600 pikslit kõrge ja esitusviisiks on Phaser.AUTO
game.state.add('state0', demo.state0); // mängu 0. faasi lisamine
game.state.add('state1', demo.state1); // mängu 1. faasi lisamine
game.state.start('state0'); // mängu avakuvaks on 0. faas