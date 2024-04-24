const rightClick = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)
const ItemStack = Java.type('net.minecraft.item.ItemStack')
const BP = Java.type('net.minecraft.util.BlockPos')

register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() === "S2DPacketOpenWindow") {
        let windowId = packet.func_148901_c()
        let inventoryName = packet.func_179840_c()
        if (ChatLib.removeFormatting(inventoryName).toString().includes("Open a Jerry Box")) {
            Client.getMinecraft().field_71442_b.func_78753_a(windowId, 22, 2, 3, Player.getPlayer())
            Client.sendPacket(new net.minecraft.network.play.client.C0DPacketCloseWindow())
            setTimeout(() => {
                Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(0,0,0), 255, new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(397))), 0, 0, 0))
            },50)
        }
    }
})