var background = {

    starfield: null,
    speed: 1,

    preload: function () {
        game.load.image('starfield', 'assets/games/invaders/starfield.png');
        game.load.image('background', 'assets/games/starstruck/background2.png');
    },

    start: function () {
        console.log("background.start");

        background.speed = 1;
        background.starfield = game.add.tileSprite(200, 0, 800, 600, 'starfield');
        background.starfield.visible = false;
    },

    update: function () {
        background.starfield.tilePosition.y += background.speed;
    },

    end: function () {
        console.log("background.end");
    },

    setSpeed: function (speed) {
        background.speed = speed;
    },

    hide: function() {
        background.starfield.visible = false;
    }

}