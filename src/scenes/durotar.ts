import durotarJSON from "../assets/durotar.json";
import { Player } from "../entities/player";
import { Enemy } from "../entities/enemy";
import { TILES, SIZES, LAYERS, SPRITES } from "../utils/constants";

export class Durotar extends Phaser.Scene {
  private player?: Player;
  private bear: Enemy;
  private goat: Enemy;
  constructor() {
    super("DurotarScene");
  }

  preload() {
    this.load.image(TILES.DUROTAR, "src/assets/durotar.png");
    this.load.tilemapTiledJSON("map", "src/assets/durotar.json");
    this.load.spritesheet(
      SPRITES.PLAYER,
      "src/assets/characters/alliance.png",
      { frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT }
    );

    this.load.spritesheet(
      SPRITES.BEAR.base,
      "src/assets/characters/greybear.png",
      { frameWidth: SIZES.BEAR.WIDTH, frameHeight: SIZES.BEAR.HEIGHT }
    );
    this.load.spritesheet(SPRITES.GOAT.base, "src/assets/characters/goat.png", {
      frameWidth: SIZES.GOAT.WIDTH,
      frameHeight: SIZES.GOAT.HEIGHT,
    });
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

    this.player = new Player(this, 400, 250, SPRITES.PLAYER);
    this.bear = new Enemy(this, 50, 450, SPRITES.BEAR.base);
    this.bear.setSize(36, 36);
    this.bear.setOffset(10, 12);
    this.bear.setScale(0.9);

    this.goat = new Enemy(this, 450, 250, SPRITES.GOAT.base);
    this.goat.setSize(55, 55);
    this.goat.setOffset(22, 36);
    this.goat.setScale(0.3);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, wallsdLayer);
    wallsdLayer.setCollisionByExclusion([-1]);
  }

  update(_: number, delta: number): void {
    this.player.update(delta);
  }
}
