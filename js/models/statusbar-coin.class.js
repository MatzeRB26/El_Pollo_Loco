import { DrawableObject } from "./drawable-object.class.js";

/**
 * Displays the player's collected coin progress.
*/
export class CoinStatusBar extends DrawableObject {

    COIN_IMAGES = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    percentage = 0;

/**
 * Creates a new coin status bar.
*/
    constructor() {
        super();
        this.loadImages(this.COIN_IMAGES);
        this.setPercentage(0);
        this.x = 25;
        this.y = 85;
        this.height = 50;
        this.width = 150;
    }

/**
 * Updates the displayed coin percentage.
 *
 * @param {number} percentage - The current coin percentage.
*/
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.COIN_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

/**
 * Returns the image index for the current coin percentage.
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
    } else if (this.percentage > 0) {
        return 1; 
    } else {
        return 0;
    }
}
}