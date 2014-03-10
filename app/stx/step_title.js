var step_title = {

    titleChrono: '',
    preload: function () {
    },

    start: function () {
        console.log("title.start");

        hud.title.content = "Shoot The Xebians";
        hud.title.visible = true;
        step_title.titleChrono = game.time.now;
        hud.hide();
        hud.drawScanlines();
        currentStep = step_title;
    },

    update: function () {
        if (currentStep === this && game.time.now > (step_title.titleChrono + 10000)) {
            step_title.end();
            step_halloffame.start();
        }
        game.input.onTap.addOnce(step_title.startGame, this);
    },

    end: function () {
        console.log("title.end");
        hud.hide();
        hud.title.visible = false;
    },

    startGame: function () {
        step_title.end();
        currentStep = step_missionselection;
        step_missionselection.start();
    }

};