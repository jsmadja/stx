var step_title = {

    titleChrono: '',
    preload: function () {
    },

    start: function () {
        step_title.titleChrono = game.time.now;
        currentStep = step_title;
    },

    update: function () {
        if (game.time.now > (titleChrono + 10000)) {
            step_halloffame.start();
        }
        game.input.onTap.addOnce(step_missionselection.start, this);
    },

    end: function () {
    }

};