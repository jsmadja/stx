var controls = {

    cursors: null,
    fireButton: null,

    preload: function () {
    },

    start: function () {
        controls.cursors = game.input.keyboard.createCursorKeys();
        controls.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
    },

    end: function () {
    }

}