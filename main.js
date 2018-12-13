var game = new Phaser.Game(1500, 900,Phaser.AUTO); //Phaser'i mänguala loomine - 1500 pikslit lai, 1000 pikslit kõrge ja esitusviisiks on Phaser.AUTO
game.state.add('state0', demo.state0); // mängu 0. faasi lisamine
game.state.add('state1', demo.state1); // mängu 1. faasi lisamine
game.state.add('state2', demo.state2); // mängu 2. faasi lisamine
game.state.add('state3', demo.state3); // mängu 3. faasi lisamine
game.state.add('state4', demo.state4); // mängu 4. faasi lisamine
game.state.add('state5', demo.state5); // mängu 5. faasi lisamine
game.state.add('state6', demo.state6); // mängu 6. faasi lisamine
game.state.start('state5'); // mängu avakuvaks on 5. faas