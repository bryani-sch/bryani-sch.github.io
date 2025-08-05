// INITIALISATION
const header = document.querySelector("header");
const fullscreenButton = document.querySelector("#fullscreenButton");
const mobileQrCode = document.querySelector("#mobileQrCode");
const background = document.querySelector("#background");
const title = document.querySelector("#title");
const subTitle = document.getElementById("subTitle");
const interactTopicNotice = document.getElementById("interactTopicNotice");
const contentPages = document.querySelectorAll(".contentPage");
const leftImg = document.querySelector('#planetCycle .left img');
const centerImg = document.querySelector('#planetCycle .center img');
const rightImg = document.querySelector('#planetCycle .right img');
const pPlanetInformation = document.getElementById("planetInformation");
const pDistanceFromSun = document.getElementById("planetDistanceFromSun");
const aPlanetWikiLink = document.getElementById("planetHyperlink");
const planetName = document.getElementById("planetName");
//const menuButton = document.getElementById('hamburgerMenuButton');
const minigameSection = document.querySelector('.minigameSection');
const gameButton = document.getElementById('gameButton');
const intensityBar = document.getElementById('intensityBar');
const intensitySlider = document.getElementById('intensity');
const intensityValue = document.getElementById('intensityValue');
const timeDisplay = document.getElementById('time');
const meteorArea = document.getElementById('meteorArea');
const minigameActionBar = document.querySelector('.minigameSection .actionBar');
const totalQuestions = 4;
const allInput = document.querySelectorAll("input[type='radio']");
const quizSection = document.querySelector('.quizSection');
const quizButton = document.getElementById('quizButton');
const scoreDisplay = document.getElementById('score');
const quizActionBar = document.querySelector('.quizSection .actionBar');
const fieldsetDiv = document.getElementById('fieldsetDiv');
const mobileOpenMenuButton = document.getElementById('mobileOpenMenu');

const titleData = [
    { title: 'The Solar System', subTitle: 'The Solar System is made up of the Sun and everything that orbits it, including eight planets, moons, asteroids, and comets.' },
    { title: 'Life Cycle of Stars', subTitle: 'Stars are not eternal. They are born, change over time, and eventually die.' },
    { title: 'Exploration of the Universe', subTitle: 'From landing on the Moon to sending telescopes into deep space, humans have always been curious about what lies beyond our world.' }
];

const planetData = [
    { name: 'Sun', info: 'A massive ball of hot plasma and the center of our solar system. It provides the light and heat necessary for life on Earth.', distanceFromSun: '0 km' },
    { name: 'Mercury', info: 'The smallest planet, closest to the Sun.', distanceFromSun: '58 million km' },
    { name: 'Venus', info: 'Earths “twin” with thick clouds and extreme heat.', distanceFromSun: '108.2 million km' },
    { name: 'Earth', info: 'Our home, the only known planet with life.', distanceFromSun: '149.6 million km' },
    { name: 'Mars', info: 'The Red Planet, with the largest volcano in the solar system.', distanceFromSun: '227.9 million km' },
    { name: 'Jupiter', info: 'The gas giant with a Great Red Spot.', distanceFromSun: '778.5 million km' },
    { name: 'Saturn', info: 'Famous for its stunning rings.', distanceFromSun: '1.434 billion km' },
    { name: 'Uranus', info: 'Icy and tilted sideways.', distanceFromSun: '2.871 billion km' },
    { name: 'Neptune', info: 'Deep blue and windy, farthest from the Sun.', distanceFromSun: '4.495 billion km' }
];

let planetIndex = 0;
let interactTopicNoticeInterval;
let interactTopicNoticeCheckInterval;
let navButtons = Array.from(document.querySelectorAll("header nav button"));
let selectedButton = null;
let timeouts = [];
let hasInteractedWButton = false;
let swapNotice = false;
let gameScore = 0;
let hideBar;
let gameCountdown;
let gameInterval;
let gameStart;
let gameEnd;
let gameDuration = 30000;
let time = gameDuration / 1000;
let temp = 0;
let quizScore = 0;
let state = 'none';
let q1, q2, q3, q4;

// HIDE ALL PAGES
contentPages.forEach(function (page) {
    page.classList.add("hiddenPage");
    console.log("Hidden Page");
});

// STARTUP ANIMATION SEQUENCE DEFINITAION
const animationSequence = [
    {
        delay: 1000,
        action: function () {
            title.classList.add("shineIn");
        }
    },
    {
        delay: 3000,
        action: function () {
            title.classList.remove("shineIn");
            title.classList.add("shineOut");

            title.style.opacity = 0.5;
        }
    },
    {
        delay: 4750,
        action: function () {
            title.classList.remove("shineOut");
            subTitle.classList.add("interactIn");
        }
    }
];

