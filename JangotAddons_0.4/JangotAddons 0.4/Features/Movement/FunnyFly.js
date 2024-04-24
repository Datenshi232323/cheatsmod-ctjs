togglefly = false
flydisabler = false
toggleflydisabler = false
ticksondisabler = 0
let blocksGhosted = ["aa"]
register("tick", () => {
    if (World.getBlockAt(Math.floor(Player.getX()), Math.floor(Player.getY()) - 1, Math.floor(Player.getZ())).toString().includes("minecraft:air") && togglefly && !Player.isSneaking() && flydisabler) {
        World.getWorld().func_175656_a(new net.minecraft.util.BlockPos(Math.floor(Player.getX()), Math.floor(Player.getY()) - 1, Math.floor(Player.getZ())), net.minecraft.init.Blocks.field_150335_W.func_176223_P())
        blocksGhosted.push(new net.minecraft.util.BlockPos(Math.floor(Player.getX()), Math.floor(Player.getY()) - 1, Math.floor(Player.getZ())))
    }
})
register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() == "S23PacketBlockChange" && blocksGhosted.toString().includes(packet.func_179827_b().toString())) cancel(event)
})

register("command", () => {
    if (togglefly) {
        togglefly = false
        ChatLib.chat("off")
    } else {
        togglefly = true
        ChatLib.chat("on")
    }
}).setName("funnyfly")
register("tick", () => {
    if (Player.isSneaking() && togglefly) {
        ChatLib.chat('success')
        for (let i = 0; i < blocksGhosted.length; i++) {
            if (new net.minecraft.util.BlockPos(Math.floor(Player.getX()), Math.floor(Player.getY()) - 1, Math.floor(Player.getZ())).toString().includes(blocksGhosted[i].toString())) {
                blocksGhosted.splice(i, 1)
                World.getWorld().func_175656_a(new net.minecraft.util.BlockPos(Math.floor(Player.getX()), Math.floor(Player.getY()) - 1, Math.floor(Player.getZ())), net.minecraft.init.Blocks.field_150350_a.func_176223_P())
            }
        }
    }
}
)
register("tick", () => {
    if (toggleflydisabler) {
        if (Player.isFlying() && !flydisabler) {
            flydisabler = true
            ticksondisabler = 0
        }
        else {
            if (ticksondisabler > 100) {
                flydisabler = false
            } else {
                ticksondisabler += 1
            }
        }
    } else {
        flydisabler = true
    }
})