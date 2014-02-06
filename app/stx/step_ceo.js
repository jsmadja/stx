var step_ceo = {

    ceo_face: '',
    ceo: '',

    preload: function () {
        game.load.spritesheet('ceo', 'assets/games/tanks/tank5.png', 32, 32);
        game.load.image('ceo_face', 'stx_assets/sprites/ceo_face.png', 200, 266);
    },

    start: function () {
        step_ceo.ceo = game.add.group();
        var alien = step_ceo.ceo.create(game.world.centerX, 50, 'ceo');
        alien.anchor.setTo(0.5, 0.5);
        step_ceo.ceo.x = 100;
        step_ceo.ceo.y = 100;

        step_ceo.ceo_face = game.add.sprite(game.world.width - 200, 0, 'ceo_face');
        background.increaseSpeedBy2();

        currentStep = step_ceo;
    },

    update: function () {
        stx_player.update();
        background.update();
        game.physics.collide(stx_player.bullets, step_ceo.ceo, step_ceo.collisionHandler, null, this);
    },

    end: function () {
        hud.scoreText.visible = false;
        stx_player.player.kill();
        step_ceo.ceo_face.kill();
        step_congratulations.start();
    },

    collisionHandler: function (bullet, target) {
        //  When a bullet hits an target we kill them both
        bullet.kill();
        target.kill();
        //  And create an explosion :)
        var explosion = effects.explosions.getFirstDead();
        explosion.reset(target.body.x, target.body.y);
        explosion.play('kaboom', 30, false, true);
        if (step_ceo.ceo.countLiving() == 0) {
            step_ceo.end();
        }
    }

};