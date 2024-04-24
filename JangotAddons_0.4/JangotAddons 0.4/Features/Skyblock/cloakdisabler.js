import { settings } from "../../Settings/settings.js"
const Minecraft = Client.getMinecraft()
const rightClick = Minecraft.getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)
stop = true
toggledeactivatealert = false

register("chat", (event) => {
    let enable = ChatLib.getChatMessage(event, true)
    if (enable == "&r&dCreeper Veil &r&aActivated!&r" && settings.Features["Cloak Disabler"].toggle) {
        console.log("enabled")
        stop = false
        setTimeout(function () {

            for (let i = 0; i < 9; i++) {
                if (ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i)?.getName()).includes("Wither Cloak Sword") && !stop) {
                    toggledeactivatealert = false
                    let previousItem = Player.getHeldItemIndex()
                    Player.setHeldItemIndex(i)
                    rightClick.invoke(Minecraft)
                    Player.setHeldItemIndex(previousItem)
                    toggledeactivatealert = true
                    break
                } else if (i >= 8 && !stop) {
                    console.log("cloak not found")
                    ChatLib.chat("§l§bJangotAddons§r>§cWither Cloak not found!")
                }
            }
        }, settings.Features["Cloak Disabler"].Delay
        )
    }
}
)
register("chat", (event) => {
    let disable = ChatLib.getChatMessage(event, true)
    if ((disable == "&r&dCreeper Veil &r&cDe-activated!&r" || disable == "&r&cNot enough mana! &r&dCreeper Veil &r&cDe-activated!&r") && toggledeactivatealert && settings.Features["Cloak Disabler"].toggle) {
        console.log("cancelled")
        stop = true
    }
})
register("chat", (event) => {
    let grabMessage = ChatLib.getChatMessage(event, true)
    if (grabMessage == "&r&dCreeper Veil &r&cDe-activated! &r&8(Expired)&r" && settings.Features["Cloak Disabler"].toggle) {
        ChatLib.chat("§l§bJangotAddons§r>§cCloak Disabler messed up, could it be lag?")
    }
})
register("command", (delay) => {
    if (!isNaN(delay) && delay > 5999 && delay < 10000) {
        ChatLib.chat("§l§bJangotAddons§r>§bSet Disabler Delay to " + Math.floor(delay) + "ms!")
        settings.Features["Cloak Disabler"].Delay = Math.floor(delay)
        settings.settings.Features["Cloak Disabler"].save()
    } else if (delay < 6000) {
        ChatLib.chat("§l§bJangotAddons§r>§cDelay too low!")
    } else if (delay > 10000) {
        ChatLib.chat("§l§bJangotAddons§r>§cDelay too high!")
    } else if (delay == null) {
        ChatLib.chat("§l§bJangotAddons§r>§bCloak Disabler delay is " + settings.Features["Cloak Disabler"].Delay + "!")
    } else if (delay.toLowerCase() == "toggle") {
        if (settings.Features["Cloak Disabler"].toggle) {
            ChatLib.chat("§l§bJangotAddons§r>§bCloak Disabler disabled!")
            settings.Features["Cloak Disabler"].toggle = false
            settings.save()
        } else {
            ChatLib.chat("§l§bJangotAddons§r>§bCloak Disabler enabled!")
            settings.Features["Cloak Disabler"].toggle = true
            settings.save()
        }
    } else {
        ChatLib.chat("§l§bJangotAddons§r>§cInvalid Delay Time! Correct Syntax: /cloakdisabler <delay/toggle>, where delay is not more than 10000ms and not lesser than 6000ms.")
    }
}).setName("cloakdisabler")