// RUN ANIMATION SEQUENCE
animationSequence.forEach(function (aFunction) {
    const id = setTimeout(aFunction.action, aFunction.delay);
    timeouts.push(id);
});

// CHECK ON FIRST CLICK
function handleFirstInteraction() {
    document.removeEventListener('click', handleFirstInteraction);

    subTitle.classList.add("blurIn");

    setTimeout(function () {
        title.style.opacity = 1;

        title.classList.remove("shineIn", "shineOut");
        subTitle.classList.remove("blurIn", "interactIn");

        header.classList.add("animateIn");
        fullscreenButton.classList.add("animateIn");
        mobileQrCode.classList.add("animateIn");
        background.classList.add("animateIn");
        title.classList.add("animateIn");
        subTitle.classList.add("animateIn");

        timeouts.forEach(clearTimeout);

        const backgroundAudio = document.getElementById('backgroundAudio');
        backgroundAudio.loop = true;
        backgroundAudio.volume = 0.25;

        backgroundAudio.play().catch(function (error) {
            console.error('Playback failed:', error);
        });

        subTitle.innerHTML = "A guide to the Solar System, stellar life cycles, and cosmic discovery";

        setTimeout(function () {
            //const animateInClass = document.querySelectorAll(".animateIn");
            //animateInClass.forEach(function (yes) {
                // if (yes !== header && yes != mobileQrCode) {
                // yes.style.transition = "none";
                // }
            //});
        }, 1500);

    }, 200);


    setTimeout(function () {
        interactTopicNoticeInterval = setInterval(function () {
            if (!hasInteractedWButton || swapNotice) {
                if (interactTopicNotice.classList.contains("blinkIn")) {
                    interactTopicNotice.classList.remove("blinkIn");
                    interactTopicNotice.classList.add("blinkOut");
                }
                else {
                    interactTopicNotice.classList.remove("blinkOut");
                    interactTopicNotice.classList.add("blinkIn");
                }
            }

        }, 1000);

        interactTopicNoticeCheckInterval = setInterval(function () {
            if (hasInteractedWButton) {
                console.log("Cleared Notice");
                interactTopicNotice.classList.remove("blinkOut", "blinkIn");
                interactTopicNotice.classList.add("hide");

                setTimeout(function () {
                    console.log("Swapped Notice");
                    interactTopicNotice.innerHTML = "Scroll down to view";
                    interactTopicNotice.classList.remove("hide");
                    interactTopicNotice.classList.add("blinkIn");
                }, 750);

                setTimeout(function () {
                    swapNotice = true;
                }, 1250);

                clearInterval(interactTopicNoticeCheckInterval);
            }
        }, 10);
    }, 1500);
}

document.addEventListener('click', handleFirstInteraction);

// HEADER PAGE BUTTONS STATES
navButtons.forEach(function (button) {

    // Initial state
    button.classList.add("defaultPage");

    // Hover sate
    button.addEventListener("mouseenter", function () {
        if (button !== selectedButton) {
            button.classList.remove("defaultPage", "dimmedPage");
            button.classList.add("hoveredPage");
        }
    });

    button.addEventListener("mouseleave", function () {
        if (button !== selectedButton) {
            button.classList.remove("hoveredPage");
            if (selectedButton === null) {
                button.classList.add("defaultPage");
            }
            else {
                button.classList.add("dimmedPage");
            }

        }
    });

    // Click to select
    button.addEventListener("click", function () {

        contentPages.forEach(function (page) {
            if (page.classList.contains("hiddenPage") === false) {
                page.classList.toggle("hiddenPage");
            }
        });

        hasInteractedWButton = true;

        // Remove 'selectedPage' from the previous pagse
        if (selectedButton && selectedButton !== button) {
            selectedButton.classList.remove("selectedPage");
            selectedButton.classList.add("dimmedPage");
        }

        // Remove all states from the clicked button
        button.classList.remove("hoveredPage", "defaultPage", "dimmedPage");
        button.classList.add("selectedPage");

        selectedButton = button;
        contentPages[(navButtons.indexOf(selectedButton)) % 3].classList.toggle("hiddenPage");
        //background.style.backgroundImage = "url('images/mobileQr.png')";
        //background.style.filter = 'blur(100px)';
        console.log("Displayed Page " + parseInt((navButtons.indexOf(selectedButton)) % 3 + 1));

        // Change the title
        title.classList.add("blurIn");
        subTitle.classList.add("blurIn");
        title.style.opacity = 0;

        setTimeout(function () {
            title.style.letterSpacing = 'clamp(.1rem, .5vw, 0.4rem)';
            title.style.opacity = 1;
            title.innerHTML = titleData[(navButtons.indexOf(selectedButton)) % 3].title;
            subTitle.innerHTML = titleData[(navButtons.indexOf(selectedButton)) % 3].subTitle;
            title.classList.remove("blurIn");
            subTitle.classList.remove("blurIn");
        }, 200);


        //setTimeout(function() {
        //background.style.filter = 'blur(25px)';
        //background.style.backgroundImage = "url(" + pageUrlData[parseInt(navButtons.indexOf(selectedButton))].url + "')";
        //}, 200)

        // Dim all others except selected one
        navButtons.forEach(function (wow) {
            if (wow !== button) {
                wow.classList.remove("selectedPage", "hoveredPage", "defaultPage");
                wow.classList.add("dimmedPage");
            }
        });

        // Disable the minigame if active
        if (minigameActionBar.classList.contains('expanded')) {
            startGame();
        }
    });
});

