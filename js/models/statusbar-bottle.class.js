import { DrawableObject } from "./drawable-object.class.js";

/**
 * Displays the player's collected bottle progress.
*/
export class BottleStatusBar extends DrawableObject {

    IMAGES_BOTTLE_GROUND = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    percentage = 0;

/**
 * Creates a new bottle status bar.
*/
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_GROUND);
        this.setPercentage(0);
        this.x = 25;
        this.y = 0;
        this.height = 50;
        this.width = 150;
    }

/**
 * Updates the displayed bottle percentage.
 *
 * @param {number} percentage - The current bottle percentage.
*/
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE_GROUND[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

/**
 * Returns the image index for the current bottle percentage.
 *
 * @returns {number} The index of the corresponding status bar image.
*/
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}