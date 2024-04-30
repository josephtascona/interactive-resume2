window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", function () {
    var box = document.querySelector('#box');
    var spacebar = document.querySelector('#spacebar');
    var backwardArrowMessage = document.querySelector('#backwardArrowMessage');
    var forwardArrowMessage = document.querySelector('#forwardArrowMessage');
    var backwardArrow1 = document.querySelector('#backwardArrow1');
    var backwardArrow2 = document.querySelector('#backwardArrow2');
    var backwardArrow3 = document.querySelector('#backwardArrow3');
    var forwardArrow1 = document.querySelector('#forwardArrow1');
    var forwardArrow2 = document.querySelector('#forwardArrow2');
    var forwardArrow3 = document.querySelector('#forwardArrow3');
    var forwardInterval;
    var intervalOn = "";
    var pastLocations = [];
    var backwardArrowMessageShown = false;
    var forwardArrowMessageShown = false;

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
    var addedChars = 0;

    backwardArrow1.addEventListener('click', function() {
        backwardArrow1.style.display = "none";
        forwardArrow1.style.display = "block";
        pastLocations[0] = [boxLeft, boxTop];
        boxLeft = 800;
        boxTop = 530
        box.style.left = boxLeft + "px";
        box.style.top = boxTop + "px";
        intervalOn = "";
        backwardArrowMessage.style.display = "none";
        if (!forwardArrowMessageShown) {
            forwardArrowMessage.style.display = "block";
            forwardArrowMessageShown = true;
        }
        window.scrollTo(0,0);
        clearInterval(forwardInterval);
    });

    backwardArrow2.addEventListener('click', function () {
        pastLocations[1] = [boxLeft, boxTop];
        boxLeft = 2105;
        boxTop = 530;
        box.style.left = boxLeft + "px";
        box.style.top = boxTop + "px";
        intervalOn = "";
        window.scrollTo(1550, 0);
        clearInterval(forwardInterval)
    });

    backwardArrow3.addEventListener('click', function () {
        pastLocations[2] = [boxLeft, boxTop];
        boxLeft = 2105;
        boxTop = 1230;
        box.style.left = boxLeft + "px";
        box.style.top = boxTop + "px";
        intervalOn = "";
        window.scrollTo(1550, 700);
        clearInterval(forwardInterval)
    });

    forwardArrow1.addEventListener('click', function() {
        backwardArrow1.style.display = "block";
        forwardArrow1.style.display = "none";
        var currentValues = pastLocations[0];
        boxLeft = currentValues[0];
        boxTop = currentValues[1];
        box.style.left = boxLeft + "px";
        box.style.top = boxTop + "px";
        intervalOn = "";
        forwardArrowMessage.style.display = "none";
        window.scrollTo(1550, 0);
        clearInterval(forwardInterval)
    });

    forwardArrow2.addEventListener('click', function () {
        var currentValues = pastLocations[1];
        boxLeft = currentValues[0];
        boxTop = currentValues[1];
        box.style.left = boxLeft + "px";
        box.style.top = boxTop + "px";
        intervalOn = "";
        window.scrollTo(1550, 700);
        clearInterval(forwardInterval)
    });

    forwardArrow3.addEventListener('click', function () {
        var currentValues = pastLocations[2];
        boxLeft = currentValues[0];
        boxTop = currentValues[1];
        box.style.left = boxLeft + "px";
        box.style.top = boxTop + "px";
        intervalOn = "";
        window.scrollTo(1550, 1400);
        clearInterval(forwardInterval)
    });

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
                // Stop the repeating action when the key is released
                if (intervalOn == "forwardInterval") {
                    clearInterval(forwardInterval);
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
                        if (boxLeft === 2105 && boxTop === 750) {
                            window.scrollTo(1550, 700);
                            pastLocations.push([boxLeft, boxTop])
                            backwardArrow2.style.display = "block";
                            forwardArrow2.style.display = "block";
                        }
                        if (boxLeft === 2105 && boxTop === 1450) {
                            window.scrollTo(1550, 1400);
                            pastLocations.push([boxLeft, boxTop])
                            backwardArrow3.style.display = "block";
                            forwardArrow3.style.display = "block";
                        }
                        if (boxLeft == 1750) {
                            window.scrollTo(1550, 0);
                            if (backwardArrowMessageShown) {
                                backwardArrow1.style.display = "block";
                                forwardArrow1.style.display = "none";
                            }
                        }
                        if (boxLeft == 1820 && !backwardArrowMessageShown) {
                            pastLocations.push([boxLeft, boxTop])
                            backwardArrow1.style.display = "block";
                            backwardArrowMessage.style.display = "block";
                            intervalOn = "";
                            backwardArrowMessageShown = true;
                            clearInterval(forwardInterval);
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
                        if (boxLeft == 1280 && num === 0) {
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
        }
    });
});