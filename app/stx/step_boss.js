var boss = {
    speed: 1000,
    sprite: null,
    face: '',
    firing_timer: 0,
    bullet_speed: 250,
    fire_interval: 200,
    energy: 200,
    decreaseEnergy: function () {
        boss.energy -= 5;
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
    boss.sprite.x = 600;

    boss.face = game.add.sprite(game.world.width - 200, 0, 'boss_face');
    game.add.tween(boss.sprite).to({ x: 700 }, boss.speed, Phaser.Easing.Linear.None)
        .to({ y: 100 }, cto1.speed, Phaser.Easing.Linear.None)
        .to({ x: 300 }, cto1.speed, Phaser.Easing.Linear.None)
        .to({ y: 0 }, cto1.speed, Phaser.Easing.Linear.None)
        .loop()
        .start();
}
var step_boss = {

    boss_group: '',
    music: null,

    preload: function () {
        game.load.image('boss', 'stx_assets/sprites/player.png');
        game.load.image('boss_face', 'stx_assets/sprites/boss_face.png');
        game.load.audio('boss_music', 'stx_assets/music/boss.mp3');
        game.load.image('bossBullet', 'assets/games/invaders/enemy-bullet.png');
    },

    start: function () {
        step_boss.boss_group = game.add.group();
        playMusic();
        showBackground();
        createBoss();
        hud.showBossInfo();
        step_boss.bullets = game.add.group();
        step_boss.bullets.createMultiple(100, 'bossBullet');
        step_boss.bullets.setAll('outOfBoundsKill', true);
        hud.drawScanlines();
        step_boss.drawLifebar(boss.energy);
        currentStep = step_boss;
    },

    drawLifebar: function (life) {
        var y = 300;
        var x = game.world.width - 200 + life;
        var graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x000000);
        graphics.lineStyle(20, 0x00FF00, 0.5);
        graphics.moveTo(game.world.width - 200, y);
        graphics.lineTo(x, y);
        graphics.endFill();

        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x000000);
        graphics.lineStyle(20, 0xFF0000, 0.5);
        graphics.moveTo(x, y);
        graphics.lineTo(game.world.width, y);
        graphics.endFill();

        hud.drawScanlines();
    },

    update: function () {
        boss.sprite.body.velocity.setTo(0, 0);
        if (game.time.now > boss.firing_timer) {
            step_boss.bossFires();
        }
        stx_player.update();
        background.update();
        game.physics.collide(stx_player.bullets, step_boss.boss_group, step_boss.collisionHandler, null, this);
    },

    end: function () {
        hud.colorHowToPlayBoss();
        hud.increaseScore(100000);
        boss.face.kill();
        step_cto.start();
    },

    collisionHandler: function (bullet, target) {
        hud.increaseScore(1);
        boss.decreaseEnergy();
        hud.setBossEnergy(boss.energy);
        step_boss.drawLifebar(boss.energy);

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
        game.physics.moveToObject(bullets, stx_player.sprite, boss.bullet_speed);
        boss.firing_timer = game.time.now + boss.fire_interval;
    }
};