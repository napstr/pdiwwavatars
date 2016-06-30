// ==UserScript==
// @name         pdiwwavatars
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Changes avatars for users in Paradox Interactive forums
// @author       https://github.com/napstr
// @grant        none
// @include      https://forum.paradoxplaza.com/forum/index.php?threads*
// ==/UserScript==

(function() {

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
    
    
    for (var j = 0; j < numbers.length; j++) {
        var x = document.getElementsByClassName("avatar Av" + numbers[j] + "m");
        for (var i = 0; i < x.length; i++) {
            var elem = x[i];
            elem.getElementsByTagName("*")[0].src = pics[j];
        }
    }
})();