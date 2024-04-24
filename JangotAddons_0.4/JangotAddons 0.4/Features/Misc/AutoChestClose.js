import { Alert } from "../../Utils/alert"
let autochestclose = false
const chestCloseBind = new KeyBind("Auto Chest Close", Keyboard.KEY_NONE, "JangotAddons")

register("tick", () => {
    if (chestCloseBind.isPressed()) {
        if (!autochestclose) {
            Alert("Auto Chest Close Enabled", 1)
            autochestclose = true
        } else if (autochestclose) {
            Alert("Auto Chest Close Disabled", 1)
            autochestclose = false
        }
    }
})
register("tick", () => {
    if (Client.currentGui.get() instanceof net.minecraft.client.gui.inventory.GuiChest && autochestclose) {
        if (Player.getContainer().getContainer().func_85151_d().func_145748_c_().func_150260_c().toString().includes("Chest")) {
            Client.sendPacket(new net.minecraft.network.play.client.C0DPacketCloseWindow())
            Client.getMinecraft().field_71439_g.func_71053_j()
        }
    }
})