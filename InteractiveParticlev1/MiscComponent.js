const fieldsTypes = {
    Magnetic: "Maginetic"
}

class MiscComponent {
    constructor(type, field) {
        //This class creates a force field on the environment.
        this.fieldType = type;
        this.field = field;
        this.force = createVector(0, 0);

    }
    CreateField(particle) {
        if (this.fieldType == fieldsTypes.Magnetic) {
            this.CreateMagneticField(particle);
        }
    }

    Update() {

        particles.forEach(particle => {
            this.CreateField(particle);
            particle.ApplyForce(this.force);
        });
    }

    CreateMagneticField(particle) {
        let force;
        force = this.field.copy().cross(particle.velocity).mult(particle.charge);
        this.force = force;
        return force;
    }


}