import explosionEffect from "../effects/explosion";
import Resources from "../resources";
import Entity from "./entity";

class Enemy extends Entity {
  static WIDTH = 48;
  static HEIGHT = 48;

  constructor(stage, x, y) {
    super(stage, Resources.pepeSpin, x, y, Enemy.WIDTH, Enemy.HEIGHT);

    this.advance = this.advance.bind(this);
    this._afterRemove = this._afterRemove.bind(this);
  }

  advance() {
    super.setY(super.getY() + 1);
    return super.getY();
  }

  // Override from parent
  _afterRemove(stage) {
    explosionEffect(
      stage,
      super.getX() + super.getWidth() / 2,
      super.getY() + super.getHeight() / 2
    );
  }
}

export default Enemy;
