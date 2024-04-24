import { Alert } from "../../Utils/alert"
preparetoboostup = false
onmount = false
togglecannonball = false
const HumanCannonball = new KeyBind("Cannonball", Keyboard.KEY_NONE, "JangotAddons")

function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}

register("tick", () => {
    if (HumanCannonball.isPressed()) {
        if (togglecannonball) {
            Alert("Cannonball Disabled", 1)
            togglecannonball = false
        } else {
            Alert("Cannonball Enabled", 1)
            togglecannonball = true
        }
    }
})
register("tick", () => {
    if (Player.asPlayerMP().getRiding() && togglecannonball) {
        onmount = true
        preparetoboostup = true
    } else {
        onmount = false
    }
})
register("tick", () => {
    if (preparetoboostup && !onmount && togglecannonball) {
        preparetoboostup = false
        Alert("Boosting", 1)
        setTimeout(() => {
            Client.getMinecraft().field_71439_g.field_70159_w = -sin(Player.getYaw()) * cos(Player.getPitch()) * 5
            Client.getMinecraft().field_71439_g.field_70179_y = cos(Player.getYaw()) * cos(Player.getPitch()) * 5
            Client.getMinecraft().field_71439_g.field_70181_x = -sin(Player.getPitch()) * 5
        }, 40)
    }
})