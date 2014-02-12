var coloredHowToPlay = { font: "12pt Pirulen", fill: '#F00'};

var hud = {
    score: 0,
    scoreText: '',
    lives: '',
    livesText: '',
    stateText: '',
    title: '',
    hiscore: "500.000",
    hiscoreText: '',
    bossEnergyText: null,
    bossEnergy: null,
    logo: null,
    credits: '',
    howtoplay: '',
    player1: '',
    player2: '',
    insertcoin: '',
    bossInfoText: '',
    hallOfFameText: null,

    borderWidth: 200,

    preload: function () {
        game.load.image('logo', 'stx_assets/sprites/hello-xebia.png');
    },

    start: function () {
        hud.logo = game.add.sprite(0, game.world.height - 61, 'logo');
        hud.logo.scale.x = 0.7;
        hud.logo.scale.y = 0.7;


        hud.scoreText = game.add.text(315, 30, 0, { fontSize: '34px', fill: '#fff' });
        hud.increaseScore(0);

        //  Lives
        hud.lives = game.add.group();
        hud.livesText = game.add.text(0, 10, 'Lives : ', { fontSize: '34px', fill: '#fff' });
        hud.livesText.visible = false;

        //  Text
        hud.stateText = game.add.text(game.world.centerX, game.world.centerY, '', { font: "30pt Pirulen", fill: '#fff', strokeThickness: 2 });
        hud.stateText.anchor.setTo(0.5, 0.5);
        hud.stateText.visible = false;

        // Title
        hud.title = game.add.text(game.world.centerX, game.world.centerY, '', { font: "30pt Pirulen", fill: '#fff', strokeThickness: 2 });
        hud.title.anchor.setTo(0.5, 0.5);
        hud.title.visible = false;

        // Hall Of Fame Title
        hud.hallOfFameText = game.add.text(game.world.centerX, 50, 'Hall Of Fame', { fontSize: '84px', fill: '#fff' });
        hud.hallOfFameText.anchor.setTo(0.5, 0.5);
        hud.hallOfFameText.visible = false;

        // P1
        hud.player1 = game.add.text(hud.borderWidth, 0, 'PLAYER 1', { font: "20pt Pirulen", fill: '#fff'});

        // P2 INSERT COIN
        hud.player2 = game.add.text(game.world.width - (hud.borderWidth * 2), 0, 'PLAYER 2', { font: "20pt Pirulen", fill: '#fff'});
        hud.insertcoin = game.add.text(game.world.width - (hud.borderWidth * 2) - 20, 30, 'INSERT-COIN', { font: "10pt Pirulen", fill: '#fff'});

        // HI-SCORE
        hud.hiscoreText = game.add.text(game.world.centerX, 0, 'HI-SCORE\n' + hud.hiscore, { font: "14pt Pirulen", fill: '#fff'});
        hud.hiscoreText.anchor.setTo(0.5, 0);

        // CREDITS
        hud.credits = game.add.text(game.world.width - 330, game.world.height - 40, 'CREDIT 0', { font: "14pt Pirulen", fill: '#fff'});

        // BOSS INFO
        var photoHeight = 266;
        hud.bossInfoText = game.add.text(game.world.width - hud.borderWidth, photoHeight, 'Lt. CHEVALIER\nAGILE PP\nPOW: 100 KB', { font: "14pt Pirulen", fill: '#fff'});
        hud.bossEnergyText = game.add.text(game.world.width - hud.borderWidth, photoHeight + 90, '', { font: "14pt Pirulen", fill: '#fff'});
        hud.bossInfoText.visible = false;
        hud.bossEnergyText.visible = false;
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
        var y = 100;
        var spacing = 60;
        hud.howtoplay = game.add.text(5, y, 'HOW TO PLAY', { font: "14pt Pirulen", fill: '#367'});
        var howtoplay_style = { font: "12pt Pirulen", fill: '#555'};
        hud.howtoplay_step1 = game.add.text(10, y + spacing, ' Kill ennemies', howtoplay_style);
        hud.howtoplay_step2 = game.add.text(10, y + (spacing * 2), 'Collect items', howtoplay_style);
        hud.howtoplay_step3 = game.add.text(10, y + (spacing * 3), 'Beat the boss', howtoplay_style);
        hud.howtoplay_step4 = game.add.text(10, y + (spacing * 4), 'Beat the CTOs', howtoplay_style);

    },

    increaseScore: function (value) {
        hud.score += value;
        hud.scoreText.content = value;
    },

    setBossEnergy: function (value) {
        hud.bossEnergy = value;

    },
    update: function () {
        if (hud.bossEnergy) {
            hud.bossEnergyText.setText('DEF: ' + hud.bossEnergy);
        }
    },
    hide: function () {
        hud.logo.visible = false;
        hud.scoreText.visible = false;
        hud.stateText.visible = false;
        hud.livesText.visible = false;
        hud.credits.visible = false;
        hud.player1.visible = false;
        hud.player2.visible = false;
        hud.insertcoin.visible = false;
        hud.hiscoreText.visible = false;
        hud.bossInfoText.visible = false;
        hud.hallOfFameText.visible = false;

        hud.hideHowToPlay();
    },
    show: function () {
        hud.logo.visible = true;
        hud.scoreText.visible = true;
        hud.stateText.visible = true;
        hud.credits.visible = true;
        hud.howtoplay.visible = true;
        hud.player1.visible = true;
        hud.player2.visible = true;
        hud.insertcoin.visible = true;
        hud.hiscoreText.visible = true;
        hud.showHowToPlay();

    },
    showHallOfFameTitle: function () {
        hud.hallOfFameText.visible = true;
    },
    showBossInfo: function () {
        hud.bossInfoText.visible = true;
        hud.bossEnergyText.visible = true;
    },
    drawScanlines: function () {
        var graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x000000);
        graphics.lineStyle(1, 0x000000, 0.4);
        for (var i = 0; i < game.world.height; i += 2) {
            graphics.moveTo(0, i);
            graphics.lineTo(game.world.width, i);
        }
        graphics.endFill();
    },
    colorHowToPlayItems: function () {
        hud.howtoplay_step2.setStyle(coloredHowToPlay);
    },
    colorHowToPlayEnemies: function () {
        hud.howtoplay_step1.setStyle(coloredHowToPlay);
    },
    colorHowToPlayBoss: function () {
        hud.howtoplay_step3.setStyle(coloredHowToPlay);
    },
    hideHowToPlay: function () {
        hud.howtoplay.visible = false;
        hud.howtoplay_step1.visible = false;
        hud.howtoplay_step2.visible = false;
        hud.howtoplay_step3.visible = false;
        hud.howtoplay_step4.visible = false;
    },
    showHowToPlay: function () {
        hud.howtoplay.visible = true;
        hud.howtoplay_step1.visible = true;
        hud.howtoplay_step2.visible = true;
        hud.howtoplay_step3.visible = true;
        hud.howtoplay_step4.visible = true;
    }
}