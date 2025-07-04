/**
 * File: main.js
 * This file contains all of the javascript for displaying the ww2 map with animations, movement, display and sound queues. 
 * 
 *
 * 
 * Authors: Carl-Henrik Ytterfelt Martinsson, Hans-Eskil Ytterfelt Martinsson, Markus Eriksson
 * 
 * Requires the following files:
 * battles.js
 * en.JSON
 * sv.JSON
 * 
 */

import { battleDescriptions } from './battles.js';

// Waits before the entire html is loaded completely before operating.

document.addEventListener("DOMContentLoaded", () => {
  // Retrieves the SVG maps map and original viewbox(for reverting zooming)
  const svg = document.getElementById("map");
  const originalViewBox = svg.getAttribute("viewBox");
  // Retrieves the infopanel and spriteanim
  const infoPanel = document.getElementById("infoPanel");
  const spriteanim = document.getElementById("spriteanim");
  
  
  // Bool for toggling of languages in infopanel, since page begins with english then start as true, if one clicks on swedish change to false, if change back to english set true
  // If more languages are to be added then change of bool to other medium of check is needed.
  let isEnglish = true;
document.querySelector('[data-lang="en"]').addEventListener('click', () => {
  isEnglish = true;
});

document.querySelector('[data-lang="sv"]').addEventListener('click', () => {
  isEnglish = false;
});


// Function to update the infopanel with correct battle data.
// Needs battlekey from battles.js to display correct data

  function updateInfoPanel(battleKey) {
    // Retreives what battle is selected
    const battle = battleDescriptions[battleKey];
    // If english is selected, display english text
    if (isEnglish == true) {
      infoPanel.innerHTML = `
        <h2>${battle.title_eng}</h2>
        <p>${battle.description_eng}</p>
      `;
    }
    // otherwise display swedish text
    else {
        infoPanel.innerHTML = `
        <h2>${battle.title_swe}</h2>
        <p>${battle.description_swe}</p>
      `;
    }
  }

  // Loads gunfire sounds to a variable and sets the volume.
  var gunfire = new Audio('gun_fire_sound.mp3');
  gunfire.volume = 0.05


 // Function to set up an important battle with correct data on index.html:s SVG map and handles zooming feature
 // classname: name of Circle-class from the svg map that is going to be displayed 
 // battlekey: key to retreive correct data for infopanels.
 // showsprite: Bool, if sprite animation should be dispalyed when zoomed in on battle
  function BattleCircle(className, battleKey, showSprite) {
    //retreives the circle
    const circle = document.querySelector(`.${className}`);

    // set up event that listens until one clicks on the circle to zoom in and play music
    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      gunfire.play();
      gunfire.loop = true;

      // retreiving the current view and calculating the correct zooming for the battle
      const cx = parseFloat(circle.getAttribute("cx"));
      const cy = parseFloat(circle.getAttribute("cy"));
      const zoomWidth = 200;
      const zoomHeight = 200;
      const newViewBox = `${cx - zoomWidth / 2 - 30} ${cy - zoomHeight / 2} ${zoomWidth} ${zoomHeight}`;
      
      //Actually do the zooming and remove the hidden feature of the infopanel and if showsprite if true also display sprite animation.
      svg.setAttribute("viewBox", newViewBox);
      infoPanel.classList.remove("hidden");
      if (showSprite) spriteanim.classList.remove("hidden");
      //As the infopanel is no longer hidden we need some text inside the panel,
      // use the function updateInfopanel to display the correct information regarding the battle.
      updateInfoPanel(battleKey);
    });
  }

  //TO ADD BATTLE EASILY(GUIDE)
  //1) Create a battle in battles.js with english and swedish translation
  //2) create circle in SVG with correct tags and coordinates
  //3) add as below following setupbattlecircle
  BattleCircle("berlin", "berlin", false);
  BattleCircle("dunkirk", "dunkirk", false);
  BattleCircle("ardenne-offensive","ardenne", true);

  // Event to actually revert the zoom feature from Battlecircle
  // by disabling the gunfire sound, setting the original viewbox attribute to what it was before the zoom and by adding the hidden feature to both infopanel and spriteanim.
  svg.addEventListener("click", () => {
      svg.setAttribute("viewBox", originalViewBox);
      infoPanel.classList.add("hidden");
      spriteanim.classList.add("hidden");
      gunfire.pause()
    
  });
    
     // Function that creates an explosion animation on the map
    function spawnExplosion() {
        const explosionsGroup = document.getElementById("explosions");
      
        // Base coordinates for explosions(Somwhere in this area which is most of germany and parts of western and eastern europe):
        const cx = 450 + Math.random() * 350;
        const cy = 350 + Math.random() * 200;
      
        // particleCount is the amount of smaller circles each singular explosion creates, after som testing was it decided to be 16
        // because it made the explosion fuller but not so many that it clogged up the animation.
        const particleCount = 16;
        // for each particle, create a random angle(where it flies) and distance(how far)
        // from which it is going to "fly" from the center.
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * 2 * Math.PI;
          const distance = 10 + Math.random() * 10;

          // Sets dx and dy which are the movement for the particle(angle * distance) which are going to be used in the css dirtblast keyframe
          const dx = Math.cos(angle) * distance;
          const dy = Math.sin(angle) * distance;

          // Creates a circle named particle which we give attributes we calculated
          const particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          particle.setAttribute("cx", cx);
          particle.setAttribute("cy", cy);
          particle.setAttribute("r", 0);

          // adds the particle to the class explosion-particle for css styling
          particle.setAttribute("class", "explosion-particle");
          particle.style.setProperty("--dx", `${dx}px`);
          particle.style.setProperty("--dy", `${dy}px`);
          
          // finally we append the explosion to the explosion group in the SVG map so it will be displayed when called
          explosionsGroup.appendChild(particle);
        }
      }

       // Function to actually call the explosion and draw it on the map in a random fashion.
      function scheduleExplosion() {
        // Run the explosion when called
        spawnExplosion();
      
        // randomly assign next time an explosion is called
        const delay = 2000 + Math.random() * 2000; // 3000–6000 ms
        setTimeout(scheduleExplosion, delay);
      }      
      // With this function we now can call an explosion that appears randomly on the map with random timing(except for the beginning)
      // After testing we decided that four simultaneous explosions loops are needed to create an aestetically pleasing group animation of explosions
      // with too few they felt lackluster and not that interesting
      // with too many they create lag and make the map cluttered
      // With 4 we get the best of both worlds, enough that it feels like they matter but not to many that they take up all of the map.

      scheduleExplosion();
      scheduleExplosion();
      scheduleExplosion();
      scheduleExplosion();

      // Adjust volume of background music
      var audio = document.getElementById("war");
      audio.volume = 0.07;

      // Initiates the image/sprite sheet from URL
      const img = new Image();
      img.src = 'https://thumbs.dreamstime.com/b/us-soldier-shooting-sprite-vector-cartoon-animation-sequence-sheet-55787397.jpg?w=768';
  
      // Constants to fetch the canvas div from index.html and get canvas context 
      // to be able to draw, or in this case, create a simple sprite animation.
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
  
      // Constants for the number of rows and columns of the sprite sheet. This is
      // needed to be able to divide the sheet into sections that contain each sprite.
      // Scale constant is used for scaling the size of the sprite animation
      // correctly.
      const numColumns = 2;
      const numRows = 2;
      const scale = 2.5;
      let currentFrame = 0;
  
      // Loads the image/sprite sheet
      img.onload = function() {
        const frameWidth = img.width / numColumns;
        const frameHeight = img.height / numRows;
        const maxFrame = numColumns * numRows - 1;
  
        // Interval/animation function. This switches between the different sprite 
        // sheet sections with an interval of 300ms. This creates an animation
        // effect, where each sprite image of the sprite sheet is displayed briefly.
        setInterval(function () {
          
          // Calculate row and column for the current frame
          const column = currentFrame % numColumns;
          const row = Math.floor(currentFrame / numColumns);
  
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
  
          // Draws the current frame, which is one section of the sprite sheet.
          ctx.drawImage(
            img,
            column * frameWidth,
            row * frameHeight,
            frameWidth,
            frameHeight,
            50, 50,
            frameWidth / scale,
            frameHeight / scale
          );
  
          // Go to next frame (next sprite image in the sprite sheet).
          currentFrame = (currentFrame + 1) % (maxFrame + 1);
        }, 300);
    };

    // This function is needed to translate parts of the website using two JSON
    // files, one for english text (en.JSON) and the other for the swedish 
    // translations (sv.JSON).
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.addEventListener('click', function (e) {
            // Prevent default link behavior(so the page does not reload on click).
            e.preventDefault(); 
            // The language button (swedish or english that the user clicks on).
            const lang = el.getAttribute('data-lang');
            // Fetch the corresponding JSON file.
            fetchLanguageFile(lang);
        });
    });

    // Load default language (English) on page load
    fetchLanguageFile('en');

    //Function that fetches translations from JSON file
    function fetchLanguageFile(lang) {
        const filePath = `${lang}.json`;

        // Search for and fetch the correct JSON file, then fetch the translation
        // by looking for the 'data-i18n' tag from index.html. And then some 
        // error catching if something goes wrong when trying to fetch JSON files.
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load language file: ${filePath}`);
                }
                return response.json();
            })
            .then(translations => {
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (translations[key]) {
                        el.textContent = translations[key];
                    }
                });
            })
            .catch(error => {
                console.error('Error loading language file:', error);
            });
    }

// Create constants needed for the help/tutorial section.
const button = document.getElementById('help');
const battle = document.querySelector('.battle-button.berlin');
const marker = document.getElementById('marker');
const tooltip = document.getElementById('tooltip');
marker.classList.add('hidden')

// Function that moves the marker from index.html towards a button (berlin button).
function moveMarker() {
  // Set the animation interval (time it takes for tutorial marker to reach destination).
  marker.style.transition = 'top 5s ease, left 5s ease';
  const rect = battle.getBoundingClientRect();

  // This is to ensure correct marker alignment for the end location on smaller 
  // screens. Otherwise, the marker points to a different part of the svg map.
  if (window.innerWidth <= 480) {
    marker.style.top = `${rect.top + window.scrollY - 146}px`;
    marker.style.left = `${rect.left + window.scrollX - 10}px`;
  } else {
    marker.style.top = `${rect.top + window.scrollY - 155}px`;
    marker.style.left = `${rect.left + window.scrollX - 30}px`;
  }
}

// Function that resets the markers position and set transition/animation speed to 
// 0.1s. This is done by accessing and changing css attributes of the marker.
function resetMarker() {
  marker.style.transition = 'top 0.1s ease, left 0.1s ease';
  marker.style.top = `0px`;
  marker.style.left = `0px`;
}

// Function to loop the marker animation by resetting its location.
function loopMarker() {
  resetMarker();

  // Forces reflow/apply layout changes.
  marker.offsetHeight; 

  setTimeout(() => {
    moveMarker();
  }, 500);
}

// Initialize loopinterval variable.
let loopInterval;

// Eventlistener for clicking the help button.
button.addEventListener('click', () => {
  // Start looping animation immediately
  loopMarker();

  // Reveal the marker.
  marker.classList.remove('hidden')
  // Set the loop interval to 6s, since it takes 5s for the marker to reach the 
  // destination.
  loopInterval = setInterval(loopMarker, 6000);

  // Starts a flashing animation on the Berlin button.
  battle.classList.add('flashing-button'); 
  // Reveal the tooltip.
  tooltip.classList.remove('hidden');

  battle.addEventListener('click', () => {
    // Stop the marker loop when tutorial is done/Berlin is clicked.
    clearInterval(loopInterval);  
    // Hide tooltip and marker. Remove flashing button effect.
    battle.classList.remove('flashing-button');
    tooltip.classList.add('hidden');
    marker.classList.add('hidden')
    // Ensure the listener only runs once.
    }, { once: true }); 
  });

  });

//************
// END of file main.js
//************