window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", function () {
    var box = document.querySelector('#box');
    var forwardInterval;
    var backwardInterval;
    var intervalOn = "";

    // Get the computed style of the box
    var boxStyle = getComputedStyle(box);
    // Parse the left position as an integer
    var boxLeft = parseInt(boxStyle.left) || 0;
    var boxTop = parseInt(boxStyle.top) || 0;

    let num = -1;
    let i = 0;
    var text = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus magni aut, ea soluta corrupti, ex sint nemo veritatis repellendus veniam facilis ipsum fuga, neque eaque autem minima ratione! Aliquid, id?", ""];
    var typingDiv;

    // Listen for keydown event
    document.addEventListener("keydown", function (event) {
        if (event.key === "d") {
            if (intervalOn === "forwardInterval") {
                clearInterval(forwardInterval);
            } else if (intervalOn === "backwardInterval") {
                clearInterval(backwardInterval);
            }
            intervalOn = "forwardInterval";
            if (boxLeft < 2105 && boxTop === 530) {
                // Move the box 5 pixels to the right
                boxLeft += 5;
                box.style.left = boxLeft + "px";
            } else if (boxLeft === 2105 && boxTop < 2150) {
                boxTop += 5;
                box.style.top = boxTop + "px";
            }
            if (boxLeft === 2105 && boxTop === 800) {
                window.scrollTo(1550, 700);
            }
            if (boxLeft == 1750) {
                window.scrollTo(1550, 0);
            }
            if (boxLeft == 375) {
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
        
        if (event.key === "s") {
            // Stop the repeating action when the key is released
            if (intervalOn === "forwardInterval") {
                clearInterval(forwardInterval);
                intervalOn = "";
            } else if (intervalOn === "backwardInterval") {
                clearInterval(backwardInterval);
                intervalOn = "";
            } else {
                intervalOn = "forwardInterval";
                forwardInterval = setInterval(function () {
                    if (boxLeft < 2105 && boxTop === 530) {
                        // Move the box 5 pixels to the right
                        boxLeft += 5;
                        box.style.left = boxLeft + "px";
                    } else if (boxLeft === 2105 && boxTop < 2150) {
                        boxTop += 5;
                        box.style.top = boxTop + "px";
                    }
                    if (boxLeft === 2105 && boxTop === 800) {
                        window.scrollTo(1550, 700);
                    }
                    if (boxLeft == 1750) {
                        window.scrollTo(1550, 0);
                    }
                    if (boxLeft == 375) {
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
        }
        
        if (event.key == "a") {
            if (intervalOn === "forwardInterval") {
                clearInterval(forwardInterval);
            } else if (intervalOn === "backwardInterval") {
                clearInterval(backwardInterval);
            }
            intervalOn = "backwardInterval";
            if (boxLeft >= 305) {
                if (boxLeft <= 2105 && boxTop === 530) {
                    // Move the box 5 pixels to the right
                    boxLeft -= 5;
                    box.style.left = boxLeft + "px";
                } else if (boxLeft === 2105 && boxTop < 2150) {
                    boxTop -= 5;
                    box.style.top = boxTop + "px";
                }
            }
            if (boxLeft === 2105 && boxTop === 800) {
                window.scrollTo(1550, 0);
            }
            if (boxLeft == 1750) {
                window.scrollTo(0, 0);
            }
            if (boxLeft == 375) {
                num -= 1
            }
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.key === "d") {
            // Start a timer to repeat the action every 35 milliseconds
            forwardInterval = setInterval(function () {
                if (boxLeft < 2105 && boxTop === 530) {
                    // Move the box 5 pixels to the right
                    boxLeft += 5;
                    box.style.left = boxLeft + "px";
                } else if (boxLeft === 2105 && boxTop < 2150) {
                    boxTop += 5;
                    box.style.top = boxTop + "px";
                }
                if (boxLeft == 1750) {
                    window.scrollTo(1550, 0);
                }
                if (boxLeft === 2105 && boxTop === 800) {
                    window.scrollTo(1550, 700);
                }
                if (boxLeft == 375) {
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
        
        if (event.key === "a") {
            // Start a timer to repeat the action every 35 milliseconds
            backwardInterval = setInterval(function () {
                if (boxLeft >= 305) {
                    if (boxLeft <= 2105 && boxTop === 530) {
                        // Move the box 5 pixels to the right
                        boxLeft -= 5;
                        box.style.left = boxLeft + "px";
                    } else if (boxLeft === 2105 && boxTop < 2150) {
                        boxTop -= 5;
                        box.style.top = boxTop + "px";
                    }
                }
                if (boxLeft === 2105 && boxTop === 800) {
                    window.scrollTo(1550, 0);
                }
                if (boxLeft == 1750) {
                    window.scrollTo(0, 0);
                }
                if (boxLeft == 375) {
                    num -= 1
                }
            }, 35);
        }
    });
});