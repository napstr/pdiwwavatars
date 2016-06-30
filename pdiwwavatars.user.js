// ==UserScript==
// @name         pdiwwavatars
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Changes avatars for users in Paradox Interactive forums
// @author       https://github.com/napstr
// @grant        none
// @include      https://forum.paradoxplaza.com/forum/index.php*
// @updateURL    https://github.com/napstr/pdiwwavatars/raw/master/pdiwwavatars.user.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

var numbers = ["1072860",//npstr
               "856290", //audren
               "215982", //wagonlitz
               "503752", //cliges
              ];
var pics = ["https://i.imgur.com/vQNKh5v.jpg",
            "https://i.imgur.com/4hgEPHc.png",
            "https://i.imgur.com/GKKPY7O.png",
            "https://i.imgur.com/jk4jIt2.png",
           ];

(function() {
    
  //hook to apply the userscript in overlays
  waitForKeyElements(".xenOverlay", updateInOverlays);
    
  for (var j = 0; j < numbers.length; j++) {
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
      $('img.miniMe')[0].src = pics[j];
      
    }

    var x = document.getElementsByClassName("Av" + numbers[j] + "s");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("*")[0].src = pics[j];
    }

    var x = document.getElementsByClassName("Av" + numbers[j] + "l");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("*")[0].src = pics[j];
    }

  }
})();

function updateInOverlays () {
  for (var j = 0; j < numbers.length; j++) {
    //members posted in thread overlay
    var x = document.getElementsByClassName("Av" + numbers[j] + "s");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];

      var asd = elem.getElementsByClassName("img s")[0];
      if (typeof asd != 'undefined') {
        asd.style.backgroundImage = "url('" + pics[j] + "')";
        asd.style.backgroundSize = "100%";
      }
    }

    //profile overlay
    var x = document.getElementsByClassName("Av" + numbers[j] + "l");
    for (var i = 0; i < x.length; i++) {
      var elem = x[i];
      elem.getElementsByTagName("img")[0].src = pics[j];
    }
  }
}