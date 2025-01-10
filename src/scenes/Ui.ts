import {Button} from "../models/Button.ts";
import Player from "./Player.ts";
import type {Game} from "./Game.ts";
import type {Planet} from "../models/Planet.ts";
import {IconButton} from "../models/IconButton.ts";
import {c2i} from "../helper/utils.ts";


export default class Ui {

    moveButton: Button;
    scene: Game;
    recruitButton: Button;
    private player: Player;
    x: number;
    y: number;
    selectedPlanet: Planet | null;


    addButton: IconButton;
    removeButton: IconButton;

    constructor(scene: Game, x: number, y: number) {
        this.scene = scene;
        this.player = scene.currentPlayer;
        this.x = x;
        this.y = y;
        this.moveButton = new Button(this.scene, this.x + 100, this.y + 100, 200, 50, "Move").setDisabled(true);
        this.moveButton.onPointerUp(async () => {
            if (!this.selectedPlanet) {
                return;
            }
            this.moveButton.setDisabled(true);
            await this.player.moveToSelectedPlanet(this.selectedPlanet)
        })
        this.recruitButton = new Button(this.scene, this.x + 100, this.y + 200, 200, 50, "Recruit").setDisabled(true);

        this.addButton = new IconButton(this.scene, this.x + 100, this.y + 300, 50, 50, c2i(29,20));
        // this.addButton = new IconButton(this.scene, this.x + 130, this.y + 300, 25, 25, 320);
        // this.addButton = new IconButton(this.scene, this.x + 160, this.y + 300, 25, 25, 340);
        // this.addButton = new IconButton(this.scene, this.x + 190, this.y + 300, 25, 25, 350);
    }

    updateUiWithPlanetInfo(planet: Planet | null) {
        this.selectedPlanet = planet;
        this.moveButton.setDisabled(planet === null);
    }
}