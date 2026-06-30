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
    world = new World(canvas, Keyboard, level1);
}
init();


window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") Keyboard.LEFT = true;
    if (e.code == "ArrowRight") Keyboard.RIGHT = true;
    if (e.code == "ArrowUp") Keyboard.UP = true;
    if (e.code == "ArrowDown") Keyboard.DOWN = true;
    if (e.code == "Space") Keyboard.SPACE = true;
    if (e.code == "KeyD") Keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") Keyboard.LEFT = false;
    if (e.code == "ArrowRight") Keyboard.RIGHT = false;
    if (e.code == "ArrowUp") Keyboard.UP = false;
    if (e.code == "ArrowDown") Keyboard.DOWN = false;
    if (e.code == "Space") Keyboard.SPACE = false;
    if (e.code == "KeyD") Keyboard.D = false;
});
