import { Minecraft, rightClick, sendNotif } from "../../settings/settings"
import { facePos } from "../../utils/rotation"
const xList = [-283.96875, -280.96875]
const zList = [-176.96875, -179.96875]
const deleteX = [-282.1875, -282.28125, -272.71875, -282.8125, -282.71875]
const deleteZ = [-178.15625, -178.25, -178.125, -178.6875, -178.75, -178.78125, -178.21875, -178.6875]

function autoArachne() {
    if (!(Player.getX() > -284 && Player.getX() < -281 && Player.getZ() > -179 && Player.getZ() < -177 && Player.getY() == 49)) return
    for (let i = 0; i < 9; i++) {
        if (ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i)?.getName()).includes("Arachne's Keeper Fragment")) {
            Player.setHeldItemIndex(i)
            break
        } else if (i >= 8) {
            ChatLib.chat("§zFork Private > §gArachne Fragment not found!")
            return
        }
    }
    sendNotif("Arachne Spawning!", 3)
    new Thread(() => {
        World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).forEach(entity => {if (deleteX.includes(entity.getX()) && deleteZ.includes(entity.getZ())) entity.getEntity().func_70106_y()})
        World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).forEach(entity => {
            if (xList.includes(entity.getX()) && zList.includes(entity.getZ())) {
                facePos(new net.minecraft.util.Vec3(entity.getX(), entity.getY(), entity.getZ()))
                Thread.sleep(350)
                rightClick.invoke(Minecraft)
                Thread.sleep(20)
            }
        })
    }).start()
}

export { autoArachne }