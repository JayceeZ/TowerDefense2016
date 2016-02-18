/*database configuration goes here,eg:list of tables with columns*/
angular.module('config.service', [])


  .constant('RESOURCES', {
    server: 'http://192.168.1.2:8081',
    defenses: [
      {
        "id"   : "0",
        "name" : "Tourelle",
        "image" : "img/PolyDefense/nbtowers.png",
        "prix" : 75,
        "cout" : 50,
        "type" : "Terrestre",

        "mine" : true,

        "description" : {
          "Forces" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Faiblesses" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },

        "caracteristics" : {
          "cadence" : 1,
          "cadenceL" : [1,0,0],
          "portee" : 14,
          "damage" : 7
        }
      },
      {
        "id"   : "1",
        "name" : "Décapsuleur",
        "image" : "img/PolyDefense/turret2.png",
        "prix" : 120,
        "cout" : 100,
        "type" : "Terrestre",
        "mine" : true,

        "description" : {
          "strenght" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "weakness" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },


        "caracteristics" : {
          "cadence" : 1,
          "cadenceL" : [1,0,0],
          "portee" : 20,
          "damage" : 11
        }
      },
      {
        "id"   : "2",
        "name" : "Exterminateur",
        "image" : "img/PolyDefense/nbtowers.png",
        "prix" : 145,
        "cout" : 125,
        "type" : "Terrestre",
        "mine" : false,

        "description" : {
          "strenght" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "weakness" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },


        "caracteristics" : {
          "cadence" : 2,
          "cadenceL" : [1,1,0],
          "portee" : 35,
          "damage" : 13
        }
      },
      {
        "id"   : "3",
        "name" : "Bombardier",
        "image" : "img/PolyDefense/nbtowers.png",
        "prix" : 170,
        "cout" : 160,
        "type" : "Terrestre",
        "mine" : false,

        "description" : {
          "strenght" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "weakness" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },


        "caracteristics" : {
          "cadence" : 2,
          "cadenceL" : [1,1,0],
          "portee" : 43,
          "damage" : 17
        }
      },
      {
        "id"   : "4",
        "name" : "Drône aérien",
        "image" : "img/PolyDefense/nbtowers.png",
        "prix" : 200,
        "cout" : 189,
        "type" : "Terrestre",
        "mine" : false,

        "description" : {
          "strenght" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "weakness" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },


        "caracteristics" : {
          "cadence" : 3,
          "cadenceL" : [1,1,1],
          "portee" : 50,
          "damage" : 20
        }
      },
      {
        "id"   : "5",
        "name" : "Dynamiteur",
        "image" : "img/PolyDefense/nbtowers.png",
        "prix" : 350,
        "cout" : 210,
        "type" : "Terrestre",
        "mine" : false,

        "description" : {
          "strenght" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "weakness" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },


        "caracteristics" : {
          "cadence" : 3,
          "cadenceL" : [1,1,1],
          "portee" : 100,
          "damage" : 35
        }
      }
    ]
  });

