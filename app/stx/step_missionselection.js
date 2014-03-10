var missions = [
    {
        name: "Agile",
        description: "We meet deadlines, we welcome\nchange. All that you believe has been\nredefined. Whatever your estimates,\nknow that you're DONE!",
        keywords: ['A', 'B', 'C', 'D', 'E', 'F'],
        sprite: 'agile_face.png',
        boss: 'CHEVALIER'
    },
    {
        name: "Craftsmanship",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['G', 'H', 'I', 'J', 'K', 'L'],
        sprite: 'craftsmanship_face.png',
        boss: 'VARDANEGA'
    },
    {
        name: "Back",
        description: "We are the metamorphic structure\nof Everything, dictating the Behavior\nfrom the shadow. Whatever your\nlifeform is, you will be integrated.",
        keywords: ['M', 'N', 'O', 'P', 'Q', 'R'],
        sprite: 'back_face.png',
        boss: 'MINH'
    },
    {
        name: "Front",
        description: "Bla bla bla bla Bla bla bla bla \nBla bla bla bla Bla bla bla bla ",
        keywords: ['S', 'T', 'U', 'V', 'W', '0'],
        sprite: 'front_face.png',
        boss: 'ANTOINE'
    },
    {
        name: "DevOps",
        description: "To make error is human. To propagate\nerror to all server in automatic way\nis #devops.",
        keywords: ['1', '2', '3', '4', '5', '6'],
        sprite: 'devops_face.png',
        boss: 'RIGAUX'
    },
    {
        name: "Mobile",
        description: "That big thing in my trousers, it's not\nmy d$$$, it's my Samsung Galaxy Note 4!",
        keywords: ['7', '8', '9', 'AA', 'BB', 'CC'],
        sprite: 'mobile_face.png',
        boss: 'THENOZ'
    },
    {
        name: "Cloud",
        description: "I CAN HAS ME VIRTUAL CHEEZ MACHINEZ\nAN LOAD BALANCERS IN DA CLOUD ?",
        keywords: ['DD', 'EE', 'FF', 'GG', 'HH', 'II'],
        sprite: 'cloud_face.png',
        boss: 'BLONDE'
    },
    {
        name: "Data",
        description: "All your datas are belong to us.\nYou are on the way to destruction.\nFight for great justice.",
        keywords: ['KK', 'LL', 'MM', 'NN', 'OO', 'PP'],
        sprite: 'data_face.png',
        boss: 'LARDEUR'
    }
];

var step_missionselection = {
    title: null,
    selected_mission_index: 0,
    selected_mission: missions[0],
    music: null,
    preload: function () {
        game.load.audio('mission_select_music', 'stx_assets/music/mission_select.mp3');
    },

    start: function () {
        console.log("missionselection.start");


        var title_style = { font: "30pt Pirulen", fill: '#fff'};
        var name_style = { font: "20pt Pirulen", fill: '#fff'};
        var description_style = { font: "11pt Pirulen", fill: '#fff'};

        title = game.add.text(300, 30, 'Choose your mission', title_style);

        var spacing_between_fundations = 130;
        for (i = 0; i <= (missions.length / 2) - 1; i++) {
            var mission = missions[i];
            mission.name_text = game.add.text(200, 100 + (i * spacing_between_fundations), mission.name, name_style);
            mission.description_text = game.add.text(150, 100 + (i * spacing_between_fundations) + 40, mission.description, description_style);
        }

        for (i = (missions.length / 2); i < missions.length; i++) {
            var mission = missions[i];
            mission.name_text = game.add.text(700, 100 + ((i - missions.length / 2) * spacing_between_fundations), mission.name, name_style);
            mission.description_text = game.add.text(650, 100 + ((i - missions.length / 2) * spacing_between_fundations) + 40, mission.description, description_style);
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
        var unselected_description_style = { font: "11pt Pirulen", fill: '#FFF'};
        this.selected_mission.name_text.setStyle(unselected_name_style);
        this.selected_mission.description_text.setStyle(unselected_description_style);

        var selected_name_style = { font: "20pt Pirulen", fill: '#F00'};
        var selected_description_style = { font: "11pt Pirulen", fill: '#F00'};
        this.selected_mission = mission;
        this.selected_mission.name_text.setStyle(selected_name_style);
        this.selected_mission.description_text.setStyle(selected_description_style);
    },

    update: function () {

    },

    end: function () {
        console.log("missionselection.end");

        game.input.keyboard.onDownCallback = null;
        title.visible = false;
        for (var i = 0; i < missions.length; i++) {
            missions[i].name_text.visible = false;
            missions[i].description_text.visible = false;
        }
        step_missionselection.music.stop();
        step_mission.start();
    }
};