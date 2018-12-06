var game = new Phaser.Game(1500, 900,Phaser.AUTO); //Phaser'i mänguala loomine - 1500 pikslit lai, 1000 pikslit kõrge ja esitusviisiks on Phaser.AUTO
game.state.add('state0', demo.state0); // mängu 0. faasi lisamine
game.state.add('state1', demo.state1); // mängu 1. faasi lisamine
game.state.add('state2', demo.state2); // mängu 2. faasi lisamine
game.state.add('state3', demo.state3); // mängu 2. faasi lisamine
game.state.add('state4', demo.state4); // mängu 2. faasi lisamine
game.state.start('state3'); // mängu avakuvaks on 2. faas