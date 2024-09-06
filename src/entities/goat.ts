import { Enemy } from "./enemy";
import { SPRITES } from "../utils/constants";

export class Goat extends Enemy {
  textureKey: string;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.GOAT.base);
    this.scene = scene;
    this.scene.physics.add.existing(this);

    const anims = this.scene.anims;
    const animsFrameRate = 9;
    this.textureKey = texture;

    this.setSize(55, 55);
    this.setOffset(22, 36);
    this.setScale(0.3);

    anims.create({
      key: "leftGoat",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 4,
        end: 7,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "rightGoat",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 20,
        end: 23,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    this.cycleTween();
    {
      this.scene.tweens.add({
        targets: this,
        duration: 5000,
        repeat: -1,
        yoyo: true,
        x: this.x + 100,
        y: this.y,
        onRepeat: () => {
          this.play("leftGoat", true);
        },
        onYoyo: () => {
          this.play("rightGoat", true);
        },
      });
    }
  }
}
