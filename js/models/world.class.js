import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObject } from "./background-object.class.js";

export class World {
    character = new Character();
    enemies = [
        new Chicken(), 
        new Chicken(), 
        new Chicken(),
    ];

    clouds = [
        new Cloud()
    ];

    backgroundObjects = [
        new BackgroundObject('assets/img/5_background/layers/air.png', -720),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -720),

        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/air.png', 720),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720*2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 720*2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 720*2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 720*2),
        new BackgroundObject('assets/img/5_background/layers/air.png', 720*3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720*3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720*3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720*3),


    ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }


    draw(){

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        
        this.addObjectsToMap(this.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);

        let self = this; // diese function arbeitet erst dann wenn alles vorgezeichnet ist aus dem DrawImage(draw wird immer wieder aufgerufen)
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
        this.addToMap(o);
        });
    }

    addToMap(mo){
    if(mo.otherDirection){
        this.ctx.save(); // context wird gespeichert mit den jeweiligen Bildern
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if(mo.otherDirection){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    }
}
