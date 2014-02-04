var step_congratulations = {

    preload: function () {
    },

    start: function () {
        hud.scoreText.content = "CONGRATULATIONS";
        hud.stateText.content = " You Won, \n Click to restart";
        hud.stateText.visible = true;
        game.input.keyboard.onDownCallback = step_congratulations.inputName;
        currentStep = step_congratulations;
    },

    update: function () {
    },

    end: function () {
        step_halloffame.start();
    },

    inputName: function (e) {
        hud.scoreText.content += String.fromCharCode(e.keyCode).toLowerCase();
        if (e.keyCode == '13' || e.keyCode == 13) {
            step_congratulations.end();
        }
    }
};