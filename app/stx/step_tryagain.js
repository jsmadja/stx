var player_name = "";

var step_tryagain = {

    elapsedTime: 0,
    scoreText: null,
    timeText: null,
    accuracyText: null,
    time: null,

    preload: function () {
    },

    start: function () {
        currentStep = step_tryagain;
        this.elapsedTime = new Date(new Date().getTime() - start_time.getTime());

        console.log("tryagain.start");
        console.log("shots:" + stx_player.shots);
        player_name = "";
        background.hide();
        hud.hide();
        var score = hud.score;
        var minutes = this.elapsedTime.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var seconds = this.elapsedTime.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        time = minutes + ":" + seconds;
        var accuracy = parseInt((stx_player.hits / stx_player.shots) * 100) + "%"
        if (stx_player.shots == 0) {
            accuracy = "0%";
        }

        hud.stateText.content =
            "\nScore\nTime\nAccuracy\n\n    Enter your email\n\n";

        step_tryagain.scoreText = game.add.text(600, 50, 0, { font: "30pt Pirulen", fill: '#610B5E', strokeThickness: 2 });
        step_tryagain.scoreText.content = score;
        step_tryagain.timeText = game.add.text(600, 100, 0, { font: "30pt Pirulen", fill: '#610B5E', strokeThickness: 2 });
        step_tryagain.timeText.content = time;
        step_tryagain.accuracyText = game.add.text(600, 150, 0, { font: "30pt Pirulen", fill: '#610B5E', strokeThickness: 2 });
        step_tryagain.accuracyText.content = accuracy;

        hud.stateText.visible = true;
        game.input.keyboard.onDownCallback = step_tryagain.inputName;
        stx_player.end();
    },

    update: function () {
    },

    end: function () {
        step_tryagain.scoreText.visible = false;
        step_tryagain.timeText.visible = false;
        step_tryagain.accuracyText.visible = false;

        if (step_boss.music) {
            step_boss.music.stop();
        }

        console.log("tryagain.end");
        var data = {
            player: player_name,
            fondation: step_missionselection.selected_mission.name,
            score: hud.score,
            accuracy: (parseInt((stx_player.hits / stx_player.shots) * 100) + "%"),
            chrono: time
        };
        jQuery.ajax({
            url: 'http://localhost:8080/api/scores',
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: function () {

            }
        });
        game.input.keyboard.onDownCallback = null;
        hud.stateText.visible = false;
        hud.stateText.content = "";
        step_tryagain.scoreText.visible = false;
        step_tryagain.timeText.visible = false;
        step_tryagain.accuracyText.visible = false;

        step_halloffame.start();
    },

    inputName: function (e) {
        if (e.keyCode == 8) {
            if (player_name.length > 0) {
                hud.stateText.content = hud.stateText.content.substr(0, hud.stateText.content.length - 1);
                player_name = player_name.substr(0, player_name.length - 1).trim();
            }
            e.preventDefault();
            return;
        }
        if ((e.keyCode == '13' || e.keyCode == 13) && player_name.length > 0) {
            step_tryagain.end();
        } else {
            var char = keyboard.getKeyFromEvent(e);
            if (char.match("[.@a-zA-Z\u00C0-\u017F]") != char) {
                return;
            }
            hud.stateText.content += char.toLowerCase().trim();
            player_name += char.toLowerCase().trim();
        }
    }
};