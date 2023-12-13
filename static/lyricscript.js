var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasupdate = function (canwidth, canheight) {
    canvas.width = window.screen.width - canwidth;
    if (canheight != -1) {
    canvas.height = window.screen.height - canheight;
    } else {
    canvas.height = 1200 + (playlist.length - 2) * 200;
    }
}
// canvasupdate(0, 161);
var width = canvas.width;
var height = canvas.height;
var rectlookx = 0;
var cRect = canvas.getBoundingClientRect();
var canvasx = Math.round(cRect.left)
var canvasy = Math.round(cRect.top)
var page = 1;
var currentplaylist = 0; 
// currentplaylist = playlistnum[i]
var dict = top_50_lyrics;
var words = [];
var numberofwords = [];
var num1 = 0;
var num2 = 0;
var num3 = 0;
var plotsize = 250;
var plotlist = [];
var counter = 0;
console.log(top_50_lyrics)
for (var key in dict) {
  words.push(key);
}
for (var i = 0; i < words.length; i++) {
    numberofwords.push(dict[words[i]]);
}
var arrow = function (x, y, size, small) {
    ctx.beginPath();
    ctx.moveTo(x + 7 * size + small * 1.2, y + 6 * size);
    ctx.lineTo(x + 15 * size - small, y - 3 * size + small * 2);
    ctx.lineTo(x + 15 * size - small, y + 15 * size- small * 2);
    ctx.lineTo(x + 7 * size + small * 1.2, y + 6 * size);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x + 14 * size - small * 2, y + 2 * size + small, 15 * size + small, 8 * size - small * 2);
    }
    var arrowloader = function () {
        ctx.fillStyle = "black";
        arrow(120, 30, 2, 0);
        ctx.fillStyle = "grey";
        arrow(120, 30, 2, 2);
}
//console.log(words);
ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        arrowloader();
        // words = [];
        // numberofwords = [];
        for (var j = 0; j < words.length; j++) {
            num3 = Math.round(25 * numberofwords[j] / numberofwords[0]);
            ctx.font = num3 + "px Arial";
        for (var i = 0; i < 1000; i++){
            num1 = Math.random() * plotsize;
            num2 = Math.random() * plotsize;
            if (num1 + ctx.measureText(words[j]).width < plotsize && num2 + 10 < plotsize) {
                counter = 0;
                for (var k = 0; k < plotlist.length; k++) {
                    if (false == (plotlist[k][1] <= num1 && (ctx.measureText(words[j]).width + num1) <= plotlist[k][3] && plotlist[k][2] <= num2 && (num2 + num3) <= plotlist[k][4])) {
                        counter++;
                    }
                }
                if (counter == plotlist.length) {
                    plotlist.push([words[j], num1, num2, ctx.measureText(words[j]).width + num1, num2 + num3, num3])
                    i = 10000000;
                }
            }
        }
        }
        // console.log(plotlist);
        ctx.fillStyle = "lightgreen"
        for (var i = 0; i < plotlist.length; i++) {
            ctx.font = plotlist[i][5] + "px Arial";
            ctx.fillText(plotlist[i][0], plotlist[i][1] + 250, plotlist[i][2] + 250);
        }

        var clicking = function (event) {
            var clickx = event.pageX - canvasx;
            var clicky = event.pageY - canvasy;
            ctx.fillStyle = "black";
            ctx.clearRect(0, 50, 80, 60)
            ctx.font = "15px Arial";
            ctx.fillText("x: " + clickx, 10, 70);
            ctx.fillText("y: " + clicky, 10, 90);
        if (clickx > 134 && clickx < 179 && clicky > 24 && clicky < 61) {
            // link to Main 
        }
    }
    $("body").click(clicking);