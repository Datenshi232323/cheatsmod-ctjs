LastPosX = 0
LastPosY = 0
LastPosZ = 0
packets = 0
packetLimit = 10
const C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook")
register("command", (x,y,z) => {
    startTP = true
    Player.getPlayer().func_70107_b(x,y,z)
}).setName("PPTP")

register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() === "S08PacketPlayerPosLook" && startTP) {
        if (packets < packetLimit) {
            if(LastPosX == Math.floor(packet.func_148932_c()) && LastPosY == Math.floor(packet.func_148928_d()) && LastPosZ == Math.floor(packet.func_148933_e())) {
                packets += 1
            } else {
                packets = 0
            }
            cancel(event)
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C06(packet.func_148932_c(), packet.func_148928_d(), packet.func_148933_e(), packet.func_148931_f(), packet.func_148930_g(), Player.getPlayer().field_70122_E))
        } else if(packetLimit <= packets) {
            packets = 0
            if(LastPosX !== Math.floor(packet.func_148932_c()) && LastPosY !== Math.floor(packet.func_148928_d()) && LastPosZ !== Math.floor(packet.func_148933_e())) {
                Player.getPlayer().func_70107_b(packet.func_148932_c,packet.func_148928_d,packet.func_148933_e)
            }
        }
        LastPosX = Math.floor(packet.func_148932_c())
        LastPosY = Math.floor(packet.func_148928_d())
        LastPosZ = Math.floor(packet.func_148933_e())
    }
})