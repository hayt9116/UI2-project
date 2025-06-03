# PROJECT NAME: WW2 MAP WITH ZOOMABLE BUTTONS

# PROJECT MEMBERS:
Carl-Henrik Ytterfelt Martinsson, Hans-Eskil Ytterfelt Martinsson, Markus Eriksson
# Short description:
This is an interactive ww2 map showing several important battles during ww2. The interactive part comes in the form of that each battle is a clickable button that once clicked zooms in and displays specific information regarding the battle, once the description has been read can the user simply click outside of the map to revert the zoom and click on another battle.

The project supports english and swedish translations.
# Chosen plattform and motivation

# How to run program

# Problems encountered regarding platform during project:
A problem we encountered during the project was in the structure of the battles, in the beginning did we everything specific for each battle. Which means that every battle had its own, function to zoom, display and place each marker. This made the code difficult to understand since many functions looked very similar when the only things changing was the text and coordinates inside each battle. This was solved by creating a library for each displaytext inside of battles.js(with translation support), and by using a dedicated function to set up a battlecircle.


