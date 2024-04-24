import { Minecraft } from "../../settings/settings"

function chestClose() {
    try {
        if (Client.currentGui.get() instanceof net.minecraft.client.gui.inventory.GuiChest) {
            if (Player.getContainer().getContainer().func_85151_d().func_145748_c_().func_150260_c() === "Chest") {
                Minecraft.field_71439_g.func_71053_j()
            }
        }
    } catch (e) {
        return
    }
}

export { chestClose }