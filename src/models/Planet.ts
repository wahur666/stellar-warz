import {Scene} from "phaser";

export class Planet {

    scene: Scene;
    x: number;
    y: number;
    readonly radius: number = 40
    index: number;

    constructor(scene: Scene, x: number, y: number, index: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.index = index;
    }

    draw(graphic: Phaser.GameObjects.Graphics) {
        graphic.lineStyle(5, 0xffffff, 1)
        graphic.strokeCircle(this.x, this.y, this.radius)
        this.scene.add.text(this.x, this.y, this.index + "").setOrigin(0.5)
    }

}
