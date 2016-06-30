// ==UserScript==
// @name         pdiwwavatars
// @namespace    http://tampermonkey.net/
// @version      0.3.3
// @description  Changes avatars for users in Paradox Interactive forums
// @author       https://github.com/napstr
// @grant        none
// @include      https://forum.paradoxplaza.com/forum/index.php*
// @updateURL    https://github.com/napstr/pdiwwavatars/raw/master/pdiwwavatars.user.js
// @downloadURL  https://github.com/napstr/pdiwwavatars/raw/master/pdiwwavatars.user.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

var numbers = ["1072860",//npstr
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
var pics = ["https://i.imgur.com/vQNKh5v.jpg",
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

(function() {
    
  //hook to apply the userscript in overlays
  waitForKeyElements(".xenOverlay", doIt);

  //alerts and conversations popups
  waitForKeyElements(".secondaryContent", doIt);

  doIt();
    
})();

function doIt () {
  for (var j = 0; j < numbers.length; j++) {
    //members posted in thread overlay
    var x = document.getElementsByClassName("Av" + numbers[j] + "s");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("*")[0].src = pics[j];
      
      //who replied (not the overlay, but the one on its own site)
      var asd = elem.getElementsByClassName("img s")[0];
      if (typeof asd != 'undefined') {
        asd.style.backgroundImage = "url('" + pics[j] + "')";
        asd.style.backgroundSize = "100%";
      }
    }


    var x = document.getElementsByClassName("Av" + numbers[j] + "m");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("*")[0].src = pics[j];

      //profile
      var asd = elem.getElementsByClassName("img m")[0];
      if (typeof asd != 'undefined') {
        asd.style.backgroundImage = "url('" + pics[j] + "')";
        asd.style.backgroundSize = "100%";
      }
      //$('img.miniMe')[0].src = pics[j]; this needs more work
    }
  
    //profile overlay
    var x = document.getElementsByClassName("Av" + numbers[j] + "l");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      var img = elem.getElementsByTagName("*")[0];
      img.src = pics[j];
      img.height = "192";
      img.width = "192";
    }
  }
}