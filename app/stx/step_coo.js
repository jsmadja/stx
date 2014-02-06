var step_coo = {

    coo_face: '',
    coo: '',

    preload: function () {
        game.load.spritesheet('coo', 'assets/games/tanks/tank4.png', 32, 32);
        game.load.image('coo_face', 'stx_assets/sprites/coo_face.png', 200, 266);
    },

    start: function () {
        step_coo.coo = game.add.group();
        var alien = step_coo.coo.create(game.world.centerX, 50, 'coo');
        alien.anchor.setTo(0.5, 0.5);
        step_coo.coo.x = 100;
        step_coo.coo.y = 100;

        step_coo.coo_face = game.add.sprite(game.world.width - 200, 0, 'coo_face');
        background.increaseSpeedBy2();

        currentStep = step_coo;
    },

    update: function () {
        stx_player.update();
        background.update();
        game.physics.collide(stx_player.bullets, step_coo.coo, step_coo.collisionHandler, null, this);
    },

    end: function () {
        step_coo.coo_face.kill();
        step_ceo.start();
    },

    collisionHandler: function (bullet, target) {
        //  When a bullet hits an target we kill them both
        bullet.kill();
        target.kill();
        //  And create an explosion :)
        var explosion = effects.explosions.getFirstDead();
        explosion.reset(target.body.x, target.body.y);
        explosion.play('kaboom', 30, false, true);
        if (step_coo.coo.countLiving() == 0) {
            step_coo.end();
        }
    }

};