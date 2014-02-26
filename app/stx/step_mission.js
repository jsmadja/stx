var MAX_ITEMS = 6;
var disabled_item_style = { font: "12pt Pirulen", fill: '#555'};
var enabled_item_style = { font: "12pt Pirulen", fill: '#F00'};

var step_mission = {

    aliens1: '',
    aliens2: '',
    aliens3: '',
    items: '',
    music: null,
    itemMusic: null,
    enemy_speed: 0,
    item1: null,
    item2: null,
    item3: null,
    item4: null,
    item5: null,
    item6: null,
    explosions: null,

    preload: function () {
        game.load.image('invader', 'stx_assets/sprites/player.png');
        game.load.spritesheet('kaboom', 'assets/games/invaders/explode.png', 128, 128);

        game.load.image('kanban', 'stx_assets/sprites/items/kanban.png');
        game.load.image('scrum', 'stx_assets/sprites/items/scrum.png');
        game.load.image('lean', 'stx_assets/sprites/items/lean.png');
        game.load.image('a3', 'stx_assets/sprites/items/a3.png');
        game.load.image('sprint', 'stx_assets/sprites/items/sprint.png');
        game.load.image('retro', 'stx_assets/sprites/items/retro.png');

        game.load.audio('mission_music', 'stx_assets/music/mission.mp3');
        game.load.audio('item_music', 'stx_assets/sound/item_collected.wav');
    },

    createItems: function () {
        step_mission.items = game.add.group();
        var y = 100;
        var spacing = 60;
        step_mission.items_title = game.add.text(game.world.width - 200, y, '      ITEMS', { font: "14pt Pirulen", fill: '#367', align: 'center'});

        step_mission.item1 = game.add.text(game.world.width - 200, y + (spacing * 1), ' ' + step_missionselection.selected_mission.keywords[0], disabled_item_style);
        step_mission.item2 = game.add.text(game.world.width - 200, y + (spacing * 2), ' ' + step_missionselection.selected_mission.keywords[1], disabled_item_style);
        step_mission.item3 = game.add.text(game.world.width - 200, y + (spacing * 3), ' ' + step_missionselection.selected_mission.keywords[2], disabled_item_style);
        step_mission.item4 = game.add.text(game.world.width - 200, y + (spacing * 4), ' ' + step_missionselection.selected_mission.keywords[3], disabled_item_style);
        step_mission.item5 = game.add.text(game.world.width - 200, y + (spacing * 5), ' ' + step_missionselection.selected_mission.keywords[4], disabled_item_style);
        step_mission.item6 = game.add.text(game.world.width - 200, y + (spacing * 6), ' ' + step_missionselection.selected_mission.keywords[5], disabled_item_style);

        step_mission.item1_sprite = step_mission.items.create(200, game.world.centerY - 200, 'kanban');
        step_mission.item1_sprite.item_menu = step_mission.item1;

        step_mission.item2_sprite = step_mission.items.create(game.world.centerX, game.world.centerY - 200, 'scrum');
        step_mission.item2_sprite.item_menu = step_mission.item2;

        step_mission.item3_sprite = step_mission.items.create(game.world.width - 400, game.world.centerY - 200, 'lean');
        step_mission.item3_sprite.item_menu = step_mission.item3;

        step_mission.item4_sprite = step_mission.items.create(200, game.world.centerY, 'a3');
        step_mission.item4_sprite.item_menu = step_mission.item4;

        step_mission.item5_sprite = step_mission.items.create(game.world.centerX, game.world.centerY, 'sprint');
        step_mission.item5_sprite.item_menu = step_mission.item5;


        step_mission.item6_sprite = step_mission.items.create(game.world.width - 400, game.world.centerY, 'retro');
        step_mission.item6_sprite.item_menu = step_mission.item6;
    },

    createAliens: function () {
        step_mission.aliens1 = game.add.group();
        for (var x = 0; x < 10; x++) {
            var distance = x * 50;
            var alien = step_mission.aliens1.create(game.world.centerX, -distance, 'invader');
            alien.scale.x = 0.3;
            alien.scale.y = 0.3;
            alien.distance = distance;
            alien.speed = 5000;
            alien.tween = { y: game.world.height + (10 * 30) - distance};
            var tween = game.add.tween(alien).to(alien.tween, alien.speed).start();
            tween.onComplete.add(step_mission.again, this);
        }
        step_mission.aliens1.x = 0;
        step_mission.aliens1.y = 0;

        step_mission.aliens2 = game.add.group();
        for (var x = 0; x < 10; x++) {
            var distance = x * 50;
            var alien = step_mission.aliens2.create(game.world.centerX, -distance, 'invader');
            alien.scale.x = 0.3;
            alien.scale.y = 0.3;
            alien.distance = distance;
            alien.speed = 10000;
            alien.tween = {x: 200 + alien.distance * 2, y: game.world.height + (10 * 30) - alien.distance};
            var tween = game.add.tween(alien).to(alien.tween, alien.speed).start();
            tween.onComplete.add(step_mission.again, this);
        }
        step_mission.aliens2.x = 0;
        step_mission.aliens2.y = 0;

        step_mission.aliens3 = game.add.group();
        for (var x = 0; x < 10; x++) {
            var distance = x * 50;
            var alien = step_mission.aliens3.create(game.world.centerX, -distance, 'invader');
            alien.scale.x = 0.3;
            alien.scale.y = 0.3;
            alien.distance = distance;
            alien.speed = 15000;
            alien.tween = {x: game.world.width - 200 - alien.distance * 2, y: game.world.height + (10 * 30) - alien.distance};
            var tween = game.add.tween(alien).to(alien.tween, alien.speed).start();
            tween.onComplete.add(step_mission.again, this);
        }
        step_mission.aliens3.x = 0;
        step_mission.aliens3.y = 0;
    },

    createMusic: function () {
        step_mission.music = game.add.audio('mission_music');
        step_mission.music.play();
        step_mission.itemMusic = game.add.audio('item_music');
    },

    createExplosions: function () {
        step_mission.explosions = game.add.group();
        step_mission.explosions.createMultiple(30, 'kaboom');
        step_mission.explosions.forEach(step_mission.setupInvader, this);
    },

    start: function () {
        step_mission.createExplosions();
        step_mission.createMusic();
        step_mission.createItems();
        step_mission.createAliens();
        background.starfield.visible = true;
        stx_player.show();
        hud.show();
        hud.drawScanlines();
        currentStep = step_mission;
    },

    setupInvader: function (invader) {

        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');

    },

    again: function (alien) {
        alien.x = game.world.centerX;
        alien.y = -100 - alien.distance;
        tween = game.add.tween(alien).to(alien.tween, alien.speed).start();
        tween.onComplete.add(step_mission.again, this);
    },

    update: function () {
        background.update();
        stx_player.update();
        game.physics.collide(stx_player.sprite, step_mission.aliens1, step_mission.enemyPlayerCollisionHandler, null, this);
        game.physics.collide(stx_player.sprite, step_mission.aliens2, step_mission.enemyPlayerCollisionHandler, null, this);
        game.physics.collide(stx_player.sprite, step_mission.aliens3, step_mission.enemyPlayerCollisionHandler, null, this);

        game.physics.collide(stx_player.bullets, step_mission.aliens1, step_mission.enemyBulletcollisionHandler, null, this);
        game.physics.collide(stx_player.bullets, step_mission.aliens2, step_mission.enemyBulletcollisionHandler, null, this);
        game.physics.collide(stx_player.bullets, step_mission.aliens3, step_mission.enemyBulletcollisionHandler, null, this);

        game.physics.collide(step_mission.items, stx_player.sprite, step_mission.itemCollisionHandler, null, this);

        if (stx_player.collectedItems == MAX_ITEMS) {
            step_mission.end();
        }

    },

    end: function () {
        step_mission.aliens1.visible = false;
        step_mission.aliens2.visible = false;
        step_mission.aliens3.visible = false;

        step_mission.hideItems();
        step_mission.music.stop();
        step_boss.start();
    },

    hideItems: function () {
        step_mission.items.visible = false;
        step_mission.items.visible = false;
        step_mission.item1.visible = false;
        step_mission.item2.visible = false;
        step_mission.item3.visible = false;
        step_mission.item4.visible = false;
        step_mission.item5.visible = false;
        step_mission.item6.visible = false;
    },

    enemyBulletcollisionHandler: function (bullet, target) {
        bullet.kill();
        target.kill();
        hud.increaseScore(500);
        var explosion = step_mission.explosions.getFirstDead();
        explosion.reset(target.body.x, target.body.y);
        explosion.play('kaboom', 30, false, true);
    },

    enemyPlayerCollisionHandler: function (player, target) {
        target.kill();
        player.kill();
        var explosion = step_mission.explosions.getFirstDead();
        explosion.reset(target.body.x, target.body.y);
        explosion.play('kaboom', 30, false, true);
        step_mission.end();
    },

    itemCollisionHandler: function (player, item) {
        step_mission.itemMusic.play();
        stx_player.collectedItems++;
        item.visible = false;
        item.item_menu.setStyle(enabled_item_style);
        if (stx_player.collectedItems == MAX_ITEMS) {
            hud.colorHowToPlayItems();
        }
    },
    render: function () {
        game.debug.renderSpriteInfo(stx_player.sprite.sprite);
        game.debug.renderSpriteBody(stx_player.sprite.sprite);
    }
};