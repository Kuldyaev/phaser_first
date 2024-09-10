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
  }

  cycleTween(
    duration: number,
    deltaX: number,
    deltaY: number,
    onRepeat: () => void,
    onYoYo: () => void
  ) {
    this.scene.tweens.add({
      targets: this,
      duration: duration,
      repeat: -1,
      yoyo: true,
      x: this.x + deltaX,
      y: this.y + deltaY,
      onRepeat: onRepeat,
      onYoyo: onYoYo,
    });
  }

  stopcycleTween() {
    this.scene.tweens.killTweensOf(this);
  }

  returnToOriginalPosition(
    distanceToPosition: number,
    moveSpeed: number,
    initialPositionX: number,
    initialPositionY: number,
    cycleTween: () => void
  ) {
    this.setVelocity(0, 0);

    this.scene.tweens.add({
      targets: this,
      x: initialPositionX,
      y: initialPositionY,
      duration: (distanceToPosition * 1000) / moveSpeed,
      onComplete: cycleTween,
    });
  }

  attack() {}

  takeDamage(damage: number) {
    super.takeDamage(damage);

    if (this.health <= 0) {
      this.deactivate(100, 100);
    }
  }

  deactivate(x: number, y: number) {
    this.stopcycleTween();
    this.setPosition(x, y);
    this.setVisible(false);
    this.isAlive = false;
  }
}
