class PhysicalObjects {
    //This is a generic abstract class for objects in the physics system


    constructor(pos, vel, acc) {
        this.position = pos;
        this.velocity = vel;
        this.accelaration = acc;
    }

    Update(resetForces = false) {
        this.position.add(this.velocity);
        this.velocity.add(this.accelaration);
        if (resetForces) this.accelaration.mult(0);
    }

    ApplyForce(normalizedForce) {
        this.accelaration.add(normalizedForce);
    }

}