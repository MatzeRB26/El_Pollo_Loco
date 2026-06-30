import{ Level } from "../models/level.class.js"
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { Endboss } from "../models/endboss.class.js";

export const level1 = new Level( 
    [
        new Chicken(), 
        new Chicken(), 
        new Chicken(),
        new Endboss()
    ],

    [
        new Cloud()
    ],

    [
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
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720*3)
]
);