import { Minecraft, rightClick, data } from "../../settings/settings"

function scanForAttunement() {
    if (Client.currentGui.get() != null) return
    World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).forEach(stand => {
        if ((ChatLib.removeFormatting(stand.getName()).includes("ASHEN") || ChatLib.removeFormatting(stand.getName()).includes("AURIC") || ChatLib.removeFormatting(stand.getName()).includes("SPIRIT") || ChatLib.removeFormatting(stand.getName()).includes("CRYSTAL")) && Player.getPlayer().func_70032_d(stand.getEntity()) <= 6) {
            swapAttunement(ChatLib.removeFormatting(stand.getName()).split(" ")[0].toLowerCase())
        }
    })
}

function swapAttunement(switchTo) {
    for (let i = 0; i < 8; i++) {
        if (((ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i).getName()).includes("Firedust Dagger") || ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i).getName()).includes("Kindlebane Dagger")) && (switchTo == "ashen" || switchTo == "auric")) || ((ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i).getName()).includes("Twilight Dagger") || ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i).getName()).includes("Mawdredge Dagger")) && (switchTo == "spirit" || switchTo == "crystal"))) {
            let type = whatType(Player.getInventory().getStackInSlot(i))
            if (type == switchTo && whatType(Player.getHeldItem()) == switchTo) return
            else {
                Player.setHeldItemIndex(i)
                rightClick.invoke(Minecraft)
                break
            }
        }
    }
}

function whatType(item) {
    if (item.getRegistryName() == "minecraft:stone_sword") return "ashen"
    if (item.getRegistryName() == "minecraft:golden_sword") return "auric"
    if (item.getRegistryName() == "minecraft:iron_sword") return "spirit"
    if (item.getRegistryName() == "minecraft:diamond_sword") return "crystal"
}

export { scanForAttunement }