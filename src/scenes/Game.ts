import {Scene} from 'phaser';
import {Planet} from "../models/Planet.ts";
import {Button} from "../models/Button.ts";

export class Game extends Scene {

    graphics: Phaser.GameObjects.Graphics
    planets: Planet[]

    constructor() {
        super('Game');
        this.createPlanets()
    }

    create() {
        this.graphics = this.add.graphics()

        for (const planet of this.planets) {
            planet.draw(this.graphics)
        }

        this.connectPlanets()

        this.graphics.lineBetween(900, 0, 900, 720)
        var button = new Button(this, 1000, 100, 200, 50);
        button.onPointerUp(() => {
            console.log("pointer up")
        })
        button.onPointerDown(() => {
            console.log("pointer down")
        })
    }

    connect(planet1: Planet, planet2: Planet) {
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
        this.createPlanet(100, 85); // 0
        this.createPlanet(280, 75); // 1
        this.createPlanet(430, 95); // 2
        this.createPlanet(580, 65);  // 3
        this.createPlanet(700, 105); // 4
        this.createPlanet(830, 135); // 5
        this.createPlanet( 90, 215);  // 6
        this.createPlanet( 80, 345);  // 7
        this.createPlanet(100, 475); // 8
        this.createPlanet(150, 625); // 9
        this.createPlanet(220, 245); // 10
        this.createPlanet(340, 185); // 11
        this.createPlanet(580, 205); // 12
        this.createPlanet(700, 255); // 13
        this.createPlanet(830, 315); // 14
        this.createPlanet(450, 275); // 15
        this.createPlanet(330, 365); // 16
        this.createPlanet(200, 395); // 17
        this.createPlanet(240, 515); // 18
        this.createPlanet(570, 345); // 19
        this.createPlanet(360, 485); // 20
        this.createPlanet(550, 475); // 21
        this.createPlanet(730, 435); // 22
        this.createPlanet(840, 475); // 23
        this.createPlanet(450, 555); // 24
        this.createPlanet(660, 535); // 25
        this.createPlanet(330, 635); // 26
        this.createPlanet(560, 615); // 27
        this.createPlanet(720, 635); // 28
        this.createPlanet(840, 645); // 29
    }

    createPlanet(x: number, y: number) {
        this.planets.push(new Planet(this, x, y, this.planets.length))
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
}
