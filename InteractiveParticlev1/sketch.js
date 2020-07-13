let v;
let p;
let particles = [];
let fieldIntensiy;

function setup() {

    createCanvas(600, 600);

    v = new DrawableVector(50, 0, 8, 8);
    a = new DrawablePositionedVector(0, 0, v);
    p = new InteractiveChargeParticle(v, a, 1 * conversionFactors.acceleration);
    m = new MiscComponent(fieldsTypes.Magnetic, createVector(0, 0, 1));
    particles.push(p);
    fieldIntensiy = createSlider(-10, 10, 1);
    startButton = createButton("Start");
    startButton.mousePressed(Start);

}

function draw() {
    background(255);
    p.draw();
    p.Update();
    m.Update();
    m.field = createVector(0, 0, fieldIntensiy.value());
}

function Start() {
    p.Start();
}

function keyPressed() {
    v.keyPressed(keyCode);
}