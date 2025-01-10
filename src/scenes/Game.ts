import {Scene} from 'phaser';
import {Planet} from "../models/Planet.ts";
// import AssetRegistry from "./AssetRegistry.ts";
import Player from "./Player.ts";
import {Nav} from "../models/Nav.ts";
import Ui from "./Ui.ts";
import Pointer = Phaser.Input.Pointer;
import Vector2 = Phaser.Math.Vector2;

export class Game extends Scene {

    graphics: Phaser.GameObjects.Graphics
    planets: Planet[]
    planetNames = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa",
        "Lambda", "Mu", "Nu", "Omicron", "Xi", "Omega", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi",
        "Pi", "Aether", "Erebus", "Aurora", "Thalassa", "Nyx", "Nova"];
    // private sprite: Phaser.GameObjects.Sprite;
    // private renderTexture: Phaser.GameObjects.RenderTexture;
    private ui: Ui;
    private player: Player;
    selectedPlanet: Planet | null = null;
    nav: Nav;
    startPos: Phaser.Math.Vector2 | null = null;

    constructor() {
        super('Game');
        this.nav = new Nav();
    }

    create() {
        this.graphics = this.add.graphics()
        this.createPlanets()
        this.connectPlanets()
        this.graphics.lineStyle(5, 0xffffff, 1)
        this.graphics.lineBetween(900, 0, 900, 720)
        this.player = new Player(this, this.planets[0]);
        this.ui = new Ui(this, 900, 0)
        //
        //
        // this.renderTexture = this.add.renderTexture(100, 100, 16, 16).setScale(4)
        // this.renderTexture.drawFrame(AssetRegistry.SpaceShooterAssetPack_Ships, 67, 0, 0)
        // this.renderTexture.drawFrame(AssetRegistry.SpaceShooterAssetPack_Ships, 66, 8, 0)
        // this.renderTexture.drawFrame(AssetRegistry.SpaceShooterAssetPack_Ships, 76, 0, 8)
        // this.renderTexture.drawFrame(AssetRegistry.SpaceShooterAssetPack_Ships, 77, 8, 8)

        this.cameras.main.setBounds(0, 0, 1920, 1080); // Set the bounds of the camera

        let dragStartX = 0;
        let dragStartY = 0;

        this.input.on('pointerdown', (pointer: Pointer) => {
            dragStartX = pointer.x + this.cameras.main.scrollX;
            dragStartY = pointer.y + this.cameras.main.scrollY;
        });

        this.input.on('pointermove', (pointer: Pointer) => {
            if (pointer.isDown) {
                this.cameras.main.scrollX = dragStartX - pointer.x;
                this.cameras.main.scrollY = dragStartY - pointer.y;
            }
        });

    }

    update(_time: number, _delta: number) {
        // const pointer = this.input.activePointer;
        // const angle = Phaser.Math.Angle.Between(this.renderTexture.x, this.renderTexture.y, pointer.x, pointer.y) ;
        // this.renderTexture.rotation = angle - Math.PI / 2;
        //
        // const distance = Phaser.Math.Distance.Between(this.renderTexture.x, this.renderTexture.y, pointer.x, pointer.y);
        //
        // if (distance > 5) { // Small threshold to avoid jitter
        //     // Normalize the direction vector and scale by speed
        //     const dx = Math.cos(angle) * this.speed * (delta / 1000); // Delta time in seconds
        //     const dy = Math.sin(angle) * this.speed * (delta / 1000);
        //
        //     // Update the sprite's position
        //     this.renderTexture.x += dx;
        //     this.renderTexture.y += dy;
        // }
    }

    connect(planet1: Planet, planet2: Planet) {
        this.nav.addEdge(planet1.name, planet2.name);
        const newCoords = this.calculateOffset(planet1.x, planet1.y, Math.atan2(planet2.y - planet1.y, planet2.x - planet1.x), planet1.radius)
        const newCoords2 = this.calculateOffset(planet2.x, planet2.y, Math.atan2(planet1.y - planet2.y, planet1.x - planet2.x), planet2.radius)
        this.graphics.lineStyle(5, 0xffffff, 1)
        this.graphics.lineBetween(newCoords.x, newCoords.y, newCoords2.x, newCoords2.y);
    }

    calculateOffset(x: number, y: number, deltaAngle: number, distance: number) {
        return {
            x: x + distance * Math.cos(deltaAngle),
            y: y + distance * Math.sin(deltaAngle)
        };
    }

    createPlanets() {
        this.planets = [];
        this.createPlanet(100, 85, 30, 70); // 0
        this.createPlanet(280, 75, 30, 70); // 1
        this.createPlanet(430, 95, 30, 70); // 2
        this.createPlanet(580, 65, 30, 70);  // 3
        this.createPlanet(700, 105, 60, 70); // 4
        this.createPlanet(830, 135, 90, 65); // 5
        this.createPlanet(90, 215, 60, 65);  // 6
        this.createPlanet(80, 345, 60, 70);  // 7
        this.createPlanet(100, 475, 60, 70); // 8
        this.createPlanet(150, 625, 20, 75); // 9
        this.createPlanet(220, 245, 60, 70); // 10
        this.createPlanet(340, 185, 80, 65); // 11
        this.createPlanet(580, 205, 55, 70); // 12
        this.createPlanet(700, 255, 50, 70); // 13
        this.createPlanet(830, 315, 60, 70); // 14
        this.createPlanet(450, 275, 60, 70); // 15
        this.createPlanet(330, 365, 60, 70); // 16
        this.createPlanet(200, 395, 50, 65); // 17
        this.createPlanet(240, 515, 60, 65); // 18
        this.createPlanet(570, 345, 90, 65); // 19
        this.createPlanet(360, 485, 60, 65); // 20
        this.createPlanet(550, 475, 60, 70); // 21
        this.createPlanet(730, 435, 60, 70); // 22
        this.createPlanet(840, 475, 60, 70); // 23
        this.createPlanet(450, 555, 90, 70); // 24
        this.createPlanet(660, 535, 95, 60); // 25
        this.createPlanet(330, 635, 85, 70); // 26
        this.createPlanet(560, 615, 90, 70); // 27
        this.createPlanet(720, 635, 90, 65); // 28
        this.createPlanet(840, 645, 60, 65); // 29
    }

    createPlanet(x: number, y: number, textDeltaAngle: number, textDistance: number) {
        this.planets.push(new Planet(this, x, y, this.planets.length, this.planetNames[this.planets.length], -textDeltaAngle, textDistance));
    }

    connectPlanets() {
        this.connect(this.planets[0], this.planets[1])
        this.connect(this.planets[0], this.planets[6])
        this.connect(this.planets[1], this.planets[2])
        this.connect(this.planets[2], this.planets[3])
        this.connect(this.planets[3], this.planets[4])
        this.connect(this.planets[4], this.planets[5])
        this.connect(this.planets[6], this.planets[7])
        this.connect(this.planets[7], this.planets[8])
        this.connect(this.planets[8], this.planets[9])
        this.connect(this.planets[0], this.planets[10])
        this.connect(this.planets[6], this.planets[10])
        this.connect(this.planets[10], this.planets[11])
        this.connect(this.planets[1], this.planets[11])
        this.connect(this.planets[2], this.planets[11])
        this.connect(this.planets[3], this.planets[12])
        this.connect(this.planets[12], this.planets[13])
        this.connect(this.planets[4], this.planets[13])
        this.connect(this.planets[5], this.planets[14])
        this.connect(this.planets[13], this.planets[14])
        this.connect(this.planets[11], this.planets[15])
        this.connect(this.planets[12], this.planets[15])
        this.connect(this.planets[2], this.planets[15])
        this.connect(this.planets[11], this.planets[16])
        this.connect(this.planets[15], this.planets[16])
        this.connect(this.planets[7], this.planets[17])
        this.connect(this.planets[10], this.planets[17])
        this.connect(this.planets[16], this.planets[17])
        this.connect(this.planets[17], this.planets[18])
        this.connect(this.planets[8], this.planets[18])
        this.connect(this.planets[9], this.planets[18])
        this.connect(this.planets[15], this.planets[19])
        this.connect(this.planets[13], this.planets[19])
        this.connect(this.planets[14], this.planets[19])
        this.connect(this.planets[15], this.planets[19])
        this.connect(this.planets[16], this.planets[20])
        this.connect(this.planets[17], this.planets[20])
        this.connect(this.planets[18], this.planets[20])
        this.connect(this.planets[16], this.planets[21])
        this.connect(this.planets[19], this.planets[21])
        this.connect(this.planets[21], this.planets[22])
        this.connect(this.planets[19], this.planets[22])
        this.connect(this.planets[14], this.planets[23])
        this.connect(this.planets[22], this.planets[23])
        this.connect(this.planets[20], this.planets[24])
        this.connect(this.planets[21], this.planets[24])
        this.connect(this.planets[22], this.planets[25])
        this.connect(this.planets[24], this.planets[26])
        this.connect(this.planets[9], this.planets[26])
        this.connect(this.planets[18], this.planets[26])
        this.connect(this.planets[24], this.planets[27])
        this.connect(this.planets[25], this.planets[27])
        this.connect(this.planets[26], this.planets[27])
        this.connect(this.planets[25], this.planets[28])
        this.connect(this.planets[23], this.planets[28])
        this.connect(this.planets[27], this.planets[28])
        this.connect(this.planets[28], this.planets[29])
        this.connect(this.planets[23], this.planets[29])
    }

    // loadTileMap() {
        // const map = this.make.tilemap({
        //     key: AssetRegistry.TileMap,
        //     tileWidth: 16,
        //     tileHeight: 16
        // });
        // const tileset = map.addTilesetImage(AssetRegistry.ColoredPacked + 2, AssetRegistry.ColoredPacked)
        // map.createLayer("Tile Layer 1", tileset!)
    // }


    get currentPlayer() {
        return this.player;
    }

    selectPlanet(planet: Planet) {
        if (this.selectedPlanet == planet) {
            planet.setActive(false);
            this.selectedPlanet = null;
        } else {
            this.selectedPlanet = planet;
            this.planets.forEach(p => {
                p.setActive(p.name == planet.name)
            })
        }
        this.ui.updateUiWithPlanetInfo(this.selectedPlanet)
    }

    getPlanetByName(name: string): Planet | undefined {
        return this.planets.find(p => p.name === name);
    }
}
