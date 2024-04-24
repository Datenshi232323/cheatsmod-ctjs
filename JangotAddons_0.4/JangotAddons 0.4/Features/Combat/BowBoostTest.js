kbModifierX = 1.8
kbModifierY = 1.1
kbModifierZ = 1.8
register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() == "S12PacketEntityVelocity") {
        if (packet.func_149412_c() == Player.getPlayer().func_145782_y() && Player.getHeldItem) {
            if (Player.getHeldItem()) {
                if (Player.getHeldItem().getUnlocalizedName() === "item.bow") {
                    if (kbModifierX > 0) {
                        Client.getMinecraft().field_71439_g.field_70159_w = packet.func_149411_d() / 10000 * kbModifierX //x
                    }
                    if (kbModifierY > 0) {
                        Client.getMinecraft().field_71439_g.field_70181_x = packet.func_149410_e() / 10000 * kbModifierY //y
                    }
                    if (kbModifierZ > 0) {
                        Client.getMinecraft().field_71439_g.field_70179_y = packet.func_149409_f() / 10000 * kbModifierZ //z
                    }
                }
            }
        }
    }
})
