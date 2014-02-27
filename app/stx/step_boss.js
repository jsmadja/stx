var boss_lifebar_y_position = 330;
var photoHeight = 290;

var boss = {
    speed: 1000,
    sprite: null,
    face: '',
    firing_timer: 0,
    bullet_speed: 250,
    fire_interval: 150,
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
    background.setSpeed(2);
}

function playMusic() {
    step_boss.music = game.add.audio('boss_music');
    step_boss.music.play();
}

function createBoss() {
    boss.sprite = step_boss.boss_group.create(0, 0, 'boss');
    boss.sprite.x = game.world.centerX;
    boss.sprite.y = -1000;

    boss.face = game.add.sprite(game.world.width - 200, 0, step_missionselection.selected_mission.boss);
    game.add.tween(boss.sprite).to({ x: 900 }, boss.speed, Phaser.Easing.Linear.None)
        .to({ y: 60 }, cto1.speed, Phaser.Easing.Linear.None)
        .to({ x: 200 }, cto1.speed, Phaser.Easing.Linear.None)
        .to({ y: 60 }, cto1.speed, Phaser.Easing.Linear.None)
        .loop()
        .start();
}
var step_boss = {

    boss_group: '',
    music: null,
    bossInfoText: '',

    preload: function () {
        game.load.image('boss', 'stx_assets/sprites/player.png');
        game.load.audio('boss_music', 'stx_assets/music/boss.mp3');
        game.load.image('bossBullet', 'assets/games/invaders/enemy-pinkbullet.png');
        for (var i = 0; i < missions.length; i++) {
            var mission = missions[i];
            game.load.image(mission.boss, 'stx_assets/sprites/' + mission.sprite);
        }
    },

    start: function () {
        // BOSS INFO
        step_boss.bossInfoText = game.add.text(game.world.width - hud.borderWidth, photoHeight, 'Lt. ' + step_missionselection.selected_mission.boss, { font: "14pt Pirulen", fill: '#fff'});
        step_boss.bossInfoText.visible = true;

        step_boss.boss_group = game.add.group();
        playMusic();
        showBackground();
        createBoss();
        step_boss.bullets = game.add.group();
        step_boss.bullets.createMultiple(100, 'bossBullet');
        step_boss.bullets.setAll('outOfBoundsKill', true);
        hud.drawLifebar(boss.energy, boss_lifebar_y_position);
        hud.drawScanlines();
        currentStep = step_boss;
    },

    update: function () {
        boss.sprite.body.velocity.setTo(0, 0);
        if (game.time.now > boss.firing_timer) {
            step_boss.bossFires();
        }
        stx_player.update();
        background.update();
        game.physics.collide(stx_player.bullets, step_boss.boss_group, step_boss.enemyBulletcollisionHandler, null, this);
    },

    end: function () {
        background.visible = false;
        hud.colorHowToPlayBoss();
        hud.increaseScore(100000);
        boss.face.kill();
        step_boss.bossInfoText.visible = false;
        step_cto.start();
    },

    enemyBulletcollisionHandler: function (bullet, target) {
        hud.increaseScore(100);
        boss.decreaseEnergy();
        console.log(boss.energy);
        hud.drawLifebar(boss.energy, boss_lifebar_y_position);

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
        bullets.reset(boss.sprite.body.x + boss.sprite.width / 2, boss.sprite.body.y + boss.sprite.height - 10);
        game.physics.moveToObject(bullets, stx_player.sprite, boss.bullet_speed);
        boss.firing_timer = game.time.now + boss.fire_interval;
    }
};