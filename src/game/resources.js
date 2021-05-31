import "./assets/spritesheet.png";
import "./assets/spritesheet_pepe-spin.png";

export default {
  player: {
    src: "square.png",
    sheet: "/assets/spritesheet.json"
  },
  fragments: {
    src: "icon",
    sheet: "/assets/spritesheet.json"
  },
  laser: {
    src: "laser.png",
    sheet: "/assets/spritesheet.json"
  },
  pepeSpin: {
    src: "pepe-spin_",
    sheet: "/assets/spritesheet_pepe-spin.json",
    animated: true
  },
  particles: {
    src: "particle.png",
    sheet: "/assets/spritesheet.json"
  }
};
