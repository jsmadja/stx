var step_greatplacetowork = {

    titleChrono: '',

    start: function () {
        hud.title.content = "GREAT PLACE\nTO";
        hud.title.visible = true;
        step_greatplacetowork.titleChrono = game.time.now;
        step_greatplacetowork.work = game.add.text(game.world.centerX+30, game.world.centerY, 'WORK!', { font: "54pt Pirulen", fill: '#610B5E', strokeThickness: 2 });
        hud.hide();
        currentStep = step_greatplacetowork;
        game.input.onTap.addOnce(step_greatplacetowork.startGame, this);
        game.input.keyboard.onDownCallback = this.keyboardHandler;
    },

    update: function () {
        if (currentStep === this && game.time.now > (step_greatplacetowork.titleChrono + 3000)) {
            step_greatplacetowork.end();
            step_greatplacetofight.start();
        }
    },

    end: function () {
        hud.hide();
        step_greatplacetowork.work.visible = false;
        hud.title.visible = false;
        game.input.keyboard.onDownCallback = null;
    },

    startGame: function () {
        if (currentStep == step_title) {
            step_title.end();
            currentStep = step_missionselection;
            step_missionselection.start();
        }
    },

    keyboardHandler: function () {
        step_greatplacetowork.startGame();
    }

};