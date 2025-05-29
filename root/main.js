import { battleDescriptions } from './battles.js';

document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("map");
  const originalViewBox = svg.getAttribute("viewBox");
  const infoPanel = document.getElementById("infoPanel");
  const spriteanim = document.getElementById("spriteanim");
  let isEnglish = true;

document.querySelector('[data-lang="en"]').addEventListener('click', () => {
  isEnglish = true;
});

document.querySelector('[data-lang="sv"]').addEventListener('click', () => {
  isEnglish = false;
});


//TODO: ADD FUNCTION DESRIPTION
  function updateInfoPanel(battleKey) {
    const battle = battleDescriptions[battleKey];
    if (battle && isEnglish == true) {
      infoPanel.innerHTML = `
        <h2>${battle.title_eng}</h2>
        <p>${battle.description_eng}</p>
      `;
    }
    else{
        infoPanel.innerHTML = `
        <h2>${battle.title_swe}</h2>
        <p>${battle.description_swe}</p>
      `;
    }
  }

   var gunfire = new Audio('gun_fire_sound.mp3');
   gunfire.volume = 0.05

 // TODO: ADD FUNCTION DESRIPTION
  function setupBattleCircle(className, battleKey, showSprite) {
    const circle = document.querySelector(`.${className}`);

    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      gunfire.play();
      gunfire.loop = true;

      const cx = parseFloat(circle.getAttribute("cx"));
      const cy = parseFloat(circle.getAttribute("cy"));
      const zoomWidth = 200;
      const zoomHeight = 200;
      const newViewBox = `${cx - zoomWidth / 2 - 30} ${cy - zoomHeight / 2} ${zoomWidth} ${zoomHeight}`;

      svg.setAttribute("viewBox", newViewBox);
      infoPanel.classList.remove("hidden");
      if (showSprite) spriteanim.classList.remove("hidden");

      updateInfoPanel(battleKey);
    });
  }

  //TO ADD BATTLE EASILY
  //1) Create infotext in battles.js
  //2) create circle in svg
  //3) add as below following setupbattlecircle
  setupBattleCircle("berlin", "berlin", true);
  setupBattleCircle("dunkirk", "dunkirk", true);
  setupBattleCircle("ardenne-offensive","ardenne", true);
  //

//if click ON SVG MAP(not ocean) return to original viewbox
  svg.addEventListener("click", () => {
      svg.setAttribute("viewBox", originalViewBox);
      infoPanel.classList.add("hidden");
      spriteanim.classList.add("hidden");
      gunfire.pause()
    
  });
    
     // TODO: ADD FUNCTION DESRIPTION
    function spawnExplosion() {
        const explosionsGroup = document.getElementById("explosions");
      
        // Base coordinates for explosions:
        //TODO: ZERO IN CORRECT COORDINATES FOR GERMANY RIGHT NOW IN SMALL TOP AREA
        const cx = 450 + Math.random() * 350;
        const cy = 350 + Math.random() * 200;
      
        // Create dirt from artillery explosion(8)
        const particleCount = 16;
        //for each particle, create an angle and distance
        //  from which it is going to "fly" from the center. Create a circle that goes in that direction
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * 2 * Math.PI;
          const distance = 10 + Math.random() * 10;
          const dx = Math.cos(angle) * distance;
          const dy = Math.sin(angle) * distance;
      
          const particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          particle.setAttribute("cx", cx);
          particle.setAttribute("cy", cy);
          particle.setAttribute("r", 0);
          particle.setAttribute("class", "explosion-particle");
          particle.style.setProperty("--dx", `${dx}px`);
          particle.style.setProperty("--dy", `${dy}px`);
      
          explosionsGroup.appendChild(particle);
        }
      }
       // TODO: ADD FUNCTION DESRIPTION
      function scheduleExplosion() {
        // Run the explosion once website is opened
        spawnExplosion();
      
        // randomly assign next explosion timer
        const delay = 2000 + Math.random() * 2000; // 3000–6000 ms
        setTimeout(scheduleExplosion, delay);
      }      
      // Schedule three separate explosions to simulate even more randomness
      scheduleExplosion();
      scheduleExplosion();
      scheduleExplosion();

      //Adjust volume of background music
      var audio = document.getElementById("war");
      audio.volume = 0.07;

      //initiate image from URL
      const img = new Image();
      img.src = 'https://thumbs.dreamstime.com/b/us-soldier-shooting-sprite-vector-cartoon-animation-sequence-sheet-55787397.jpg?w=768';
  
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
  
      const numColumns = 2;
      const numRows = 2;
      const scale = 2.5;
      let currentFrame = 0;
  
      //Load the image
      img.onload = function() {
        const frameWidth = img.width / numColumns;
        const frameHeight = img.height / numRows;
        const maxFrame = numColumns * numRows - 1;
  
        //Interval/animation function
        setInterval(function () {
          
          // Calculate row and column for the current frame
          const column = currentFrame % numColumns;
          const row = Math.floor(currentFrame / numColumns);
  
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
  
          // Draw current frame
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
  
          // Advance frame
          currentFrame = (currentFrame + 1) % (maxFrame + 1);
        }, 300);
    };

    document.querySelectorAll('[data-lang]').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            const lang = el.getAttribute('data-lang');
            fetchLanguageFile(lang);
        });
    });

    // Load default language (English) on page load
    fetchLanguageFile('en');

    //Function that fetches translations from JSON file
    function fetchLanguageFile(lang) {
        const filePath = `${lang}.json`;

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

  //Tutorial
  const button = document.getElementById('help');
  const battle = document.querySelector('.battle-button.berlin');
  button.addEventListener('click', () => {
  
  battle.classList.add('flashing-button'); // Start flashing

  const tooltip = document.getElementById('tooltip');

  // Highlight the button and show tooltip
  button.classList.add('highlight');
  tooltip.classList.remove('hidden');

  // Click to proceed
  battle.addEventListener('click', () => {
    // alert('Tutorial complete!');
    battle.classList.remove('flashing-button')
    button.classList.remove('highlight');
    tooltip.classList.add('hidden');
    });
  });

  });
  