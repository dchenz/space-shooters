import { Emitter } from "pixi-particles";

export default function render(container, x, y, texture, config) {
  let emitter = new Emitter(container, texture, config);
  emitter.updateOwnerPos(x, y);
  emitter.playOnceAndDestroy();
}
