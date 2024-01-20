document.addEventListener("DOMContentLoaded", () => 
{
    const gameScreenDiv = document.getElementById("game-screen");
    const appWidth = gameScreenDiv.offsetWidth - 5;
    const appHeight = gameScreenDiv.offsetHeight - 5;
    const tileSize = appWidth / 30;
    tilesX = Math.ceil(appWidth / tileSize);
    tilesY = Math.ceil(appHeight / tileSize);
    const tiles = [...Array(tilesX)].map(e => Array(tilesY));
    let selectedTile = null;

    function RenderTile(obj) {
        obj.graphics.clear();
        obj.graphics.beginFill(obj.terrain.TerrainColor);
        obj.graphics.drawRect(obj.screenX, obj.screenY, tileSize, tileSize);
        obj.graphics.endFill();
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

function getRandomRgb() {
    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    const a = hexChars[Math.floor(Math.random() * 16)];
    const b = hexChars[Math.floor(Math.random() * 16)];
    const c = hexChars[Math.floor(Math.random() * 16)];
    const d = hexChars[Math.floor(Math.random() * 16)];
    const e = hexChars[Math.floor(Math.random() * 16)];
    const f = hexChars[Math.floor(Math.random() * 16)];
    return `0x${a}${b}${c}${d}${e}${f}`;
}

function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return new Color(r, g, b);
}

function GetRandomRgbBaseColor() {
    return baseColors[Math.floor(Math.random() * baseColors.length)];
}
