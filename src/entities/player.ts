import { Entity } from "./entity";
import { SPRITES } from "./../utils/constants";

export class Player extends Entity {
  textureKey: string;
  private moveSpeed: number;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.PLAYER);
    this.scene = scene;
    this.scene.add.existing(this);

    const anims = this.scene.anims;
    const animsFrameRate = 9;
    this.textureKey = texture;
    this.moveSpeed = 40;
    this.setSize(28, 32);
    this.setOffset(10, 16);
    this.setScale(0.8);

    anims.create({
      key: "down",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 2,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "up",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 36,
        end: 38,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "left",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 12,
        end: 14,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "right",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 24,
        end: 26,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });
  }

  update(delta: number): void {
    const keys = this.scene.input.keyboard.createCursorKeys();

    if (keys.up.isDown) {
      this.play("up", true);
      this.setPosition(this.x, this.y - delta * 0.1);
      this.setVelocity(0, -this.moveSpeed);
    } else if (keys.down.isDown) {
      this.play("down", true);
      this.setPosition(this.x, this.y + delta * 0.1);
      this.setVelocity(0, this.moveSpeed);
    } else if (keys.left.isDown) {
      this.play("left", true);
      this.setPosition(this.x - delta * 0.1, this.y);
      this.setVelocity(-this.moveSpeed, 0);
    } else if (keys.right.isDown) {
      this.play("right", true);
      this.setPosition(this.x + delta * 0.1, this.y);
      this.setVelocity(this.moveSpeed, 0);
    } else {
      this.setVelocity(0, 0);
      this.stop();
    }
  }
}
