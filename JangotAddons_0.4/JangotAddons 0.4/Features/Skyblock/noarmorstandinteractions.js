import { Alert } from "../../Utils/alert"
const BP = Java.type('net.minecraft.util.BlockPos')

register("packetSent", (packet, event) => {
    if (packet.class.getSimpleName() == "C02PacketUseEntity") {
        let Entity = Player.lookingAt()
        if (packet.func_149565_c().toString().includes("INTERACT_AT") && Entity.getClassName().toString().includes("EntityArmorStand")) {
            if (Player.getHeldItem()) {
                cancel(event)
                Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(Player.getHeldItemIndex()).getItemStack(), 0, 0, 0))
            }
        }
    }
})