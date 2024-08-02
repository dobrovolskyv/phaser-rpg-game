import { Entity } from "./entity";

export class Enemy extends Entity {
    private player: Entity;
    private isFollowing: boolean;
    private agroDistance: number;
    private attackRange: number;
    private followRange: number;
    private moveSpeed: number;
    private isAlive: boolean;
    private initialPostion: any;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)

        this.initialPostion= {x,y};

        this.cycleTween()
        this.setFlipX(true)

        this.isFollowing = false;
        this.agroDistance = 100;
        this.moveSpeed = 50;
        this.isAlive = true
        this.attackRange = 40;
        this.followRange = 250;
    }

    cycleTween() {
        this.scene.tweens.add({
            targets: this,
            duration: 2000,
            repeat: -1,
            yoyo: true,
            x: this.x + 100,
            onRepeat: () => {
                this.setFlipX(true)
            },
            onYoyo: () => {
                this.setFlipX(false)
            }
        })
    }

    setPlayer(player: Entity) {
        this.player = player;
    }

    stopCycleTween() {
        this.scene.tweens.killTweensOf(this)
    }

    followToPlayer(player) {
        this.scene.physics.moveToObject(this, player, this.moveSpeed);
    }

    returnToOriginalPosition(distanceToPosition) {
        this.setVelocity(0,0)

        this.scene.tweens.add({
            targets: this,
            x: this.initialPostion.x,
            y: this.initialPostion.y,
            duration: distanceToPosition * 1000/ this.moveSpeed,
            onComplete: () => {
                this.cycleTween()
            }
        })
    }

    update() {
        //Расчет дистанции до пресонажа
        const player = this.player;
        const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y)
        const distanceToPosition = Phaser.Math.Distance.Between(this.x, this.y, this.initialPostion.x, this.initialPostion.y)

        //Остановка цикла, включение режима следования
        if (!this.isFollowing && distanceToPlayer < this.agroDistance) {
            this.isFollowing = true;
            this.stopCycleTween();
        }

        //Режим следования
        if (this.isFollowing && this.isAlive) {
            this.followToPlayer(player);
            //Начало файтинга
            if (distanceToPlayer < this.attackRange) {
                this.setVelocity(0, 0)
            }
            //возвращает нас на начальную позицию
            if(distanceToPosition > this.followRange) {
                this.isFollowing = false;
                this.returnToOriginalPosition(distanceToPosition);
            }
        }
    }
}