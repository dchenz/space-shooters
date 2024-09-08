import { AnimatedSprite, Sprite } from "pixi.js";

class Entity {

  constructor(stage, resource, x, y, width, height) {

    if (resource.animated) {
      // Animated sprites are created using an array of textures
      this.sprite = new AnimatedSprite(resource.texture);
      this.sprite.play(); // Need to call play
    } else {
      // Static sprites are created using one texture
      this.sprite = new Sprite(resource.texture);
    }

    // Set sprite dimensions and position
    this.sprite.width = width;
    this.sprite.height = height;
    this.sprite.position.set(x, y);

    // Add sprite to stage
    this.stage = stage;
    this.stage.addChild(this.sprite);

    this.getX = this.getX.bind(this);
    this.getY = this.getY.bind(this);
    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getBoundaryBox = this.getBoundaryBox.bind(this);
    this.setTexture = this.setTexture.bind(this);
    this.remove = this.remove.bind(this);
    this._afterRemove = this._afterRemove.bind(this);

  }

  // Get X position on stage
  getX() {
    return this.sprite.x;
  }

  // Get Y position on stage
  getY() {
    return this.sprite.y;
  }

  // Set X position on stage
  setX(x) {
    this.sprite.x = x;
  }

  // Set Y position on stage
  setY(y) {
    this.sprite.y = y;
  }

  // Get sprite width
  getWidth() {
    return this.sprite.width;
  }

  // Get sprite height
  getHeight() {
    return this.sprite.height;
  }

  // Get the X, Y values of sprite edges
  getBoundaryBox() {
    return {
      top: this.getY(),
      left: this.getX(),
      right: this.getX() + this.getWidth(),
      bottom: this.getY() + this.getHeight()
    };
  }

  // Change appearance of sprite to new texture
  setTexture(texture) {
    this.sprite.texture = texture;
  }

  // Hide the sprite
  remove() {
    if (this.sprite.visible) {
      this.sprite.visible = false;
      this._afterRemove(this.stage);
    }
  }

  _afterRemove() {
    // Default method does nothing. Child should implement.
  }

}

export default Entity;