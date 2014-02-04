var step_halloffame = {

    hallOfFameChrono: '',

    preload: function () {
    },

    start: function () {
        currentStep = step_halloffame;
        hud.scoreText.visible = false;
        step_halloffame.hallOfFameChrono = game.time.now;
    },

    update: function () {
        if (game.time.now > (step_halloffame.hallOfFameChrono + 10000)) {
            step_title.start();
        }
        game.input.onTap.addOnce(step_missionselection.start, this);
    },

    end: function () {
    }
};