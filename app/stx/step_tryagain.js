var step_tryagain = {

    preload: function () {
    },

    start: function () {
        console.log("tryagain.start");
        hud.stateText.content = " TRY AGAIN, Enter your name!\n\n";
        hud.stateText.visible = true;
        game.input.keyboard.onDownCallback = step_tryagain.inputName;
        currentStep = step_tryagain;
        stx_player.end();
    },

    update: function () {
    },

    end: function () {
        console.log("tryagain.end");
        game.input.keyboard.onDownCallback = null;
        hud.stateText.visible = false;
        hud.stateText.content = "";
        step_halloffame.start();
    },

    inputName: function (e) {
        hud.stateText.content += String.fromCharCode(e.keyCode).toLowerCase();
        if (e.keyCode == '13' || e.keyCode == 13) {
            step_tryagain.end();
        }
    }
};