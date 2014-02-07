var step_halloffame = {

    hallOfFameChrono: '',

    preload: function () {
    },

    start: function () {
        hud.title.content = "Hall of Fame";
        hud.title.visible = true;

        currentStep = step_halloffame;
        hud.scoreText.visible = false;
        step_halloffame.hallOfFameChrono = game.time.now;
    },

    update: function () {
        if (game.time.now > (step_halloffame.hallOfFameChrono + 10000)) {
            step_halloffame.end();
            step_title.start();
        }
        game.input.onTap.addOnce(step_halloffame.startGame, this);
    },

    end: function () {
        step_gameover.music.stop();
        hud.title.visible = false;
    },
    startGame: function () {
        step_halloffame.end();
        step_missionselection.start();
    }
};