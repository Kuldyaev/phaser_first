import { Enemy } from "./enemy";
import { SPRITES } from "../utils/constants";

export class Bear extends Enemy {
  textureKey: string;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.BEAR.base);
    this.scene = scene;
    this.scene.physics.add.existing(this);

    const anims = this.scene.anims;
    const animsFrameRate = 9;
    this.textureKey = texture;

    this.setSize(36, 36);
    this.setOffset(10, 12);
    this.setScale(0.9);

    anims.create({
      key: "downBear",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 9,
        end: 11,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "upBear",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 2,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    this.cycleTween();
    {
      this.scene.tweens.add({
        targets: this,
        duration: 4000,
        repeat: -1,
        yoyo: true,
        x: this.x + 5,
        y: this.y + 100,
        onRepeat: () => {
          this.play("upBear", true);
        },
        onYoyo: () => {
          this.play("downBear", true);
        },
      });
    }
  }
}
