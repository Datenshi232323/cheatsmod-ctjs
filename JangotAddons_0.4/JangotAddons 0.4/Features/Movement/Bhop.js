import { Alert } from "../../Utils/alert"
bhoptoggled = false
const Bhop = new KeyBind("Bhop", Keyboard.KEY_NONE, "JangotAddons")
const KeyBindings = Java.type('net.minecraft.client.GameSettings')
const timer = Client.getMinecraft().getClass().getDeclaredField("field_71428_T")
timer.setAccessible(true)
const Timer = Java.type("net.minecraft.util.Timer")

function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}

register("tick", () => {
    if (Bhop.isPressed()) {
        if (bhoptoggled) {
            Alert("Bhop Disabled", 1)
            bhoptoggled = false
        } else {
            Alert("Bhop Enabled", 1)
            bhoptoggled = true
        }
    }
})
register("tick", () => {
    if (!Player.isSneaking() && bhoptoggled && !Client.isInGui()) {
        let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
        let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
        let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x).getKeyCode()
        let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z).getKeyCode()
        Client.getMinecraft().field_71439_g.field_70159_w = 0
        Client.getMinecraft().field_71439_g.field_70179_y = 0
        if (Keyboard.isKeyDown(Forward) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * 0.5
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * 0.5
        }
        if (Keyboard.isKeyDown(Left) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() + 90) * -0.5
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() + 90) * -0.5
        }
        if (Keyboard.isKeyDown(Backward) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * -0.5
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * -0.5
        }
        if (Keyboard.isKeyDown(Right) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() - 90) * -0.5
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() - 90) * -0.5
        }
        if (Keyboard.isKeyDown(Forward) || Keyboard.isKeyDown(Left) || Keyboard.isKeyDown(Backward) || Keyboard.isKeyDown(Right)) {
            if (!Client.Companion.isInGui() && Player.getPlayer().field_70122_E == true) {
                Client.getMinecraft().field_71439_g.field_70181_x = 0.6
            }
        }
        /*
            if (!Player.getPlayer().field_70122_E && Player.getMotionY() < 0) {
                Client.getMinecraft().field_71439_g.field_70181_x += Player.getMotionY() / 0.2
            } else 
            */
        if (Player.getMotionY() > 0) {
            Client.getMinecraft().field_71439_g.field_70181_x -= 0.05
        }
    }
})