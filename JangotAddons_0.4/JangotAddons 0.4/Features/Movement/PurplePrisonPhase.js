import { Alert } from "../../Utils/alert"
phasetoggle = false
preparetophase = false
checkifphased = false
tickselapsedPhased = 0
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
const C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook")
const BP = Java.type('net.minecraft.util.BlockPos')
const MathHelper = Java.type('net.minecraft.util.MathHelper')
const Phase = new KeyBind("Purple Prison Phase", Keyboard.KEY_NONE, "JangotAddons")

function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}
register("tick", () => {
    if (Phase.isPressed()) {
        if (phasetoggle) {
            Alert("PP Phase Disabled", 1)
            phasetoggle = false
        } else if (!phasetoggle && !preparetophase) {
            Alert("PP Phase Enabled", 1)
            preparetophase = true
            Player.getPlayer().func_70107_b(Player.getX(), Player.getY() - 0.000001, Player.getZ())
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C04(Player.getX(), Player.getY() - 20, Player.getZ(), true))
        } else if(preparetophase) {
            Alert("PP Phase Disabled", 1)
            preparetophase = false
        }
    }
})
register("tick", () => {
    if (phasetoggle) {
        let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
        let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
        let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x).getKeyCode()
        let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z).getKeyCode()
        let Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A).getKeyCode()
        if (isInsideBlock()) {
            if (Player.isSneaking() && Player.getPlayer().field_70122_E) {
                Player.getPlayer().func_70107_b(Player.getX(), Player.getY() - 0.000001, Player.getZ())
            }
            if (Keyboard.isKeyDown(Forward) && !Client.Companion.isInGui()) {
                Player.getPlayer().func_70107_b(
                    Player.getX() + -sin(Player.getYaw()) * 0.001,
                    Player.getY(),
                    Player.getZ() + cos(Player.getYaw()) * 0.001
                )
            }
            if (Keyboard.isKeyDown(Backward) && !Client.Companion.isInGui()) {
                Player.getPlayer().func_70107_b(
                    Player.getX() + -sin(Player.getYaw()) * -0.001,
                    Player.getY(),
                    Player.getZ() + cos(Player.getYaw()) * -0.001
                )
            }
            if (Keyboard.isKeyDown(Left) && !Client.Companion.isInGui()) {
                Player.getPlayer().func_70107_b(
                    Player.getX() + -sin(Player.getYaw() + 90) * -0.001,
                    Player.getY(),
                    Player.getZ() + cos(Player.getYaw() + 90) * -0.001
                )
            }
            if (Keyboard.isKeyDown(Right) && !Client.Companion.isInGui()) {
                Player.getPlayer().func_70107_b(
                    Player.getX() + -sin(Player.getYaw() - 90) * -0.001,
                    Player.getY(),
                    Player.getZ() + cos(Player.getYaw() - 90) * -0.001
                )
            }
            if (Keyboard.isKeyDown(Jump) && !Client.Companion.isInGui()) {
                Client.getMinecraft().field_71439_g.field_70181_x = 0.15
                Player.getPlayer().func_70107_b(
                    Player.getX(),
                    Player.getY() + 0.001,
                    Player.getZ()
                )
            }
        } else {
            phasetoggle = false
        }
    }
    if(checkifphased) {
        Player.getPlayer().func_70107_b(Player.getX(), Player.getY() - 0.000001, Player.getZ())
        tickselapsedPhased += 1
        if(isInsideBlock()) {
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C04(Player.getX(), Player.getY() - 20, Player.getZ(), true))
            tickselapsedPhased = 0
            checkifphased = false
            phasetoggle = true
        }
    }
    if(preparetophase) {
        Player.getPlayer().func_70107_b(Player.getX(), Player.getY() - 0.000001, Player.getZ())
    }
})

register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() === "S08PacketPlayerPosLook" && preparetophase && !checkifphased) {
        Player.getPlayer().func_70107_b(Player.getX(), Player.getY() - 0.000001, Player.getZ())
        cancel(event)
        Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C06(packet.func_148932_c(), packet.func_148928_d(), packet.func_148933_e(), packet.func_148931_f(), packet.func_148930_g(), Player.getPlayer().field_70122_E))
        Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C04(Player.getX(), Player.getY() - 20, Player.getZ(), true))
        checkifphased = true
        preparetophase = false
    }
})

function isInsideBlock() {
    for (x = MathHelper.func_76128_c((Client.getMinecraft().field_71439_g.func_174813_aQ()).field_72340_a); x < MathHelper.func_76128_c((Client.getMinecraft().field_71439_g.func_174813_aQ()).field_72336_d) + 1; x++) {
        for (y = MathHelper.func_76128_c((Client.getMinecraft().field_71439_g.func_174813_aQ()).field_72338_b); y < MathHelper.func_76128_c((Client.getMinecraft().field_71439_g.func_174813_aQ()).field_72337_e) + 1; y++) {
            for (z = MathHelper.func_76128_c((Client.getMinecraft().field_71439_g.func_174813_aQ()).field_72339_c); z < MathHelper.func_76128_c((Client.getMinecraft().field_71439_g.func_174813_aQ()).field_72334_f) + 1; z++) {
                block = Client.getMinecraft().field_71441_e.func_180495_p(new BP(x, y, z)).func_177230_c();
                if (block != null && !(block instanceof net.minecraft.block.BlockAir)) {
                    boundingBox = block.func_180640_a(Client.getMinecraft().field_71441_e, new BP(x, y, z), Client.getMinecraft().field_71441_e.func_180495_p(new BP(x, y, z)));
                    if (boundingBox != null &&
                        Client.getMinecraft().field_71439_g.func_174813_aQ().func_72326_a(boundingBox))
                        return true;
                }
            }
        }
    }
    return false;
}
register("worldLoad", () => {
    phasetoggle = false
    checkifphased = false
    preparetophase = false
})