var missions = [
    {
        name: "Agile",
        description: "We meet deadlines, we welcome\nchange. All that you believe has been\nredefined. Whatever your estimates,\nknow that you're DONE!",
        keywords: ['Scrum', 'Kanban', 'Demo', 'Product', 'Manifesto', 'Lean'],
        sprite: 'agile_face.png',
        boss: 'CHEVALIER'
    },
    {
        name: "Craftsmanship",
        description: "As aspiring Software Craftsmen we are\nraising the bar of professional\nsoftware development by practicing\nit and helping others learn the craft.",
        keywords: ['YAGNI', 'KISS', 'Refactoring', 'Testing', 'Egoless', 'Cleaning'],
        sprite: 'craftsmanship_face.png',
        boss: 'VARDANEGA'
    },
    {
        name: "Back",
        description: "We are the metamorphic structure\nof Everything, dictating the Behavior\nfrom the shadow. Whatever your\nlifeform is, you will be integrated.",
        keywords: ['Clustering', 'Architecture', 'Availability', 'Performance', 'Cache', 'Security'],
        sprite: 'back_face.png',
        boss: 'MINH'
    },
    {
        name: "Front",
        description: "CSS\nis\nawesome!",
        keywords: ['Javascript', 'Angular', 'Backbone', 'Ember', 'CSS3', 'HTML5'],
        sprite: 'front_face.png',
        boss: 'ANTOINE'
    },
    {
        name: "DevOps",
        description: "To make error is human. To propagate\nerror to all servers in automatic way\nis #devops.",
        keywords: ['Puppet', 'Chef', 'Docker', 'Cont. Delivery', 'Infra as Code', 'Nagios'],
        sprite: 'devops_face.png',
        boss: 'RIGAUX'
    },
    {
        name: "Mobile",
        description: "Conquering the world?\nThere's an app for that!",
        keywords: ['iOS', 'Android', 'Phonegap', 'APK', 'IPA', 'Emulator'],
        sprite: 'mobile_face.png',
        boss: 'THENOZ'
    },
    {
        name: "Cloud",
        description: "I CAN HAS ME VIRTUAL CHEEZ\nMACHINEZ AN LOAD BALANCERS\nIN DA CLOUD ?",
        keywords: ['Cloudbees', 'EC2', 'AWS', 'OPENSTACK', 'HEROKU', 'OPENSHIFT'],
        sprite: 'cloud_face.png',
        boss: 'BLONDE'
    },
    {
        name: "Data",
        description: "All your datas are belong to us.\nYou are on the way to destruction.\nFight for great justice.",
        keywords: ['Cassandra', 'Hadoop', 'MONGODB', 'NEO4J', 'ELASTIC SEARCH', 'JONGO'],
        sprite: 'data_face.png',
        boss: 'LARDEUR'
    }
];

var step_missionselection = {
    title: null,
    description: null,
    description_title: null,
    selected_mission: null,
    music: null,
    preload: function () {
        game.load.audio('mission_select_music', 'stx_assets/music/mission_select.mp3');
    },

    start: function () {
        game.stage.scale.startFullScreen();

        console.log("missionselection.start");
        this.selected_mission_index = new Date().getTime() % 8,
            this.selected_mission = missions[this.selected_mission_index];
        var title_style = { font: "30pt Pirulen", fill: '#fff'};
        var description_title_style = { font: "42pt Pirulen", fill: '#fff'};
        var name_style = { font: "20pt Pirulen", fill: '#fff'};
        var description_style = { font: "30pt Courrier", fill: '#fff'};

        title = game.add.text(300, 30, 'Choose your mission', title_style);

        this.description_title = game.add.text(500, 120, this.selected_mission.name, description_title_style);
        this.description = game.add.text(450, 250, this.selected_mission.description, description_style);


        var spacing_between_fundations = 60;
        for (i = 0; i < missions.length; i++) {
            var mission = missions[i];
            mission.name_text = game.add.text(50, 100 + (i * spacing_between_fundations), mission.name, name_style);
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
        //this.selected_mission.description_text.setStyle(unselected_description_style);

        var selected_name_style = { font: "20pt Pirulen", fill: '#610B5E'};
        var selected_description_style = { font: "11pt Pirulen", fill: '#610B5E'};
        this.selected_mission = mission;
        this.selected_mission.name_text.setStyle(selected_name_style);
        this.description_title.setText(mission.name);
        this.description.setText(mission.description);
        //this.selected_mission.description_text.setStyle(selected_description_style);
    },

    update: function () {

    },

    end: function () {
        console.log("missionselection.end");

        game.input.keyboard.onDownCallback = null;
        title.visible = false;
        for (var i = 0; i < missions.length; i++) {
            missions[i].name_text.visible = false;
            //missions[i].description_text.visible = false;
        }
        this.description.visible = false;
        this.description_title.visible = false;
        step_missionselection.music.stop();
        step_mission.start();
    }
};