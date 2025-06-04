# PROJECT NAME: WW2 MAP WITH ZOOMABLE BUTTONS

# PROJECT MEMBERS:
Carl-Henrik Ytterfelt Martinsson, Hans-Eskil Ytterfelt Martinsson, Markus Eriksson

# Short description:
This is an interactive ww2 map showing several important battles during ww2. The interactive part comes in the form of that each battle is a clickable button that once clicked zooms in and displays specific information regarding the battle, once the description has been read can the user simply click outside of the map to revert the zoom and click on another battle. Since we are interested in history we decided that WW2 should be the backdrop for the project. An interactive map also seemed like a good fit seeing as we are making a webpage.


The project supports english and swedish translations. These translations are done in two ways. The first is in the form of two JSON files, en.JSON and sv.JSON. The other way is with the help of a dictionary in the battles.js file.

# Chosen platform and motivation
For this project, we have chosen to use a mix of Javascript, html, Css, SVG graphics and Canvas. This seemed like the most natural way since we were going to create a webpage. One other option we considered was to use Pyhton together with tkinter but we opted for html, Css and Javascript as we wanted to get some more experience with them and try something we hadn't used that much before. For the animations that are displayed we used a mix of Canvas and SVG's own graphics. The built in SVG graphics were useful when we needed the particles from the explosions to persist even when zooming in on the map.

# How to run program
Right click on the index.html and select open with Live server. This will open the web page in a browser. This requires the user to have the Live server extension installed, either through the link https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer or by simply installing the extension inside VSCode. Note that other options of running the program probably work as well, but this is the way we ran with and tested it throughout the whole project. IMPORTANT: This project can not be played in firefox. We advise that you play in Microsoft Edge or Google Chrome.

# Problems encountered regarding platform during project:
A problem we encountered during the project was in the structure of the battles, in the beginning did we everything specific for each battle. Which means that every battle had its own, function to zoom, display and place each marker. This made the code difficult to understand since many functions looked very similar when the only things changing was the text and coordinates inside each battle. This was solved by creating a library for each displaytext inside of battles.js(with translation support), and by using a dedicated function to set up a battlecircle. One other problem was that the links in the header did not display correctly on one of our computers. This occured sometime during the development, as it was functional in the beggining, but a solution to it has not been found yet. 


