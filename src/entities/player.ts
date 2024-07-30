import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class PLayer extends Entity {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string){
        super(scene, x,y,texture, SPRITES.PLAYER)
    }
}
