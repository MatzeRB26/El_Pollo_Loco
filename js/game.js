import { MoveableObject } from "./models/moveable-object.class.js";
import { DrawableObject } from "./models/drawable-object.class.js";
import { ThrowableObject } from "./models/throwable-object.class.js";
import { StatusBar } from "./models/statusbar.class.js";
import { Character } from "./models/character.class.js";
import { Chicken } from "./models/chicken.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { Endboss } from "./models/endboss.class.js";
import { createLevel1 } from "./levels/level1.js";
import { Coin } from "./models/coin.class.js";
import { SoundManager } from "./models/sound-manager.class.js";

let canvas; // eine variable für das Bildformat(720x480px)
let world;
let keyboard = new Keyboard();
let sound = new SoundManager();

function init() {
    canvas = document.getElementById("canvas");
}
init();

// #region Startgame / restart 
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    const canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard, createLevel1(), sound);
    world.sound.play("gameStart")
    sound.playMusic();
}
window.startGame = startGame;

function restartGame() {
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("you-win").classList.add("hidden");
    world = new World(canvas, keyboard, createLevel1(), sound);
}
window.restartGame = restartGame;

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
// #endregion

// #region Sounds
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
// #endregion

// #region Popup Windows
window.toggleHelp = function() {
    document.getElementById("help-dialog").classList.toggle("hidden");
};

window.toggleImprint = function () {
    document.getElementById("imprint-dialog").classList.toggle("hidden");
};
// #endregion

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

const leftButton = document.getElementById("btn-left");
const rightButton = document.getElementById("btn-right");
const jumpButton = document.getElementById("btn-jump");
const throwButton = document.getElementById("btn-throw");

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