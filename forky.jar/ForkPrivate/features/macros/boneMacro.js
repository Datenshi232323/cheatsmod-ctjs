import { Minecraft, rightClick, data } from "../../settings/settings"

function boneMacro() {
    let boneSlots = []
    let previousItem = Minecraft.field_71439_g.field_71071_by.field_70461_c
    for (let i = 0; i < 9; i++) {
        if (ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i)?.getName()).includes("Bonemerang")) {
            boneSlots.push(i)
        } else if (i >= 8 && boneSlots.length < 1) {
            ChatLib.chat("§zFork Private > §gItems not found!")
        }
    }
    boneSlots.forEach((slot) => {
        setTimeout(() => {
            Minecraft.field_71439_g.field_71071_by.field_70461_c = slot
            rightClick.invoke(Minecraft)
        }, data.features["Macros"]["Bone Macro"]["Delay"] * boneSlots.indexOf(slot))
        setTimeout(() => {Minecraft.field_71439_g.field_71071_by.field_70461_c = previousItem}, (data.features["Macros"]["Bone Macro"]["Delay"] * boneSlots.length))
    })
}

export { boneMacro }