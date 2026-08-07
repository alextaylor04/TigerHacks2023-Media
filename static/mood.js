var clicking = function (event) {
    var clickx = event.pageX - canvasx;
    var clicky = event.pageY - canvasy;
    ctx.fillStyle = "black";
    ctx.clearRect(0, 50, 80, 60)
    ctx.font = "15px Arial";
    ctx.fillText("x: " + clickx, 10, 70);
    ctx.fillText("y: " + clicky, 10, 90);
    if (clickx > 134 && clickx < 179 && clicky > 24 && clicky < 61 && page == 4) {
        // link to main
    }
}
$("body").click(clicking);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.screen.width;
var width = canvas.width;
canvas.height = window.screen.height - 161
var height = canvas.height;
var cRect = canvas.getBoundingClientRect();
var canvasx = Math.round(cRect.left)
var canvasy = Math.round(cRect.top)
var images = ["https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg", "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg", "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg", "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg", "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"];
var Image1 = document.getElementById("Image1");
var Image2 = document.getElementById("Image2");
var Image3 = document.getElementById("Image3");
var Image4 = document.getElementById("Image4");
var Image5 = document.getElementById("Image5");


document.addEventListener("DOMContentLoaded", function() {
    // Simulate loading images after generation
    setTimeout(function() { // Replace with actual condition or event when images are ready
        document.getElementById("Image1").src = '/image/img0.png';
        document.getElementById("Image2").src = '/image/img1.png';
        document.getElementById("Image3").src = '/image/img2.png';
        document.getElementById("Image4").src = '/image/img3.png';
        document.getElementById("Image5").src = '/image/img4.png';

        var webloader = 0;
        for (var i = 0; i < 5; i++) {
            var tempImg = document.getElementById("Image" + (i + 1));
            tempImg.onload = function() {
                webloader++
                if (webloader === 5) {
                    runProgram();
                }
            }
        }
    }, 5000); // Adjust the timeout as necessary
});
;
console.log(Image1.width);
console.log(Image1.height)
    // ctx.drawImage("name", imagex, imagey, width of clipped image, height of clipped image, x, y, width, height)
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

var runProgram = function () {
    ctx.fillStyle = "#191414";
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = "#1ed760";
    ctx.font = "80px Georgia";
    ctx.fillText("Playlist Name", width / 2 - ctx.measureText("Playlist Name").width / 2, 100);

    // rectanglecircle(200, 130, 200, 200, 10, "#1ed760");

    ctx.fillStyle = "#1ed760";
    ctx.font = "40px Georgia";
    ctx.fillText("What is the mood of your playlist:", 655, 210);

    rectanglecircle(730, 290, 500, 200, 25, "#1ed760");

    var mood1=moods;

    ctx.fillStyle = "#191414";
    ctx.font = "30px Georgia";
    ctx.fillText( " • " + mood1[0], 800, 350);
    ctx.fillStyle = "#191414";
    ctx.font = "30px Georgia";
    ctx.fillText( " • " + mood1[1], 800, 400);
    ctx.fillStyle = "#191414";
    ctx.font = "30px Georgia";
    ctx.fillText( " • " + mood1[2], 800, 450);
    var desiredSize = 200;
    var imgMulti = desiredSize / Image1.width;
    ctx.drawImage(Image1, 0, 0, Image1.width, Image1.height, 190, 250, Image1.width * imgMulti, Image1.height * imgMulti);
}