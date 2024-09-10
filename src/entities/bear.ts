import { Enemy } from "./enemy";
import { Entity } from "./entity";
import { SPRITES } from "../utils/constants";

export class Bear extends Enemy {
  textureKey: string;
  private player: Entity;
  private initialPosition: { x: number; y: number };
  private isFollowing: boolean;

  private agroDistance: number;
  private attackRange: number;
  private followRange: number;
  private moveSpeed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.BEAR.base);
    this.scene = scene;
    this.scene.physics.add.existing(this);

    const anims = this.scene.anims;
    const animsFrameRate = 9;
    this.textureKey = texture;

    this.initialPosition = { x, y };
    this.isFollowing = false;
    this.isAlive = true;
    this.agroDistance = 100;
    this.attackRange = 40;
    this.followRange = 350;
    this.moveSpeed = 100;

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

    this.cycleTween(
      4000,
      5,
      100,
      () => this.upBear(),
      () => this.downBear()
    );
    this.setFlipX(false);
  }

  upBear() {
    this.play("upBear", true);
  }

  downBear() {
    this.play("downBear", true);
  }

  setPlayer(player: Entity) {
    this.player = player;
  }

  followToPlayer(player) {
    this.scene.physics.moveToObject(this, player, this.moveSpeed);
  }

  update() {
    /// 1. расчет дистанции до персонажа
    const player = this.player;
    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      player.x,
      player.y
    );
    const distanceToPosition = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.initialPosition.x,
      this.initialPosition.y
    );
    /// 2.Остановка ожидания, включение режима следования
    if (!this.isFollowing && distanceToPlayer < this.agroDistance) {
      this.isFollowing = true;
      this.stopcycleTween();
    }
    /// 3.режим следования
    if (this.isFollowing && this.isAlive) {
      this.followToPlayer(player);
      if (distanceToPlayer < this.attackRange) {
        this.setVelocity(0, 0);
      }
      ////  3.2 Возврат на исходную позицию
      if (distanceToPosition > this.followRange) {
        this.isFollowing = false;
        this.returnToOriginalPosition(
          distanceToPosition,
          this.moveSpeed,
          this.initialPosition.x,
          this.initialPosition.y,
          () =>
            this.cycleTween(
              4000,
              5,
              100,
              () => this.upBear(),
              () => this.downBear()
            )
        );
      }
    }
  }
}
