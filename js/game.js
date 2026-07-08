import { MoveableObject } from "./models/moveable-object.class.js";
import { DrawableObject } from "./models/drawable-object.class.js";
import { ThrowableObject } from "./models/throwable-object.class.js";
import { StatusBar } from "./models/statusbar.class.js";
import { Character } from "./models/character.class.js";
import { Chicken } from "./models/chicken.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { Endboss } from "./models/endboss.class.js";
import { level1 } from "./levels/level1.js";
import { Coin } from "./models/coin.class.js";

let canvas; // eine variable für das Bildformat(720x480px)
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard, level1);
}
init();

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    const canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard, level1);
}
window.startGame = startGame;

// #region Fullscreen
window.toggleFullscreen = function () {
    let canvas = document.getElementById("canvas");
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

function closefullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
// #endregion

// #region Keyboard
window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") keyboard.LEFT = true;
    if (e.code == "ArrowRight") keyboard.RIGHT = true;
    if (e.code == "ArrowUp") keyboard.UP = true;
    if (e.code == "ArrowDown") keyboard.DOWN = true;
    if (e.code == "Space") keyboard.SPACE = true;
    if (e.code == "KeyD") keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") keyboard.LEFT = false;
    if (e.code == "ArrowRight") keyboard.RIGHT = false;
    if (e.code == "ArrowUp") keyboard.UP = false;
    if (e.code == "ArrowDown") keyboard.DOWN = false;
    if (e.code == "Space") keyboard.SPACE = false;
    if (e.code == "KeyD") keyboard.D = false;
});
// #endregion
