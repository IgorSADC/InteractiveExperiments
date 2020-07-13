const changeModes = {
    ChangeSize: "Size And Direction",
    ChangePosition: "Position"
}


class DrawableVector {
    constructor(x, y, xOff, yOff, color = 'black', shouldDrawText = true) {
        //this class is a vector that can be draw on the screen easily
        this.vector = createVector(x, y);
        this.offset = createVector(xOff, yOff);
        this.moving = false;
        this.mouseOffset = createVector(0, 0);
        this.boundIncrease = 7;
        this.changingMode = changeModes.ChangePosition;
        this.shouldDrawText = shouldDrawText;
        this.color = color
    }

    draw() {
        //This function draws the vector and (if wanted) the text
        // this.moveOnMouse();
        this.drawArrow(this.offset, this.vector, this.color);
        if (this.shouldDrawText)
            this.drawMode();
    }
    Update() {
        this.moveOnMouse();
    }

    keyPressed(keyCode) {
        //This function check if the user wants to change the interactable mode
        if (keyCode == TAB) {
            this.moving = false; // This is important to recalculate the offset
            if (this.changingMode == changeModes.ChangePosition) {
                this.changingMode = changeModes.ChangeSize;
            } else {
                this.changingMode = changeModes.ChangePosition;
            }
        }
    }

    drawArrow(base, vec, myColor) {
        //This function draws the arrow. It was from the p5js reference.
        push();
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(base.x, base.y);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        let arrowSize = 7;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }

    drawMode() {
        //thisFunction draws the text about the mode of interaction on the vector
        textSize(16);
        text(this.changingMode, width / 2, 20);
    }

    moveOnMouse() {
        //this function allows mouse interactions
        let mouseVector = createVector(mouseX, mouseY);

        if (this.checkPosition(mouseVector) && mouseIsPressed && !this.moving) {

            this.moving = true;
            let temp = mouseVector.copy();
            this.mouseOffset = temp.sub(this.offset);
        }
        if (this.moving) {
            this.moving = mouseIsPressed;
            if (this.changingMode == changeModes.ChangePosition) { this.moveOnMouseChangePosition(mouseVector); } else { this.moveOnMouseChangeDirection(mouseVector); }
        }
    }
    moveOnMouseChangePosition(mouseVector) {
        //This function is for the position change mode
        this.offset = mouseVector.sub(this.mouseOffset);
    }

    moveOnMouseChangeDirection(mouseVector) {
        //this function is for the direction and magnitude mode
        let temp = mouseVector.copy();
        this.vector = mouseVector.sub(this.offset);

    }

    checkPosition(objectPosition) {
        //this function checks if the user is clicking at the vector
        let lBx = Math.min(this.offset.x, this.offset.x + this.vector.x);
        let uBx = Math.max(this.offset.x, this.offset.x + this.vector.x);
        let lBy = Math.min(this.offset.y, this.offset.y + this.vector.y);
        let uBy = Math.max(this.offset.y, this.offset.y + this.vector.y);
        uBx += this.boundIncrease;
        uBy += this.boundIncrease;
        if ((lBx < objectPosition.x && uBx > objectPosition.x) && (lBy < objectPosition.y && uBy > objectPosition.y)) {
            return true;
        }
        return false;
    }


}

class DrawablePositionedVector extends DrawableVector {
    constructor(x, y, parentDrawableVector, color = 'blue', shouldDrawText = false) {
        //this class is a vector that can be draw on the screen easily
        super(x, y, parentDrawableVector.xOff, parentDrawableVector.yOff, color, shouldDrawText);
        this.parentDrawableVector = parentDrawableVector;
        this.changingMode = changeModes.ChangeSize;
    }

    moveOnMouseChangePosition() {
        return;
    }

    draw() {

        super.draw();
        this.offset = this.parentDrawableVector.offset;
    }
    moveOnMouse() {
        if (!this.parentDrawableVector.moving) {
            super.moveOnMouse();
        }
    }

}