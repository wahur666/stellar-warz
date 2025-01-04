import {Button} from "../models/Button.ts";
import Player from "./Player.ts";
import type {Game} from "./Game.ts";
import type {Planet} from "../models/Planet.ts";


export default class Ui {

    moveButton: Button;
    scene: Game;
    recruitButton: Button;
    private player: Player;
    x: number;
    y: number;
    selectedPlanet: Planet | null;

    constructor(scene: Game, x: number, y: number) {
        this.scene = scene;
        this.player = scene.currentPlayer;
        this.x = x;
        this.y = y;
        this.moveButton = new Button(this.scene, this.x + 100, this.y + 100, 200, 50, "Move");
        this.moveButton.onPointerUp(async () => {
            if (!this.selectedPlanet) {
                return;
            }
            this.moveButton.setDisabled(true);
            await this.player.moveToSelectedPlanet(this.selectedPlanet)
            this.moveButton.setDisabled(false);
        })
        this.recruitButton = new Button(this.scene, this.x + 100, this.y + 200, 200, 50, "Recruit").setDisabled(true);
    }

    updateUiWithPlanetInfo(planet: Planet | null) {
        this.selectedPlanet = planet;
        this.moveButton.setDisabled(planet === null);
    }
}