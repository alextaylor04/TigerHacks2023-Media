var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.screen.width;
var width = canvas.width;
canvas.height = window.screen.height - 161
var height = canvas.height;
var rectlookx = 0;
var cRect = canvas.getBoundingClientRect();
var canvasx = Math.round(cRect.left)
var canvasy = Math.round(cRect.top)
var curplaylist = ""; 
var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath(); 
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
    ctx.fill();
    } else {
    ctx.stroke();
    }
};
var rectanglecircle = function (rectcirx, rectciry, rectlength, rectwidth, dif, color) {
    ctx.fillStyle = color;
    ctx.fillRect(rectcirx - 1, rectciry + dif - 1, rectlength + 2, rectwidth + 2);
    ctx.fillStyle = color;
    circle(rectcirx, rectciry + dif, dif, true);
    ctx.fillRect(rectcirx, rectciry, rectlength, dif);
    ctx.fillRect(rectcirx + rectlength, rectciry + dif, dif, rectwidth);
    circle(rectcirx + rectlength, rectciry + dif, dif, true);
    ctx.fillRect(rectcirx, rectciry + rectwidth + dif, rectlength, dif);
    
    circle(rectcirx, rectciry + rectwidth + dif, dif, true);
    ctx.fillRect(rectcirx - dif, rectciry + dif, dif, rectwidth);
    circle(rectcirx + rectlength, rectciry + rectwidth + dif, dif, true);
}
ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, width, height);
        ctx.font = "bold 40px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(curplaylist, width / 2 - ctx.measureText(curplaylist).width / 2, 100);
        rectlookx = (width - (2 * (300 + 25 * 2) + 150)) / 2;
        console.log(rectlookx)
        
        if (window.screen.height < 1000) {
        rectanglecircle(rectlookx, 200, 300, 300, 25, "darkred");
        rectanglecircle(rectlookx + 5, 205, 290, 290, 25, "#ff4d4d");
        rectanglecircle(rectlookx + 500, 200, 300, 300, 25, "darkgreen");
        rectanglecircle(rectlookx + 505, 205, 290, 290, 25, "lightgreen");
        } else {
        rectanglecircle(rectlookx, 310, 300, 300, 25, "darkred");
        rectanglecircle(rectlookx + 5, 315, 290, 290, 25, "#ff4d4d");
        rectanglecircle(rectlookx + 500, 310, 300, 300, 25, "darkgreen");
        rectanglecircle(rectlookx + 505, 315, 290, 290, 25, "lightgreen");
        }
        ctx.fillStyle = "black";
        ctx.fillText("Lyric", 200 + 300 / 2 - ctx.measureText("lyric").width / 2, 350);
        ctx.fillText("Analytics", 200 + 300 / 2 - ctx.measureText("analytics").width / 2, 400);
        ctx.fillText("Playlist", 700 + 300 / 2 - ctx.measureText("Playlist").width / 2, 350);
        ctx.fillText("Mood", 700 + 300 / 2 - ctx.measureText("Mood").width / 2, 400);
        // arrowloader();
        var clicking = function (event) {
            var clickx = event.pageX - canvasx;
            var clicky = event.pageY - canvasy;
            ctx.fillStyle = "black";
            ctx.clearRect(0, 50, 80, 60)
            ctx.font = "15px Arial";
            ctx.fillText("x: " + clickx, 10, 70);
            ctx.fillText("y: " + clicky, 10, 90);
            if (clickx > 134 && clickx < 179 && clicky > 24 && clicky < 61) {
                // go back to page 1
            }
            if (clickx > rectlookx - 27 && clickx < rectlookx + 326 && clicky > 200 && clicky < 555) {
                window.location.href = "http://127.0.0.1:5000/lyrics";
            }
            if (clickx > rectlookx + 500 - 25 - 1 && clickx < rectlookx + 801 + 25 && clicky > 200 && clicky < 555) {
                window.location.href = "http://127.0.0.1:5000/playlistmood";
            }
        }
        $("body").click(clicking);   