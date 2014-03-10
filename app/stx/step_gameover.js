var step_gameover = {

    music: null,

    preload: function () {
        game.load.audio('gameover_music', 'stx_assets/music/game_over.mp3');
    },

    start: function () {
        //stx_player.kill();
        //enemyBullets.callAll('kill');

        //stateText.content = " GAME OVER \n Click to restart";
        //stateText.visible = true;

        step_gameover.music = game.add.audio('gameover_music');
        step_gameover.music.play();

        //the "click to restart" handler
        game.input.onTap.addOnce(step_gameover.restart, this);
    },

    update: function () {
    },

    end: function () {
    },

    restart: function () {
        /*
         //  A new level starts

         //resets the life count
         lives.callAll('revive');
         //  And brings the aliens back from the dead :)
         aliens.removeAll();
         startMission();

         //revives the player
         player.revive();
         //hides the text
         stateText.visible = false;

         currentStep = MISSION_STEP;
         */
    }

};