class GameState {
    static TileSize = 10;
    static XLength;
    static YLength;
    static Tiles;
}

class Textures {
    static Castle;
}

async function LoadSprites() {
    Textures.Castle = await PIXI.Assets.load('/game/sprites/castle.png');
}

async function Run(configJson)
{
    console.log(configJson);
    config = JSON.parse(configJson);

    const gameScreenDiv = document.getElementById("game-screen");
    const appWidth = gameScreenDiv.offsetWidth - 5;
    const appHeight = gameScreenDiv.offsetHeight - 5;

    GameState.TileSize = appWidth / config.Size;
    GameState.XLength = Math.ceil(appWidth / GameState.TileSize);
    GameState.YLength = Math.ceil(appHeight / GameState.TileSize);
    GameState.Tiles = [...Array(GameState.XLength)].map(e => Array(GameState.YLength));

    await LoadSprites();

    let app = new PIXI.Application();
    await app.init({ background: 0xffffff, width: appWidth, height: appHeight });
    document.getElementById("game-screen").appendChild(app.canvas);

    GenerateTiles(app);

    GameState.Tiles[2][3] = GameState.Tiles[2][3].WithBuilding("castle");
    app.stage.addChild(GameState.Tiles[2][3].building.graphics);
    GameState.Tiles[2][3].building.graphics.tint = Math.random() * 0xffffff;

    InitTicker(app);
}

function GenerateTiles(app) {
    for (let x = 0; x < GameState.XLength; x++) {
        for (let y = 0; y < GameState.YLength; y++) {
            GameState.Tiles[x][y] = Tile.GetNewTile(x, y, GameState.TileSize).AsTerrain(BaseTerrainTypes.Forest);
            app.stage.addChild(GameState.Tiles[x][y].graphics);
        }
    }
}

function InitTicker(app) {
    app.ticker.minFPS = 15;
    app.ticker.add((delta) => {
        for (let x = 0; x < GameState.XLength; x++) {
            for (let y = 0; y < GameState.YLength; y++) {
                obj = GameState.Tiles[x][y];
                RenderTile(obj);
            }
        }
    })
}

function RenderTile(obj) {
    if (Tile.SelectedTile != null && obj.x == Tile.SelectedTile.x && obj.y == Tile.SelectedTile.y) {
        border = 4;
        offset = border / 2;
        obj.graphics.rect(obj.screenX, obj.screenY, GameState.TileSize, GameState.TileSize).fill(0xFF0000);
        obj.graphics.rect(obj.screenX + offset, obj.screenY + offset, GameState.TileSize - border, GameState.TileSize - border).fill(obj.terrain.TerrainColor);;
    }
    else {
        obj.graphics.rect(obj.screenX, obj.screenY, GameState.TileSize, GameState.TileSize).fill(obj.terrain.TerrainColor);
        obj.graphics.tint = obj.terrain.TerrainColor;
    }
    if (obj.building != undefined && obj.building != null) {
        const margin = GameState.TileSize / 7;
        obj.building.graphics.x = obj.screenX + margin;
        obj.building.graphics.y = obj.screenY + margin;
        obj.building.graphics.width = GameState.TileSize - margin - margin;
        obj.building.graphics.height = GameState.TileSize - margin - margin;
    }
}

async function main(configJson)
{
    Run(configJson);
}