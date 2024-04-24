import { Minecraft, working, data } from "../settings/settings"

function facePos(vector) {
    if ((Minecraft.func_71410_x()).field_71462_r == null || (Minecraft.func_71410_x()).field_71462_r instanceof net.minecraft.client.gui.GuiIngameMenu || (Minecraft.func_71410_x()).field_71462_r instanceof net.minecraft.client.gui.GuiChat) {
        if (!working) {
            new Thread(() => {
                try {
                    working = true
                    let eyes = Player.getPlayer().func_174824_e(1)
                    let diffX = vector.field_72450_a - eyes.field_72450_a
                    let diffY = vector.field_72448_b - eyes.field_72448_b
                    let diffZ = vector.field_72449_c - eyes.field_72449_c
                    let dist = Math.sqrt(diffX * diffX + diffZ * diffZ)
                    let pitch = -Math.atan2(dist, diffY)
                    let yaw = Math.atan2(diffZ, diffX)
                    pitch = to180(((pitch * 180.0) / Math.PI + 90.0) * - 1.0 - Player.getPlayer().field_70125_A)
                    yaw = to180((yaw * 180.0) / Math.PI - 90.0 - Player.getPlayer().field_70177_z)
                    for (i = 0; i < data.lookVelocity; i++) {
                        Player.getPlayer().field_70177_z += yaw / data.lookVelocity
                        Player.getPlayer().field_70125_A += pitch / data.lookVelocity
                        Thread.sleep(1)
                    }
                    working = false
                } catch (e) {
                    return
                } 
            }).start()
        }
    } 
}

function to180(angle) {
    angle %= 360.0
    while (angle >= 180.0)
      angle -= 360.0
    while (angle < -180.0)
      angle += 360.0
    return angle
}

export { facePos }