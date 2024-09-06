import durotarJSON from "../assets/durotar.json";
import { TILES, SIZES, LAYERS } from "../utils/constants";

export class Durotar extends Phaser.Scene {
  constructor() {
    super("DurotarScene");
  }

  preload() {
    this.load.image(TILES.DUROTAR, "src/assets/durotar.png");
    this.load.tilemapTiledJSON("map", "src/assets/durotar.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(
      durotarJSON.tilesets[0].name,
      TILES.DUROTAR,
      SIZES.TILE,
      SIZES.TILE
    );
    const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
    const wallsdLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);
  }
}
