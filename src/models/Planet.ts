import Player from "../scenes/Player.ts";
import type {Game} from "../scenes/Game.ts";
import {defaultFont} from "../helper/utils.ts";

export class Planet {

    scene: Game;
    x: number;
    y: number;
    readonly radius: number = 50
    index: number;
    name: string;
    circle: Phaser.GameObjects.Arc;
    graphics: Phaser.GameObjects.Graphics;
    text: Phaser.GameObjects.Text;
    active: boolean = false
    player: Player;

    constructor(scene: Game, x: number, y: number, index: number, name: string, textDeltaAngle: number, textDistance: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.index = index;
        this.name = name;
        this.circle = this.scene.add.circle(this.x, this.y, this.radius, 0, 0);
        this.circle.setInteractive()
        this.graphics = this.scene.add.graphics()
        this.scene.add.text(this.x, this.y, `${index}`).setOrigin(0.5)

        const offset = this.calculateOffset(textDeltaAngle, textDistance)

        this.text = this.scene.add.text(offset.x, offset.y, this.name, {
            fontFamily: defaultFont
        }).setOrigin(0.5)
        // this.circle.addListener("pointerover", () => {
        //     this.draw(0xff0000)
        // })
        // this.circle.addListener("pointerout", () => {
        //     this.draw(0xffffff)
        // })
        this.circle.addListener("pointerup", () => {
            this.scene.selectPlanet(this)
        })
        this.draw(0xffffff)


    }

    calculateOffset(deltaAngle: number, distance: number) {
        const radians = (Math.PI / 180) * deltaAngle;
        return {
            x: this.x + distance * Math.cos(radians),
            y: this.y + distance * Math.sin(radians)
        };
    }

    draw(color: number) {
        this.graphics.clear()
        this.graphics.lineStyle(5, color, 1)
        this.graphics.strokeCircle(this.x, this.y, this.radius)
        this.text.setTint(color);
    }

    setActive(active: boolean) {
        this.active = active;
        this.draw(this.active ? 0xff0000 : 0xffffff)
    }

}
