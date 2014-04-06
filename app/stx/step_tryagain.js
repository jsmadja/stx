var player_name = "";

var step_tryagain = {

    preload: function () {
    },

    start: function () {
        console.log("tryagain.start");
        player_name = "";
        background.hide();
        hud.hide();
        hud.stateText.content = " TRY AGAIN, Enter your name!\n\n";
        hud.stateText.visible = true;
        game.input.keyboard.onDownCallback = step_tryagain.inputName;
        currentStep = step_tryagain;
        stx_player.end();
        hud.drawScanlines();
    },

    update: function () {
    },

    end: function () {
        console.log("tryagain.end");
        var data = {
            player: player_name + "@test.com",
            fondation: step_missionselection.selected_mission.name,
            score: hud.score
        };
        jQuery.ajax({
            url: 'http://shootthexebians.xebiafr.eu.cloudbees.net/api/scores',
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: function () {
                game.input.keyboard.onDownCallback = null;
                hud.stateText.visible = false;
                hud.stateText.content = "";
                step_halloffame.start();
            }
        });

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
        var char = keyboard.getKeyFromEvent(e);
        if (char == '%') {
            return;
        }
        if ((e.keyCode == '13' || e.keyCode == 13) && player_name.length > 0) {
            step_tryagain.end();
        } else {
            hud.stateText.content += char.toLowerCase().trim();
            player_name += char.toLowerCase().trim();
        }
    }
};