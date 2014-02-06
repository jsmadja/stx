var step_boss = {

    boss_face: '',
    boss_group:'',

    preload: function () {
        game.load.image('boss', 'stx_assets/sprites/boss.png', 193, 94);
        game.load.image('boss_face', 'stx_assets/sprites/boss_face.png', 200, 266);
    },

    start: function () {
        step_boss.boss_group = game.add.group();
        var bossSprite = step_boss.boss_group.create(0, 0, 'boss');
        bossSprite.scale.x = 1.5;
        bossSprite.scale.y = 1.5;
        bossSprite.x = 600;
        step_boss.boss_face = game.add.sprite(game.world.width - 200, 0, 'boss_face');
        currentStep = step_boss;
    },

    update: function () {
        stx_player.update();
        game.physics.collide(stx_player.bullets, step_boss.boss_group, step_boss.collisionHandler, null, this);
    },

    end: function () {
        step_boss.boss_face.kill();
        step_cto.start();
    },

    collisionHandler: function (bullet, target) {
        //  When a bullet hits an target we kill them both
        bullet.kill();
        target.kill();

        //  Increase the score
        hud.score += 20;
        hud.scoreText.content = hud.scoreString + hud.score;

        //  And create an explosion :)
        var explosion = effects.explosions.getFirstDead();
        explosion.reset(target.body.x, target.body.y);
        explosion.play('kaboom', 30, false, true);

        if (step_boss.boss_group.countLiving() == 0) {
            step_boss.end();
        }
    }

};