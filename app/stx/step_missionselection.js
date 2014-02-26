var missions = [
    {
        name: "Agile",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    {
        name: "Craftsmanship",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['G', 'H', 'I', 'J', 'K', 'L']
    },
    {
        name: "Back",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['M', 'N', 'O', 'P', 'Q', 'R']
    },
    {
        name: "Front",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['S', 'T', 'U', 'V', 'W', '0']
    },
    {
        name: "DevOps",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['1', '2', '3', '4', '5', '6']
    },
    {
        name: "Mobile",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['7', '8', '9', 'AA', 'BB', 'CC']
    },
    {
        name: "Cloud",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['DD', 'EE', 'FF', 'GG', 'HH', 'II']
    },
    {
        name: "Data",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['KK', 'LL', 'MM', 'NN', 'OO', 'PP']
    }
];

var step_missionselection = {
        title:null,
        selected_mission_index: 0,
        selected_mission: missions[0],
        music: null,
        preload: function () {
            game.load.audio('mission_select_music', 'stx_assets/music/mission_select.mp3');
        },

        start: function () {
            hud.hide();
            stx_player.hide();

            var title_style = { font: "30pt Pirulen", fill: '#fff'};
            var name_style = { font: "20pt Pirulen", fill: '#fff'};
            var description_style = { font: "12pt Pirulen", fill: '#fff'};

            title = game.add.text(300, 30, 'Choose your mission', title_style);

            for (i = 0; i <= (missions.length / 2) - 1; i++) {
                var mission = missions[i];
                mission.name_text = game.add.text(200, 120 + (i * 100), mission.name, name_style);
                mission.description_text = game.add.text(150, 120 + (i * 100) + 40, mission.description, description_style);
            }

            for (i = (missions.length / 2); i < missions.length; i++) {
                var mission = missions[i];
                mission.name_text = game.add.text(700, 120 + ((i - missions.length / 2) * 100), mission.name, name_style);
                mission.description_text = game.add.text(650, 120 + ((i - missions.length / 2) * 100) + 40, mission.description, description_style);
            }

            this.selectMission(this.selected_mission);

            step_missionselection.music = game.add.audio('mission_select_music');
            step_missionselection.music.play();

            game.input.keyboard.onDownCallback = this.keyboardHandler;

            hud.drawScanlines();
        },


        keyboardHandler: function (e) {
            switch (e.keyCode) {
                case Phaser.Keyboard.UP:
                    step_missionselection.selected_mission_index--;
                    break;
                case Phaser.Keyboard.DOWN:
                    step_missionselection.selected_mission_index++;
                    break;
                case Phaser.Keyboard.LEFT:
                    if (step_missionselection.selected_mission_index >= (missions.length / 2)) {
                        step_missionselection.selected_mission_index -= missions.length / 2;
                    }
                    break;
                case Phaser.Keyboard.RIGHT:
                    if (step_missionselection.selected_mission_index < missions.length / 2) {
                        step_missionselection.selected_mission_index += missions.length / 2;
                    }
                    break;
                case Phaser.Keyboard.ENTER:
                    step_missionselection.end();
                    break;
            }
            if (step_missionselection.selected_mission_index < 0) {
                step_missionselection.selected_mission_index = 0;
            }
            if (step_missionselection.selected_mission_index >= missions.length) {
                step_missionselection.selected_mission_index = missions.length - 1;
            }
            step_missionselection.selectMission(missions[step_missionselection.selected_mission_index]);
        },

        selectMission: function (mission) {
            var unselected_name_style = { font: "20pt Pirulen", fill: '#FFF'};
            var unselected_description_style = { font: "12pt Pirulen", fill: '#FFF'};
            this.selected_mission.name_text.setStyle(unselected_name_style);
            this.selected_mission.description_text.setStyle(unselected_description_style);

            var selected_name_style = { font: "20pt Pirulen", fill: '#F00'};
            var selected_description_style = { font: "12pt Pirulen", fill: '#F00'};
            this.selected_mission = mission;
            this.selected_mission.name_text.setStyle(selected_name_style);
            this.selected_mission.description_text.setStyle(selected_description_style);
            console.log(mission.name);
        },

        update: function () {

        },

        end: function () {
            title.visible = false;
            for (var i = 0; i < missions.length; i++) {
                missions[i].name_text.visible = false;
                missions[i].description_text.visible = false;
            }

            step_missionselection.music.stop();
            step_mission.start();
        }
    }
    ;