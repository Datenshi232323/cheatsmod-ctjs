import { Alert } from "../../Utils/alert"

nofall = false
sending = false
const noFallBind = new KeyBind("NoFall", Keyboard.KEY_NONE, "JangotAddons")

register("tick", () => {
    if (noFallBind.isPressed()) {
        if (!nofall) {
            Alert("Nofall Enabled", 1)
            nofall = true
        } else if (nofall) {
            Alert("Nofall Disabled", 1)
            nofall = false
        }
    }
})
register("packetSent", (packet, event) => {
    if (Number(Player.getY()) - Number(CheckBlocksBelowPlayer(100).y) > 4 && !Player.getPlayer().field_70122_E) {
        if (!sending && nofall && packet.class.getSimpleName() === "C04PacketPlayerPosition") {
            sending = true
            cancel(event)
            Client.sendPacket(new net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition(Player.getX(), Player.getY(), Player.getZ(), true))
            sending = false
        } else if (!sending && nofall && packet.class.getSimpleName() === "C05PacketPlayerLook") {
            sending = true
            cancel(event)
            Client.sendPacket(new net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook(Player.getYaw(), Player.getPitch(), true))
            sending = false
        } else if (!sending && nofall && packet.class.getSimpleName() === "C06PacketPlayerPosLook") {
            sending = true
            cancel(event)
            Client.sendPacket(new net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook(Player.getX(), Player.getY(), Player.getZ(), Player.getYaw(), Player.getPitch(), true))
            sending = false
        }
    }
}).setPacketClasses([net.minecraft.network.play.client.C03PacketPlayer])

function CheckBlocksBelowPlayer(range) {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    for (let i = 1; i < range; i++) {
        if (World.getBlockAt(x, y - i, z).type.getName() !== "tile.air.name") {
            return (World.getBlockAt(x, y - i, z))
        }
    }
    return false
}