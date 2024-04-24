const BP = Java.type('net.minecraft.util.BlockPos')
const EnumFacing = Java.type('net.minecraft.util.EnumFacing')
const C07 = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging')
rangetomine = 0.5
register("playerInteract", (action, position, event) => {
    var PlayerX = position.x
    var PlayerY = position.y
    var PlayerZ = position.z
    for (let x = PlayerX - rangetomine; x < PlayerX + 2 * rangetomine; x++) {
        for (let y = PlayerY - rangetomine; y < PlayerY + 2 * rangetomine; y++) {
            for (let z = PlayerZ - rangetomine; z < PlayerZ + 2 * rangetomine; z++) {
                if (!World.getBlockAt(x, y, z).toString().includes("minecraft:air")) {
                    Client.sendPacket(new C07(C07.Action.START_DESTROY_BLOCK, new BP(x, y, z), EnumFacing.DOWN))
                }
            }
        }
    }
})