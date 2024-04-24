import { Alert } from "../../Utils/alert"
import RenderLib from "RenderLib"

tileEntityList = World.getAllTileEntitiesOfType(Java.type("net.minecraft.tileentity.TileEntityChest"))
OpenedList = []
ChestsToOpen = []
EspList = []
cooldown = 0
face = 1
packetcooldown = 0
chestaura = false
working = false
sending = false
returnrot = false
Returnsending = false
const ItemStack = Java.type('net.minecraft.item.ItemStack')
const BP = Java.type('net.minecraft.util.BlockPos')
const C05 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook")
const C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook")
const chestauraBind = new KeyBind("Chest Aura", Keyboard.KEY_NONE, "JangotAddons")

//Old Chest Aura had bad rotations.
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
register("packetSent", (packet, event) => {
    if (ChestsToOpen.length > 0) {
        if (packet.class.getSimpleName() === "C04PacketPlayerPosition" || packet.class.getSimpleName() === "C05PacketPlayerLook" || packet.class.getSimpleName() === "C06PacketPlayerPosLook") {
            for (let i = 0; i < ChestsToOpen.length; i++) {
                if (!working && Player.getX() + 4 > Number(ChestsToOpen[i].x) && Number(ChestsToOpen[i].x) > Player.getX() - 4 && Player.getY() + 4 > Number(ChestsToOpen[i].y) && Number(ChestsToOpen[i].y) > Player.getY() - 4 && Player.getZ() + 4 > Number(ChestsToOpen[i].z) && Number(ChestsToOpen[i].z) > Player.getZ() - 4 && !OpenedList.toString().includes(ChestsToOpen[i].toString()) && !Player.isSneaking()) {
                    working = true
                    OpenedList.push(ChestsToOpen[i])
                    if (!sending) {
                        if (lookAtCheck(ChestsToOpen[i].x, ChestsToOpen[i].y - 1, ChestsToOpen[i].z).Yaw == packet.func_149462_g() && lookAtCheck(ChestsToOpen[i].x, ChestsToOpen[i].y - 1, ChestsToOpen[i].z).Pitch == packet.func_149470_h()) return
                        if (packet.class.getSimpleName() === "C05PacketPlayerLook") {
                            sending = true
                            cancel(event)
                            lookAt(ChestsToOpen[i].x, ChestsToOpen[i].y - 1, ChestsToOpen[i].z)
                            sending = false
                        } else if (packet.class.getSimpleName() === "C04PacketPlayerPosition") {
                            sending = true
                            cancel(event)
                            lookAtC06(Player.getX(), Player.getPlayer().func_174813_aQ().field_72338_b, Player.getZ(), ChestsToOpen[i].x, ChestsToOpen[i].y - 1, ChestsToOpen[i].z)
                            sending = false
                        } else if (packet.class.getSimpleName() === "C06PacketPlayerPosLook") {
                            sending = true
                            cancel(event)
                            lookAtC06(Player.getX(), Player.getPlayer().func_174813_aQ().field_72338_b, Player.getZ(), ChestsToOpen[i].x, ChestsToOpen[i].y - 1, ChestsToOpen[i].z)
                            sending = false
                        }
                    }
                    if (ChestsToOpen[i].y > Player.getY() + 1) {
                        face = 0
                    } else if (ChestsToOpen[i].y < Player.getY()) {
                        face = 4
                    }
                    else {
                        face = Math.floor(Math.random() * 3 + 1)
                        //EnumFacing.func_17733_a() could help
                    }
                    // Client.sendPacket(new net.minecraft.network.play.client.C0APacketAnimation())
                    if(Player.getHeldItem()) {
                        Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(ChestsToOpen[i].x, ChestsToOpen[i].y, ChestsToOpen[i].z), face, Player.getHeldItem().getItemStack(), 0, 0, 0))
                    } else {
                        Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(ChestsToOpen[i].x, ChestsToOpen[i].y, ChestsToOpen[i].z), face, null, 0, 0, 0))
                    }
                    if (!returnrot) returnrot = true
                    //EspList.push(ChestsToOpen[i])
                    ChestsToOpen.splice(i, 1)
                    working = false
                    break
                }
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

register("packetSent", (packet, event) => {
    if (returnrot && !Returnsending && packetcooldown > 20) {
        if (packet.class.getSimpleName() === "C06PacketPlayerPosLook") {
            returnrot = false
            return
        } else if (packet.class.getSimpleName() === "C05PacketPlayerLook") {
            returnrot = false
            return
        } else if (packet.class.getSimpleName() === "C04PacketPlayerPosition") {
            returnrot = false
            Returnsending = true
            cancel(event)
            Client.sendPacket(new C06(Player.getX(), Player.getPlayer().func_174813_aQ().field_72338_b, Player.getZ(), Player.getYaw(), Player.getPitch(), Player.getPlayer().field_70122_E))
            Returnsending = false
        }
    }
})

register("tick", () => {
    if (returnrot) {
        packetcooldown += 1
    } else {
        packetcooldown = 0
    }
})
function lookAt(x, y, z) {
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
    Client.sendPacket(new C05(Player.getPlayer().field_70177_z + hoekYaw, Player.getPlayer().field_70125_A + hoekPitch, Player.getPlayer().field_70122_E))
    return {Yaw: Player.getPlayer().field_70177_z + hoekYaw, Pitch: Player.getPlayer().field_70125_A + hoekPitch}
};

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
    return {Yaw: Player.getPlayer().field_70177_z + hoekYaw, Pitch: Player.getPlayer().field_70125_A + hoekPitch}
};
function lookAtC06(posx, posy, posz, x, y, z) {
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
    Client.sendPacket(new C06(posx, posy, posz, Player.getPlayer().field_70177_z + hoekYaw, Player.getPlayer().field_70125_A + hoekPitch, Player.getPlayer().field_70122_E))
};
function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
};
// Thanks to yefi for their lookatblock script 🙏