var step_congratulations = {

    preload: function () {
    },

    start: function () {
        hud.stateText.content = " CONGRATULATIONS, Enter your name!\n\n";
        hud.stateText.visible = true;
        game.input.keyboard.onDownCallback = step_congratulations.inputName;
        currentStep = step_congratulations;
    },

    update: function () {
    },

    end: function () {
        game.input.keyboard.onDownCallback = null;
        hud.stateText.visible = false;
        step_halloffame.start();
    },

    inputName: function (e) {
        hud.stateText.content += String.fromCharCode(e.keyCode).toLowerCase();
        if (e.keyCode == '13' || e.keyCode == 13) {
            step_congratulations.end();
        }
    }
};