const C02 = Java.type('net.minecraft.network.play.client.C02PacketUseEntity')
const C03 = Java.type('net.minecraft.network.play.client.C03PacketPlayer')
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
let sending = false
register("packetSent", (packet, event) => {
    if (packet.func_149565_c().toString() == "ATTACK" && !sending) {
        doCritical()
    }
}).setPacketClasses([net.minecraft.network.play.client.C02PacketUseEntity])
function doCritical() {
    if (Player.getPlayer().field_70122_E && !Player.asPlayerMP().isInWater() && !Player.asPlayerMP().isInLava()) {
        doPacketJump()
    }
}

function doPacketJump() {
    let posX = Player.getX();
    let posY = Player.getY();
    let posZ = Player.getZ();

    sendPos(posX, posY + 0.0625, posZ, true);
    sendPos(posX, posY, posZ, false);
    sendPos(posX, posY + 1.1e-5, posZ, false);
    sendPos(posX, posY, posZ, false);
}

function sendPos(x, y, z, onGround) {
    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C04(
        x,
        y,
        z,
        onGround
    ));
}
