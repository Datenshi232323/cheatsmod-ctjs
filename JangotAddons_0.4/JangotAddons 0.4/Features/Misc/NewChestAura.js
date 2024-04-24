import { Alert } from "../../Utils/alert"
import RenderLib from "RenderLib"
import ServerRotations from "../../Utils/ServerRotations"

let tileEntityList = World.getAllTileEntitiesOfType(Java.type("net.minecraft.tileentity.TileEntityChest"))
let OpenedList = []
let ChestsToOpen = []
let EspList = []
let cooldown = 0
let face = 1
let chestaura = false
let working = false
const ItemStack = Java.type('net.minecraft.item.ItemStack')
const BP = Java.type('net.minecraft.util.BlockPos')
const EnumFacing = Java.type('net.minecraft.util.EnumFacing')
const C05 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook")
const C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook")
const chestauraBind = new KeyBind("Chest Aura", Keyboard.KEY_NONE, "JangotAddons")
register("tick", () => {
    if (chestauraBind.isPressed()) {
        if (!chestaura) {
            Alert("Chest Aura Enabled", 1)
            chestaura = true
        } else {
            Alert("Chest Aura Disabled", 1)
            OpenedList = []
            chestaura = false
        }
    }
})
register("tick", () => {
    if (chestaura) {
        cooldown += 1
        tileEntityList = World.getAllTileEntitiesOfType(Java.type("net.minecraft.tileentity.TileEntityChest"))
        for (let i = 0; i < tileEntityList.length; i++) {
            if (Player.getX() + 4 > Number(tileEntityList[i].x) && Number(tileEntityList[i].x) > Player.getX() - 4 && Player.getY() + 4 > Number(tileEntityList[i].y) && Number(tileEntityList[i].y) > Player.getY() - 4 && Player.getZ() + 4 > Number(tileEntityList[i].z) && Number(tileEntityList[i].z) > Player.getZ() - 4 && !OpenedList.toString().includes(tileEntityList[i].toString()) && !Player.isSneaking()) {
                if (!Client.Companion.isInGui() && cooldown > 0 && !ChestsToOpen.toString().includes(tileEntityList[i].toString())) {
                    cooldown = 0
                    ChestsToOpen.push(tileEntityList[i])
                }
            }
        }
    }
})
register("tick", (elapsed) => {
    if (ChestsToOpen.length > 0) {
        for (let i = 0; i < ChestsToOpen.length; i++) {
            if (!working && Player.getX() + 4 > Number(ChestsToOpen[i].x) && Number(ChestsToOpen[i].x) > Player.getX() - 4 && Player.getY() + 4 > Number(ChestsToOpen[i].y) && Number(ChestsToOpen[i].y) > Player.getY() - 4 && Player.getZ() + 4 > Number(ChestsToOpen[i].z) && Number(ChestsToOpen[i].z) > Player.getZ() - 4 && !OpenedList.toString().includes(ChestsToOpen[i].toString()) && !Player.isSneaking()) {
                working = true
                OpenedList.push(ChestsToOpen[i])
                ServerRotations.set(lookAtCheck(ChestsToOpen[i].x + 0.5, ChestsToOpen[i].y - 1, ChestsToOpen[i].z + 0.5).Yaw + 0.1, lookAtCheck(ChestsToOpen[i].x + 0.5, ChestsToOpen[i].y - 1, ChestsToOpen[i].z + 0.5).Pitch + 0.1)
                if (ChestsToOpen[i].y > Player.getY() + 1) {
                    face = 0
                } else if (ChestsToOpen[i].y < Player.getY() + 1) {
                    face = 1
                } else {
                    let facing = EnumFacing.func_176733_a(lookAtCheck(ChestsToOpen[i].x + 0.5, ChestsToOpen[i].y, ChestsToOpen[i].z + 0.5).Yaw + 0.1)
                    if (facing == "north") {
                        face = 3
                    } else if (facing == "south") {
                        face = 2
                    } else if (facing == "east") {
                        face = 4
                    } else {
                        face = 5
                    }
                }
                Client.sendPacket(new net.minecraft.network.play.client.C0APacketAnimation())
                if (Player.getHeldItem()) {
                    Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(ChestsToOpen[i].x, ChestsToOpen[i].y, ChestsToOpen[i].z), face, Player.getHeldItem().getItemStack(), 0, 0, 0))
                } else {
                    Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(ChestsToOpen[i].x, ChestsToOpen[i].y, ChestsToOpen[i].z), face, null, 0, 0, 0))
                }
                Client.scheduleTask(0, () => { ServerRotations.resetRotations() })
                //EspList.push(ChestsToOpen[i])
                ChestsToOpen.splice(i, 1)
                working = false
                break
            }
        }
    }
})
/*
register("renderWorld", () => {
    for (let i = 0; i < EspList.length; i++) {
        if (!Client.Companion.isInGui()) RenderLib.drawEspBox(EspList[i].x + 0.5, EspList[i].y, EspList[i].z + 0.5, 0.85, 0.85, 0, 1, 1, 1, true)
        // EspList.splice(i, 1)
    }
})
*/

register("worldLoad", () => {
    OpenedList = [""]
})

function lookAtCheck(x, y, z) {
    let hoekPitch
    let hoekYaw
    let PlayerAngleYaw = Player.getPlayer().field_70177_z
    let AngleYaw
    PlayerAngleYaw %= 360
    let dX = Player.getX() - x + 0.00001
    let dZ = Player.getZ() - z + 0.00001
    let dY = Player.getY() - y
    let dis = Math.sqrt((dX * dX) + (dZ * dZ))
    if (dX < 0.0 && dZ < 0.0) {
        AngleYaw = radians_to_degrees(Math.atan(dZ / dX)) + 180
    } else if (dZ < 0.0 && dX > 0.0) {
        AngleYaw = radians_to_degrees(Math.atan(dZ / dX)) + 360
    } else if (dZ > 0.0 && dX < 0.0) {
        AngleYaw = radians_to_degrees(Math.atan(dZ / dX)) + 180
    } else if (dZ > 0.0 && dX > 0.0) {
        AngleYaw = radians_to_degrees(Math.atan(dZ / dX))
    }
    hoekYaw = AngleYaw - PlayerAngleYaw + 90
    if (hoekYaw > 180) {
        hoekYaw -= 360
    } if (hoekYaw < -180) {
        hoekYaw += 360
    }

    hoekPitch = radians_to_degrees(Math.atan(dY / dis)) - Player.getPlayer().field_70125_A

    if (hoekPitch > 180) {
        hoekPitch -= 360
    } if (hoekPitch < -180) {
        hoekPitch += 360
    }
    return { Yaw: Player.getPlayer().field_70177_z + hoekYaw, Pitch: Player.getPlayer().field_70125_A + hoekPitch }
}
function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}
