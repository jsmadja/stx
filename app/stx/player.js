var stx_player = {

    bullet_time: 0,
    collected_items: 0,
    speed: 500,
    bullet_speed: 1000,

    reactor: null,
    bullets: '',
    sprite: null,
    heart: null,
    shots: 0,
    hits: 0,

    preload: function () {
        game.load.image('bullet', 'assets/games/invaders/bullet.png');
        game.load.image('ship', 'stx_assets/sprites/spiked ship 3. small.png');
        game.load.image('diamond', 'assets/misc/star_particle.png');
        game.load.image('heart', 'assets/games/invaders/enemy-redbullet.png');
    },

    start: function () {
        console.log("player.start");

        stx_player.collected_items = 0;
        stx_player.shots = 0;
        stx_player.hits = 0;

        stx_player.bullets = game.add.group();
        stx_player.bullets.createMultiple(30, 'bullet');
        stx_player.bullets.setAll('anchor.x', 0.5);
        stx_player.bullets.setAll('anchor.y', 1);
        stx_player.bullets.setAll('outOfBoundsKill', true);

        stx_player.sprite = game.add.sprite(game.world.centerX, game.world.height - 40, 'ship');
        stx_player.sprite.anchor.setTo(0.5, 0.5);
        stx_player.sprite.scale.x = 0.5;
        stx_player.sprite.scale.y = 0.5;

        stx_player.heart = game.add.sprite(game.world.centerX, game.world.height, 'heart');
        stx_player.heart.anchor.setTo(0.5, 0.5);
        stx_player.heart.visible = false;

        stx_player.reactor = game.add.emitter(stx_player.sprite.body.x, stx_player.sprite.body.y, 50);
        stx_player.reactor.makeParticles('diamond');
        stx_player.reactor.start(false, 200, 10);
        stx_player.reactor.visible = false;
        stx_player.reactor.gravity = 10;
    },

    moveShip: function () {
        stx_player.sprite.body.velocity.setTo(0, 0);
        stx_player.heart.body.velocity.setTo(0, 0);
        if (controls.cursors.left.isDown) {
            stx_player.sprite.body.velocity.x = -stx_player.speed;
            stx_player.heart.body.velocity.x = -stx_player.speed;
        }
        if (controls.cursors.right.isDown) {
            stx_player.sprite.body.velocity.x = stx_player.speed;
            stx_player.heart.body.velocity.x = stx_player.speed;
        }
        if (controls.cursors.up.isDown) {
            stx_player.sprite.body.velocity.y = -stx_player.speed;
            stx_player.heart.body.velocity.y = -stx_player.speed;
        }
        if (controls.cursors.down.isDown) {
            stx_player.sprite.body.velocity.y = stx_player.speed;
            stx_player.heart.body.velocity.y = stx_player.speed;
        }
        if (stx_player.sprite.body.x > game.world.width - 280) {
            stx_player.sprite.body.x = game.world.width - 280;
        }
        if (stx_player.sprite.body.x < 200) {
            stx_player.sprite.body.x = 200;
        }
        if (stx_player.sprite.body.y > game.world.height - 60) {
            stx_player.sprite.body.y = game.world.height - 60;
        }
        if (stx_player.sprite.body.y < 0) {
            stx_player.sprite.body.y = 0;
        }

        stx_player.heart.body.x = stx_player.sprite.body.x + 33;
        stx_player.heart.body.y = stx_player.sprite.body.y + 25;

        stx_player.reactor.x = stx_player.sprite.body.x + stx_player.sprite.body.width / 2;
        stx_player.reactor.y = stx_player.sprite.body.y + stx_player.sprite.body.height + 10;
    },

    fire: function () {
        if (controls.fireButton.isDown) {
            if (game.time.now > stx_player.bullet_time) {
                bullet = stx_player.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(stx_player.sprite.x, stx_player.sprite.y + 8);
                    bullet.body.velocity.y = -stx_player.bullet_speed;
                    stx_player.bullet_time = game.time.now + 200;
                    stx_player.shots++;
                }
            }
        }
    },

    update: function () {
        this.moveShip();
        this.fire();
    },

    end: function () {
        console.log("player.end");
        if (stx_player.sprite) {
            stx_player.sprite.kill();
        }
        if (stx_player.heart) {
            stx_player.heart.kill();
        }
        if (stx_player.reactor) {
            stx_player.reactor.kill();
        }
    },

    hide: function () {
        if (stx_player.sprite)
            stx_player.sprite.visible = false;
        if (stx_player.reactor)
            stx_player.reactor.visible = false;
        if (stx_player.heart)
            stx_player.heart.visible = false;
    },
    show: function () {
        stx_player.sprite.visible = true;
        stx_player.reactor.visible = true;
        stx_player.heart.visible = true;
    }
};