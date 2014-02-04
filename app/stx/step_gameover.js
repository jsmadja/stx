var step_gameover = {

    preload: function () {
    },

    start: function () {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.content = " GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart, this);
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