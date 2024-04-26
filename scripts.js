document.addEventListener("DOMContentLoaded", function () {
    var box = document.querySelector('#main-box');
    var boxLeft = parseInt(getComputedStyle(box).left) || 0; // Get initial left position

    // Listen for keydown event
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            // Move box 10 pixels to the right
            boxLeft += 10;
            box.style.left = boxLeft + "px";
        }
    });
});