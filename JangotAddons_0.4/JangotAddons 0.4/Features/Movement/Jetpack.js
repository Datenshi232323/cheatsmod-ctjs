let jetelapsed = 0
const Jetpack = new KeyBind("Jetpack", Keyboard.KEY_NONE, "JangotAddons")

function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}

register("tick", () => {
    if (Jetpack.isKeyDown()) {
        jetelapsed++
        if (jetelapsed > 0) {
            jetelapsed = 0
            Client.getMinecraft().field_71439_g.func_70016_h(
                -sin(Player.getYaw()) * cos(Player.getPitch()) * 1.1,
                -sin(Player.getPitch()) * 1.1,
                cos(Player.getYaw()) * cos(Player.getPitch()) * 1.1
            )
        }
    } else {
        jetelapsed = 0
    }
})