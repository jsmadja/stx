var boss = {
    speed: 1000,
    sprite: null,
    face: '',
    firing_timer: 0,
    bullet_speed: 250,
    fire_interval: 200,
    energy: 5,
    decreaseEnergy: function () {
        boss.energy--;
    },
    isOutOfEnergy: function () {
        return boss.energy == 0;
    }
}

function showBackground() {
    background.starfield.visible = true;
    background.increaseSpeedBy2();
}

function playMusic() {
    step_boss.music = game.add.audio('boss_music');
    step_boss.music.play();
}

function createBoss() {
    boss.sprite = step_boss.boss_group.create(0, 0, 'boss');
    boss.sprite.scale.x = 1.5;
    boss.sprite.scale.y = 1.5;
    boss.sprite.x = 600;
    boss.face = game.add.sprite(game.world.width - 200, 0, 'boss_face');

    game.add.tween(boss.sprite).to({ x: 600 }, 2000, Phaser.Easing.Linear.None)
        .to({ y: 300 }, 1000, Phaser.Easing.Linear.None)
        .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
        .to({ y: 100 }, 1000, Phaser.Easing.Linear.None)
        .loop()
        .start();
}
var step_boss = {

    boss_group: '',
    music: null,

    preload: function () {
        game.load.image('boss', 'stx_assets/sprites/boss.png', 193, 94);
        game.load.image('boss_face', 'stx_assets/sprites/boss_face.png', 200, 266);
        game.load.audio('boss_music', 'stx_assets/music/boss.mp3');
        game.load.image('bossBullet', 'assets/games/invaders/enemy-bullet.png');
    },

    start: function () {
        step_boss.boss_group = game.add.group();
        playMusic();
        showBackground();
        createBoss();
        step_boss.bullets = game.add.group();
        step_boss.bullets.createMultiple(100, 'bossBullet');
        step_boss.bullets.setAll('anchor.x', 0.5);
        step_boss.bullets.setAll('anchor.y', 1);
        step_boss.bullets.setAll('outOfBoundsKill', true);

        currentStep = step_boss;
    },

    update: function () {
        if (game.time.now > boss.firing_timer) {
            step_boss.bossFires();
        }
        stx_player.update();
        background.update();
        game.physics.collide(stx_player.bullets, step_boss.boss_group, step_boss.collisionHandler, null, this);
    },

    end: function () {
        hud.increaseScore(100000);
        boss.face.kill();
        step_cto.start();
    },

    collisionHandler: function (bullet, target) {
        boss.decreaseEnergy();
        hud.setBossEnergy(boss.energy);
        bullet.kill();
        if (boss.isOutOfEnergy()) {
            target.kill();
        }
        if (step_boss.boss_group.countLiving() == 0) {
            step_boss.end();
        }
    },
    bossFires: function () {
        var bullets = step_boss.bullets.getFirstExists(false);
        bullets.reset(boss.sprite.body.x, boss.sprite.body.y);
        game.physics.moveToObject(bullets, stx_player.player, boss.bullet_speed);
        boss.firing_timer = game.time.now + boss.fire_interval;
    }
};