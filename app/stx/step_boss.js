var step_boss = {

    boss_face: '',
    boss_group: '',
    bossSprite: null,
    boss_energy: 100,

    preload: function () {
        game.load.image('boss', 'stx_assets/sprites/boss.png', 193, 94);
        game.load.image('boss_face', 'stx_assets/sprites/boss_face.png', 200, 266);
    },

    start: function () {
        step_boss.boss_energy = 100;
        step_boss.boss_group = game.add.group();
        step_boss.bossSprite = step_boss.boss_group.create(0, 0, 'boss');
        step_boss.bossSprite.scale.x = 1.5;
        step_boss.bossSprite.scale.y = 1.5;
        step_boss.bossSprite.x = 600;
        step_boss.boss_face = game.add.sprite(game.world.width - 200, 0, 'boss_face');
        currentStep = step_boss;
    },

    update: function () {
        stx_player.update();
        game.physics.collide(stx_player.bullets, step_boss.boss_group, step_boss.collisionHandler, null, this);
    },

    end: function () {
        hud.increaseScore(100000);
        step_boss.boss_face.kill();
        step_cto.start();
    },

    collisionHandler: function (bullet, boss) {
        step_boss.decreaseBossEnergy();
        bullet.kill();
        if (step_boss.bossIsOutOfEnergy()) {
            boss.kill();
        }
        if (step_boss.boss_group.countLiving() == 0) {
            step_boss.end();
        }
    },
    decreaseBossEnergy: function () {
        step_boss.boss_energy--;
        hud.setBossEnergy(step_boss.boss_energy);
    },
    bossIsOutOfEnergy: function () {
        return step_boss.boss_energy == 0;
    }

};