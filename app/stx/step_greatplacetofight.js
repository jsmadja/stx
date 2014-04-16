var step_greatplacetofight = {

    titleChrono: '',

    start: function () {
        hud.title.content = "GREAT PLACE\nTO";
        hud.title.visible = true;
        step_greatplacetofight.titleChrono = game.time.now;
        step_greatplacetofight.work = game.add.text(game.world.centerX + 50, game.world.centerY, 'FIGHT!', { font: "54pt Pirulen", fill: '#610B5E', strokeThickness: 2 });
        step_greatplacetofight.titleChrono = game.time.now;
        hud.hide();
        currentStep = step_greatplacetofight;
        game.input.onTap.addOnce(step_greatplacetofight.startGame, this);
        game.input.keyboard.onDownCallback = this.keyboardHandler;
    },

    update: function () {
        if (currentStep === this && game.time.now > (step_greatplacetofight.titleChrono + 3000)) {
            step_greatplacetofight.end();
            step_halloffame.start();
        }
    },

    end: function () {
        hud.hide();
        hud.title.visible = false;
        step_greatplacetofight.work.visible = false;
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
        step_greatplacetofight.startGame();
    }

};