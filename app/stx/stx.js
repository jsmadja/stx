var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.spritesheet('kaboom', 'assets/games/invaders/explode.png', 128, 128);
    game.load.image('starfield', 'assets/games/invaders/starfield.png');
    game.load.image('background', 'assets/games/starstruck/background2.png');

    stx_player.preload();
    step_title.preload();
    step_missionselection.preload();
    step_mission.preload();
    step_boss.preload();
    step_cto.preload();
    step_coo.preload();
    step_ceo.preload();
    step_gameover.preload();
    step_halloffame.preload();
}

var cursors;
var fireButton;
var explosions;
var starfield;
var currentStep;

function create() {
    //  The scrolling starfield background
    starfield = game.add.tileSprite(200, 0, 800, 600, 'starfield');

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    titleChrono = game.time.now;
    hud.start();
    stx_player.start();
    currentStep = step_title;
}

function update() {
    //  Scroll the background
    starfield.tilePosition.y += 1;
    stx_player.update();
    currentStep.update();
}

function setupInvader(invader) {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');
}