let PIXI = require('pixi');

let renderer = new PIXI.WebGLRenderer(800, 600, {backgroundColor:0xE2F0D6});

document.body.appendChild(renderer.view);

let stage = new PIXI.Container();

let style = {
    font: "bold 36px Arial",
    fill: '#95AB63',
    stroke: '#10222B',
    strokeThickness : 5
};

let text = new PIXI.Text('Hello Pixi', style);

text.anchor.x = 0.5;
text.anchor.y = 0.5;
text.position.x = 400;
text.position.y = 300;

stage.addChild(text);

animate();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}
