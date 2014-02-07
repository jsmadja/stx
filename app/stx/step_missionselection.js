var step_missionselection = {
    music: null,
    preload: function () {
        game.load.audio('mission_select_music', 'stx_assets/music/mission_select.mp3');
    },

    start: function () {
        // choose your mission
        //showStage();
        step_missionselection.music = game.add.audio('mission_select_music');
        //step_missionselection.music.play();

        step_mission.start();
    },

    update: function () {
    },

    end: function () {
        step_missionselection.music.stop();
    }
};