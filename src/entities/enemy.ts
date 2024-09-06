import { Entity } from "./entity";

export class Enemy extends Entity {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type?: string
  ) {
    super(scene, x, y, texture);
    this.setFlipX(false);
  }

  cycleTween(
    duration?: number,
    deltaX?: number,
    deltaY?: number,
    onrepeat?: void,
    onyoyo?: void
  ) {
    this.scene.tweens.add({
      targets: this,
      duration: duration || 2000,
      repeat: -1,
      yoyo: true,
      x: this.x + (deltaX || 0),
      y: this.y + (deltaY || 0),
      onRepeat: () => {
        onrepeat;
      },
      onYoyo: () => {
        onyoyo;
      },
    });
  }
}
