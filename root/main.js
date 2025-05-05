document.addEventListener("DOMContentLoaded", () => {
    //Stores the svg and circle(Berlin) element from index
    const svg = document.getElementById("map");
    const berlin = document.querySelector(".berlin");
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
      const newViewBox = `${cx - zoomWidth / 2} ${cy - zoomHeight / 2} ${zoomWidth} ${zoomHeight}`;
  
      svg.setAttribute("viewBox", newViewBox);
    });
    
    //when click on something that is not the red circle, revert back to old viewbox
    svg.addEventListener("click", (e) => {
      if (!e.target.classList.contains('berlin')) {
        svg.setAttribute("viewBox", originalViewBox);
      }
    });
    
    function spawnExplosion() {
        const explosionsGroup = document.getElementById("explosions");
      
        // Base coordinates for explosions:
        //TODO: ZERO IN CORRECT COORDINATES FOR GERMANY RIGHT NOW IN SMALL TOP AREA
        const cx = 550 + Math.random() * 150;
        const cy = 350 + Math.random() * 100;
      
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

  });
  