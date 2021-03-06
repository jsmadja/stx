var step_title = {

    titleChrono: '',
    preload: function () {
    },

    start: function () {
        console.log("title.start");
        game.stage.scale.startFullScreen();
        hud.title.content = "Shoot The Xebians";
        hud.title.visible = true;
        step_title.titleChrono = game.time.now;
        hud.hide();
        currentStep = step_title;
        game.input.onTap.addOnce(step_title.startGame, this);
        game.input.keyboard.onDownCallback = this.keyboardHandler;
    },

    update: function () {
        if (currentStep === this && game.time.now > (step_title.titleChrono + 3000)) {
            step_title.end();
            step_greatplacetowork.start();
        }
    },

    end: function () {
        console.log("title.end");
        hud.hide();
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

    keyboardHandler: function (e) {
        if(e.keyCode == 70) {
            game.stage.scale.startFullScreen();
        } else {
            step_title.startGame();
        }
    }

};