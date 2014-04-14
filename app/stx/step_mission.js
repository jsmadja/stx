var MAX_ITEMS = 6;
var disabled_item_style = { font: "12pt Pirulen", fill: '#555'};
var enabled_item_style = { font: "12pt Pirulen", fill: '#610B5E'};
var start_time;

var step_mission = {

    tween1: null,
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

        game.load.image('item', 'assets/sprites/diamond.png');

        game.load.audio('mission_music', 'stx_assets/music/mission.mp3');
        game.load.audio('item_music', 'stx_assets/sound/item_collected.wav');
    },

    createItems: function () {
        step_mission.items = game.add.group();
        var y = 100;
        var spacing = 60;
        step_mission.items_title = game.add.text(game.world.width - 200, y, '      ITEMS', { font: "14pt Pirulen", fill: '#610B5E', align: 'center'});

        step_mission.item1 = game.add.text(game.world.width - 200, y + (spacing * 1), ' ' + step_missionselection.selected_mission.keywords[0], disabled_item_style);
        step_mission.item2 = game.add.text(game.world.width - 200, y + (spacing * 2), ' ' + step_missionselection.selected_mission.keywords[1], disabled_item_style);
        step_mission.item3 = game.add.text(game.world.width - 200, y + (spacing * 3), ' ' + step_missionselection.selected_mission.keywords[2], disabled_item_style);
        step_mission.item4 = game.add.text(game.world.width - 200, y + (spacing * 4), ' ' + step_missionselection.selected_mission.keywords[3], disabled_item_style);
        step_mission.item5 = game.add.text(game.world.width - 200, y + (spacing * 5), ' ' + step_missionselection.selected_mission.keywords[4], disabled_item_style);
        step_mission.item6 = game.add.text(game.world.width - 200, y + (spacing * 6), ' ' + step_missionselection.selected_mission.keywords[5], disabled_item_style);

        step_mission.item1_sprite = step_mission.items.create(300, game.world.centerY - 200, 'item');
        step_mission.item1_sprite.item_menu = step_mission.item1;
        step_mission.item1_sprite.visible = false;

        step_mission.item2_sprite = step_mission.items.create(game.world.centerX, game.world.centerY - 200, 'item');
        step_mission.item2_sprite.item_menu = step_mission.item2;
        step_mission.item2_sprite.visible = false;

        step_mission.item3_sprite = step_mission.items.create(game.world.width - 300, game.world.centerY - 200, 'item');
        step_mission.item3_sprite.item_menu = step_mission.item3;
        step_mission.item3_sprite.visible = false;

        step_mission.item4_sprite = step_mission.items.create(300, game.world.centerY, 'item');
        step_mission.item4_sprite.item_menu = step_mission.item4;
        step_mission.item4_sprite.visible = false;

        step_mission.item5_sprite = step_mission.items.create(game.world.centerX, game.world.centerY, 'item');
        step_mission.item5_sprite.item_menu = step_mission.item5;
        step_mission.item5_sprite.visible = false;

        step_mission.item6_sprite = step_mission.items.create(game.world.width - 300, game.world.centerY, 'item');
        step_mission.item6_sprite.item_menu = step_mission.item6;
        step_mission.item6_sprite.visible = false;
    },

    createAliens1: function () {
        step_mission.aliens1 = game.add.group();
        step_mission.aliens1.setAll('outOfBoundsKill', true);
        for (var x = 0; x < 10; x++) {
            var distance = x * 50;
            var alien = step_mission.aliens1.create(game.world.centerX, -distance, 'invader');
            alien.scale.x = 0.3;
            alien.scale.y = 0.3;
            alien.distance = distance;
            alien.speed = 6000;
        }
        step_mission.aliens1.x = 0;
        step_mission.aliens1.y = 0;
    },

    createAliens2: function () {
        step_mission.aliens2 = game.add.group();
        for (var x = 0; x < 10; x++) {
            var distance = x * 50;
            var alien = step_mission.aliens2.create(300, -distance, 'invader');
            alien.scale.x = 0.3;
            alien.scale.y = 0.3;
            alien.distance = distance;
            alien.speed = 4000;
        }
        step_mission.aliens2.x = 0;
        step_mission.aliens2.y = 0;
    },

    createAliens3: function () {
        step_mission.aliens3 = game.add.group();
        for (var x = 0; x < 10; x++) {
            var distance = x * 50;
            var alien = step_mission.aliens3.create(900, -distance, 'invader');
            alien.scale.x = 0.3;
            alien.scale.y = 0.3;
            alien.distance = distance;
            alien.speed = 5000;
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
        console.log("mission.start");
        stx_player.start();
        if (!step_mission.explosions) {
            step_mission.createExplosions();
        }
        step_mission.createMusic();
        step_mission.createItems();
        background.starfield.visible = true;
        stx_player.show();
        hud.show();
        hud.drawScanlines();
        start_time = new Date();
        currentStep = step_mission;

    },

    setupInvader: function (invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');
    },

    update: function () {
        background.update();
        stx_player.update();
        game.physics.collide(stx_player.heart, step_mission.aliens1, step_mission.player_VS_enemy_CollisionHandler, null, this);
        game.physics.collide(stx_player.bullets, step_mission.aliens1, step_mission.playerBullet_VS_enemy_CollisionHandler, null, this);
        game.physics.collide(stx_player.heart, step_mission.aliens2, step_mission.player_VS_enemy_CollisionHandler, null, this);
        game.physics.collide(stx_player.bullets, step_mission.aliens2, step_mission.playerBullet_VS_enemy_CollisionHandler, null, this);
        game.physics.collide(stx_player.heart, step_mission.aliens3, step_mission.player_VS_enemy_CollisionHandler, null, this);
        game.physics.collide(stx_player.bullets, step_mission.aliens3, step_mission.playerBullet_VS_enemy_CollisionHandler, null, this);
        game.physics.collide(step_mission.items, stx_player.sprite, step_mission.player_VS_item_CollisionHandler, null, this);
        var tab = [step_mission.aliens1, step_mission.aliens2, step_mission.aliens3];
        for (var i = 0; i < tab.length; i++) {
            var aliens = tab[i];
            if (aliens) {
                aliens.forEach(function (alien) {
                    alien.body.y += 5;
                    if (alien.body.y > game.world.height) {
                        alien.body.y = -500;
                    }
                });
            }
        }
        if (stx_player.collected_items == MAX_ITEMS) {
            step_mission.end();
        }
    },

    end: function () {
        console.log(step_mission.items.length);

        console.log("mission.end");

        if (stx_player.heart.visible) {
            step_boss.start();
        } else {
            step_mission.hideItems();
            hud.hide();
            stx_player.hide();
            step_tryagain.start();
            background.hide();
        }
        if (step_mission.aliens1)
            step_mission.aliens1.removeAll();
        if (step_mission.aliens2)
            step_mission.aliens2.removeAll();
        if (step_mission.aliens3)
            step_mission.aliens3.removeAll();
        step_mission.items.removeAll();
        game.tweens.removeAll();

        step_mission.items_title.visible = false;
        step_mission.hideItems();
        step_mission.music.stop();
    },

    hideItems: function () {
        step_mission.items.visible = false;
        step_mission.item1.visible = false;
        step_mission.item2.visible = false;
        step_mission.item3.visible = false;
        step_mission.item4.visible = false;
        step_mission.item5.visible = false;
        step_mission.item6.visible = false;

        step_mission.item1_sprite.item_menu.visible = false;
        step_mission.item2_sprite.item_menu.visible = false;
        step_mission.item3_sprite.item_menu.visible = false;
        step_mission.item4_sprite.item_menu.visible = false;
        step_mission.item5_sprite.item_menu.visible = false;
        step_mission.item6_sprite.item_menu.visible = false;
    },

    playerBullet_VS_enemy_CollisionHandler: function (playerBullet, enemy) {
        playerBullet.kill();
        enemy.kill();
        hud.increaseScore(50);
        stx_player.hits++;
        var explosion = step_mission.explosions.getFirstDead();
        explosion.reset(enemy.body.x, enemy.body.y);
        explosion.play('kaboom', 30, false, true);
    },

    player_VS_enemy_CollisionHandler: function (player, enemy) {
        if (!enemy.visible) {
            return;
        }
        enemy.kill();
        player.kill();
        var explosion = step_mission.explosions.getFirstDead();
        explosion.reset(enemy.body.x, enemy.body.y);
        explosion.play('kaboom', 30, false, true);
        step_mission.end();
    },

    player_VS_item_CollisionHandler: function (player, item) {
        step_mission.itemMusic.play();
        stx_player.collected_items++;
        item.visible = false;
        item.kill();
        hud.increaseScore(2000);
        item.item_menu.setStyle(enabled_item_style);
        if (stx_player.collected_items == MAX_ITEMS) {
            hud.colorHowToPlayItems();
        }
    },
    render: function () {
        var elapsed_time = (new Date().getTime() - start_time.getTime()) / 1000;
        if (elapsed_time > 3 && step_mission.item1_sprite.alive) {
            step_mission.item1_sprite.visible = true;
        }
        if (elapsed_time > 6 && step_mission.item4_sprite.alive) {
            step_mission.item4_sprite.visible = true;
        }
        if (elapsed_time > 9 && step_mission.item2_sprite.alive) {
            step_mission.item2_sprite.visible = true;
        }
        if (elapsed_time > 12 && step_mission.item6_sprite.alive) {
            step_mission.item6_sprite.visible = true;
        }
        if (elapsed_time > 15 && step_mission.item5_sprite.alive) {
            step_mission.item5_sprite.visible = true;
        }
        if (elapsed_time > 18 && step_mission.item3_sprite.alive) {
            step_mission.item3_sprite.visible = true;
        }
        if (!step_mission.aliens1 || step_mission.aliens1.length <= 0) {
            this.createAliens1();
        }
        if (!step_mission.aliens2 || step_mission.aliens2.length <= 0) {
            this.createAliens2();
        }
        if (!step_mission.aliens3 || step_mission.aliens3.length <= 0) {
            this.createAliens3();
        }
    }
};