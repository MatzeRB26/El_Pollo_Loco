let canvas; // eine variable für das Bildformat(720x480px)
let ctx; //ctx steht für context
let world = new World();



function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    
    console.log('My Character is', world.character);
}