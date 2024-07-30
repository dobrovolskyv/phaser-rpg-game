import durotarJSON from '../assets/durotar.json';
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";

export class Durotar extends Phaser.Scene{
    constructor(){
        super('DurotarScene');
    }

    preload(){
        this.load.image(TILES.DUROTAR, 'src/assets/durotar.png');
        this.load.tilemapTiledJSON('map', 'src/assets/durotar.json.tmj');
        this.load.spritesheet(SPRITES.PLAYER, 'src/assets/player.png', {frameWidth: 32, frameHeight: 32});
    }

    create(){
        const map = this.make.tilemap({ key: 'map' });
        const tileset =map.addTilesetImage(durotarJSON.tilesets[0].name, TILES.DUROTAR, SIZES.TILE, SIZES.TILE);
        const groundlayer = map.createLayer(LAYERS.GROUND, tileset, 0,0);
        const wallslayer = map.createLayer(LAYERS.WALLS, tileset, 0,0);
    }
}