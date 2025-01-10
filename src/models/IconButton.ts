import AssetRegistry from "../scenes/AssetRegistry.ts";

export class IconButton {
    width: number;
    height: number;
    element: Phaser.GameObjects.Graphics;
    rect: Phaser.GameObjects.Rectangle;
    icon: Phaser.GameObjects.Sprite;
    disabled: boolean = false;

    constructor(public scene: Phaser.Scene, public x: number, public y: number, width: number, height: number, iconNumber: number) {
        this.width = width;
        this.height = height;
        this.rect = this.scene.add.rectangle(this.x, this.y, width, height).setOrigin(0);

        this.element = this.scene.add.graphics()
        this.icon = this.scene.add.sprite(this.x + this.width / 2, this.y + this.height / 2, AssetRegistry.MonochromeTransparentPacked, iconNumber).setScale(3)
        this.draw(0xffffff)
        this.rect.setInteractive()
        this.rect.addListener("pointerover", () => {
            if (this.disabled) {
                return;
            }
            this.draw(0x00ff00)
            console.log("pointer enter")
        })
        this.rect.addListener("pointerout", () => {
            if (this.disabled) {
                return;
            }
            this.draw(0xffffff)
            console.log("pointer left")
        })
    }

    draw(color: number) {
        this.element.clear()
        this.element.lineStyle(3, color, 1)
        this.icon.setTint(color);
        this.element.strokeRect(this.x, this.y, this.width, this.height)
    }

    onPointerDown(callback: () => void) {
        this.rect.on("pointerdown", () => {
            if (this.disabled) {
                return;
            }
            callback()
        })
    }

    onPointerUp(callback: () => void) {
        this.rect.on("pointerup", () => {
            if (this.disabled) {
                return;
            }
            callback()
        })
    }

    setDisabled(disabled: boolean): IconButton {
        this.disabled = disabled;
        if (this.disabled) {
            this.draw(0x808080)
        } else {
            this.draw(0xffffff)
        }
        return this;
    }

}