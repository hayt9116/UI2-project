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
  });
  