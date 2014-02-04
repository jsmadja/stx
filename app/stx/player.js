var stx_player = {

    bulletTime: 0,
    bullets: '',
    speed: 200,
    MAX_LIVES: 1,
    player: null,

    preload: function () {
        game.load.image('bullet', 'assets/games/invaders/bullet.png');
        game.load.image('ship', 'assets/games/invaders/player.png');

    },

    start: function () {
        //  Our bullet group
        stx_player.bullets = game.add.group();
        stx_player.bullets.createMultiple(30, 'bullet');
        stx_player.bullets.setAll('anchor.x', 0.5);
        stx_player.bullets.setAll('anchor.y', 1);
        stx_player.bullets.setAll('outOfBoundsKill', true);

        //  The hero!
        stx_player.player = game.add.sprite(game.world.centerX, game.world.height - 40, 'ship');
        stx_player.player.anchor.setTo(0.5, 0.5);
    },

    update: function () {
        //  Reset the player, then check for movement keys
        stx_player.player.body.velocity.setTo(0, 0);
        if (cursors.left.isDown) {
            stx_player.player.body.velocity.x = -stx_player.speed;
        }
        if (cursors.right.isDown) {
            stx_player.player.body.velocity.x = stx_player.speed;
        }
        if (cursors.up.isDown) {
            stx_player.player.body.velocity.y = -stx_player.speed;
        }
        if (cursors.down.isDown) {
            stx_player.player.body.velocity.y = stx_player.speed;
        }
        if (stx_player.player.body.x > game.world.width - 230) {
            stx_player.player.body.x = game.world.width - 230;
        }
        if (stx_player.player.body.x < 200) {
            stx_player.player.body.x = 200;
        }
        if (stx_player.player.body.y > game.world.height - 20) {
            stx_player.player.body.y = game.world.height - 20;
        }
        if (stx_player.player.body.y < 0) {
            stx_player.player.body.y = 0;
        }

        //  Firing?
        if (fireButton.isDown) {
            stx_player.fireBullet();
        }
        //game.physics.collide(enemyBullets, player, enemyHitsPlayer, null, this);
    },

    end: function () {
    },

    enemyHitsPlayer: function (player, bullet) {

        bullet.kill();

        live = hud.lives.getFirstAlive();

        if (live) {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstDead();
        explosion.reset(stx_player.player.body.x, stx_player.player.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (hud.lives.countLiving() < 1) {
            gameOver();
        }

    },
    fireBullet: function () {
        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > stx_player.bulletTime) {
            //  Grab the first bullet we can from the pool
            bullet = stx_player.bullets.getFirstExists(false);
            if (bullet) {
                //  And fire it
                bullet.reset(stx_player.player.x, stx_player.player.y + 8);
                bullet.body.velocity.y = -400;
                stx_player.bulletTime = game.time.now + 200;
            }
        }
    }

};