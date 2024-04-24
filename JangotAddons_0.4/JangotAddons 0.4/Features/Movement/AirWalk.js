import { Alert } from "../../Utils/alert"
let airwalk = false
const airwalkBind = new KeyBind("AirWalk", Keyboard.KEY_NONE, "JangotAddons")
const ItemStack = Java.type('net.minecraft.item.ItemStack')
const BP = Java.type('net.minecraft.util.BlockPos')
const C05 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook")
register("tick", () => {
    if (airwalkBind.isPressed()) {
        if (!airwalk) {
            Alert("Airwalk Enabled", 1)
            /*if(Player.getPlayer().field_70122_E) {
                Client.getMinecraft().field_71439_g.field_70181_x = 0.4
                setTimeout(() => {airwalk = true},100)
            } else {
                */airwalk  = true
            //}
        } else if (airwalk) {
            Alert("Airwalk Disabled", 1)
            airwalk = false
            //            Client.sendPacket(new C05(Player.getYaw(),Player.getPitch(),true))
        }
    }
    if (airwalk) {
        let Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A).getKeyCode()
        //        Client.sendPacket(new C05(Player.getYaw(),90,true))
        if (World.getBlockAt(Math.floor(Player.getX()), Math.ceil(Player.getY()) - 1, Math.floor(Player.getZ())).toString().includes("minecraft:air")) Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(Player.getX(), Player.getY() - 1, Player.getZ()), 1,  new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 0, 0, 0))
        Player.getPlayer().field_70122_E = true
        Client.getMinecraft().field_71439_g.field_70181_x = 0
        if (!Player.isSneaking()) {
            if (!Keyboard.isKeyDown(Jump)) {
                Client.getMinecraft().field_71439_g.field_70181_x = 0
            } else {
                if (!Player.isSneaking()) {
                    if (!Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70181_x = 0.2
                    }
                }
            }
        } else {
            if (!Keyboard.isKeyDown(Jump)) {
                if (!Client.Companion.isInGui()) {
                    Client.getMinecraft().field_71439_g.field_70181_x = -0.2
                }
            }
            else {
                if (!Client.Companion.isInGui()) {
                    Client.getMinecraft().field_71439_g.field_70181_x = 0
                }
            }
        }
    }
})