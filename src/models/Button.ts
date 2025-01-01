export class Button {

    scene: Phaser.Scene;
    x: number;
    y: number;
    width: number;
    height: number;
    element: Phaser.GameObjects.Graphics;
    rect: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rect = this.scene.add.rectangle(x, y, width, height).setOrigin(0);

        this.element = this.scene.add.graphics()
        this.text = this.scene.add.text(x + this.width / 2, y + this.height / 2, "Hello world").setOrigin(0.5)
        this.draw(0xffffff)
        this.rect.setInteractive()
        this.rect.addListener("pointerover", () => {
            this.draw(0x00ff00)
            console.log("pointer enter")
        })
        this.rect.addListener("pointerout", () => {
            this.draw(0xffffff)
            console.log("pointer left")
        })
    }

    draw(color: number) {
        this.element.clear()
        this.element.lineStyle(3, color, 1)
        this.text.setTint(color);
        this.element.strokeRect(this.x, this.y, this.width, this.height)
    }

    onPointerDown(callback: () => void) {
        this.rect.addListener("pointerdown", callback)
    }

    onPointerUp(callback: () => void) {
        this.rect.addListener("pointerup", callback)
    }
}