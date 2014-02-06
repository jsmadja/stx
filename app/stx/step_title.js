var step_title = {

    titleChrono: '',
    preload: function () {
    },

    start: function () {
        hud.scoreText.visible = false;
        hud.title.content = "Shoot The Xebians";
        hud.title.visible = true;
        step_title.titleChrono = game.time.now;
        currentStep = step_title;
    },

    update: function () {
        if (game.time.now > (step_title.titleChrono + 10000)) {
            step_title.end();
            step_halloffame.start();
        }
        game.input.onTap.addOnce(step_title.startGame, this);
    },

    end: function () {
        hud.title.visible = false;
    },

    startGame: function () {
        step_title.end();
        step_missionselection.start();
    }

};