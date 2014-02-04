var hud = {
    score: 0,
    scoreString: '',
    scoreText: '',
    lives: '',
    stateText: '',

    start: function () {
        //  The score
        hud.scoreString = 'Score : ';
        hud.scoreText = game.add.text(10, 200, hud.scoreString + hud.score, { fontSize: '34px', fill: '#fff' });

        //  Lives
        hud.lives = game.add.group();
        game.add.text(0, 10, 'Lives : ', { fontSize: '34px', fill: '#fff' });

        //  Text
        hud.stateText = game.add.text(game.world.centerX, game.world.centerY, '', { fontSize: '84px', fill: '#fff' });
        hud.stateText.anchor.setTo(0.5, 0.5);
        hud.stateText.visible = false;

        for (var i = 0; i < stx_player.MAX_LIVES; i++) {
            var ship = hud.lives.create(0 + (30 * i), 60, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.4;
        }
    }
}