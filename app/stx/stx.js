var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    effects.preload();
    background.preload();
    stx_player.preload();
    step_title.preload();
    step_missionselection.preload();
    step_mission.preload();
    step_boss.preload();
    step_cto.preload();
    step_gameover.preload();
    step_halloffame.preload();
}

var currentStep;

function create() {
    effects.start();
    controls.start();
    background.start();
    hud.start();
    stx_player.start();
    //currentStep = step_title;
    //currentStep = step_cto;
    currentStep = step_boss;
    currentStep.start();
}

function update() {
    currentStep.update();
    hud.update();
}
