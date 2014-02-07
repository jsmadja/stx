var effects = {

    explosions: null,

    preload: function () {
        game.load.spritesheet('kaboom', 'assets/games/invaders/explode.png', 128, 128);
    },

    start: function () {
        effects.explosions = game.add.group();
        effects.explosions.createMultiple(30, 'kaboom');
        effects.explosions.forEach(effects.setupInvader, this);
    },

    update: function () {
    },

    end: function () {
    },

    setupInvader: function (invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');
    }

}