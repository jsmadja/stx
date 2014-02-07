var step_cto = {

    cto1_face: '',
    cto2_face: '',
    cto: '',

    preload: function () {
        game.load.spritesheet('cto1', 'assets/games/tanks/tank2.png', 32, 32);
        game.load.spritesheet('cto2', 'assets/games/tanks/tank3.png', 32, 32);
        game.load.image('cto1_face', 'stx_assets/sprites/cto1_face.png', 200, 266);
        game.load.image('cto2_face', 'stx_assets/sprites/cto2_face.png', 200, 266);
    },

    start: function () {
        step_cto.cto = game.add.group();
        var cto1 = step_cto.cto.create(game.world.centerX, 50, 'cto1');
        cto1.anchor.setTo(0.5, 0.5);
        step_cto.cto1_face = game.add.sprite(game.world.width - 200, 0, 'cto1_face');


        var cto2 = step_cto.cto.create(game.world.centerX, 50, 'cto2');
        cto2.anchor.setTo(1, 1);
        step_cto.cto2_face = game.add.sprite(game.world.width - 200, 300, 'cto2_face');

        step_cto.cto.x = 100;
        step_cto.cto.y = 100;

        background.increaseSpeedBy2();

        currentStep = step_cto;
    },

    update: function () {
        stx_player.update();
        background.update();
        game.physics.collide(stx_player.bullets, step_cto.cto, step_cto.collisionHandler, null, this);
    },

    end: function () {
        step_boss.music.stop();
        step_cto.cto1_face.kill();
        step_cto.cto2_face.kill();
        hud.increaseScore(100000);
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
        if (step_cto.cto.countLiving() == 1) {
            hud.increaseScore(100000);
        }
        if(step_cto.cto.countLiving() === 0) {
            step_cto.end()
        }
    }

};