let v;
let p;

function setup() {

    createCanvas(600, 600);

    v = new DrawableVector(50, 0, 8, 8);
    a = new DrawablePositionedVector(25, 25, v);
    p = new InteractiveChargeParticle(v, a, 1);
    startButton = createButton("Start");
    startButton.mousePressed(Start);

}

function draw() {
    background(255);
    p.draw();
    p.Update();
}

function Start() {
    p.Start();
}

function keyPressed() {
    v.keyPressed(keyCode);

}