// PLANET CYCLE
function fadeSwapImage(imgElement, newImgIndex) {
    if (imgElement === centerImg) {
        imgElement.style.filter = 'blur(100px)';
    }
    else {
        imgElement.style.filter = 'blur(50px)';
    }

    imgElement.classList.add("hide");

    // Wait for the fade out to finish
    setTimeout(function () {
        imgElement.src = "images/" + planetData[newImgIndex].name + ".png";
        imgElement.alt = imgElement.title = planetData[newImgIndex].name;

        imgElement.classList.remove("hide");
        if (imgElement === centerImg) {
            planetName.innerHTML = planetData[newImgIndex].name;
            pPlanetInformation.innerHTML = planetData[newImgIndex].info;
            pDistanceFromSun.innerHTML = `${planetData[newImgIndex].distanceFromSun} from the Sun`;
            aPlanetWikiLink.innerHTML = `More about ${planetData[newImgIndex].name}`;
            aPlanetWikiLink.href = `https://en.wikipedia.org/wiki/${planetData[newImgIndex].name}`;
            imgElement.style.filter = 'blur(0px)';
        }
        else {
            imgElement.style.filter = 'blur(5px)';
        }
    }, 500);
}

// MAIN PLANET CYCLING FUNCTION
function updateCarousel() {
    const total = planetData.length;
    const prev = (planetIndex - 1 + total) % total;
    const next = (planetIndex + 1) % total;

    fadeSwapImage(leftImg, prev);
    fadeSwapImage(centerImg, planetIndex);
    fadeSwapImage(rightImg, next);

    console.log("Switch Planet");
}

document.getElementById('planetCycleLeft').addEventListener('click', function () {
    planetIndex = (planetIndex - 1 + planetData.length) % planetData.length;
    updateCarousel();
});

document.getElementById('planetCycleRight').addEventListener('click', function () {
    planetIndex = (planetIndex + 1) % planetData.length;
    updateCarousel();
});

updateCarousel();

//menuButton.addEventListener('click', function () {
//mobileHeader.classList.toggle("openMenu");
//})

// FULLSCEREN MODE
let fullscreenMode = false;

function enterFullscreen() { //must be called by user generated event
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

fullscreenButton.addEventListener("click", function () {
    if (fullscreenMode === false) {
        fullscreenMode = true;
        console.log("Fullscreen Enabled");
        enterFullscreen();
    }
    else {
        fullscreenMode = false;
        console.log("Fullscreen Disabled");
        exitFullscreen();
    }
});

// METEOR INTENSITY SLIDER
intensitySlider.addEventListener('input', function() {
    intensityValue.innerHTML = intensitySlider.value;
});

// CREATE METEORS FALLING RANDOMLY
function createMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');

    const startX = Math.floor(Math.random() * (meteorArea.clientWidth - 400));
    const endX = startX + Math.floor(Math.random() * 100 + 450); // diagonal
    const meteorSize = Math.floor(Math.random() * 220 + 30);
    //const meteorSpeed = Math.floor(Math.random() * 2 + 0.5);
    const meteorSpeed = 2.5 - ((meteorSize / 250) * 2); // so that its relative to the size
    const meteorOpacity = ((meteorSize / 250) * 0.9) + 0.1;
    const meteorBlur = 2 - ((meteorSize / 250) * 3);

    meteor.style.setProperty('--startX', `${startX}px`);
    meteor.style.setProperty('--endX', `${endX}px`);
    meteor.style.setProperty('--meteorSize', `${meteorSize}px`);
    meteor.style.setProperty('--meteorSpeed', `${meteorSpeed}s`);
    meteor.style.setProperty('--meteorOpacity', `${meteorOpacity}`);

    if (meteorBlur < 0) {
        meteor.style.setProperty('--meteorBlur', `${0}px`);
    }
    else {
        meteor.style.setProperty('--meteorBlur', `${meteorBlur}px`);
    }

    meteor.addEventListener('animationend', function() {
        meteor.remove();
    });

    meteorArea.appendChild(meteor);
}

// EVENT DELEGATION PART
meteorArea.addEventListener('click', function(e) {
  if (e.target.classList.contains('meteor')) {
    gameScore++;
    e.target.remove();
  }
});

