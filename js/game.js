import { MoveableObject } from "./models/moveable-object.class.js";
import { Character } from "./models/character.class.js";
import { Chicken } from "./models/chicken.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { level1 } from "./levels/level1.js";
import { Endboss } from "./models/endboss.class.js";


let canvas; // eine variable für das Bildformat(720x480px)
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
}
init();


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39){
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37){
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38){
        keyboard.UP = true;
    }

    if (e.keyCode == 40){
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32){
        keyboard.SPACE = true;
    }
});

    window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39){
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37){
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38){
        keyboard.UP = false;
    }

    if (e.keyCode == 40){
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32){
        keyboard.SPACE = false;
    }
});

