let canvas; // eine variable für das Bildformat(720x480px)
let world;


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    
    
    console.log('My Character is', world.character);
}