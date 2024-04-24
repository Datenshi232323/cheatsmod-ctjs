import { Alert } from "../../Utils/alert"

fastbowtoggle = false
const FastBow = new KeyBind("FastBow", Keyboard.KEY_NONE, "JangotAddons")
const BP = Java.type('net.minecraft.util.BlockPos')
const EnumFacing = Java.type('net.minecraft.util.EnumFacing')
const C03 = Java.type('net.minecraft.network.play.client.C03PacketPlayer')
const C07 = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging')
const C08 = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement')

register("tick", (elapsed) => {
    if (FastBow.isPressed()) {
        if (!fastbowtoggle) {
            Alert("FastBow Enabled", 1)
            fastbowtoggle = true
        } else if (fastbowtoggle) {
            Alert("FastBow Disabled", 1)
            fastbowtoggle = false
        }
    }
    if (new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G).isKeyDown() && Player.getHeldItem() && fastbowtoggle) {
        if (Player.getHeldItem().getItemNBT().toObject().id == "minecraft:bow" && Player.getInventory().contains(262)) {
            Client.getMinecraft().field_71442_b.func_78769_a(Client.getMinecraft().field_71439_g, Client.getMinecraft().field_71441_e, Player.getHeldItem().getItemStack())
            Client.getMinecraft().field_71439_g?.field_71071_by?.func_70448_g()?.func_77973_b()?.func_77659_a(
                Client.getMinecraft().field_71439_g.field_71071_by.func_70448_g(),
                Client.getMinecraft().field_71441_e,
                Client.getMinecraft().field_71439_g
            )
            for (let i = 0; i < 20; i++) {
                Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C03(false))
            }
            Client.getMinecraft().func_147114_u().func_147297_a(new C07(C07.Action.RELEASE_USE_ITEM, new BP(0,0,0), EnumFacing.DOWN))
            Client.getMinecraft().field_71439_g?.field_71071_by?.func_70448_g()?.func_77973_b()?.func_77615_a(
                Client.getMinecraft().field_71439_g.field_71071_by.func_70448_g(),
                Client.getMinecraft().field_71441_e,
                Client.getMinecraft().field_71439_g,
                10
            )
            
        }
    }
})
