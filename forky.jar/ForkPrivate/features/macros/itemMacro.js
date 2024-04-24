import { data, Minecraft, rightClick } from "../../settings/settings"

function itemMacro(itemname) {
    for (let i = 0; i < 9; i++) {
        if (ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i)?.getName()).includes(itemname)) {
            let previousItem = Player.getHeldItemIndex()
            Player.setHeldItemIndex(i)
            rightClick.invoke(Minecraft)
            Player.setHeldItemIndex(previousItem)
            data.metrics.itemmacros++
            break
        } else if (i >= 8) {
            ChatLib.chat("§zFork Private > §g" + itemname + " not found!")
        }
    }
}

export { itemMacro }