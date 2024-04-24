import { data } from "../../settings/settings"
const whitelistedBlocks = ["minecraft:air", "minecraft:chest", "minecraft:trapped_chest", "minecraft:lever", "minecraft:hopper", "minecraft:skull"]
let blocksGhosted = []

function ghostBlocks() {
    if (Player.lookingAt().name) return
    if (!whitelistedBlocks.includes(Player.lookingAt().getType().getRegistryName())) {
        World.getWorld().func_175656_a(new net.minecraft.util.BlockPos(Player.lookingAt().getX(), Player.lookingAt().getY(), Player.lookingAt().getZ()), net.minecraft.init.Blocks.field_150350_a.func_176223_P()) 
        blocksGhosted.push(new net.minecraft.util.BlockPos(Player.lookingAt().getX(), Player.lookingAt().getY(), Player.lookingAt().getZ()))
        data.metrics.ghostblocks++
    }
}

register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() == "S23PacketBlockChange" && blocksGhosted.toString().includes(packet.func_179827_b().toString())) cancel(event)
})

export { ghostBlocks }