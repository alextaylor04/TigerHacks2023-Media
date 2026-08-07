var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.screen.width - 25;
var width = canvas.width;
canvas.height = window.screen.height
var height = canvas.height;
var cRect = canvas.getBoundingClientRect();
var canvasx = Math.round(cRect.left)
var canvasy = Math.round(cRect.top)
var timevar = 1;
var clicking = function (event) {
    var clickx = event.pageX - canvasx;
    var clicky = event.pageY - canvasy;
    ctx.fillStyle = "black";
    ctx.clearRect(0, 50, 80, 60)
    ctx.font = "15px Arial";
    ctx.fillText("x: " + clickx, 10, 70);
    ctx.fillText("y: " + clicky, 10, 90);
    var textclick = ctx.measureText("Click here to log in").width
    if (clickx > (width / 2 - textclick / 2) - 40  && clicky > 335 && clickx < 861 && clicky < 358) {
        window.location.href = link;
    }
}
$("body").click(clicking);


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
// rectanglecircle(x, y, length, width, circle #, color);


ctx.fillStyle = "#191414";
ctx.fillRect(0,0,width,height);

ctx.fillStyle = "#1ed760";
ctx.font = "80px Georgia";
ctx.fillText("Music Unmasked", width / 2 - ctx.measureText("Music Unmasked").width / 2, 100);

ctx.fillStyle = "#1ed760";
ctx.font = "40px Georgia";
ctx.fillText("Learn more about your music.", width / 2 - ctx.measureText("Learn more about your music.").width / 2 , 210);

ctx.fillStyle = "green";
ctx.font = "25px Georgia";
ctx.fillText("Click here to log in", width / 2 - ctx.measureText("Click here to log in").width / 2 , 350);

var timechecker = function () {
timevar = 1;
}
document.onmousemove = function(event) {
    var pointerX = event.pageX - canvasx
    var pointerY = event.pageY - canvasy
    var textclick = ctx.measureText("Click here to log in").width;
    if (pointerX > (width / 2 - textclick / 2)  && pointerY > 335 && pointerX < 861 && pointerY < 358) {
        ctx.fillStyle = "#191414";
        ctx.fillRect(646, 320, 240, 50);
        ctx.fillStyle = "lightblue";
        ctx.font = "25px Georgia";
        ctx.fillText("Click here to log in", width / 2 - ctx.measureText("Click here to log in").width / 2 , 350);
    } else {
        if (timevar == 1) {
        ctx.fillStyle = "#191414";
        ctx.fillRect(646, 320, 240, 50);
        ctx.fillStyle = "lightGreen";
        ctx.font = "25px Georgia";
        ctx.fillText("Click here to log in", width / 2 - ctx.measureText("Click here to log in").width / 2 , 350);
        timevar = 0;
        const myTimeout = setTimeout(timechecker, 205);
        }
    }
}
ctx.fillStyle = "#1ed760";
ctx.font = "25px Georgia";
ctx.fillText("What we do:",100, 490);

ctx.fillStyle = "#1ed760";
ctx.font = "20px Georgia";
var string1 = " • The website will take the playlists on your spotify account and allow you to see information about the playlists you have."
ctx.fillText(string1,100, 535);

ctx.fillStyle = "#1ed760";
ctx.font = "20px Georgia";
var string2 = " • It will use generative AI to create words that give you the mood, themes, and images that correspond with the playlist you select.";
ctx.fillText(string2,100, 570);

ctx.fillStyle = "#1ed760";
ctx.font = "20px Georgia";
var string3 = " • It will also create a graphic of the most used lyrics in the songs of playlist you choose."
ctx.fillText(string3,100, 605);


ctx.fillStyle = "#1ed760";
ctx.font = "20px Georgia";
ctx.fillText("Website made by: Alex Taylor, Tyler Graber, Colton Mizeur",650, 750);

var Image1 = document.getElementById("Image1");
console.log(Image1.width);
console.log(Image1.height)
    ctx.drawImage(Image1, 0, 0, Image1.width, Image1.height, 50, 20, 96 * 1.5, 72 * 1.5);
    // ctx.drawImage("name", imagex, imagey, width of clipped image, height of clipped image, x, y, width, height)