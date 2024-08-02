import durotarJSON from '../assets/durotar.json';
import { Player } from '../entities/player';
import { Enemy } from '../entities/enemy';
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";

export class Durotar extends Phaser.Scene{
    private player?: Player;
    private boar?: Enemy;

    constructor(){
        super('DurotarScene');
    }

    preload(){
        this.load.image(TILES.DUROTAR, 'src/assets/durotar.png');
        this.load.tilemapTiledJSON('map', 'src/assets/durotar.json.tmj');
        this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/alliance.png', {
            frameWidth: SIZES.PLAYER.WIDTH, 
            frameHeight: SIZES.PLAYER.HEIGHT});

        this.load.spritesheet(SPRITES.BOAR.base, 'src/assets/characters/boar.png', {
            frameWidth: SIZES.BOAR.WIDTH, 
            frameHeight: SIZES.BOAR.HEIGHT});
    }

    create(){
        const map = this.make.tilemap({ key: 'map' });
        const tileset =map.addTilesetImage(durotarJSON.tilesets[0].name, TILES.DUROTAR, SIZES.TILE, SIZES.TILE);
        const groundlayer = map.createLayer(LAYERS.GROUND, tileset, 0,0);
        const wallslayer = map.createLayer(LAYERS.WALLS, tileset, 0,0);

        this.player  = new Player(this, 400, 250, SPRITES.PLAYER);
        this.boar = new Enemy(this, 100, 100, SPRITES.BOAR.base);
        this.boar.setPlayer(this.player);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, wallslayer);
        wallslayer.setCollisionByExclusion([-1]);
    }

    update(_: number, delta: number): void{
        this.player.update(delta)
        this.boar.update() 
    }
}