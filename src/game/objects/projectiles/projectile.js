import Resources from "../../resources";
import Entity from "../entity";

class Projectile extends Entity {
  static WIDTH = 30;
  static HEIGHT = 30;

  constructor(stage, x, y, damage, angle, speed) {
    super(
      stage,
      Resources.laser,
      x - Projectile.WIDTH / 2,
      y,
      Projectile.WIDTH,
      Projectile.HEIGHT
    );

    this.damage = damage;
    this.angle = angle;
    this.speed = speed;

    this.tick = this.tick.bind(this);
  }

  tick() {
    const deltaX = Math.sin((this.angle * Math.PI) / 180) * this.speed;
    const deltaY = Math.cos((this.angle * Math.PI) / 180) * this.speed;
    const newX = super.getX() + deltaX;
    const newY = super.getY() - deltaY;
    super.setX(newX);
    super.setY(newY);
    return [newX, newY];
  }
}

export default Projectile;
