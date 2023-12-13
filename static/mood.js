var clicking = function (event) {
    var clickx = event.pageX - canvasx;
    var clicky = event.pageY - canvasy;
    ctx.fillStyle = "black";
    ctx.clearRect(0, 50, 80, 60)
    ctx.font = "15px Arial";
    ctx.fillText("x: " + clickx, 10, 70);
    ctx.fillText("y: " + clicky, 10, 90);
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
var images = mood_images
var Image1 = document.getElementById("Image1");
var Image2 = document.getElementById("Image2");
var Image3 = document.getElementById("Image3");
var Image4 = document.getElementById("Image4");
var Image5 = document.getElementById("Image5");
console.log(images[0])
document.getElementById("Image1").src = images.length > 0 ? images[0] : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
document.getElementById("Image2").src = images.length > 1 ? images[1] : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
document.getElementById("Image3").src = images.length > 2 ? images[2] : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
document.getElementById("Image4").src = images.length > 3 ? images[3] : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
document.getElementById("Image5").src = images.length > 4 ? images[4] : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
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


ctx.fillStyle = "#191414";
ctx.fillRect(0,0,width,height);

ctx.fillStyle = "#1ed760";
ctx.font = "80px Georgia";
ctx.fillText("Playlist Name", width / 2 - ctx.measureText("Playlist Name").width / 2, 100);

rectanglecircle(200, 100, 200, 200, 10, "#1ed760");

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

Image1.onload = function () {
    ctx.drawImage(Image1, 300, 300);
}

Image2.onload = function () {
    ctx.drawImage(Image2, 500, 500);
    }

var pickImage = function (num1) {
    console.log(num1);
    if (num1 == 1) {
        Image1.onload = function () {
        ctx.drawImage(Image1, 300, 300);
        }
    } else if (num1 == 2) {
        Image2.onload = function () {
        ctx.drawImage(Image2, 300, 300);
        }
    } else if (num1 == 3) {
        Image3.onload = function () {
        ctx.drawImage(Image3, 300, 300);
        }
    } else if (num1 == 4) {
        Image4.onload = function () {
        ctx.drawImage(Image4, 300, 300);
        }
    } else if (num1 == 5) {
        Image5.onload = function () {
        ctx.drawImage(Image5, 300, 300);
        }
    }

}
var num1 = 1;
var Ball = function () {

};
Ball.prototype.moving = function (guess) {
    console.log(0)
    if (guess === "ArrowLeft") {
        if (num1 > 1)  {
            num1--;
            pickImage(num1);

        }
    } else if (guess === "ArrowRight") {
        if (num1 < 5)  {
            num1++;
            pickImage(num1);
        }
    }
}
var ball = new Ball();
$("body").keydown(function (event) {
    var whatletteris = event.key;
    console.log("test");
    ball.moving(whatletteris);
});