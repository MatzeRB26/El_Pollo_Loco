import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { createLevel1 } from "../levels/level1.js";
import { StatusBar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { CoinStatusBar } from "./statusbar-coin.class.js";
import { BottleStatusBar } from "./statusbar-bottle.class.js";
import { EndbossStatusBar } from "./statusbar-endboss.class.js";

/**
 * @class
 * Represents the game world.
 * Manages rendering, collisions, enemies, collectibles,
 * player interactions, and game state.
*/
export class World {
    character = new Character();
    level = createLevel1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    canThrow = true;
    statusBar = new StatusBar();
    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();
    endbossStatusBar = new EndbossStatusBar();
    collectedCoins = 0;
    maxCoins = 10;
    maxBottles = 5;
    gameWon = false;
    gameOver = false;
    interval = [];

/**
 * Creates a new game world.
 *
 * @param {HTMLCanvasElement} canvas - The canvas used for rendering.
 * @param {Keyboard} keyboard - The keyboard input handler.
 * @param {Object} level - The current level data.
 * @param {SoundManager} sound - The game's sound manager.
*/
    constructor(canvas, keyboard, level, sound) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.sound = sound;
        this.setWorld();
        this.draw();
        this.run();
    }

/**
 * Assigns the current world to the character and all enemies.
*/
    setWorld() {
    this.character.world = this;
    this.level.enemies.forEach(enemy => {
        enemy.world = this;
    });
    }

/**
 * Starts the main game loop.
 * Continuously updates collisions, collectibles,
 * enemy behavior, and game logic.
*/
    run() {
        setInterval(() => {
            if (this.gameOver)return;
            this.activateEndboss();
            this.checkCollisions();
            this.checkCoinCollisions();
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.checkBottlePickup();
            this.checkEndbossPassed();
            this.level.enemies = this.level.enemies.filter(
                (enemy) => !enemy.markedForDeletion,
            );
        }, 1000 / 60);
    }

/**
 * Checks whether the player can throw a bottle.
*/
    checkThrowObjects() {
    if (this.keyboard.D && this.canThrow && this.character.collectedBottles > 0) {
    this.throwBottle();
    this.canThrow = false;
        setTimeout(() => {
        this.canThrow = true;
        }, 300);
        }
    }

/**
 * Creates and throws a new bottle.
*/
    throwBottle(){
        let x;
        if(this.character.otherDirection){
            x = this.character.x - 20;
        } else {
            x = this.character.x + 50;
        }
        let bottle = new ThrowableObject(x, this.character.y + 100, this.character.otherDirection);
        bottle.world = this
        this.throwableObjects.push(bottle);
        this.character.collectedBottles--;
        let p = (this.character.collectedBottles / this.maxBottles) * 100;
        this.bottleStatusBar.setPercentage(p);
    }

/**
 * Activates the endboss when the player reaches its area.
*/
    activateEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && !enemy.activated && this.character.x > 2000) {
                enemy.activate();
                this.sound.play('endbossApproach');
            }
        });
    }

/**
 * Checks whether the player defeats an enemy by jumping on it.
 *
 * @param {Chicken|SmallChicken} enemy - The enemy to check.
 * @returns {boolean} True if the jump attack is successful.
*/
    isJumpAttack(enemy) {
    const feet = this.character.rY + this.character.rH;
    const tolerance = enemy instanceof SmallChicken ? 18 : 25;
    return ( this.character.speedY < 0 && feet >= enemy.rY && feet <= enemy.rY + tolerance);
    }

/**
 * Checks collisions between the player and all enemies.
*/
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.dead || enemy.markedForDeletion) return;
            if (!this.character.isColliding(enemy)) return;
            if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                this.handleChicken(enemy);
            } else {
                this.handleEndboss(enemy);
            }
        });
    }

/**
 * Handles collisions with chickens.
 *
 * @param {Chicken|SmallChicken} enemy - The collided enemy.
*/
    handleChicken(enemy) {
        if (this.character.isHurt()) return;
        const feet = this.character.rY + this.character.rH;
        if (this.isJumpAttack(enemy)) {enemy.die();
            this.character.jump();
            return;
        }
        if (enemy instanceof SmallChicken){
            this.character.hit(10);
        } else {
            this.character.hit(15);
        }
        this.statusBar.setPercentage(this.character.energy);
    }

