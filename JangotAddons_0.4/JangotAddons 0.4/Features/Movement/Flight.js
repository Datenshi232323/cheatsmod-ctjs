import { Alert } from "../../Utils/alert"
let flying = false
const flyBind = new KeyBind("Flight", Keyboard.KEY_NONE, "JangotAddons")

register("tick", () => {
    if (flyBind.isPressed()) {
        if (!flying) {
            Alert("Flight Enabled", 1)
            flying = true
        } else if (flying) {
            Client.getMinecraft().field_71439_g.field_70181_x = 0
            Client.getMinecraft().field_71439_g.field_70159_w = 0
            Client.getMinecraft().field_71439_g.field_70179_y = 0
            Alert("Flight Disabled", 1)
            flying = false
        }
    }
    if (flying) {
        let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
        let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
        let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x).getKeyCode()
        let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z).getKeyCode()
        let Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A).getKeyCode()
        Client.getMinecraft().field_71439_g.field_70181_x = 0
        Client.getMinecraft().field_71439_g.field_70159_w = 0
        Client.getMinecraft().field_71439_g.field_70179_y = 0
        if (Keyboard.isKeyDown(Forward) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * 1
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * 1
        }
        if (Keyboard.isKeyDown(Backward) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * -1
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * -1
        }
        if (Keyboard.isKeyDown(Left) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() + 90) * -1
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() + 90) * -1
        }
        if (Keyboard.isKeyDown(Right) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() - 90) * -1
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() - 90) * -1
        }
        if (Keyboard.isKeyDown(Jump) && !Client.Companion.isInGui() && !Player.isSneaking()) {
            Client.getMinecraft().field_71439_g.field_70181_x = 1
        }
        if (Player.isSneaking() && !Client.Companion.isInGui() && !Keyboard.isKeyDown(Jump)) {
            Client.getMinecraft().field_71439_g.field_70181_x = -1
        }
    }
})
function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}
