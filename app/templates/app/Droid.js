var PIXI = require('pixi.js');

// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
var renderer = new PIXI.WebGLRenderer(800, 600);

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

var droid = null;

// load the texture we need
PIXI.loader.add('droid', 'assets/android_icon.png').load(function (loader, resources) {
    // This creates a texture from a 'droid.png' image.
    droid = new PIXI.Sprite(resources.droid.texture);

    // Setup the position and scale of the droid
    droid.position.x = 400;
    droid.position.y = 300;

    droid.scale.x = 1;
    droid.scale.y = 1;

    droid.anchor.x = 0.5;
    droid.anchor.y = 0.5;

    // Add the droid to the scene we are building.
    stage.addChild(droid);

    // kick off the animation loop (defined below)
    animate();
});

function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);

    // each frame we spin the droid around a bit
    droid.rotation += 0.01;

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}
