import { settings } from "../../Settings/settings"

const Minecraft = Client.getMinecraft()
const rightClick = Minecraft.getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)
stopthrowing = false
register("chat", (event) => {
    let a = ChatLib.getChatMessage(event, true)
    if (a.includes("&r&aYou enchanted your &r") && settings.Features["Enchantment Table QOL"].toggle) {
        for (let e = 0; e < settings.Features["Enchantment Table QOL"].Amount; e++) {
            if (!stopthrowing) {
                setTimeout(useitem(settings.Features["Enchantment Table QOL"].BottleType), 0)
            } else if (stopthrowing && e >= (settings.Features["Enchantment Table QOL"].Amount - 1)) {
                stopthrowing = false
            }
        }
    }
}
)
register("command", (type, type2) => {
    if (type == "toggle") {
        if (settings.Features["Enchantment Table QOL"].toggle) {
            ChatLib.chat("§l§bJangotAddons§r>§bEnchantment Table QOL disabled!")
            settings.Features["Enchantment Table QOL"].toggle = false
            settings.save()
        } else {
            ChatLib.chat("§l§bJangotAddons§r>§bEnchantment Table QOL enabled!")
            settings.Features["Enchantment Table QOL"].toggle = true
            settings.save()
        }
    } else if (type == "bottletype") {
        if (type2 == "normal") {
            ChatLib.chat("§l§bJangotAddons§r>§bEnchanting Bottle Type set to Normal Experience Bottles!")
            settings.Features["Enchantment Table QOL"].BottleType = "Experience Bottle"
            settings.save()
        } else if (type2 == "grand") {
            ChatLib.chat("§l§bJangotAddons§r>§bEnchanting Bottle Type set to Grand Experience Bottles!")
            settings.Features["Enchantment Table QOL"].BottleType = "Grand Experience Bottle"
            settings.save()
        } else if (type2 == "titanic") {
            ChatLib.chat("§l§bJangotAddons§r>§bEnchanting Bottle Type set to Titanic Experience Bottles!")
            settings.Features["Enchantment Table QOL"].BottleType = " Titanic Experience Bottle"
            settings.save()
        } else if (type2 == "collosal") {
            ChatLib.chat("§l§bJangotAddons§r>§bEnchanting Bottle Type set to Colossal Experience Bottles!")
            settings.Features["Enchantment Table QOL"].BottleType = "Colossal Experience Bottle"
            settings.save()
        } else if (type2 == null) {
            ChatLib.chat("§l§bJangotAddons§r>§bCurrent Bottle Type is " + settings.Features["Enchantment Table QOL"].BottleType + ".")
        } else {
            ChatLib.chat("§l§bJangotAddons§r>§cInvalid Bottle Type!")
        }
    } //else if(type == "delay") {
    //if(!isNaN(type2).length > 0 && !(type2 == null)) {
    //if(type2 > 0) {
    //ChatLib.chat("§l§bJangotAddons§r>§bDelay set to " + type2 + "ms!")
    //settings.Features["Enchantment Table QOL"].Delay = type2
    //settings.save()
    //} else {
    //ChatLib.chat("§l§bJangotAddons§r>§cInvalid Delay Time!")
    //}
    //} else if(type2 == null) {
    //ChatLib.chat("§l§bJangotAddons§r>§bEnchanting Delay Time is " + settings.Features["Enchantment Table QOL"].Delay + ".")
    //} else {
    //ChatLib.chat("§l§bJangotAddons§r>§cInvalid Delay Time!")
    //}
    //}
    else if (type == "amount") {
        if (!isNaN(type2).length > 0 && !(type2 == null)) {
            if (type2 > 0 && type2 < 65) {
                ChatLib.chat("§l§bJangotAddons§r>§bAmount set to " + type2 + " bottles!")
                settings.Features["Enchantment Table QOL"].Amount = type2
                settings.save()
            } else if (type2 > 64) {
                ChatLib.chat("§l§bJangotAddons§r>§cAmount too High!")
            } else if (type2 < 1) {
                ChatLib.chat("§l§bJangotAddons§r>§cNo, just no.")
            }
        } else if (type2 == null) {
            ChatLib.chat("§l§bJangotAddons§r>§bAmount of Bottles that will be thrown is " + settings.Features["Enchantment Table QOL"].Amount + ".")
        } else {
            ChatLib.chat("§l§bJangotAddons§r>§cInvalid Bottle Amount!")
        }
    } else {
        ChatLib.chat("§l§bJangotAddons§r>§cInvalid Setting!")
    }
}).setName("etqol")
function useitem(item) {

    for (let i = 0; i < 9; i++) {
        if (ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i)?.getName()) == (item)) {
            let previousItem = Player.getHeldItemIndex()
            Player.setHeldItemIndex(i)
            rightClick.invoke(Minecraft)
            Player.setHeldItemIndex(previousItem)
            break
        } else if (i >= 8) {
            console.log(item + " not found!")
            ChatLib.chat("§l§bJangotAddons§r>§c" + item + " not found!")
            stopthrowing = true
        }
    }
}
//THIS WILL BE PUT IN "SKYBLOCK"