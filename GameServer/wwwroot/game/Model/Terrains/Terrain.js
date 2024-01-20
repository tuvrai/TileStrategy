class BaseTerrainTypes {
    static Plain = "Plain";
    static Desert = "Desert";
    static Forest = "Forest";
}

class Terrain {
    static #terrainColorLevels = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, -0.05];

    #type = undefined;
    #currentRichness = undefined;
    #fullRichness = undefined;
    #baseColor = new Color(0, 0, 0);
    #currentColor = new Color(0, 0, 0, 1);
    #currentTerrainColorLevelId = 0;
    #terrainColorsGradient = [];

    Id = undefined;
    X = undefined;
    Y = undefined;

    constructor(type, color, richness) {
        this.#type = type;
        this.#baseColor = new Color(color.r, color.g, color.b);
        this.#currentColor = new Color(this.#baseColor.r, this.#baseColor.g, this.#baseColor.b, 1.0);
        this.#fullRichness = richness;
        this.#currentRichness = richness;
        this.createColorsGradient();
    }

    get TerrainColor() {
        return this.#currentColor;
    }

    get FilledRate() {
        return this.filledRate();
    }

    get FullRichness() {
        return this.#fullRichness;
    }

    Exploit(size) {
        this.#currentRichness -= size;
        if (this.#currentRichness < 0) { this.#currentRichness = 0; }
        this.changeColorIfNecessary();
    }

    filledRate() {
        return this.#currentRichness / this.#fullRichness;
    }

    changeColorIfNecessary() {
        const rate = this.filledRate();
        for (let i = this.#currentTerrainColorLevelId; i < Terrain.#terrainColorLevels.length; i++) {
            if (rate > Terrain.#terrainColorLevels[i]) {
                this.#currentTerrainColorLevelId = i;
                this.#currentColor = this.#terrainColorsGradient[i];
                break;
            }
        }
        console.log(rate, this.TerrainColor);
    }

    createColorsGradient() {
        const base = [this.#baseColor.r, this.#baseColor.g, this.#baseColor.b];
        for (let i = 0; i < Terrain.#terrainColorLevels.length; i++) {
            const rgbColor = createColorGradient(base, Terrain.#terrainColorLevels.length + 5, i);
            this.#terrainColorsGradient.push(getRgbString(rgbColor[0], rgbColor[1], rgbColor[2]));
        }
    }
}