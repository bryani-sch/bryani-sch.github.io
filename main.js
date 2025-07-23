const header = document.querySelector("header");
const background = document.querySelector("#background");
const backgroundh2 = document.querySelector("#background h2");
const backgroundp = document.getElementById("subTitle");
const interactTopicNotice = document.getElementById("interactTopicNotice");
const contentPages = document.querySelectorAll(".contentPage");

let interactTopicNoticeInterval;
let interactTopicNoticeCheckInterval;
let timeouts = [];
let hasInteractedWButton = false;
let swapNotice = false;

contentPages.forEach(function(page) {
    page.classList.add("hiddenPage");
    console.log("Hidden Page");
})

// Sequence definition
const animationSequence = [
    {
        delay: 1000,
        action: function() {
            backgroundh2.classList.add("shineIn")
        }
    },
    {
        delay: 3000,
        action: function() {
            backgroundh2.classList.remove("shineIn");
            backgroundh2.classList.add("shineOut");

            backgroundh2.style.opacity = 0.5;
        }
    },
    {
        delay: 4750,
        action: function() {
            backgroundh2.classList.remove("shineOut");
            backgroundp.classList.add("interactIn");
        }
    }
];

// run sequence
animationSequence.forEach(function(aFunction){
    const id = setTimeout(aFunction.action, aFunction.delay);
    timeouts.push(id);
});


function handleFirstInteraction() {
    document.removeEventListener('click', handleFirstInteraction);

    backgroundp.classList.add("blurIn");

    setTimeout(function () {
        backgroundh2.style.opacity = 1;

        backgroundh2.classList.remove("shineIn", "shineOut");
        backgroundp.classList.remove("blurIn", "interactIn");

        header.classList.add("animateIn");
        background.classList.add("animateIn");
        backgroundh2.classList.add("animateIn");
        backgroundp.classList.add("animateIn");

        timeouts.forEach(clearTimeout);

        const backgroundAudio = document.getElementById('backgroundAudio');
        backgroundAudio.loop = true;
        backgroundAudio.volume = 0.25;

        backgroundAudio.play().catch(error => {
            console.error('Playback failed:', error);
        });

        backgroundp.innerHTML = "A guide to the Solar System, stellar life cycles, and cosmic discovery";

        setTimeout(function() {
            const animateInClass = document.querySelectorAll(".animateIn");
            animateInClass.forEach(el => (el.style.transition = "none"));
        }, 1500);

    }, 200);

    
    setTimeout(function() {
        interactTopicNoticeInterval = setInterval(function() {
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
            
        }, 1000)

        interactTopicNoticeCheckInterval = setInterval(function() {
            if (hasInteractedWButton) {
                console.log("Cleared Notice");
                interactTopicNotice.classList.remove("blinkOut", "blinkIn");
                interactTopicNotice.classList.add("hide");

                setTimeout(function() {
                    console.log("Swapped Notice");
                    interactTopicNotice.innerHTML = "Scroll down to view";
                    interactTopicNotice.classList.remove("hide");
                    interactTopicNotice.classList.add("blinkIn");
                }, 750);

                setTimeout(function() {
                    swapNotice = true;
                }, 1250);

                clearInterval(interactTopicNoticeCheckInterval);
            }
        }, 10);
    }, 1500)
}

// Listen for first interaction wth page
document.addEventListener('click', handleFirstInteraction);


const navButtons = Array.from(document.querySelectorAll("header nav button"));
let selectedButton = null;

navButtons.forEach(function(button) {
    // Initial state
    button.classList.add("defaultPage");

    // Hover sate
    button.addEventListener("mouseenter", function() {
        if (button !== selectedButton) {
            button.classList.remove("defaultPage", "dimmedPage");
            button.classList.add("hoveredPage");
        }
    });

    button.addEventListener("mouseleave", function() {
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
    button.addEventListener("click", function() {

        contentPages.forEach(function(page) {
            if (page.classList.contains("hiddenPage") === false) {
                page.classList.toggle("hiddenPage");
            }
        })

        hasInteractedWButton = true;
        
        // Remove 'selectedPage' from the previous
        if (selectedButton && selectedButton !== button) {
            selectedButton.classList.remove("selectedPage");
            selectedButton.classList.add("dimmedPage");
        }

        // Remove any hover/default/dimmed from the clicked button
        button.classList.remove("hoveredPage", "defaultPage", "dimmedPage");
        button.classList.add("selectedPage");

        selectedButton = button;
        contentPages[navButtons.indexOf(selectedButton)].classList.toggle("hiddenPage");
        console.log("Displayed Page " + parseInt(navButtons.indexOf(selectedButton) + 1));

        // Dim all others except selected one
        navButtons.forEach(function(wow) {
            if (wow !== button) {
                wow.classList.remove("selectedPage", "hoveredPage", "defaultPage");
                wow.classList.add("dimmedPage");
            }
        });
    });
});

const planetData = [
  { name: 'sun', distanceFromSun: '0 km' },
  { name: 'mercury', distanceFromSun: '58 million km' },
  { name: 'venus', distanceFromSun: '108.2 million km' },
  { name: 'earth', distanceFromSun: '149.6 million km' },
  { name: 'mars', distanceFromSun: '227.9 million km' },
  { name: 'jupiter', distanceFromSun: '778.5 million km' },
  { name: 'saturn', distanceFromSun: '1.434 billion km' },
  { name: 'uranus', distanceFromSun: '2.871 billion km' },
  { name: 'neptune', distanceFromSun: '4.495 billion km'}
];

const leftImg = document.querySelector('#planetCycle .left img');
const centerImg = document.querySelector('#planetCycle .center img');
const rightImg = document.querySelector('#planetCycle .right img');
const planetCycle = document.getElementById('planetCycle');
const pDistanceFromSun = document.getElementById("distanceFromSun");
const planetName = document.getElementById("planetName");

let currentIndex = 0;

function fadeSwapImage(imgElement, newImgIndex) {
    if (imgElement === centerImg) {
        imgElement.style.filter = 'blur(100px)';
    }
    else {
        imgElement.style.filter = 'blur(50px)';
    }

    imgElement.classList.add("hide");
    
    // Wait for the fade out to finish
    setTimeout(function() {
        imgElement.src = "images/"+planetData[newImgIndex].name+".png";
        imgElement.alt = imgElement.title = planetData[newImgIndex].name;

        imgElement.classList.remove("hide");
        if (imgElement === centerImg) {
            planetName.innerHTML = planetData[newImgIndex].name;
            pDistanceFromSun.innerHTML = `${planetData[newImgIndex].distanceFromSun} from the Sun`;
            imgElement.style.filter = 'blur(0px)';
        }
        else {
            imgElement.style.filter = 'blur(5px)';
        }
    }, 500);
}

function updateCarousel() {
    const total = planetData.length;
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;

    fadeSwapImage(leftImg, prev);
    fadeSwapImage(centerImg, currentIndex);
    fadeSwapImage(rightImg, next);

    console.log("Switch Planet");
}

document.getElementById('planetCycleLeft').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + planetData.length) % planetData.length;
    updateCarousel();
});

document.getElementById('planetCycleRight').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % planetData.length;
    updateCarousel();
});

updateCarousel();




