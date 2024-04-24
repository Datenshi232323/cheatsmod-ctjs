import { Minecraft } from "../../settings/settings"
import { inSkyblock } from "../../utils/locationUtils"
let shouldWardrobe = false
let armorSlot

function wardrobe(slot) {   
    ChatLib.command("pets")
    armorSlot = slot
    shouldWardrobe = true
    renderGUI.renderGUI = false
}

register("guiOpened", () => {
    if (!shouldWardrobe || !inSkyblock()) return
    setTimeout(() => {
        if (!Player.getContainer().getName().endsWith("Pets")) return
        shouldWardrobe = false
        Minecraft.field_71442_b.func_78753_a(Player.getPlayer().field_71070_bA.field_75152_c, 48, 0, 0, Player.getPlayer())
        Minecraft.field_71442_b.func_78753_a(Player.getPlayer().field_71070_bA.field_75152_c + 1, 32, 0, 0, Player.getPlayer())
        if (armorSlot <= 9) {
            Minecraft.field_71442_b.func_78753_a(Player.getPlayer().field_71070_bA.field_75152_c + 2, armorSlot + 35, 0, 0, Player.getPlayer())
            Minecraft.field_71439_g.func_71053_j()
        } else {
            Minecraft.field_71442_b.func_78753_a(Player.getPlayer().field_71070_bA.field_75152_c + 2, 53, 2, 3, Player.getPlayer())
            Minecraft.field_71442_b.func_78753_a(Player.getPlayer().field_71070_bA.field_75152_c + 3, armorSlot + 26, 0, 0, Player.getPlayer())
            Minecraft.field_71439_g.func_71053_j()
        }
    }, 1)
    setTimeout(() => renderGUI.renderGUI = true, 300)
})

export { wardrobe }
export const renderGUI = { renderGUI: true }