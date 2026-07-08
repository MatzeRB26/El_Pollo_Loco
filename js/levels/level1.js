import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { SmallChicken } from "../models/small-chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Coin } from "../models/coin.class.js";
import { Bottle } from "../models/bottle.class.js";

export function createLevel1(){
    return new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ],

    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],

    [
        new Coin(300, 280),
        new Coin(500, 230),
        new Coin(700, 280),
        new Coin(800, 180),
        new Coin(1000, 130),
        new Coin(1300, 180),
        new Coin(1700, 310),
        new Coin(1900, 260),
        new Coin(2000, 220),
        new Coin(2200, 180)
    ],

    [
        new Bottle(200, 350),
        new Bottle(290, 365),
        new Bottle(590, 350),
        new Bottle(630, 375),
        new Bottle(710, 370),
        new Bottle(840, 360),
        new Bottle(950, 370),
        new Bottle(1100, 375),
        new Bottle(1300, 380),
        new Bottle(1500, 385),
        new Bottle(1600, 375),
        new Bottle(1800, 380),
        new Bottle(2000, 385)
    ],

    [
        new BackgroundObject("assets/img/5_background/layers/air.png", -720),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png",-720,),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png",-720,),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png",-720,),

        new BackgroundObject("assets/img/5_background/layers/air.png", 0),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png",0,),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png",0,),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png",0,),
        new BackgroundObject("assets/img/5_background/layers/air.png", 720),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png",720,),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png",720,),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png",720,),

        new BackgroundObject("assets/img/5_background/layers/air.png", 720 * 2),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png",720 * 2,),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png",720 * 2,),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png",720 * 2,),
        new BackgroundObject("assets/img/5_background/layers/air.png", 720 * 3),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png",720 * 3,),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png",720 * 3,),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png",720 * 3,),
    ],
);
}
