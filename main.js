var game = new Phaser.Game(900, 600,Phaser.AUTO); //Phaser'i mänguala loomine - 900 pikslit lai, 600 pikslit kõrge ja esitusviisiks on Phaser.AUTO
game.state.add('state0', demo.state0); // mängu 0. faasi lisamine
game.state.add('state1', demo.state1); // mängu 1. faasi lisamine
game.state.add('state2', demo.state2); // mängu 2. faasi lisamine
game.state.add('state3', demo.state3); // mängu 3. faasi lisamine
game.state.add('state4', demo.state4); // mängu 4. faasi lisamine
game.state.add('state5', demo.state5); // mängu 5. faasi lisamine
game.state.add('state6', demo.state6); // mängu 6. faasi lisamine
game.state.add('state7', demo.state7); // mängu 7. faasi lisamine
game.state.add('state8', demo.state8); // mängu 8. faasi lisamine
game.state.add('state9', demo.state9); // mängu 8. faasi lisamine
game.state.start('state8'); // mängu avakuvaks on 8. faas