import { Alert } from "../../Utils/alert"

bounce = false
bouncetoggle = false
const bounceBind = new KeyBind("No Slime Bounce", Keyboard.KEY_NONE, "JangotAddons")
register("tick", () => {
    if (bounceBind.isPressed()) {
        if (!bouncetoggle) {
            Alert("No Bounce Enabled", 1)
            bouncetoggle = true
        } else if (bouncetoggle) {
            Alert("No Bounce Disabled", 1)
            bouncetoggle = false
        }
    }
    if (bouncetoggle && Player.getMotionY() > 0 && World.getBlockAt(Math.floor(Player.getX()), Math.floor(Player.getY()) - 1, Math.floor(Player.getZ())).toString().includes("minecraft:slime") && Player.getPlayer().field_70122_E) {
        Client.getMinecraft().field_71439_g.field_70181_x = 0
        if (bounce && Player.getPlayer().field_70122_E) {
            bounce = false
        } else {
            Client.getMinecraft().field_71439_g.field_70181_x = 0.05
            bounce = true
        }
    }
})