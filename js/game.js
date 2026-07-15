// import { MoveableObject } from "./models/moveable-object.class.js";
// import { DrawableObject } from "./models/drawable-object.class.js";
// import { ThrowableObject } from "./models/throwable-object.class.js";
// import { StatusBar } from "./models/statusbar.class.js";
// import { Character } from "./models/character.class.js";
// import { Chicken } from "./models/chicken.class.js";
// import { Endboss } from "./models/endboss.class.js";
// import { Coin } from "./models/coin.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { createLevel1 } from "./levels/level1.js";
import { SoundManager } from "./models/sound-manager.class.js";

let canvas;
let world;
let keyboard = new Keyboard();
let sound = new SoundManager();

/**
 * Initializes the game canvas.
*/
function init() {
    canvas = document.getElementById("canvas");
}
init();

/**
 * Starts a new game.
 * Creates the game world and starts the background music.
*/
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    const canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard, createLevel1(), sound);
    world.sound.play("gameStart")
    sound.playMusic();
}
window.startGame = startGame;

/**
 * Restarts the current game.
*/
function restartGame() {
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("you-win").classList.add("hidden");
    world = new World(canvas, keyboard, createLevel1(), sound);
    world.sound.play("gameStart");
    world.sound.playMusic();
}
window.restartGame = restartGame;

/**
 * Stops the current game and returns to the start screen.
*/
function returnToMenu() {
    if (world) {world.stopGame();}
    sound.stopMusic();
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("you-win").classList.add("hidden");
    document.getElementById("canvas").style.display = "none";
    document.getElementById("startScreen").style.display = "flex";

    world = null;
}
window.returnToMenu = returnToMenu;

/**
 * Toggles the game's sound on or off
 * and updates the sound button icons.
*/
function toggleSound() {
    const manager = world ? world.sound : sound;
    const muted = manager.toggleMute();
    const desktop = document.getElementById("sound-btn");
    const mobile = document.getElementById("mobile-sound");
    const icon = muted
        ? "assets/icons/soundOff.png"
        : "assets/icons/soundOn.png";
    if (desktop) desktop.src = icon;
    if (mobile) mobile.src = icon;
}
window.toggleSound = toggleSound;

/**
 * Shows or hides the help dialog.
*/
window.toggleHelp = function() {
    document.getElementById("help-dialog").classList.toggle("hidden");
};

/**
 * Shows or hides the imprint dialog.
*/
window.toggleImprint = function () {
    document.getElementById("imprint-dialog").classList.toggle("hidden");
};


/**
 * Toggles fullscreen mode for the game canvas.
*/
window.toggleFullscreen = function () {
    let canvas = document.getElementById("canvas");
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

/**
 * Exits fullscreen mode.
*/
function closefullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


// #region Play-Buttons
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


const leftButton = document.getElementById("btn-left");
const rightButton = document.getElementById("btn-right");
const jumpButton = document.getElementById("btn-jump");
const throwButton = document.getElementById("btn-throw");

/**
 * Binds touch events to a virtual control button.
 *
 * @param {HTMLElement} button - The button element.
 * @param {string} key - The keyboard property to update.
*/
function bindTouch(button, key) {
    if (!button) return;
    button.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard[key] = true;
    }, { passive: false });
    button.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
    button.addEventListener("touchcancel", () => {
        keyboard[key] = false;
    });
}

bindTouch(leftButton, "LEFT");
bindTouch(rightButton, "RIGHT");
bindTouch(jumpButton, "SPACE");
bindTouch(throwButton, "D");
// #endregion