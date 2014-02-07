pad = function (value, length) {
    var str = "" + value;
    for (var i = 0; str.length < length; i++) {
        str = " " + str;
    }
    return str;
}

var t = 0;
var index = 0;
var ranking = "";
var s;

var step_halloffame = {

    hallOfFameChrono: '',

    preload: function () {
    },

    start: function () {
        hud.hide();
        hud.showHallOfFameTitle();
        stx_player.hide();
        for (var i = 10; i > 0; i--) {
            ranking += pad((11 - i), 2) + ".  AAA " + pad(i * 10000, 8) + "\n";
        }
        var style = { font: "30pt Courier", fill: '#fff', strokeThickness: 2 };
        s = game.add.text(game.world.centerX, 100, '', style);
        s.anchor.setTo(0.5, 0);
        t = game.time.now + 80;

        step_halloffame.hallOfFameChrono = game.time.now;
        currentStep = step_halloffame;
    },

    update: function () {
        if (game.time.now > t && index < ranking.length) {
            s.setText(ranking.substr(0, index + 1));
            t = game.time.now + 20;
            index++;
        }
        if (game.time.now > (step_halloffame.hallOfFameChrono + 10000)) {
            step_halloffame.end();
            step_title.start();
        }
        game.input.onTap.addOnce(step_halloffame.startGame, this);
    },

    end: function () {
        if (step_gameover.music && step_gameover.music.isPlaying) {
            step_gameover.music.stop();
        }
        hud.title.visible = false;
        s.visible = false;
    },
    startGame: function () {
        step_halloffame.end();
        step_missionselection.start();
    }
};