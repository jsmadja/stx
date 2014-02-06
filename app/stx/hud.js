var hud = {
    score: 0,
    scoreString: '',
    scoreText: '',
    lives: '',
    livesText: '',
    stateText: '',
    title: '',

    start: function () {
        hud.score = 0;
        hud.scoreString = 'Score : ';
        hud.scoreText = game.add.text(10, 200, hud.scoreString + hud.score, { fontSize: '34px', fill: '#fff' });

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

        /*
         for (var i = 0; i < stx_player.MAX_LIVES; i++) {
         var ship = hud.lives.create(0 + (30 * i), 60, 'ship');
         ship.anchor.setTo(0.5, 0.5);
         ship.angle = 90;
         ship.alpha = 0.4;
         }*/
    }
}