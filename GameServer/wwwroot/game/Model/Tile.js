class Tile {
    graphics = null;
    terrain = null;
    screenX = null;
    screenY = null;
    sprite = null;

    static SelectedTile = null;

    static GetNewTile(screenX, screenY) {
        let obj = new Tile();
        obj.graphics = new PIXI.Graphics();
        obj.screenX = screenX;
        obj.screenY = screenY;
        obj.graphics.eventMode = 'static';
        obj.graphics.on('pointerdown', () => { obj.SelectTile(); });

        return obj;
    }

    SelectTile() {
        Tile.SelectedTile = this;
    }

    AsTerrain(type) {
        switch (type) {
            case BaseTerrainTypes.Desert:
                this.terrain = new Terrain(BaseTerrainTypes.Desert, new Color(0, 255, 255), 100);
                break;
            case BaseTerrainTypes.Forest:
                this.terrain = new Terrain(BaseTerrainTypes.Forest, new Color(21, 96, 52), 100);
                break;
            case "Stone":
                this.terrain = new Terrain(BaseTerrainTypes.Forest, new Color(0, 255, 0), 100);
                break;
            default:
                this.terrain = new Terrain("Unknown", new Color(0, 0, 0), 1);
        }
        this.graphics.on('pointerdown', () => { this.terrain.Exploit(10); });
        return this;
    }

    AsBuilding(type) {

    }
}