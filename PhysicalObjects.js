class PhysicalObjects {

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

    ApplyForce(force) {
        this.accelaration.add(force);
    }

}