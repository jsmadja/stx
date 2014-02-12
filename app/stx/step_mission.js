var old = 0;
var MAX_ITEMS = 1;
var disabled_item_style = { font: "12pt Pirulen", fill: '#555'};
var enabled_item_style = { font: "12pt Pirulen", fill: '#F00'};

var step_mission = {

    aliens: '',
    enemyBullet: '',
    items: '',
    music: '',
    enemyBullets: null,
    firingTimer: 0,
    music: null,
    itemMusic: null,
    enemy_speed: 0,
    item1: null,
    item2: null,
    item3: null,
    item4: null,
    item5: null,
    item6: null,

    preload: function () {
        game.load.image('enemyBullet', 'assets/games/invaders/enemy-bullet.png');
        game.load.spritesheet('invader', 'assets/games/invaders/invader32x32x4.png', 32, 32);
        game.load.image('kanban', 'stx_assets/sprites/items/kanban.png');
        game.load.audio('mission_music', 'stx_assets/music/mission.mp3');
        game.load.audio('item_music', 'stx_assets/sound/item_collected.wav');
    },

    start: function () {
        step_mission.enemyBullets = game.add.group();
        step_mission.enemyBullets.createMultiple(30, 'enemyBullet');
        step_mission.enemyBullets.setAll('anchor.x', 0.5);
        step_mission.enemyBullets.setAll('anchor.y', 1);
        step_mission.enemyBullets.setAll('outOfBoundsKill', true);

        step_mission.aliens = game.add.group();

        step_mission.items = game.add.group();
        step_mission.music = game.add.audio('mission_music');
        step_mission.itemMusic = game.add.audio('item_music');

        // ITEMS
        var y = 100;
        var spacing = 60;
        step_mission.items_title = game.add.text(game.world.width - 200, y, '      ITEMS', { font: "14pt Pirulen", fill: '#367', align: 'center'});

        step_mission.item1 = game.add.text(game.world.width - 200, y + (spacing * 1), ' KANBAN', disabled_item_style);
        step_mission.item2 = game.add.text(game.world.width - 200, y + (spacing * 2), ' SCRUM', disabled_item_style);
        step_mission.item3 = game.add.text(game.world.width - 200, y + (spacing * 3), ' LEAN', disabled_item_style);
        step_mission.item4 = game.add.text(game.world.width - 200, y + (spacing * 4), ' A3', disabled_item_style);
        step_mission.item5 = game.add.text(game.world.width - 200, y + (spacing * 5), ' SPRINT', disabled_item_style);
        step_mission.item6 = game.add.text(game.world.width - 200, y + (spacing * 6), ' RETRO', disabled_item_style);

        step_mission.music.play();

        var kanban = step_mission.items.create(game.world.centerX, game.world.centerY, 'kanban');
        kanban.anchor.setTo(0.5, 0.5);

        for (var x = 0; x < 1; x++) {
            var alien = step_mission.aliens.create(game.world.centerX, 0 - (x * 30), 'invader');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            alien.play('fly');
            alien.old = game.time.now;
        }

        //var tween = game.add.tween(step_mission.aliens);
        //tween.onComplete.add(step_mission.descend, this);

        background.starfield.visible = true;

        step_mission.aliens.x = 100;
        step_mission.aliens.y = 50;

        stx_player.show();

        hud.drawScanlines();

        currentStep = step_mission;
    },

    descend: function () {
        step_mission.aliens.forEach(step_mission.descendAlien, this);
    },
    descendAlien: function (alien) {
        if (game.time.now > (alien.old + 20)) {
            alien.y += 10;
        }
        alien.old = game.time.now;
    },

    update: function () {
        background.update();
        stx_player.update();
        //step_mission.descend();
        if (game.time.now > step_mission.firing_timer) {
            step_mission.enemyFires();
        }
        game.physics.collide(stx_player.bullets, step_mission.aliens, step_mission.collisionHandler, null, this);
        game.physics.collide(step_mission.items, stx_player.sprite, step_mission.itemCollisionHandler, null, this);
        if (step_mission.aliens.countLiving() == 0 && stx_player.collectedItems == 1) {
            step_mission.end();
        }
    },

    end: function () {
        step_mission.items.visible = false;
        step_mission.hideItems();
        step_mission.music.stop();
        step_boss.start();
    },

    hideItems: function () {
        step_mission.items.visible = false;
    },

    collisionHandler: function (bullet, target) {
        bullet.kill();
        target.kill();
        hud.increaseScore(500);
        var explosion = effects.explosions.getFirstDead();
        explosion.reset(target.body.x, target.body.y);
        explosion.play('kaboom', 30, false, true);
        if (step_mission.aliens.countLiving() == 0) {
            hud.colorHowToPlayEnemies();
        }
    },

    itemCollisionHandler: function (player, item) {
        step_mission.itemMusic.play();
        stx_player.collectedItems++;
        item.visible = false;
        step_mission.item1.setStyle(enabled_item_style);
        if (stx_player.collectedItems == MAX_ITEMS) {
            hud.colorHowToPlayItems();
        }
    },

    enemyFires: function () {
        step_mission.enemyBullet = step_mission.enemyBullets.getFirstExists(false);
        var livingEnemies = [];
        step_mission.aliens.forEachAlive(function (alien) {
            livingEnemies.push(alien);
        });
        if (step_mission.enemyBullet && livingEnemies.length > 0) {
            var random = game.rnd.integerInRange(0, livingEnemies.length);
            var shooter = livingEnemies[random];
            step_mission.enemyBullet.reset(shooter.body.x, shooter.body.y);
            game.physics.moveToObject(step_mission.enemyBullet, stx_player.sprite, 120);
            step_mission.firing_timer = game.time.now + 2000;
        }
    }
};