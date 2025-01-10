import AssetRegistry from "./AssetRegistry.ts";


export default class Character extends Phaser.GameObjects.Sprite {

    speed: number;
    currentTween?: Phaser.Tweens.Tween; // Track the active tween

    constructor(scene: Phaser.Scene, x: number, y: number, characterIconLocation: number, speed: number = 100) {
        super(scene, x, y, AssetRegistry.MonochromeTransparentPacked, characterIconLocation)
        this.scale = 1;
        this.speed = speed;
        this.scene.add.existing(this);
    }


    async moveTo(targetX: number, targetY: number) {
        // Cancel the current tween if it exists
        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = undefined;
        }

        return new Promise<void>((resolve) => {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY);
            const duration = (distance / this.speed) * 1000; // Convert speed to duration (ms)

            // Create a new tween
            this.currentTween = this.scene.tweens.add({
                targets: this,
                x: targetX,
                y: targetY,
                duration: duration,
                onComplete: () => {
                    this.currentTween = undefined; // Clear the reference
                    resolve();
                },
            });
        });
    }

}