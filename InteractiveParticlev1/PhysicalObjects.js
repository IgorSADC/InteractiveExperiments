class PhysicalObjects {
    //This is a generic abstract class for objects in the physics system


    constructor(pos, vel, acc, mass = 1) {
        this.position = pos;
        this.velocity = vel;
        this.acceleration = acc;
        this.readAcc = acc;
        this.mass = mass;
    }

    Update(resetForces = true) {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        if (resetForces) this.acceleration.mult(0);
    }

    ApplyForce(force) {
        this.acceleration.add(force);
        this.readAcc = this.acceleration.copy();
    }
}