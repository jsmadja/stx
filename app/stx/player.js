var stx_player = {

    bulletTime: 0,
    bullets: '',
    speed: 300,
    MAX_LIVES: 1,
    player: null,
    collectedItems:0,

    preload: function () {
        game.load.image('bullet', 'assets/games/invaders/bullet.png');
        game.load.image('ship', 'stx_assets/sprites/spiked ship 3. small.png');

    },

    start: function () {
        collectedItems = 0;

        //  Our bullet group
        stx_player.bullets = game.add.group();
        stx_player.bullets.createMultiple(30, 'bullet');
        stx_player.bullets.setAll('anchor.x', 0.5);
        stx_player.bullets.setAll('anchor.y', 1);
        stx_player.bullets.setAll('outOfBoundsKill', true);

        //  The hero!
        stx_player.player = game.add.sprite(game.world.centerX, game.world.height - 40, 'ship');
        stx_player.player.anchor.setTo(0.5, 0.5);
        stx_player.player.scale.x = 0.5;
        stx_player.player.scale.y = 0.5;
    },

    update: function () {
        //  Reset the player, then check for movement keys
        stx_player.player.body.velocity.setTo(0, 0);
        if (controls.cursors.left.isDown) {
            stx_player.player.body.velocity.x = -stx_player.speed;
        }
        if (controls.cursors.right.isDown) {
            stx_player.player.body.velocity.x = stx_player.speed;
        }
        if (controls.cursors.up.isDown) {
            stx_player.player.body.velocity.y = -stx_player.speed;
        }
        if (controls.cursors.down.isDown) {
            stx_player.player.body.velocity.y = stx_player.speed;
        }
        if (stx_player.player.body.x > game.world.width - 280) {
            stx_player.player.body.x = game.world.width - 280;
        }
        if (stx_player.player.body.x < 200) {
            stx_player.player.body.x = 200;
        }
        if (stx_player.player.body.y > game.world.height - 60) {
            stx_player.player.body.y = game.world.height - 60;
        }
        if (stx_player.player.body.y < 0) {
            stx_player.player.body.y = 0;
        }

        //  Firing?
        if (controls.fireButton.isDown) {
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
        var explosion = effects.explosions.getFirstDead();
        explosion.reset(stx_player.player.body.x, stx_player.player.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (hud.lives.countLiving() < 1) {
            step_gameover.start();
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