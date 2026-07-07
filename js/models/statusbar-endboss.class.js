import { DrawableObject } from "./drawable-object.class.js";

export class EndbossStatusBar extends DrawableObject {
    IMAGES = [
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green0.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 440;
        this.height = 45;
        this.width = 145;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        this.img = this.imageCache[this.IMAGES[this.resolveImageIndex()]];
    }

    resolveImageIndex() {
        if (this.percentage == 100) return 0;
        if (this.percentage >= 80) return 1;
        if (this.percentage >= 60) return 2;
        if (this.percentage >= 40) return 3;
        if (this.percentage >= 20) return 4;
        return 5;
    }
}