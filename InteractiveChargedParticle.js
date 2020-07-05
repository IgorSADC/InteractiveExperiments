const states = {
    CONFIGURE: "CONFIGURATION",
    MOVING: "MOVING"
}

const conversionFactors = {
    velocity: 0.1,
    accelaration: 0.005
}

class InteractiveChargeParticle extends ChargedParticle {
    constructor(drawableVector, accelerationVector, charge = 0) {
        console.log(drawableVector);
        super(drawableVector.offset, drawableVector.vector.copy().mult(conversionFactors.velocity), accelerationVector.vector.copy().mult(conversionFactors.accelaration), charge);
        this.currentState = states.CONFIGURE;
        this.drawableVector = drawableVector;
        this.accelerationVector = accelerationVector;
    }
    Update() {
        if (this.currentState == states.MOVING) {
            super.Update();
            this.runningUpdate();

        } else {
            this.config();
        }
    }

    Start() {
        this.currentState = states.MOVING;
    }
    config() {
        this.position = this.drawableVector.offset;
        this.velocity = this.drawableVector.vector.copy().mult(conversionFactors.velocity);
        this.accelaration = this.accelerationVector.vector.copy().mult(conversionFactors.accelaration);
    }
    runningUpdate() {

        this.drawableVector.vector = this.velocity.copy().mult(1 / conversionFactors.velocity);
        this.accelaration.vector = this.accelaration.copy().mult(1 / conversionFactors.accelaration);
    }
    draw() {
        super.draw();
        this.drawableVector.draw();
        this.accelerationVector.draw();
    }

}