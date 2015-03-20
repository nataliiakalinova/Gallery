/**
 * Created by я on 20.03.2015.
 */
// run after page loading
window.onload = init;

function init() {
    // the main tag should have been created
    var gallery = document.getElementById("gallery");
    if (gallery) {

        // for a big image
        var bigImage = document.createElement("div");
        bigImage.id = "big-image";

        // an arrow to left
        var arrowLeft = document.createElement("a");
        arrowLeft.className = "arrow";
        arrowLeft.id = "arrowLeft";
        arrowLeft.innerHTML = "&lt;";
        arrowLeft.href = "#";

        bigImage.appendChild(arrowLeft);

        // a big image tag
        var bigImageContent = document.createElement("img");
        bigImageContent.id = "big-image-content";
        bigImageContent.src = "./images/flowers0.jpg";

        bigImage.appendChild(bigImageContent);

        // an arrow to right
        var arrowRight = document.createElement("a");
        arrowRight.className = "arrow";
        arrowRight.id = "arrowRight";
        arrowRight.innerHTML = "&gt;";
        arrowRight.href = "#";

        bigImage.appendChild(arrowRight);

        // a description
        var description = document.createElement("div");
        description.id = "description";
        description.innerHTML = "hello";
        bigImage.appendChild(description);

        gallery.appendChild(bigImage);

        // a wrapper tag for smaller images
        var wrapper = document.createElement("div");
        wrapper.id = "wrapper";
        wrapper.className = "moving";

        // add 8 images
        var innerDivs = [];
        for (var i = 0; i < 8; i++) {
            innerDivs[i] = document.createElement("div");
            innerDivs[i].className = "image";

            var image = document.createElement("img");
            image.src = "./images/flowers" + i + ".jpg";
            image.className = "img-inner";

            // add an onclick method for setting a big image
            innerDivs[i].onclick = setBigImage;
            innerDivs[i].appendChild(image);
            wrapper.appendChild(innerDivs[i]);


        }
        // finish a document formation
        gallery.appendChild(wrapper);

        // get arrows and set listeners
        var toLeft = document.getElementById("arrowLeft");
        var toRight = document.getElementById("arrowRight");
        toLeft.onclick = moveBoth;
        toRight.onclick = moveBoth;
    }
}

// a method for moving in both sides
function moveBoth() {
    // find a direction,  left = 1, right = 0
    var direction = (this.id.toLowerCase().indexOf("left")==-1)? 1 : 0;

    // get all images
    var wrapper = document.getElementById("wrapper");
    var left = parseInt(wrapper.style.left) || 0;

    // a variable for stopping movement
    var start = left;

    // set a step
    if (direction) {
        var step = -100;
    }
    else {
        step = 100;
    }

    // doing nothing if there are nothing farther
    if ((direction)&&(start<=(-1200))||((!direction)&&(start>=0))) {
        return;
    }

    // actually, move!
    function move() {
        // change left
        left+=step;
        wrapper.style.left = left + 'px';

        // if can not move, just stop
        if (Math.abs(start-left)==200) {
            // add clear interval
            clearInterval(timer);
        }
    }
    // that was set here
    var timer = setInterval(move, 60);
}

function setBigImage () {
    // actually, just copy a src of a small image to the big one
    var bigImageContent = document.getElementById("big-image-content");
    if (bigImageContent) {
        bigImageContent.src = this.children[0].src;
    }

    // and do something with the description
    var descr = document.getElementById("description");
    if (descr) {
        descr.innerHTML = this.children[0].src.split("/")[this.children[0].src.split("/").length-1];
    }

}