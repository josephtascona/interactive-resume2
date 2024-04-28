document.addEventListener("DOMContentLoaded", function () {
    var box = document.querySelector('#box');
    var intervalId;

    // Get the computed style of the box
    var boxStyle = getComputedStyle(box);
    // Parse the left position as an integer
    var boxLeft = parseInt(boxStyle.left) || 0;

    let num = -1;
    let i = 0;
    var text = ["This is a typing effect example.", ""];
    var typingDiv;

    // Listen for keydown event
    document.addEventListener("keydown", function (event) {
        clearInterval(intervalId)
        if (event.key === "ArrowUp") {
            // Move the box 5 pixels to the right
            boxLeft += 5;
            box.style.left = boxLeft + "px";
            if (boxLeft == 1750) {
                window.scrollTo(1550, window.scrollY);
            }
            if (boxLeft == 500) {
                num += 1
                typingDiv = document.getElementById('typing-effect' + num);
            }
            if (num != -1) {
                if (typingDiv.innerHTML != text[num]) {
                    if (i < text[num].length) {
                        typingDiv.innerHTML += text[num].charAt(i);
                        i++;
                    }
                } else {
                    i = 0
                }
        }
        } 
        
        if (event.key === " ") {
            // Stop the repeating action when the key is released
            clearInterval(intervalId);
        } 
        
        if (event.key == "ArrowDown") {
            if (boxLeft >= 305) {
                boxLeft -= 5;
                box.style.left = boxLeft + "px";
            }
            if (boxLeft == 1750) {
                window.scrollTo(0, window.scrollY);
            }
            if (boxLeft == 500) {
                num -= 1
            }
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.key === "ArrowUp") {
            // Start a timer to repeat the action every 35 milliseconds
            intervalId = setInterval(function () {
                boxLeft += 5;
                box.style.left = boxLeft + "px";
                if (boxLeft == 1750) {
                    window.scrollTo(1550, window.scrollY);
                }
                if (boxLeft == 500) {
                    num += 1
                    typingDiv = document.getElementById('typing-effect' + num);
                }
                if (num != -1) {
                    if (typingDiv.innerHTML != text[num]) {
                        if (i < text[num].length) {
                            typingDiv.innerHTML += text[num].charAt(i);
                            i++;
                        }
                    } else {
                        i = 0
                    }
                }
            }, 35);
        } 
        
        if (event.key === "ArrowDown") {
            // Start a timer to repeat the action every 35 milliseconds
            intervalId = setInterval(function () {
                if (boxLeft >= 305) {
                    boxLeft -= 5;
                    box.style.left = boxLeft + "px";
                }
                if (boxLeft == 1750) {
                    window.scrollTo(0, window.scrollY);
                }
                if (boxLeft == 500) {
                    num -= 1
                }
            }, 35);
        }
    });
});