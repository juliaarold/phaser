var rohi, kivid; // defineerime muutujad 'rohi' ja 'kivid'
demo.state1=function(){};
demo.state1.prototype={
    preload: function(){
        game.load.tilemap('aluskaart','aluskaart.json',null,Phaser.Tilemap.TILED_JSON); // kaardi laadimine failist 'aluskaart.json', nimeks saab 'aluskaart'
        game.load.image('rohi','rohi.png'); // kaardikastide 'rohi' laadimine failist 'rohi.png'
        game.load.image('kivid','kivid.png'); // kaardikastide 'kivid' laadimine failist 'kivid.png'
    },
    create: function(){
        console.log('state1');
        game.stage.backgroundColor="#F3D3D3";
        addkeyCallback(Phaser.Keyboard.ZERO,changeState,0);
        var map=game.add.tilemap('aluskaart'); // kaardi lisamine, kasutades 'aluskaarti'
        map.addTilesetImage('rohi'); // kaardikastide hulga 'rohi' lisamine
        map.addTilesetImage('kivid'); // kaardikastide hulga 'kivid' lisamine
        rohi=map.createLayer('rohi'); // kihi 'rohi' tekitamine 
        kivid=map.createLayer('kivid'); // kihi 'kivid' tekitamine
    },
    update: function(){
        
    }
}