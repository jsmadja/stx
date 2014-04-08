var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    hud.preload();
    background.preload();
    stx_player.preload();
    step_title.preload();
    step_missionselection.preload();
    step_mission.preload();
    step_boss.preload();
    step_cto.preload();
    step_gameover.preload();
    step_tryagain.preload();
    step_halloffame.preload();
}

var currentStep;

function create() {
    game.stage.scale.startFullScreen();
    controls.start();
    background.start();
    currentStep = step_title;
    //currentStep = step_missionselection;
    //currentStep = step_halloffame;
    //currentStep = step_mission;
    //currentStep = step_boss;
    //currentStep = step_cto;
    //currentStep = step_tryagain;
    hud.start();
    currentStep.start();
}

function update() {
    currentStep.update();
    hud.update();
}

function render() {
    if(currentStep.render) {
        currentStep.render();
    }
}