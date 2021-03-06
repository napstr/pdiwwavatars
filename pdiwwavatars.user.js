// ==UserScript==
// @name         pdiwwavatars
// @namespace    http://tampermonkey.net/
// @version      0.10.5
// @description  Changes avatars for users in Paradox Interactive forums
// @author       https://github.com/napstr
// @grant        none
// @include      https://forum.paradoxplaza.com/forum/index.php*
// @updateURL    https://github.com/napstr/pdiwwavatars/raw/master/pdiwwavatars.user.js
// @downloadURL  https://github.com/napstr/pdiwwavatars/raw/master/pdiwwavatars.user.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

var boilerplate_ids = ["1072860",//npstr
                       "215982", //wagonlitz
                      ];
var boilerplate_imgurls = ["83w7NzQ.png",
                           "GKKPY7O.png",
                          ];
var boilerplate_nicks = ["npstr",
                         "Wagonlitz",
                        ];

var IMGURL = "https://i.imgur.com/";
var storage = localStorage;
var data = restoreData();
var deletecommand = "deleete.plz";


(function() {
     
  checkForPWATags();
  saveData();

    //hook to apply the userscript in overlays
  waitForKeyElements(".xenOverlay", doIt);

  //alerts and conversations popups
  waitForKeyElements(".secondaryContent", doIt);

  //posted and edited message
  waitForKeyElements(".messageUserBlock", doIt);

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

  //check if stored data is old
  if (loadedData.players[0].imgurl.length != 11)
    loadedData = boilerplateData;

  return loadedData;
}

function loadData() {
  var loadedData = JSON.parse(storage.getItem('pdiwwavatars_data'));
  return loadedData;
}

function saveData() {
  storage.setItem('pdiwwavatars_data', JSON.stringify(data));
}

function checkForPWATags() {
//check signatures for pwa tags
  var messages = document.getElementsByClassName("message");
  //length -1 cause the unwritten message at the bottom of the page doesnt have a signature
  for (var j = 0; j < messages.length - 1; j++) {
    var message = messages[j];

    var nick = message.getAttribute("data-author");

    var messageuserinfo = message.getElementsByClassName("messageUserInfo")[0];
    var link = messageuserinfo.getElementsByTagName("a")[0];
    var href = link.getAttribute("href");

    var r;
    var id = "";
    var regexId = /.[0-9]+\//g;
    while (r = regexId.exec(href)) {
      //actually we're just interest in the last one, to ignore any weird usernames that may or may not happen
      id = href.substring(r.index + 1, href.length - 1);
    }

    //users without a sig may break the fun
    var foo = message.getElementsByClassName("signature");
    if (foo.length > 0) {
      var signature = message.getElementsByClassName("signature")[0].innerHTML;
      var pwaurl = "";

      // this regex looks for a case insensitive pattern of qwertzu.xyz between [pwaurl] tags
      //this represents how imgur urls look like right now: a 7 digit name, a point, and a 3 digit file extension
      var regexPwaurl = /(\[pwaurl\])[a-z0-9]{7}.[a-z]{3}(\[\/pwaurl])/gi;
      while (r = regexPwaurl.exec(signature)) {
        pwaurl = signature.substring(r.index + 8, r.index + 19);
      }

      //add to data
      var playerInDB = false;
      if (pwaurl.length > 0 && pwaurl != deletecommand) {
        for (var k = 0; k < data.players.length; k++) {
          var player = data.players[k];
          if (player.id == id) {
            player.imgurl = pwaurl;
            playerInDB = true;
            break;
          }
        }
        if (!playerInDB) {
          var player = {};
          player.nick = nick;
          player.id = id;
          player.imgurl = pwaurl;
          data.players[data.players.length] = player;
        }
      }
      //delete command?
      else if (pwaurl == deletecommand) {
        for (var k = 0; k < data.players.length; k++) {
          if (data.players[k].nick == nick) {
            data.players.splice(k, 1);
            break;
          }
        }
      }
    }
  }
}

function doIt () {

  var players = data.players;
  for (var j = 0; j < players.length; j++) {
    var player = players[j];
    //members posted in thread overlay
    var x = document.getElementsByClassName("Av" + player.id + "s");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("*")[0].src = IMGURL + player.imgurl;
      
      //who replied (not the overlay, but the one on its own site)
      var asd = elem.getElementsByClassName("img s")[0];
      if (typeof asd != 'undefined') {
        asd.style.backgroundImage = "url('" + IMGURL + player.imgurl + "')";
        asd.style.backgroundSize = "100%";
      }
    }


    var x = document.getElementsByClassName("Av" + player.id + "m");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("*")[0].src = IMGURL + player.imgurl;

      //profile
      var asd = elem.getElementsByClassName("img m")[0];
      if (typeof asd != 'undefined') {
        asd.style.backgroundImage = "url('" + IMGURL + player.imgurl + "')";
        asd.style.backgroundSize = "100%";
      }
      //$('img.miniMe')[0].src = player.imgurl; this needs more work
    }
  
    //profile overlay
    var x = document.getElementsByClassName("Av" + player.id + "l");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      var img = elem.getElementsByTagName("*")[0];
      img.src = IMGURL + player.imgurl;
      img.height = "192";
      img.width = "192";
    }
  }
}