import { MoveableObject } from "./models/moveable-object.class.js";
import { Character } from "./models/character.class.js";
import { Chicken } from "./models/chicken.class.js";
import { Cloud } from "./models/cloud.class.js";
import { World } from "./models/world.class.js";
import { BackgroundObject } from "./models/background-object.class.js";

let canvas; // eine variable für das Bildformat(720x480px)
let world;


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    
    
    console.log('My Character is', world.character);
}
window.onload = init();
