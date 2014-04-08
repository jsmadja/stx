function pad(value, length) {
    var str = "" + value;
    for (var i = 0; str.length < length; i++) {
        str = " " + str;
    }
    return str;
}

function rightpad(value, length) {
    var str = "" + value;
    for (var i = 0; str.length < length; i++) {
        str = str + " ";
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
        console.log("halloffame.start");

        hud.hide();
        hud.showHallOfFameTitle();
        stx_player.hide();
        ranking = "";
        t = 0;
        index = 0;
        $.getJSON("http://localhost:8080/api/ranking", function (data) {
            for (var i = 0; i < data.length && i < 10; i++) {
                var rank = data[i].rank;
                var name = data[i].player.split('@')[0];
                var score = data[i].score;
                var fondation = data[i].fondation;
                ranking += pad(rank, 2) + ". " + rightpad(name, 20) + " " + pad(score, 10) + " - " + (fondation ? fondation : "") + "\n";
            }

        });
        var style = { font: "30pt Courier", fill: '#fff', strokeThickness: 2 };
        s = game.add.text(game.world.centerX, 100, '', style);
        s.anchor.setTo(0.5, 0);
        t = game.time.now + 80;

        step_halloffame.hallOfFameChrono = game.time.now;
        hud.drawScanlines();
        currentStep = step_halloffame;
        game.input.onTap.addOnce(step_halloffame.go, this);
        game.input.keyboard.onDownCallback = this.keyboardHandler;
    },

    update: function () {
        if (game.time.now > t && index < ranking.length) {
            s.setText(ranking.substr(0, index + 1));
            t = game.time.now + 10;
            index++;
        }
        if (game.time.now > (step_halloffame.hallOfFameChrono + 10000)) {
            step_halloffame.end();
            step_title.start();
        }
    },

    end: function () {
        console.log("halloffame.end");
        s.setText("");
        if (step_gameover.music && step_gameover.music.isPlaying) {
            step_gameover.music.stop();
        }
        hud.hideHallOfFameTitle();
        s.visible = false;
    },

    go: function () {
        if (currentStep == step_halloffame) {
            this.end();
            currentStep = step_missionselection;
            step_missionselection.start();
        }
    },

    keyboardHandler: function () {
        step_halloffame.go();
    }

};