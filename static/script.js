var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var playlist = playlist_names;
var canvasupdate = function (canwidth, canheight) {
    canvas.width = window.screen.width - canwidth;
    if (canheight != -1) {
    canvas.height = window.screen.height - canheight;
    } else {
    canvas.height = 1200 + (playlist.length - 2) * 200;
    }
}

// canvasupdate(25, -1); //     (!) (!)      Colton use:  canvasupdate(0, -1);   (!) (!)
// canvasupdate(0, 161);
var width = canvas.width;
var height = canvas.height;
var cRect = canvas.getBoundingClientRect();
var canvasx = Math.round(cRect.left)
var canvasy = Math.round(cRect.top)
var songnum = [45, 25];
var page = 1;
var currentplaylist = 0;
var playlength = playlist.length;

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


    // ctx.drawImage("name", imagex, imagey, width of clipped image, height of clipped image, x, y, width, height)
var choosebox = function (x, y, choosevar) {
    ctx.font = "20px Arial";
    rectanglecircle(x + 450, y + 45, 150, 50, 5, "grey");
    if (choosevar == 1) {
        rectanglecircle(x + 454, y + 49, 142, 42, 5, " #b3b3b3");
    } else {
        rectanglecircle(x + 454, y + 49, 142, 42, 5, "lightgrey");
    }
    ctx.fillStyle = "black"
    ctx.fillText("Choose", x + 485, y + 80);
    ctx.font = "15px Arial";
}
var playlistbox = function (x, y, width, height, num) {
    rectanglecircle(x, y, width, height, 5, "grey");
    rectanglecircle(x + 5, y + 5, width - 10, height - 10, 5, "darkgrey");
    ctx.fillStyle = "black";
    ctx.font = "25px Arial";
    ctx.fillText(playlist[num], x + 80, y + 48);
    ctx.font = "20px Arial";
    ctx.fillText("Number of Songs: " + songnum[num], x + 20, y + 100);
    ctx.fillStyle = "grey";
    ctx.fillRect(x + 13, y + 15 - 2, 54, 54);
    choosebox(x, y, 0);
}
var pagerunner = function () {
    canvasupdate(25, -1)
    if (page == 1) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "darkblue";
    circle(200, 1000 + (playlength - 2) * 200, 20, true)
    ctx.fillStyle = "blue";
    circle(200, 1000 + (playlength - 2) * 200, 14, true)
    ctx.fillText("Enter What we do here", 250, 1005);
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Hello ", width / 2 - 50, 80);
    var username = "FavoriteCursor"
    ctx.fillText(username, width / 2 - ctx.measureText(username).width / 2, 150)
    for (var i = 0; i < playlength; i++) {
    playlistbox((width - 700) / 2, 300 + i * 200, 700, 150, i);
    }
    document.getElementById("Image1").src = "https://image.shutterstock.com/image-photo/skeptic-surprised-cat-thinking-dont-260nw-1905929728.jpg";
    var Image1 = document.getElementById("Image1");
    Image1.onload = function() {
        ctx.drawImage(Image1, 0, 0, Image1.width, Image1.height, (width - 700) / 2 + 15, 315, 50, 50) 
        ctx.drawImage(Image1, 0, 0, Image1.width, Image1.height, (width - 700) / 2 + 15, 515, 50, 50)
    }
    }
}
pagerunner();
    var clicking = function (event) {
        var clickx = event.pageX - canvasx;
        var clicky = event.pageY - canvasy;
        if (clickx >= 0 && clicky < 1000) {
        ctx.fillStyle = "black";
        ctx.clearRect(0, 50, 80, 60)
        ctx.font = "15px Arial";
        ctx.fillText("x: " + clickx, 10, 70);
        ctx.fillText("y: " + clicky, 10, 90);
        }
        for (var i = 0; i < 2; i++) {
            var checkx = (width - 700) / 2 + 450 - 5;
            var checky = 345 + i * 200;
            if (clickx > checkx && clicky > checky && clickx < (checkx + 160) && clicky < (checky + 60)) {
                currentplaylist = i;
            }
        }
        if (clickx > 0 && clickx < 100) {
            // window.location.href = "http://www.w3schools.com";
        }
    }
    $("body").click(clicking);
    console.log("width: "+  width);
    document.onmousemove = function(event) {
        var pointerX = event.pageX - canvasx
        var pointerY = event.pageY - canvasy
        for (var i = 0; i < 2; i++) {
            var checkx = (width - 700) / 2 + 450 - 5;
            var checky = 345 + i * 200;
            if (pointerX > checkx && pointerY > checky && pointerX < (checkx + 160) && pointerY < (checky + 60)) {
                choosebox((width - 700) / 2, 300 + i * 200, 1);
            } else {
                choosebox((width - 700) / 2, 300 + i * 200, 0);
            }
        }
    }