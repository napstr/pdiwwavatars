// ==UserScript==
// @name         pdiwwavatars
// @namespace    http://tampermonkey.net/
// @version      0.4.3
// @description  Changes avatars for users in Paradox Interactive forums
// @author       https://github.com/napstr
// @grant        none
// @include      https://forum.paradoxplaza.com/forum/index.php*
// @updateURL    https://github.com/napstr/pdiwwavatars/raw/master/pdiwwavatars.user.js
// @downloadURL  https://github.com/napstr/pdiwwavatars/raw/master/pdiwwavatars.user.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

var boilerplate_ids = ["1072860",//npstr
               "856290", //audren
               "215982", //wagonlitz
               "503752", //cliges
               "1022496", //jackson
               "448345",//alxeu
               "1056425", //duke dan
               "91719", //euroo7
               "889046", //madchemist
               "928304", //2knikk
               "1024075", //wombat
               "57094", //k-59
               "849376", //rovsea
              ];
var boilerplate_imgurls = ["https://i.imgur.com/vQNKh5v.jpg",
            "https://i.imgur.com/4hgEPHc.png",
            "https://i.imgur.com/GKKPY7O.png",
            "https://i.imgur.com/jk4jIt2.png",
            "https://i.imgur.com/1q1tu85.gif",
            "https://i.imgur.com/Di8N4nL.png",
            "https://i.imgur.com/yGH71zm.png",
            "https://i.imgur.com/2uTAHCc.png",
            "https://i.imgur.com/pmnAV5B.png",
            "https://i.imgur.com/TEKgwoR.jpg",
            "https://i.imgur.com/ryb0Cm8.jpg",
            "https://i.imgur.com/2JP6QML.png",
            "https://i.imgur.com/WS6PgII.png",
           ];
var boilerplate_nicks = ["npstr",
             "Audren",
             "Wagonlitz",
             "Cliges",
             "Jacksonian Missionary",
             "alxeu",
             "Duke Dan \"the Man\"",
             "EUROO7",
             "madchemist",
             "2kNikk",
             "deathbywombat",
             "k-59",
             "Rovsea",
            ];

var storage = localStorage;
var data = restoreData();;

(function() {  
     
  saveData(data);

  //hook to apply the userscript in overlays
  waitForKeyElements(".xenOverlay", doIt);

  //alerts and conversations popups
  waitForKeyElements(".secondaryContent", doIt);

  doIt();

})();

function restoreData() {

  var boilerplateData = {};
  var players = [];
  for (var i = 0; i < boilerplate_ids.length; i++) {
    var player = {};
    player.id = boilerplate_ids[i];
    player.nick = boilerplate_nicks[i];
    player.imgurl = boilerplate_imgurls[i];

    players[i] = player;
  }
  boilerplateData.players = players;

  var loadedData = loadData();


  if (loadedData === null)
    loadedData = boilerplateData;

  if (!loadedData.hasOwnProperty('players')) {
    loadedData.players = boilerplateData.players;
  }

  for (var i = 0; i < loadedData.length; i++) {
    var player = loadedData[i];
    console.log(player.id + " " + player.nick + " " + player.imgurl);
  }

  return loadedData;
}

function loadData() {
  var loadedData = JSON.parse(storage.getItem('data'));
  return loadedData;
}

function saveData(data) {
  storage = storage.setItem('data', JSON.stringify(data));
}

function doIt () {
  var players = data.players;
  for (var j = 0; j < players.length; j++) {
    var player = players[j];
    //members posted in thread overlay
    var x = document.getElementsByClassName("Av" + player.id + "s");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("*")[0].src = player.imgurl;
      
      //who replied (not the overlay, but the one on its own site)
      var asd = elem.getElementsByClassName("img s")[0];
      if (typeof asd != 'undefined') {
        asd.style.backgroundImage = "url('" + player.imgurl + "')";
        asd.style.backgroundSize = "100%";
      }
    }


    var x = document.getElementsByClassName("Av" + player.id + "m");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("*")[0].src = player.imgurl;

      //profile
      var asd = elem.getElementsByClassName("img m")[0];
      if (typeof asd != 'undefined') {
        asd.style.backgroundImage = "url('" + player.imgurl + "')";
        asd.style.backgroundSize = "100%";
      }
      //$('img.miniMe')[0].src = player.imgurl; this needs more work
    }
  
    //profile overlay
    var x = document.getElementsByClassName("Av" + player.id + "l");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      var img = elem.getElementsByTagName("*")[0];
      img.src = player.imgurl;
      img.height = "192";
      img.width = "192";
    }
  }
}