document.addEventListener("DOMContentLoaded", () => {
    //Stores the svg and circle(Berlin) element from index
    const svg = document.getElementById("map");
    const berlin = document.querySelector(".berlin");
    const dunkirk = document.querySelector(".dunkirk");
    //save original viewbox before transformation
    const originalViewBox = svg.getAttribute("viewBox");
  
    //wait for click on Berlin
    berlin.addEventListener("click", (e) => {
    // e.stopPropagation();
        
    //retrieves X and Y coordinates for Berlin
      const cx = parseFloat(berlin.getAttribute("cx"));
      const cy = parseFloat(berlin.getAttribute("cy"));

    //How much to zoom in the lower the value the more zoomed in
      const zoomWidth = 200; 
      const zoomHeight = 200;
    //calculate new viewbox
      const newViewBox = `${cx - zoomWidth / 2 - 30} ${cy - zoomHeight / 2} ${zoomWidth} ${zoomHeight}`;
  
      svg.setAttribute("viewBox", newViewBox);
       document.getElementById("infoPanel").classList.remove("hidden"); 
       document.getElementById("spriteanim").classList.remove("hidden");
    });

    dunkirk.addEventListener("click", (e) => {
    // e.stopPropagation();
        
    //retrieves X and Y coordinates for Berlin
      const cx = parseFloat(dunkirk.getAttribute("cx"));
      const cy = parseFloat(dunkirk.getAttribute("cy"));

    //How much to zoom in the lower the value the more zoomed in
      const zoomWidth = 200; 
      const zoomHeight = 200;
    //calculate new viewbox
      const newViewBox = `${cx - zoomWidth / 2 - 30} ${cy - zoomHeight / 2} ${zoomWidth} ${zoomHeight}`;
  
      svg.setAttribute("viewBox", newViewBox);
       document.getElementById("infoPanel").classList.remove("hidden"); 
    });
    
    //when click on something that is not the red circle, revert back to old viewbox and remove textbox
    svg.addEventListener("click", (e) => {
      
      // if (!e.target.classList.contains(locations))
      if (!(e.target.classList.contains('berlin')|| e.target.classList.contains('dunkirk')) ) {
        svg.setAttribute("viewBox", originalViewBox);
        // Hide the info panel
         document.getElementById("infoPanel").classList.add("hidden");
         document.getElementById("spriteanim").classList.add("hidden");
      }
    });
    
    
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
    

  });
  