import { MoveableObject } from "./moveable-object.class.js";

export class Cloud extends MoveableObject {
    y = 20;

    width = 500;
    height = 250;

    constructor() {
        super().loadImage("assets/img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 500; // Zahl zwischen 200 und 700 bei jedem game start befinden sie sich woanders
        this.animate();
        
    }

    animate(){
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}
