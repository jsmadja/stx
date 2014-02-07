var step_mission = {

    aliens: '',
    enemyBullet: '',
    items: '',
    music: '',
    enemyBullets: null,
    firingTimer: 0,
    music: null,
    itemMusic:null,

    preload: function () {
        game.load.image('enemyBullet', 'assets/games/invaders/enemy-bullet.png');
        game.load.spritesheet('invader', 'assets/games/invaders/invader32x32x4.png', 32, 32);
        game.load.image('kanban', 'stx_assets/sprites/items/kanban.png');
        game.load.audio('mission_music', 'stx_assets/music/mission.mp3');
        game.load.audio('item_music', 'stx_assets/sound/item_collected.wav');
    },

    start: function () {
        hud.start();
        stx_player.start();

        // The enemy's bullets
        step_mission.enemyBullets = game.add.group();
        step_mission.enemyBullets.createMultiple(30, 'enemyBullet');
        step_mission.enemyBullets.setAll('anchor.x', 0.5);
        step_mission.enemyBullets.setAll('anchor.y', 1);
        step_mission.enemyBullets.setAll('outOfBoundsKill', true);

        step_mission.aliens = game.add.group();

        step_mission.items = game.add.group();
        step_mission.music = game.add.audio('mission_music');
        step_mission.itemMusic = game.add.audio('item_music');

        step_mission.music.play();

        //item = game.add.text(game.world.centerX, game.world.centerY, "[KANBAN]", { font: "20px Arial", fill: "#ff0044"});
        var kanban = step_mission.items.create(game.world.centerX, game.world.centerY, 'kanban');
        kanban.anchor.setTo(0.5, 0.5);

        var alien = step_mission.aliens.create(game.world.centerX, 0, 'invader');
        alien.anchor.setTo(0.5, 0.5);
        alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        alien.play('fly');

        background.starfield.visible = true;

        step_mission.aliens.x = 100;
        step_mission.aliens.y = 50;
        step_mission.enemyBullets.setAll('outOfBoundsKill', true);
        currentStep = step_mission;

        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        //var tween = game.add.tween(aliens).to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween completes it calls descend, before looping again
        //tween.onComplete.add(descend, this);
    },

    update: function () {
        stx_player.update();
        background.update();
        if (game.time.now > step_mission.firingTimer) {
            step_mission.enemyFires();
        }
        game.physics.collide(stx_player.bullets, step_mission.aliens, step_mission.collisionHandler, null, this);
        game.physics.collide(step_mission.items, stx_player.player, step_mission.itemCollisionHandler, null, this);

        if (step_mission.aliens.countLiving() == 0 && stx_player.collectedItems == 1) {
            /*
             score += 1000;
             scoreText.content = scoreString + score;

             enemyBullets.callAll('kill', this);
             */
            step_mission.end();
        }
    },

    end: function () {
        step_mission.music.stop();
        step_boss.start();
    },

    collisionHandler: function (bullet, target) {
        //  When a bullet hits an target we kill them both
        bullet.kill();
        target.kill();
        hud.increaseScore(500);
        //  And create an explosion :)
        var explosion = effects.explosions.getFirstDead();
        explosion.reset(target.body.x, target.body.y);
        explosion.play('kaboom', 30, false, true);
    },

    itemCollisionHandler: function (player, item) {
        step_mission.itemMusic.play();
        stx_player.collectedItems++;
        item.kill();
    },

    descend: function () {

        //aliens.y += 10;

    },
    enemyFires: function () {

        //  Grab the first bullet we can from the pool
        step_mission.enemyBullet = step_mission.enemyBullets.getFirstExists(false);

        var livingEnemies = [];

        step_mission.aliens.forEachAlive(function (alien) {

            // put every living enemy in an array
            livingEnemies.push(alien);
        });


        if (step_mission.enemyBullet && livingEnemies.length > 0) {

            var random = game.rnd.integerInRange(0, livingEnemies.length);

            // randomly select one of them
            var shooter = livingEnemies[random];
            // And fire the bullet from this enemy
            step_mission.enemyBullet.reset(shooter.body.x, shooter.body.y);

            game.physics.moveToObject(step_mission.enemyBullet, stx_player.player, 120);
            step_mission.firingTimer = game.time.now + 2000;
        }
    }
};