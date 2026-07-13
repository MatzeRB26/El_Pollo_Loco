export class SoundManager {
    sounds = {};
    muted = false;

    constructor() {
    this.loadSounds();
    this.muted = localStorage.getItem("muted") === "true";
    Object.values(this.sounds).forEach(sound => { sound.muted = this.muted;
    });
    }

loadSounds(){
    this.sounds = {
        gameStart: new Audio("audio/sounds/game/gameStart.mp3"),
            win: new Audio("audio/sounds/game/win.mp3"),
            jump: new Audio("audio/sounds/character/characterJump.wav"),
            run: new Audio("audio/sounds/character/characterRun.mp3"),
            snoring: new Audio("audio/sounds/character/characterSnoring.mp3"),
            damage: new Audio("audio/sounds/character/characterDamage.mp3"),
            dead: new Audio("audio/sounds/character/characterDead.wav"),
            coin: new Audio("audio/sounds/collectibles/collectSound.wav"),
            bottleCollect: new Audio("audio/sounds/collectibles/bottleCollectSound.wav"),
            bottleBreak: new Audio("audio/sounds/throwable/bottleBreak.mp3"),
            chickenDead: new Audio("audio/sounds/chicken/chickenDead.mp3"),
            chickenDead2: new Audio("audio/sounds/chicken/chickenDead2.mp3"),
            endbossApproach: new Audio("audio/sounds/endboss/endbossApproach.wav")
    };

    this.sounds.run.loop = true;
    this.sounds.snoring.loop = true;
}

play(name){
    const sound = this.sounds[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
}


stop(name){
    this.sounds[name]?.pause();
    if(this.sounds[name]){
        this.sounds[name].currentTime = 0;
        }
    }

    toggleMute() {
    this.muted = !this.muted;
    Object.values(this.sounds).forEach(sound => {sound.muted = this.muted;
    });
    localStorage.setItem("muted", this.muted);
    return this.muted;
    }
}