/**
 * Handles collisions with the endboss.
 *
 * @param {Endboss} enemy - The endboss.
*/
    handleEndboss(enemy) {
        this.character.hit(20);
        this.statusBar.setPercentage(this.character.energy);
    }

/**
 * Ends the game if the endboss passes the character.
*/
checkEndbossPassed() {
    const boss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    if (!boss || !boss.activated || boss.isDead()) return;
    if (boss.x + boss.width + 40 < this.character.x) {
        this.gameOver = true;
        this.stopGame();
        setTimeout(() => {
            document.getElementById("mobile-controls").style.display = "none";
            document.getElementById("game-over").classList.remove("hidden");
        }, 500);
    }
    }

/**
 * Checks collisions between thrown bottles and enemies.
*/
checkBottleCollisions() {
    this.throwableObjects.forEach(bottle => {
        this.level.enemies.forEach(enemy => {
            if (!bottle.isColliding(enemy) || bottle.isSplashing) return;
            bottle.splash();
            this.handleBottleHit(enemy);
        });
    });
    this.throwableObjects = this.throwableObjects.filter(
        bottle => !bottle.markedForDeletion
    );
}

/**
 * Handles a bottle hit on an enemy.
 *
 * @param {Chicken|SmallChicken|Endboss} enemy - The hit enemy.
 */
handleBottleHit(enemy) {
    if (!(enemy instanceof Endboss)) return enemy.die();
    enemy.hit();
    this.endbossStatusBar.setPercentage(enemy.energy);
    if (!enemy.isDead() || this.gameWon) return;
    this.gameWon = true;
    this.sound.stopMusic();
    this.sound.play("win");
    setTimeout(() => {
        this.gameOver = true;
        document.getElementById("mobile-controls").style.display = "none";
        document.getElementById("you-win").classList.remove("hidden");
    }, 1000);
}

/**
 * Checks whether the player collects a coin.
*/
    checkCoinCollisions() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.level.coins.splice(i, 1);
                this.collectedCoins++;
                let percentage = (this.collectedCoins / this.maxCoins) * 100;
                this.coinStatusBar.setPercentage(percentage);
                this.sound.play('coin');
            }
        }
    }

/**
 * Checks whether the player collects a bottle.
*/
    checkBottlePickup() {
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
        let bottle = this.level.bottles[i];
        if (
            this.character.isColliding(bottle) &&
            this.character.collectedBottles < this.maxBottles
        ) {
            this.sound.play("bottleCollect");
            this.level.bottles.splice(i, 1);
            this.character.collectedBottles++;
            let p = (this.character.collectedBottles / this.maxBottles) * 100;
            this.bottleStatusBar.setPercentage(p);
        }
    }
}

/**
 * Draws the current game frame.
*/
    draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackground();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.ctx.translate(this.camera_x, 0);
    this.drawGameObjects();
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
    }

/**
 * Draws the background and clouds.
*/
    drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    }

/**
 * Draws all status bars.
*/
    drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.endbossStatusBar);
    }

/**
 * Draws the player, enemies, collectibles,
 * and throwable objects.
*/
    drawGameObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    }

/**
 * Draws multiple drawable objects.
 *
 * @param {Array} objects - The objects to render.
*/
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

/**
 * Draws a single drawable object.
 *
 * @param {DrawableObject} mo - The object to render.
*/
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {this.flipImageBack(mo);
        }
    }

/**
 * Flips an object horizontally.
 *
 * @param {DrawableObject} mo - The object to flip.
*/
    flipImage(mo) {
        this.ctx.save(); // context wird gespeichert mit den jeweiligen Bildern
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

/**
 * Restores the original drawing direction.
 *
 * @param {DrawableObject} mo - The flipped object.
*/
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

/**
 * Stops the game and all active sounds.
*/
    stopGame(){
    this.gameOver = true;
    this.sound.stop("run");
    this.sound.stop("snoring");
    this.sound.stopMusic();
    }

/**
 * Creates and stores a managed interval.
 *
 * @param {Function} fn - The function to execute.
 * @param {number} time - The interval time in milliseconds.
*/
    addInterval(fn, time) {
    const id = setInterval(fn, time);
    this.interval.push(id);
    }
}
