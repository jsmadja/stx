var hud = {
    score: 0,
    scoreText: '',
    lives: '',
    livesText: '',
    stateText: '',
    title: '',
    hiscore: "500.000",
    bossEnergyText: null,
    bossEnergy: null,

    borderWidth: 200,

    preload: function () {
        game.load.image('logo', 'stx_assets/sprites/hello-xebia.png');
    },

    start: function () {
        var logo = game.add.sprite(0, game.world.height - 61, 'logo');
        logo.scale.x = 0.7;
        logo.scale.y = 0.7;


        hud.scoreText = game.add.text(200, 30, 0, { fontSize: '34px', fill: '#fff' });

        //  Lives
        hud.lives = game.add.group();
        hud.livesText = game.add.text(0, 10, 'Lives : ', { fontSize: '34px', fill: '#fff' });
        hud.livesText.visible = false;

        //  Text
        hud.stateText = game.add.text(game.world.centerX, game.world.centerY, '', { fontSize: '84px', fill: '#fff' });
        hud.stateText.anchor.setTo(0.5, 0.5);
        hud.stateText.visible = false;

        // Title
        hud.title = game.add.text(game.world.centerX, game.world.centerY, '', { fontSize: '84px', fill: '#fff' });
        hud.title.anchor.setTo(0.5, 0.5);
        hud.title.visible = false;

        // P1 INSERT COIN
        game.add.text(hud.borderWidth, 0, 'PLAYER 1', {fill: '#fff'});

        // P2 INSERT COIN
        game.add.text(game.world.width - (hud.borderWidth * 2), 0, 'PLAYER 2', {fill: '#fff'});
        game.add.text(game.world.width - (hud.borderWidth * 2), 30, 'INSERT-COIN', {fill: '#fff'});

        // HI-SCORE
        hiscore = game.add.text(game.world.centerX, 0, 'HI-SCORE', {fill: '#fff'});
        hiscore.anchor.setTo(0.5, 0);
        hiscore = game.add.text(game.world.centerX, 30, hud.hiscore, {fill: '#fff'});
        hiscore.anchor.setTo(0.5, 0);

        // CREDITS
        game.add.text(game.world.width - 330, game.world.height - 40, 'CREDIT 0', {fill: '#fff'});

        // BOSS INFO
        var photoHeight = 170;
        game.add.text(game.world.width - hud.borderWidth, photoHeight, 'Lt. CHEVALIER', {fill: '#fff'});
        game.add.text(game.world.width - hud.borderWidth, photoHeight + 30, 'AGILE PP', {fill: '#fff'});
        game.add.text(game.world.width - hud.borderWidth, photoHeight + 60, 'POW: 100 KB', {fill: '#fff'});
        hud.bossEnergyText = game.add.text(game.world.width - hud.borderWidth, photoHeight + 90, '', {fill: '#fff'});

        /*
         // BOSS INFO
         var photoHeight = 170;
         game.add.text(game.world.width - hud.borderWidth, photoHeight+ game.world.height / 2, 'Cdt LOPEZ', {fill: '#fff'});
         game.add.text(game.world.width - hud.borderWidth, photoHeight+game.world.height / 2 + 30, 'DATA CTO', {fill: '#fff'});
         game.add.text(game.world.width - hud.borderWidth, photoHeight+game.world.height / 2 + 60, 'POW: 100 XM', {fill: '#fff'});
         game.add.text(game.world.width - hud.borderWidth, photoHeight+game.world.height / 2 + 90, 'DEF: 100.000', {fill: '#fff'});

         game.add.text(game.world.width - hud.borderWidth, photoHeight+0, 'Cdt BURET', {fill: '#fff'});
         game.add.text(game.world.width - hud.borderWidth, photoHeight+30, 'ARCH CTO', {fill: '#fff'});
         game.add.text(game.world.width - hud.borderWidth, photoHeight+60, 'POW: 100 MD', {fill: '#fff'});
         game.add.text(game.world.width - hud.borderWidth, photoHeight+90, 'DEF: 100.000', {fill: '#fff'});
         */
        // HOW TO PLAY
        game.add.text(0, 0, 'Use Arrow to \nmove your ship.\n\nCollect items\nto confront\nthe boss.', {fill: '#fff'});
    },

    increaseScore: function (value) {
        hud.score += value;
        hud.scoreText.content = hud.score;
    },

    setBossEnergy: function (value) {
        hud.bossEnergy = value;

    },
    update: function () {
        if (hud.bossEnergy) {
            hud.bossEnergyText.setText('DEF: ' + hud.bossEnergy);
        }
    }

}