var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('bullet', 'assets/games/invaders/bullet.png');
    game.load.image('enemyBullet', 'assets/games/invaders/enemy-bullet.png');
    game.load.spritesheet('invader', 'assets/games/invaders/invader32x32x4.png', 32, 32);
    game.load.image('boss', 'stx_assets/sprites/boss.png', 193, 94);
    game.load.spritesheet('cto1', 'assets/games/tanks/tank2.png', 32, 32);
    game.load.spritesheet('cto2', 'assets/games/tanks/tank3.png', 32, 32);
    game.load.spritesheet('coo', 'assets/games/tanks/tank4.png', 32, 32);
    game.load.spritesheet('ceo', 'assets/games/tanks/tank5.png', 32, 32);
    game.load.image('ship', 'assets/games/invaders/player.png');
    game.load.spritesheet('kaboom', 'assets/games/invaders/explode.png', 128, 128);
    game.load.image('starfield', 'assets/games/invaders/starfield.png');
    game.load.image('background', 'assets/games/starstruck/background2.png');
    game.load.image('boss_face', 'stx_assets/sprites/boss_face.png', 200, 266);
}

var speed = 200;
var MAX_LIVES = 1;
var player;
var aliens, boss, cto, coo, ceo;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;

var TITLE_STEP = -1;
var MISSION_STEP = 0;
var FUNDATION_BOSS_STEP = 1;
var CTO_STEP = 2;
var COO_STEP = 3;
var CEO_STEP = 4;
var CONGRATULATION_STEP = 5;
var HALL_OF_FAME_STEP = 6;

var currentStep;

var hallOfFameChrono, titleChrono;

