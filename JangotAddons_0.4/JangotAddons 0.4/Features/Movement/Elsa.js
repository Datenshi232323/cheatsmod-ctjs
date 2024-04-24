toggleelsa = false
let blocksGhosted = []
register("tick", () => {
    if (World.getBlockAt(Math.floor(Player.getX()), Math.floor(Player.getY()) - 1, Math.floor(Player.getZ())).toString().includes("minecraft:water") && toggleelsa) {
        World.getWorld().func_175656_a(new net.minecraft.util.BlockPos(Player.getX(), Player.getY() - 1, Player.getZ()), net.minecraft.init.Blocks.field_150403_cj.func_176223_P())
        blocksGhosted.push(new net.minecraft.util.BlockPos(Player.getX(), Player.getY() - 1, Player.getZ()))
    }
})
register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() == "S23PacketBlockChange" && blocksGhosted.toString().includes(packet.func_179827_b().toString())) cancel(event)
})

register("command", () => {
    if (toggleelsa) {
        toggleelsa = false
        ChatLib.chat("off")
    } else {
        toggleelsa = true
        ChatLib.chat("on")
    }
}).setName("elsa")
//THIS WILL BE PUT IN "MISC"