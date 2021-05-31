import Resources from "../resources";
import Entity from "./entity";
import Projectile from "./projectiles/projectile";
import destroyedEffect from "../effects/destroyed";

class Player extends Entity {

  static WIDTH = 48;
  static HEIGHT = 48;

  constructor(stage) {

    super(
      stage, Resources.player,
      window.innerWidth / 2 - Player.WIDTH / 2,
      window.innerHeight - Player.HEIGHT - 50,
      Player.WIDTH, Player.HEIGHT
      );

    this.stage = stage;
    this.isAlive = true;
    this.attackRate = 15;
    this.isAttacking = false;

    this.attack = this.attack.bind(this);
    this.getAliveStatus = this.getAliveStatus.bind(this);
    this.getAttackingStatus = this.getAttackingStatus.bind(this);
    this.getAttackRate = this.getAttackRate.bind(this);
    this._setPositionOnMouseMove = this._setPositionOnMouseMove.bind(this);
    this._setAttackTrue = this._setAttackTrue.bind(this);
    this._setAttackFalse = this._setAttackFalse.bind(this);
    this._afterRemove = this._afterRemove.bind(this);

    document.addEventListener("mousemove", this._setPositionOnMouseMove);
    document.addEventListener("mousedown", this._setAttackTrue);
    document.addEventListener("mouseup", this._setAttackFalse);

  }

  attack() {
    return new Projectile(
      this.stage,
      super.getX() + super.getWidth() / 2,
      super.getY(), 1, 0, 15
    );
  }

  getAliveStatus() {
    return this.isAlive;
  }

  getAttackingStatus() {
    return this.isAttacking;
  }

  getAttackRate() {
    return this.attackRate;
  }

  _setPositionOnMouseMove(e) {
    super.setX(e.clientX - super.getWidth() / 2);
    super.setY(window.innerHeight - Player.HEIGHT - 50);
  }

  _setAttackTrue() {
    this.isAttacking = true;
  }

  _setAttackFalse() {
    this.isAttacking = false;
  }

  // Override from parent
  _afterRemove(stage) {
    this.isAlive = false;
    destroyedEffect(
      stage,
      super.getX() + super.getWidth() / 2,
      super.getY() + super.getHeight() / 2
    );
    document.removeEventListener("mousemove", this._setPositionOnMouseMove);
    document.removeEventListener("mousedown", this._setAttackTrue);
    document.removeEventListener("mouseup", this._setAttackFalse);
  }

}

export default Player;