import Character from "./Character.ts";
import type {Planet} from "../models/Planet.ts";
import type {Game} from "./Game.ts";


export default class Player {
    private character: Character;

    currentPlanet: Planet;

    constructor(private scene: Game, planet: Planet) {
        this.currentPlanet = planet;
        this.character = new Character(this.scene, this.currentPlanet.x - 20, this.currentPlanet.y + 20, 30)
        var character1 = new Character(this.scene, this.currentPlanet.x - 20, this.currentPlanet.y - 20, 31)
        var character2 = new Character(this.scene, this.currentPlanet.x - 20, this.currentPlanet.y, 32)
        var character3 = new Character(this.scene, this.currentPlanet.x + 20, this.currentPlanet.y, 33)
        // this.scene.input.on('pointerdown', (ev: Pointer) => {
        //     if (ev.leftButtonDown()) {
        //         this.character.moveTo(ev.x, ev.y)
        //     }
        // })

    }

    async moveToSelectedPlanet(planet: Planet) {
        const path = this.scene.nav.bfs(this.currentPlanet.name, planet.name);
        if (path === null) {
            return;
        }

        console.log(path);
        path.shift()


        for (const planetName of path) {
            const target = this.scene.getPlanetByName(planetName)
            if (target === undefined) {
                return;
            }
            await this.character.moveTo(target.x, target.y);
            this.currentPlanet = target;
        }

    }
}