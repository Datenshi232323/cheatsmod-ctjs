import RenderLib from "RenderLib"

register("renderWorld", () => {
    let TileEntityList = World.getAllTileEntities()
    for (let i = 0; i < TileEntityList.length; i++) {
        if (!Client.Companion.isInGui() && !TileEntityList[i].toString().includes("banner") && !TileEntityList[i].toString().includes("sign") && !TileEntityList[i].toString().includes("beacon") && !TileEntityList[i].toString().includes("spawner") && !TileEntityList[i].toString().includes("note") && !TileEntityList[i].toString().includes("juke") && !TileEntityList[i].toString().includes("piston") && !TileEntityList[i].toString().includes("enchant") && !TileEntityList[i].toString().includes("portal") && !TileEntityList[i].toString().includes("skull") && !TileEntityList[i].toString().includes("command") && !TileEntityList[i].toString().includes("sensor") && !TileEntityList[i].toString().includes("pot") && !TileEntityList[i].toString().includes("comparator")) {
            RenderLib.drawEspBox(TileEntityList[i].x + 0.5, TileEntityList[i].y, TileEntityList[i].z + 0.5, 1, 1, 0, 1, 1, 1, true)
        }
    }
})