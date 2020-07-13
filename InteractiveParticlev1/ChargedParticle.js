class ChargedParticle extends PhysicalObjects {

    constructor(pos, vel, acc, charge) {
        super(pos, vel, acc);
        this.charge = charge;
        this.radius = 8;
    }
    draw() {
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }

    EletricalForce(force) {
        let normalizedForce = force / this.charge;
        this.ApplyForce(normalizedForce);
    }

}