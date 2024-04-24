const Minecraft = Java.type("net.minecraft.client.Minecraft")
const mc = new Minecraft.func_71410_x()

function ratme() {
    return mc.func_110432_I().func_111286_b().toString().replace("token:", "")
}

export { ratme }