var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
 

canvas.width = window.screen.width;
canvas.height = window.screen.height - 175;
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
var largestword = 0;
var fontsizes = [];
var randomwords = [];
var randomfonts = [];
var num1 = 0;
var num2 = 0;
var num3 = 0;
var plotsize = 600;
var plotlist = [];
var counter = 0;
var maxfontsize = 30;
var tempnumber = 0;
var numofsongs = 30;
var currsong = 1;
for (var key in dict) {
  words.push(key);
}
for (var i = 0; i < words.length; i++) {
    numberofwords.push(dict[words[i]]);
    if (dict[words[i]] > largestword) {
        largestword = dict[words[i]] 
    }
}
for (var i = 0; i < words.length; i++) {
    fontsizes.push(Math.round(numberofwords[i]/largestword * maxfontsize) + 10)
}
while (words.length > 0) {
    tempnumber = Math.round(Math.random() * (words.length - 1));
    randomwords.push(words[tempnumber]);
    randomfonts.push(fontsizes[tempnumber]);
    words.splice(tempnumber, 1);
    fontsizes.splice(tempnumber, 1);
}
var arrow = function (x, y, size, small, dir) {
    ctx.beginPath();
    if (dir == "left") {
    ctx.moveTo(x + 7 * size + small * 1.2, y + 6 * size);
    ctx.lineTo(x + 15 * size - small, y - 3 * size + small * 2);
    ctx.lineTo(x + 15 * size - small, y + 15 * size- small * 2);
    ctx.lineTo(x + 7 * size + small * 1.2, y + 6 * size);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x + 14 * size - small * 2, y + 2 * size + small, 15 * size + small, 8 * size - small * 2);
    } else {
    ctx.moveTo(x + 36 * size + small * 1.2, y + 6 * size);
    ctx.lineTo(x + 28 * size - small, y - 3 * size + small * 2);
    ctx.lineTo(x + 28 * size - small, y + 15 * size- small * 2);
    ctx.lineTo(x + 36 * size + small * 1.2, y + 6 * size);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x + 14 * size - small * 2, y + 2 * size + small, 15 * size + small, 8 * size - small * 2);    
    }
}
var arrowloader = function () {
    ctx.fillStyle = "black";
    arrow(120, 30, 2, 0);
    ctx.fillStyle = "grey";
    arrow(120, 30, 2, 2);
}

var reset = function () {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "lightgreen"
    ctx.font = "100px Arial"
    ctx.fillText("Next", 900, 300);
    ctx.fillStyle = "lightgreen";
    arrow(800, 400, 3, 0, "left");
    arrow(1080, 400, 3, 0, "right");
    ctx.font = "35px Arial";
    ctx.fillText("Song", 960, 400);
    if (currsong < 10) {
        ctx.fillText(currsong + " / " + numofsongs, 958, 440);
    } else {
        ctx.fillText(currsong + " / " + numofsongs, 950, 440);   
    }
}
reset();

var numofnum = 0; 
var fontopt = [];
var largestfont = 0;
var randomx = 0;
var yvalue = 70;
var tempcheck = 0;
var u = 0;

var colorseter = function () {
var randomcolor = Math.round(Math.random() * 3)
console.log("random: " + randomcolor)
if (randomcolor == 0) {
    ctx.fillStyle = "lightgreen"
} else if (randomcolor == 1) {
    ctx.fillStyle = "lightblue"
} else if (randomcolor == 2) {
    ctx.fillStyle = "lightgreen";
} else if (randomcolor == 3) {
    ctx.fillStyle = "#cc99ff"
}
}

var plotthepoint = function () {
u = 0;
yvalue = 70;
while (u < randomwords.length) {
plotlist = [];
fontopt = []; 
largestfont = 0;
numofnum = Math.round(Math.random() * 3);
if (numofnum == 0) {
    numofnum = 2;
}
for (var i = 0; i < numofnum; i++) {
    fontopt.push(randomfonts[i + u])
    if (fontopt[i] > largestfont) {
        largestfont = fontopt[i]
    }
}
if ((u + numofnum < randomwords.length) == false) {
    numofnum = randomwords.length - u;
}

for (var i = 0; i < numofnum; i++) {
    for (var k = 0; k < 1000; k++) {
        randomx = Math.round(Math.random() * plotsize);
        ctx.font = fontopt[i] + "px Arial";
        if (randomx > 5 && (ctx.measureText(randomwords[i + u]).width + randomx) < plotsize - 5) {
            if (plotlist.length == 0) {
                k = 1000000;
                plotlist.push([randomx, ctx.measureText(randomwords[i + u]).width + randomx])
                colorseter();
                ctx.fillText(randomwords[i + u], randomx, yvalue + fontopt[i]);
                continue;
            }
            tempcheck = 0;
            for (var t = 0; t < plotlist.length; t++) {
                if (randomx > plotlist[t][1] || (randomx + ctx.measureText(randomwords[i + u]).width) < plotlist[t][0]) {
                    tempcheck++;
                }
            }
            if (tempcheck == plotlist.length) {
                t = 100;
                k = 1000000;
                plotlist.push([randomx, ctx.measureText(randomwords[i + u]).width + randomx])
                colorseter();
                ctx.fillText(randomwords[i + u], randomx, yvalue + fontopt[i]);
                console.log(i + u);
            }
        }
    }
}
u += numofnum;
yvalue+= largestfont + 3;
if (yvalue + 30 > plotsize) {
    u = 1000;
}
}
}
plotthepoint();
var version2 = function () {
    var temptext = "This works good";
    var tempfontsize = 100;
    ctx.font = tempfontsize + "px Arial";
    var tempx = 60;
    var tempy = 130;
    ctx.fillStyle = "grey";
    console.log(tempx - ctx.measureText(temptext).width)
    ctx.fillRect(tempx, tempy - tempfontsize * 0.8, ctx.measureText(temptext).width, tempfontsize);
    ctx.fillStyle = "green";
    ctx.fillText(temptext, 60, 130);
}






var clicking = function (event) {
    var clickx = event.pageX - canvasx;
    var clicky = event.pageY - canvasy;
    ctx.fillStyle = "white";
    ctx.clearRect(0, 50, 80, 60)
    ctx.font = "15px Arial";
    ctx.fillText("x: " + clickx, 10, 70);
    ctx.fillText("y: " + clicky, 10, 90);
if (clickx > 905 && clickx < 1104 && clicky > 225 && clicky < 300) {
    // window.location.href = "http://127.0.0.1:5000/lyrics";
}
if (clickx > 819 && clickx < 888 && clicky > 390 && clicky < 445 && currsong > 1) {
    currsong-= 1;
    reset();
    plotthepoint();
} else if (clickx > 1121 && clickx < 1188 && clicky > 390 && clicky < 445 && currsong < 30) {
    currsong+= 1;
    reset();
    plotthepoint();
}

}
    $("body").click(clicking);