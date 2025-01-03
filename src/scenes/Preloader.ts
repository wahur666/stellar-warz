import {Scene} from 'phaser';
import dungeon from "../maps/dungeon.json"
import AssetRegistry from "./AssetRegistry.ts";

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
    }

    preload() {
        this.load.image(AssetRegistry.ColoredPacked, "assets/colored_packed.png");
        this.load.spritesheet(AssetRegistry.SpaceShooterAssetPack_Ships, "assets/SpaceShooterAssetPack_Ships.png", {
            frameHeight: 8,
            frameWidth: 8,
        });
        this.load.tilemapTiledJSON(AssetRegistry.TileMap, dungeon);
    }

    create() {
        this.scene.start('Game');
    }
}
