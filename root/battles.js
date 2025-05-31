/**
 * File: battles.js
 * 
 * This module exports a JavaScript object called "battleDescriptions".
 *  Each key in the object represents a unique battle (berlin, dunkirk, ardenne).
 *  Each battle entry includes a title and desscription in english and swedish thus currently allowing support for two languages
 *  
 *  If you want to add a battle then give it a key(so main.js can use it), title(for infopanel header) and description(Main text of battle)
 *  If more languages want to be added then simply add title_language and description_language, however this then also has to be programmed correctly in main.js to fully work
 * 
 * Authors: Carl-Henrik Ytterfelt Martinsson, Hans-Eskil Ytterfelt Martinsson, Markus Eriksson
 */

export const battleDescriptions = {
    berlin: {
        title_eng: "Battle of Berlin",
        description_eng: "The final major offensive of the European theatre of World War II, leading to the fall of Berlin.",
        
        title_swe: "Slaget om Berlin",
        description_swe:"Stora slaget om Berlin, soviet anfaller från öst, började den x te och varade i tills Tyskland gav upp"
    },
    dunkirk: {
        title_eng: "Battle of Dunkirk",
        description_eng: "A remarkable evacuation of Allied soldiers from the beaches of Dunkirk, France, during World War II.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremII.lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem",
        
        title_swe: "Slaget vid dunkirk",
        description_swe:"Tyskland anfaller genom belgien, luxemburg och nederländerna och fångar stora delar av de allierade i en ficka vid dunkirk osv osv"
    },
    ardenne: {
        title_eng: "Ardenne offensive",
        description_eng: "Last ditch attack by germany on western front lorem lorem",
        
        title_swe: "Ardenneoffensiven",
        description_swe:"I krigets slutskede gör Tyskland en sista motoffensiv mot de allierade vid ardenneskogen, efterliknande för vad som skedde år 1940, dock är Tyskland inte lika framgångsrika denna gång"
    }
    
};