function create() {

    //  The scrolling starfield background
    starfield = game.add.tileSprite(200, 0, 800, 600, 'starfield');

    //  Our bullet group
    bullets = game.add.group();
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);

    //  The hero!
    player = game.add.sprite(game.world.centerX, game.world.height - 40, 'ship');
    player.anchor.setTo(0.5, 0.5);

    //  The baddies!
    aliens = game.add.group();
    boss = game.add.group();
    cto = game.add.group();
    coo = game.add.group();
    ceo = game.add.group();

    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 200, scoreString + score, { fontSize: '34px', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    game.add.text(0, 10, 'Lives : ', { fontSize: '34px', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX, game.world.centerY, '', { fontSize: '84px', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < MAX_LIVES; i++) {
        var ship = lives.create(0 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    currentStep = TITLE_STEP;
    titleChrono = game.time.now;
}

function update() {
    //  Scroll the background
    starfield.tilePosition.y += 1;
    //  Reset the player, then check for movement keys
    player.body.velocity.setTo(0, 0);
    if (cursors.left.isDown) {
        player.body.velocity.x = -speed;
    }
    if (cursors.right.isDown) {
        player.body.velocity.x = speed;
    }
    if (cursors.up.isDown) {
        player.body.velocity.y = -speed;
    }
    if (cursors.down.isDown) {
        player.body.velocity.y = speed;
    }
    if(player.body.x > game.world.width - 230) {
        player.body.x = game.world.width - 230;
    }
    if(player.body.x < 200) {
        player.body.x = 200;
    }
    if(player.body.y > game.world.height-20) {
        player.body.y = game.world.height - 20;
    }
    if(player.body.y < 0) {
        player.body.y = 0;
    }


    //  Firing?
    if (fireButton.isDown) {
        fireBullet();
    }

    if (game.time.now > firingTimer) {
        enemyFires();
    }

    if (currentStep === TITLE_STEP) {
        if (game.time.now > (titleChrono + 10000)) {
            showHallOfFame();
        }
        game.input.onTap.addOnce(createMissionSelectionStep, this);
    }
    if (currentStep === HALL_OF_FAME_STEP) {
        if (game.time.now > (hallOfFameChrono + 10000)) {
            drawTitle();
        }
        game.input.onTap.addOnce(createMissionSelectionStep, this);
    }
    if (currentStep === MISSION_STEP) {
        game.physics.collide(bullets, aliens, collisionHandler, null, this);
    }
    if (currentStep === FUNDATION_BOSS_STEP) {
        game.physics.collide(bullets, boss, bossCollisionHandler, null, this);
    }
    if (currentStep === CTO_STEP) {
        game.physics.collide(bullets, cto, ctoCollisionHandler, null, this);
    }
    if (currentStep === COO_STEP) {
        game.physics.collide(bullets, coo, cooCollisionHandler, null, this);
    }
    if (currentStep === CEO_STEP) {
        game.physics.collide(bullets, ceo, ceoCollisionHandler, null, this);
    }
    if (currentStep === CONGRATULATION_STEP) {
    }
    //game.physics.collide(enemyBullets, player, enemyHitsPlayer, null, this);
}

function startMission() {
    var alien = aliens.create(48, 50, 'invader');
    alien.anchor.setTo(0.5, 0.5);
    alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    alien.play('fly');


    aliens.x = 100;
    aliens.y = 50;
    enemyBullets.setAll('outOfBoundsKill', true);
    currentStep = MISSION_STEP;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    //var tween = game.add.tween(aliens).to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween completes it calls descend, before looping again
    //tween.onComplete.add(descend, this);
}

function drawTitle() {
    titleChrono = game.time.now;
    currentStep = TITLE_STEP;
}


function createMissionSelectionStep() {
    // choose your mission
    //showStage();
    startMission();
}

function startFundationBossBattle() {
    var bossSprite = boss.create(0, 0, 'boss');
    bossSprite.scale.x = 1.5;
    bossSprite.scale.y = 1.5;
    bossSprite.x = 600;
    game.add.sprite(game.world.width - 200, 0, 'boss_face');
    currentStep = FUNDATION_BOSS_STEP;
}

function startCTOBattle() {
    var cto1 = cto.create(48, 50, 'cto1');
    cto1.anchor.setTo(0.5, 0.5);

    var cto2 = cto.create(48, 50, 'cto2');
    cto2.anchor.setTo(1, 1);

    cto.x = 100;
    cto.y = 100;

    currentStep = CTO_STEP;
}

function startCOOBattle() {
    var alien = coo.create(48, 50, 'coo');
    alien.anchor.setTo(0.5, 0.5);
    coo.x = 100;
    coo.y = 100;
    currentStep = COO_STEP;
}

function startCEOBattle() {
    var alien = ceo.create(48, 50, 'ceo');
    alien.anchor.setTo(0.5, 0.5);
    ceo.x = 100;
    ceo.y = 100;
    currentStep = CEO_STEP;
}

function showHallOfFame() {
    currentStep = HALL_OF_FAME_STEP;
    scoreText.visible = false;
    hallOfFameChrono = game.time.now;
}

function showCongratulations() {
    scoreText.content = "CONGRATULATIONS";
    stateText.content = " You Won, \n Click to restart";
    stateText.visible = true;
    game.input.keyboard.onDownCallback = inputName;
    currentStep = CONGRATULATION_STEP;
}

function inputName(e) {
    scoreText.content += e.keyCode;
    if (e.keyCode == '13' || e.keyCode == 13) {
        showHallOfFame();
    }
}

function setupInvader(invader) {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');
}

function descend() {

    //aliens.y += 10;

}


function collisionHandler(bullet, target) {

    //  When a bullet hits an target we kill them both
    bullet.kill();
    target.kill();

    //  Increase the score
    score += 20;
    scoreText.content = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstDead();
    explosion.reset(target.body.x, target.body.y);
    explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0) {
        /*
         score += 1000;
         scoreText.content = scoreString + score;

         enemyBullets.callAll('kill', this);
         */
        startFundationBossBattle();
    }

}

function bossCollisionHandler(bullet, target) {

    //  When a bullet hits an target we kill them both
    bullet.kill();
    target.kill();

    //  Increase the score
    score += 20;
    scoreText.content = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstDead();
    explosion.reset(target.body.x, target.body.y);
    explosion.play('kaboom', 30, false, true);

    if (boss.countLiving() == 0) {
        startCTOBattle();
    }

}

function ctoCollisionHandler(bullet, target) {
    //  When a bullet hits an target we kill them both
    bullet.kill();
    target.kill();
    //  And create an explosion :)
    var explosion = explosions.getFirstDead();
    explosion.reset(target.body.x, target.body.y);
    explosion.play('kaboom', 30, false, true);
    if (cto.countLiving() == 0) {
        startCOOBattle();
    }
}

function cooCollisionHandler(bullet, target) {
    //  When a bullet hits an target we kill them both
    bullet.kill();
    target.kill();
    //  And create an explosion :)
    var explosion = explosions.getFirstDead();
    explosion.reset(target.body.x, target.body.y);
    explosion.play('kaboom', 30, false, true);
    if (coo.countLiving() == 0) {
        startCEOBattle();
    }
}

function ceoCollisionHandler(bullet, target) {
    //  When a bullet hits an target we kill them both
    bullet.kill();
    target.kill();
    //  And create an explosion :)
    var explosion = explosions.getFirstDead();
    explosion.reset(target.body.x, target.body.y);
    explosion.play('kaboom', 30, false, true);
    if (ceo.countLiving() == 0) {
        showCongratulations();
    }

}


function gameOver() {
    player.kill();
    enemyBullets.callAll('kill');

    stateText.content = " GAME OVER \n Click to restart";
    stateText.visible = true;

    //the "click to restart" handler
    game.input.onTap.addOnce(restart, this);

}
function enemyHitsPlayer(player, bullet) {

    bullet.kill();

    live = lives.getFirstAlive();

    if (live) {
        live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstDead();
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1) {
        gameOver();
    }

}

function enemyFires() {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    var livingEnemies = [];

    aliens.forEachAlive(function (alien) {

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0) {

        var random = game.rnd.integerInRange(0, livingEnemies.length);

        // randomly select one of them
        var shooter = livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.moveToObject(enemyBullet, player, 120);
        firingTimer = game.time.now + 2000;
    }

}

function fireBullet() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet) {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function restart() {
    /*
     //  A new level starts

     //resets the life count
     lives.callAll('revive');
     //  And brings the aliens back from the dead :)
     aliens.removeAll();
     startMission();

     //revives the player
     player.revive();
     //hides the text
     stateText.visible = false;

     currentStep = MISSION_STEP;
     */
}
