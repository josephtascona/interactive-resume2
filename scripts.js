window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", function () {
    var box = document.querySelector('#box');
    var spacebar = document.querySelector('#spacebar');
    var backwards = document.querySelector('#backwards');
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
    let j = 0;
    var title = ["About", "Education"];
    var text = ["Lorem ipsum dolor sit amet consectetur adipisicing elit.\nMinus magni aut, ea soluta corrupti, ex sint nemo veritatis repellendus veniam facilis ipsum fuga, neque eaque autem minima ratione!\nAliquid, id?", "Bachelor of Science in Mathematics and Physics, 2026\nUniversity of Toronto, Toronto, Ontario"];
    var typingDiv;
    var paused = false;
    var backwardsShown = false;
    var addedChars = 0;

    function progressBar() {
        var progressInterval = setInterval(function () {
            var progressElement = document.querySelector("#progress-bar p");
            progressElement.innerHTML = Math.round((((boxLeft-300)/(3205-300) + (boxTop-530)/(2080-530))/2)*100) + "%"
        }, 35); // Adjust interval as needed
    }
    progressBar();

    function startTypingText() {
        var textTypingInterval = setInterval(function () {
            if (num !== -1) {
                if (typingDiv.innerHTML.length !== (text[num].length + addedChars)) {
                    if (text[num].charAt(i) === '\n') {
                        typingDiv.innerHTML += '<br><br>'; // Insert two line breaks
                        addedChars += 7;
                    } else {
                        typingDiv.innerHTML += text[num].charAt(i);
                    }
                    i++;
                } else {
                    i = 0;
                    addedChars = 0;
                    paused = false;
                    intervalOn = "";
                    spacebar.style.display = "block";
                    clearInterval(textTypingInterval);
                }
            }
        }, 35); // Adjust interval as needed
    }

    function startTypingTitle() {
        var titleTypingInterval = setInterval(function () {
            if (num !== -1) {
                if (typingH1.innerHTML !== title[num]) {
                    if (j < title[num].length) {
                        typingH1.innerHTML += title[num].charAt(j);
                        j++;
                    }
                } else {
                    j = 0;
                    clearInterval(titleTypingInterval);
                }
            }
        }, 35); // Adjust interval as needed
    }

    // Listen for keydown event
    document.addEventListener("keydown", function (event) {
        if (!paused) {
            if (event.key === "s") {
                spacebar.style.display = "none";
                backwards.style.display = "none";
                // Stop the repeating action when the key is released
                if (intervalOn == "forwardInterval" || intervalOn == "backwardInterval") {
                    clearInterval(forwardInterval);
                    clearInterval(backwardInterval);
                    intervalOn = "";
                } else {
                    intervalOn = "forwardInterval";
                    forwardInterval = setInterval(function () {
                        if (boxLeft < 3205) {
                            if (boxLeft < 2105 && boxTop === 530) {
                                // Move the box 5 pixels to the right
                                boxLeft += 5;
                                box.style.left = boxLeft + "px";
                            } else if (boxLeft === 2105 && boxTop < 2080) {
                                boxTop += 5;
                                box.style.top = boxTop + "px";
                            } else {
                                boxLeft += 5;
                                box.style.left = boxLeft + "px";
                            }
                        }
                        if (boxLeft === 2105 && boxTop === 800) {
                            window.scrollTo(1550, 700);
                        }
                        if (boxLeft === 2105 && boxTop === 1500) {
                            window.scrollTo(1550, 1400);
                        }
                        if (boxLeft == 1750) {
                            window.scrollTo(1550, 0);
                        }
                        if (boxLeft == 1820) {
                            if (!backwardsShown) {
                                backwards.style.display = "block";
                                intervalOn = "";
                                backwardsShown = true;
                                clearInterval(forwardInterval);
                            }
                        }
                        if (boxLeft == 700 && num === -1) {
                            num += 1;
                            typingDiv = document.getElementById('typing-effect' + num);
                            typingH1 = document.getElementById('title' + num);
                            paused = true;
                            startTypingText();
                            startTypingTitle();
                            clearInterval(forwardInterval);
                        }
                        if (boxLeft == 1220 && num === 0) {
                            num += 1;
                            typingDiv = document.getElementById('typing-effect' + num);
                            typingH1 = document.getElementById('title' + num);
                            paused = true;
                            startTypingText();
                            startTypingTitle();
                            clearInterval(forwardInterval);
                        }
                    }, 35);
                }
            }

            if (event.key === "a") {
                spacebar.style.display = "none";
                backwards.style.display = "none";
                clearInterval(forwardInterval);
                clearInterval(backwardInterval);
                intervalOn = "backwardInterval";
                if (boxLeft > 300) {
                    if (boxLeft <= 2105 && boxTop === 530) {
                        // Move the box 5 pixels to the right
                        boxLeft -= 5;
                        box.style.left = boxLeft + "px";
                    } else if (boxLeft === 2105 && boxTop <= 2080) {
                        boxTop -= 5;
                        box.style.top = boxTop + "px";
                    } else {
                        boxLeft -= 5;
                        box.style.left = boxLeft + "px";
                    }
                }
                if (boxLeft === 2105 && boxTop === 800) {
                    window.scrollTo(1550, 0);
                }
                if (boxLeft === 2105 && boxTop === 1500) {
                    window.scrollTo(1550, 700);
                }
                if (boxLeft == 1750) {
                    window.scrollTo(0, 0);
                }
            }
        }
    });

    document.addEventListener("keyup", function (event) {
        if (!paused) {
            if (event.key === "a") {
                // Start a timer to repeat the action every 35 milliseconds
                backwardInterval = setInterval(function () {
                    if (boxLeft > 300) {
                        if (boxLeft <= 2105 && boxTop === 530) {
                            // Move the box 5 pixels to the right
                            boxLeft -= 5;
                            box.style.left = boxLeft + "px";
                        } else if (boxLeft === 2105 && boxTop <= 2080) {
                            boxTop -= 5;
                            box.style.top = boxTop + "px";
                        } else {
                            boxLeft -= 5;
                            box.style.left = boxLeft + "px";
                        }
                    }
                    if (boxLeft == 300) {
                        intervalOn = "";
                        clearInterval(backwardInterval);
                    }
                    if (boxLeft === 2105 && boxTop === 800) {
                        window.scrollTo(1550, 0);
                    }
                    if (boxLeft === 2105 && boxTop === 1500) {
                        window.scrollTo(1550, 700);
                    }
                    if (boxLeft == 1750) {
                        window.scrollTo(0, 0);
                    }
                }, 35);
            }
        }
    });
});