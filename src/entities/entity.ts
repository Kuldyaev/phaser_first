export class Entity extends Phaser.Physics.Arcade.Sprite {
  health: number;
  isAlive: boolean;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,

    texture: string,
    type?: string
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.isAlive = true;
    this.health = 100;
  }

  takeDamage(damage: number) {
    if (this.health > 0) {
      this.health -= damage;
    }
  }
}
