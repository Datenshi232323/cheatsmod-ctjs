import { Alert } from "../../Utils/alert"
const rightClick = new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G)
const AutoHeal = new KeyBind("Auto Heal", Keyboard.KEY_NONE, "JangotAddons")
consuming = false
toggleautoheal = false
register("tick", () => {
    if (AutoHeal.isPressed()) {
        if (toggleautoheal) {
            Alert("Auto Heal Disabled", 1)
            toggleautoheal = false
        } else {
            Alert("Auto Heal Enabled", 1)
            toggleautoheal = true
        }
    }
})

register("tick", () => {
    if (toggleautoheal) {
        let PlayerHP = Player.getHP()
        let MaxHP = Player.asPlayerMP().getMaxHP()
        if (PlayerHP / MaxHP < 0.5) {
            for (let i = 0; i < 9; i++) {
                if (ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i)?.getName()).includes("Golden Apple")) {
                    Player.setHeldItemIndex(i)
                    rightClick.setState(true)
                    consuming = true
                    break
                }
            }
        } else {
            if (consuming) {
                consuming = false
                Player.setHeldItemIndex(previousItem)
                rightClick.setState(false)
            } else {
                previousItem = Player.getHeldItemIndex()
            }
        }
    }
})