// MINIGAME STARTUP FUNCTION
function startGame() {
    if (!minigameActionBar.classList.contains('expanded')) {
        minigameActionBar.classList.add('expanded');
        minigameSection.classList.add('expanded');
        gameButton.classList.add('blurIn');

        setTimeout(function(){
            gameButton.innerHTML = 'Reset Game';
            gameButton.classList.remove('blurIn');
        }, 200);

        hideBar = setTimeout(function(){
            intensityBar.classList.add('hide');
        }, 500);
        
        gameStart = setTimeout(function(){ // start the game
            time = gameDuration / 1000;
            gameScore = 0;
            timeDisplay.textContent = `Time: ${time}`;

            gameInterval = setInterval(createMeteor, (Math.random() * 350 + 150) / intensitySlider.value);
            gameCountdown = setInterval(function(){
                time -= 1;
                timeDisplay.textContent = `Time: ${time}`;
            }, 1000);

            gameEnd = setTimeout(function() {
                clearInterval(gameInterval);
                clearInterval(gameCountdown);
                timeDisplay.innerHTML = `Score: ${gameScore}`;
                //alert(`Time's up! Final score: ${score}`);
            }, gameDuration);
        }, 1000);
        
    }

    else {
        minigameActionBar.classList.remove('expanded');
        minigameSection.classList.remove('expanded');
        void minigameActionBar.offsetWidth; // told by gpt to add so animations reset
        gameButton.innerHTML = 'Start Game';

        clearTimeout(hideBar);
        clearTimeout(gameStart);
        clearTimeout(gameEnd);
        clearInterval(gameInterval);
        clearInterval(gameCountdown);

        if (intensityBar.classList.contains('hide')){
            intensityBar.classList.remove('hide');
        }
        time = gameDuration / 1000;
        timeDisplay.textContent = `Time: ${time}`;
        gameScore = 0;
    }
    
    
}

gameButton.addEventListener('click', startGame);


// QUIZ STARTUP FUNCTION
function startQuiz() {
    if (state === 'none') { // none state
        allInput.forEach(function(yes) {
            yes.checked = false;
        });

        state = 'start';

        quizActionBar.classList.add('expanded');
        fieldsetDiv.classList.add('expanded');
        quizSection.classList.add('expanded');
        quizButton.classList.add('blurIn');

        setTimeout(function(){
            quizButton.innerHTML = 'Submit Quiz';
            quizButton.classList.remove('blurIn');
        }, 200);
        
    }

    else if (state === 'start') { // start state
        temp = 0;
        allInput.forEach(function(yes) {
            if (yes.checked === true) {
                temp++;
            }
        });

        if (temp === totalQuestions) {
            quizButton.classList.add('blurIn');

            setTimeout(function(){
                quizButton.innerHTML = 'Reset Quiz';
                quizButton.classList.remove('blurIn');
            }, 200);

            q1 = document.querySelector("input[name='q1']:checked").value;
            if (q1 == 1) {
                quizScore++;
            }

            q2 = document.querySelector("input[name='q2']:checked").value;
            if (q2 == 3) {
                quizScore++;
            }

            q3 = document.querySelector("input[name='q3']:checked").value;
            if (q3 == 1) {
                quizScore++;
            }

            q4 = document.querySelector("input[name='q4']:checked").value;
            if (q4 == 4) {
                quizScore++;
            }

            scoreDisplay.innerHTML = `Score: ${quizScore}`;

            state = 'submit';
        }
        else {
            alert("Please complete the quiz first"); // if quiz not completed
        }
    }

    else { // submit state
        quizActionBar.classList.remove('expanded');
        fieldsetDiv.classList.remove('expanded');
        quizSection.classList.remove('expanded');
        void quizActionBar.offsetWidth; // told by gpt to add so animations reset
        quizButton.innerHTML = 'Start Quiz';

        scoreDisplay.textContent = `Score: -`;
        quizScore = 0;

        state = 'none';
    }
    

}

quizButton.addEventListener('click', startQuiz);

// MOBILE MENU BUTTON
function openMobileMenu() {
    if (!header.classList.contains('expanded')) {
        header.classList.add('expanded');

        mobileOpenMenuButton.classList.add('blurIn');

        setTimeout(function(){
            mobileOpenMenuButton.innerHTML = 'Close Menu';
            mobileOpenMenuButton.classList.remove('blurIn');
        }, 200);
    }
    else {
        header.classList.remove('expanded');
        
        mobileOpenMenuButton.classList.add('blurIn');

        setTimeout(function(){
            mobileOpenMenuButton.innerHTML = 'Open Menu';
            mobileOpenMenuButton.classList.remove('blurIn');
        }, 200);
    }
}

mobileOpenMenuButton.addEventListener('click', openMobileMenu);