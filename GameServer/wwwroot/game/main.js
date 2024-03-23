document.addEventListener("DOMContentLoaded", () => 
{
    const gameScreenDiv = document.getElementById("game-screen");
    const appWidth = gameScreenDiv.offsetWidth - 5;
    const appHeight = gameScreenDiv.offsetHeight - 5;
    const tileSize = appWidth / 10;
    tilesX = Math.ceil(appWidth / tileSize);
    tilesY = Math.ceil(appHeight / tileSize);
    const tiles = [...Array(tilesX)].map(e => Array(tilesY));

    function RenderTile(obj) {
        obj.graphics.clear();
        obj.graphics.beginFill(obj.terrain.TerrainColor);
        obj.graphics.drawRect(obj.screenX, obj.screenY, tileSize, tileSize);
        obj.graphics.endFill();
        if (obj.building != undefined && obj.building != null) {
            const margin = tileSize / 7;
            obj.building.graphics.x = obj.screenX + margin;
            obj.building.graphics.y = obj.screenY + margin;
            obj.building.graphics.width = tileSize - margin - margin;
            obj.building.graphics.height = tileSize - margin - margin;
        }
    }

    function RenderSelectedTile() {
        if (Tile.SelectedTile != undefined && Tile.SelectedTile != null) {
            Tile.SelectedTile.graphics.clear();
            Tile.SelectedTile.graphics.beginFill(Tile.SelectedTile.terrain.TerrainColor);
            Tile.SelectedTile.graphics.lineStyle(2, 0xFF0000, 1, 0, false);
            Tile.SelectedTile.graphics.drawRect(Tile.SelectedTile.screenX, Tile.SelectedTile.screenY, tileSize, tileSize);
            Tile.SelectedTile.graphics.endFill();
        }
    }

    let app = new PIXI.Application({ width: appWidth, height: appHeight, backgroundColor: 0xffffff });
    document.getElementById("game-screen").appendChild(app.view);

    tilesX = Math.ceil(appWidth / tileSize);
    tilesY = Math.ceil(appHeight / tileSize);

    for (let x = 0; x < tilesX; x++) {
        for (let y = 0; y < tilesY; y++) {
            tiles[x][y] = Tile.GetNewTile(x * tileSize, y * tileSize).AsTerrain(BaseTerrainTypes.Forest);
            app.stage.addChild(tiles[x][y].graphics);
            if (x % 5 == 0 && y % 10 == 0) {
                tiles[x][y] = tiles[x][y].WithBuilding("castle");
                app.stage.addChild(tiles[x][y].building.graphics);
                tiles[x][y].building.graphics.tint = Math.random() * 0xffffff;
            }
        }
    }

    // Add a variable to count up the seconds our demo has been running
    let elapsed = 0.0;
    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    app.ticker.add((delta) => {
        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                obj = tiles[x][y];
                RenderTile(obj);
            }
        }
        RenderSelectedTile();
    })
});