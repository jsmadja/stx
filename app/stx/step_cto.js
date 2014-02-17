var cto1_lifebar_y_position = 300;
var cto2_lifebar_y_position = 550;


function showBackground() {
    background.starfield.visible = true;
    background.setSpeed(9);
}

var cto1 = {
    speed: 1000,
    sprite: null,
    face: '',
    firing_timer: 0,
    bullet_speed: 250,
    fire_interval: 200,
    energy: 200,
    decreaseEnergy: function () {
        cto1.energy -= 5;
    },
    isOutOfEnergy: function () {
        return cto1.energy == 0;
    }
}

var cto2 = {
    speed: 1000,
    sprite: null,
    cto2_face: '',
    cto_group1: '',
    cto_group2: '',
    firing_timer: 0,
    bullet_speed: 250,
    fire_interval: 200,
    energy: 200,
    decreaseEnergy: function () {
        cto2.energy -= 5;
    },
    isOutOfEnergy: function () {
        return cto2.energy == 0;
    }
}

function createCTO1() {
    cto1.sprite = step_cto.cto_group1.create(game.world.centerX + 100, 50, 'cto1');
    cto1.sprite.scale.x = 0.3;
    cto1.sprite.scale.y = 0.3;
    cto1.sprite.anchor.setTo(0.5, 0.5);
    cto1.face = game.add.sprite(game.world.width - 200, 0, 'cto1_face');

    game.add.tween(cto1.sprite).to({ x: 700 }, cto1.speed, Phaser.Easing.Linear.None)
        .to({ y: 100 }, cto1.speed, Phaser.Easing.Linear.None)
        .to({ x: 300 }, cto1.speed, Phaser.Easing.Linear.None)
        .to({ y: 0 }, cto1.speed, Phaser.Easing.Linear.None)
        .loop()
        .start();
}

function createCTO2() {
    cto2.sprite = step_cto.cto_group2.create(game.world.centerX - 100, 50, 'cto2');
    cto2.sprite.scale.x = 0.3;
    cto2.sprite.scale.y = 0.3;
    cto2.sprite.anchor.setTo(0.5, 0.5);
    cto2.face = game.add.sprite(game.world.width - 200, 300, 'cto2_face');
    game.add.tween(cto2.sprite).to({ x: 300 }, cto2.speed, Phaser.Easing.Linear.None)
        .to({ y: 0 }, cto2.speed, Phaser.Easing.Linear.None)
        .to({ x: 700 }, cto2.speed, Phaser.Easing.Linear.None)
        .to({ y: 100 }, cto2.speed, Phaser.Easing.Linear.None)
        .loop()
        .start();
}
function playMusic() {
    if (!step_boss.music || !step_boss.music.isPlaying) {
        step_boss.music = game.add.audio('boss_music');
        step_boss.music.play();
    }
}

var step_cto = {

    preload: function () {
        game.load.spritesheet('cto1', 'stx_assets/sprites/ship4_0.png', 392, 338);
        game.load.spritesheet('cto2', 'stx_assets/sprites/ship5.png', 366, 304);
        game.load.image('cto1_face', 'stx_assets/sprites/cto1_face.png', 200, 266);
        game.load.image('cto2_face', 'stx_assets/sprites/cto2_face.png', 200, 266);
        game.load.image('ctoBullet', 'assets/games/invaders/enemy-bullet.png');
    },

    start: function () {
        step_cto.firing_timer = game.time.now;
        step_cto.cto_group1 = game.add.group();
        step_cto.cto_group1.x = 100;
        step_cto.cto_group1.y = 100;

        step_cto.cto_group2 = game.add.group();
        step_cto.cto_group2.x = 100;
        step_cto.cto_group2.y = 100;

        playMusic();
        showBackground();
        createCTO1();
        createCTO2();

        step_cto.bullets = game.add.group();
        step_cto.bullets.createMultiple(100, 'ctoBullet');
        step_cto.bullets.setAll('anchor.x', 0.5);
        step_cto.bullets.setAll('anchor.y', 1);
        step_cto.bullets.setAll('outOfBoundsKill', true);

        hud.drawLifebar(cto1.energy, cto1_lifebar_y_position);
        hud.drawLifebar(cto2.energy, cto2_lifebar_y_position);

        hud.drawScanlines();

        currentStep = step_cto;
    },

    update: function () {
        cto1.sprite.body.velocity.setTo(0, 0);
        cto2.sprite.body.velocity.setTo(0, 0);

        if (cto1.sprite.alive && (game.time.now > cto1.firing_timer)) {
            step_cto.cto1Fires();
        }
        if (cto2.sprite.alive && (game.time.now > cto2.firing_timer)) {
            step_cto.cto2Fires();
        }
        stx_player.update();
        background.update();
        game.physics.collide(stx_player.bullets, step_cto.cto_group1, step_cto.collisionHandlerCto1, null, this);
        game.physics.collide(stx_player.bullets, step_cto.cto_group2, step_cto.collisionHandlerCto2, null, this);
    },

    end: function () {
        step_boss.music.stop();
        cto1.face.kill();
        cto2.face.kill();
        hud.increaseScore(100000);
        stx_player.hide();
        hud.hide();

        var graphics = game.add.graphics(0, 0);
            graphics.beginFill(0x000000);
            graphics.lineStyle(20, 0x000000, 1);
            graphics.moveTo(game.world.width - 200, cto1_lifebar_y_position);
            graphics.lineTo(game.world.width, cto1_lifebar_y_position);
            graphics.endFill();

        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x000000);
        graphics.lineStyle(20, 0x000000, 1);
        graphics.moveTo(game.world.width - 200, cto2_lifebar_y_position);
        graphics.lineTo(game.world.width, cto2_lifebar_y_position);
        graphics.endFill();

    },

    collisionHandlerCto1: function (bullet, target) {
        cto1.decreaseEnergy();
        hud.drawLifebar(cto1.energy, cto1_lifebar_y_position);

        bullet.kill();
        if (cto1.isOutOfEnergy()) {
            target.kill();
            hud.increaseScore(100000);
        }
        if (step_cto.cto_group1.countLiving() === 0 && step_cto.cto_group2.countLiving() === 0 ) {
            step_cto.end()
        }
    },

    collisionHandlerCto2: function (bullet, target) {
        cto2.decreaseEnergy();
        hud.drawLifebar(cto2.energy, cto2_lifebar_y_position);

        bullet.kill();
        if (cto2.isOutOfEnergy()) {
            target.kill();
            hud.increaseScore(100000);
        }
        if (step_cto.cto_group1.countLiving() === 0 && step_cto.cto_group2.countLiving() === 0 ) {
            step_cto.end()
        }
    },

    cto1Fires: function () {
        var cto1Bullet = step_cto.bullets.getFirstExists(false);
        cto1Bullet.reset(cto1.sprite.body.x + cto1.sprite.body.width / 2, cto1.sprite.body.y + cto1.sprite.body.height);
        game.physics.moveToObject(cto1Bullet, stx_player.sprite, cto1.bullet_speed);
        cto1.firing_timer = game.time.now + cto1.fire_interval;
    },
    cto2Fires: function () {
        var cto2Bullet = step_cto.bullets.getFirstExists(false);
        cto2Bullet.reset(cto2.sprite.body.x + cto2.sprite.body.width / 2, cto2.sprite.body.y + cto2.sprite.body.height);
        game.physics.moveToObject(cto2Bullet, stx_player.sprite, cto2.bullet_speed);
        cto2.firing_timer = game.time.now + cto2.fire_interval;
    }

};