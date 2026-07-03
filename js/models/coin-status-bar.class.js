import { DrawableObject } from "./drawable-object.class.js";

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

    constructor() {
        super();
        this.loadImages(this.COIN_IMAGES);
        this.x = 20;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.COIN_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}