/**
 * Base class for all drawable game objects.
 * Handles image loading and rendering on the canvas.
*/
export class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height =  150;
    width = 100;

/**
 * Loads a single image.
 *
 * @param {string} path - The path to the image file.
*/
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

/**
 * Loads multiple images and stores them in the image cache.
 *
 * @param {string[]} arr - An array of image paths.
*/
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

/**
 * Draws the object on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The rendering context.
*/
    draw(ctx){
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

/**
 * Draws the collision frame for debugging.
 *
 * @param {CanvasRenderingContext2D} ctx - The rendering context.
*/
    drawFrame(ctx){
        if (this.showHitBox) {
        this.getRealFrame();
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.rX, this.rY, this.rW, this.rH);
        ctx.stroke();
        }
    }
}