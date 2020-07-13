const states = {
    CONFIGURE: "CONFIGURATION",
    MOVING: "MOVING"
}

const conversionFactors = {
    velocity: 0.1,
    accelaration: 0.005
}
currentState = status.config; //static variable

class InteractiveChargeParticle extends ChargedParticle {
    //This class is a simple particle with velocity, position and acceleration.
    constructor(drawableVector, accelerationVector, charge = 0, spawnOnTheOtherSide = true) {
        super(drawableVector.offset, drawableVector.vector.copy().mult(conversionFactors.velocity), accelerationVector.vector.copy().mult(conversionFactors.accelaration), charge);
        this.drawableVector = drawableVector;
        this.accelerationVector = accelerationVector;
        this.spawnOnTheOtherSide = spawnOnTheOtherSide;
    }
    Update() {
        //Update position
        if (currentState == states.MOVING) {
            super.Update();
            this.runningUpdate();

        } else {
            this.config();
            this.drawableVector.Update();
            this.accelerationVector.Update();
        }
    }

    Start() {
        //Starts the simulation
        currentState = states.MOVING;
    }
    config() {
        //Update the position with the user input
        this.position = this.drawableVector.offset;
        this.velocity = this.drawableVector.vector.copy().mult(conversionFactors.velocity);
        this.accelaration = this.accelerationVector.vector.copy().mult(conversionFactors.accelaration);
    }
    runningUpdate() {
        //Update the drawable vector with the current status from simulation
        if (this.spawnOnTheOtherSide) {
            if (this.position.x > width) { this.position.x = 0; } else if (this.position.x < 0) { this.position.x = width; }
            if (this.position.y > height) { this.position.y = 0; } else if (this.position.y < 0) { this.position.y = height; }
        }

        this.drawableVector.vector = this.velocity.copy().mult(1 / conversionFactors.velocity);
        this.accelaration.vector = this.accelaration.copy().mult(1 / conversionFactors.accelaration);
    }
    draw() {
        //Draw the particle and the vectors on the screen
        super.draw();
        this.drawableVector.draw();
        this.accelerationVector.draw();
    }

}