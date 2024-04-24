import { Minecraft } from "../../settings/settings"
let blacklist = ["Craft Item", "Storage", "Reforge Item (Advanced)", "Gemstone Grinder", "Anvil", "Enchant Item", "Personal", "Minion", "Pet Sitter", "Offer Pets", "Item Frame", "Brewing Stand", "Runic Pedestal", "Sack", "Present Item"]

function noPingMenu(gui, event) {
    try {
        let black = false
        if (Player.getContainer().getStackInSlot(0).getName() == " " && Player.getContainer().getStackInSlot(0).getDamage() == 15 && !(gui instanceof net.minecraft.client.gui.inventory.GuiEditSign)) {
            blacklist.forEach((blacklisted) => {
                if (Player.getContainer().getName().includes(blacklisted)) black = true
            })
            if (black) return
            cancel(event)
            Minecraft.field_71442_b.func_78753_a(Player.getPlayer().field_71070_bA.field_75152_c, gui.getSlotUnderMouse()?.field_75222_d, 2, 3, Player.getPlayer())        
                    
        }
    } catch (e) {
        return
    }
}

export { noPingMenu }