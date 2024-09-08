import { Loader } from "pixi.js";
import Resources from "./resources";

export default function loadGraphics(setup) {
  // Get unique spritesheets used by the resources
  const resources = [
    ...new Set(Object.keys(Resources).map((key) => Resources[key].sheet)),
  ];

  // Create loader
  const loader = new Loader();

  // Add all spritesheets to loader
  loader.add(resources);

  // Bind and setup on complete
  loader.load(() => {
    bindResourceTextures(loader);
    setup();
  });
}

function bindResourceTextures(loader) {
  function addSingleTexture(res) {
    res.texture = loader.resources[res.sheet].textures[res.src];
  }

  function addMultipleTextures(res) {
    const spritesheet = loader.resources[res.sheet].textures;
    const keys = Object.keys(spritesheet);
    const textureFiles = keys.filter((key) => key.startsWith(res.src));
    res.texture = textureFiles.map((file) => spritesheet[file]);
  }

  addSingleTexture(Resources.player);
  addMultipleTextures(Resources.fragments);
  addSingleTexture(Resources.laser);
  addMultipleTextures(Resources.pepeSpin);
  addSingleTexture(Resources.particles);
}
