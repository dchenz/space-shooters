import Resources from "../resources";
import render from "./render";

const config = {
  alpha: {
    start: 1,
    end: 1
  },
  scale: {
    start: 1,
    end: 1
  },
  color: {
    start: "ffffff",
    end: "666666"
  },
  speed: {
    start: 100,
    end: 50
  },
  startRotation: {
    min: 0,
    max: 360
  },
  rotationSpeed: {
    min: 30,
    max: 360
  },
  lifetime: {
    min: 2,
    max: 2
  },
  frequency: 0.05,
  emitterLifetime: 0.06,
  maxParticles: 1000,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  spawnType: "burst",
  particlesPerWave: 8,
  particleSpacing: 0,
  angleStart: 0,
  orderedArt: true
};

export default function destroyedEffect(container, x, y) {
  render(container, x, y, Resources.fragments.texture, config);
}




