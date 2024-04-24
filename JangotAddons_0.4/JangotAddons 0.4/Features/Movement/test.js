import { Alert } from "../../Utils/alert"
import RenderLib from "RenderLib"
import { timerSpeed } from "../../Utils/timer"
const ItemStack = Java.type('net.minecraft.item.ItemStack')
const BP = Java.type('net.minecraft.util.BlockPos')
let airwalk = false
let reached = false
let disable = false
let prepareforairwalk = false
let scanforserverresponse = false
let ticks = 0
let float = true
let sending = false
let nokick = false
let SwitchedHand = false
let cancelchatspam = false
let disablertoggled = false
let dontglide = false
let cancelS08 = false
// let ESPtest = []
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
const C03 = Java.type('net.minecraft.network.play.client.C03PacketPlayer')
const C09 = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange')
const airwalkBind = new KeyBind("Purple Prison Fly 2", Keyboard.KEY_NONE, "JangotAddons")

register("tick", (elapsed) => {
    if (airwalkBind.isPressed()) {
        if (!airwalk) {
            Alert("PP Fly Enabled", 1)
            prepareforairwalk = true
        } else if (airwalk) {
            Alert("PP Fly Disabled", 1)
            airwalk = false
            reached = false
            disable = false
            ticks = 0
        }
    }
    if (airwalk && !disable) {
        if (Player.getMotionY().toString().slice(0, 3) == "0.0" && !Player.isSneaking() && !Player.isFlying()) {
            reached = true
        }
        if (reached && World.getBlockAt(Player.getX(), Player.getY() - 0.5, Player.getZ()).type.getName() == "tile.air.name") {
            for (let i = 0; i < 9; i++) {
                if (Player.getInventory().getStackInSlot(i)) {
                    if (!Player.getInventory().getStackInSlot(i)?.getName().toString().removeFormatting().includes("Bomb")) {
                        if (Player.getInventory().getStackInSlot(i)?.getItem().class.getSimpleName() == "ItemMultiTexture" || Player.getInventory().getStackInSlot(i)?.getItem().class.getSimpleName() == "ItemBlock") {
                            if (Player.getHeldItemIndex() !== i) Client.sendPacket(new C09(i))
                            SwitchedHand = true
                            break
                        }
                    }
                } else if (i >= 8) {
                    Alert("Failed to find a block!", 1)
                    airwalk = false
                    reached = false
                    disable = false
                    ticks = 0
                }
            }
            if (SwitchedHand) {
                SwitchedHand = false
                /*   if (CheckBlocksBelowPlayer()) {
                       dontglide = false
                       Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(CheckBlocksBelowPlayer().x, CheckBlocksBelowPlayer().y, CheckBlocksBelowPlayer().z), CheckFaceForBlock(CheckBlocksBelowPlayer().x, CheckBlocksBelowPlayer().y, CheckBlocksBelowPlayer().z), new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 1, 1, 1))
                   } else if (CheckBlocksAbovePlayer()) {
                       dontglide = false
                       Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(CheckBlocksAbovePlayer().x, CheckBlocksAbovePlayer().y, CheckBlocksAbovePlayer().z), CheckFaceForBlock(CheckBlocksAbovePlayer().x, CheckBlocksAbovePlayer().y, CheckBlocksAbovePlayer().z), new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 1, 1, 1))
                   } else if (CheckBlocksBesidePlayerX()) {
                       dontglide = false
                       Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(CheckBlocksBesidePlayerX().x, CheckBlocksBesidePlayerX().y, CheckBlocksBesidePlayerX().z), CheckFaceForBlock(CheckBlocksBesidePlayerX().x, CheckBlocksBesidePlayerX().y, CheckBlocksBesidePlayerX().z), new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 1, 1, 1))
                   } else if (CheckBlocksBesidePlayerZ()) {
                       dontglide = false
                       Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(CheckBlocksBesidePlayerZ().x, CheckBlocksBesidePlayerZ().y, CheckBlocksBesidePlayerZ().z), CheckFaceForBlock(CheckBlocksBesidePlayerZ().x, CheckBlocksBesidePlayerZ().y, CheckBlocksBesidePlayerZ().z), new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 1, 1, 1))
                   } else */
                if (CheckBlocksAroundPlayer(4, 4, 4)) {
                    dontglide = false
                    cancelchatspam = true
                    if (elapsed % 11 == 10) Client.sendPacket(new net.minecraft.network.play.client.C0APacketAnimation())
                    Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(CheckBlocksAroundPlayer(4, 4, 4).x, CheckBlocksAroundPlayer(4, 4, 4).y, CheckBlocksAroundPlayer(4, 4, 4).z), CheckFaceForBlock(CheckBlocksAroundPlayer(4, 4, 4).x, CheckBlocksAroundPlayer(4, 4, 4).y, CheckBlocksAroundPlayer(4, 4, 4).z), new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 1, 1, 1))
                } else {
                    dontglide = true
                }
                Client.sendPacket(new C09(Player.getHeldItemIndex()))
                if (Player.getMotionY().toString().slice(0, 1) == "-" && float && !dontglide && !Player.getPlayer().field_70122_E) {
                    Client.getMinecraft().field_71439_g.field_70181_x -= Player.getMotionY()
                    let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
                    let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
                    let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x).getKeyCode()
                    let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z).getKeyCode()
                    let Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A).getKeyCode()
                    Client.getMinecraft().field_71439_g.field_70159_w = 0
                    Client.getMinecraft().field_71439_g.field_70179_y = 0
                    if (Keyboard.isKeyDown(Forward) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * 0.2
                        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * 0.2
                    }
                    if (Keyboard.isKeyDown(Left) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() + 90) * -0.2
                        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() + 90) * -0.2
                    }
                    if (Keyboard.isKeyDown(Backward) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * -0.2
                        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * -0.2
                    }
                    if (Keyboard.isKeyDown(Right) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() - 90) * -0.2
                        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() - 90) * -0.2
                    }
                    if (Keyboard.isKeyDown(Jump) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70181_x = 0.2
                    }
                }
                if (Player.isSneaking() || Player.isFlying()) {
                    float = false
                } else {
                    float = true
                }
                if(elapsed % 21 == 20) {
                    cancelS08 = true
                    if(CheckBlocksBelowPlayer(100)) Client.sendPacket(new C04(Player.getX(), CheckBlocksBelowPlayer(100).y + 1 ,Player.getZ(),true))
                }
            }
        }
    }
    if (prepareforairwalk) {
        prepareforairwalk = false
        airwalk = true
        reached = true
    }
    if (disable) {
        ticks += 1
        if (ticks > 60) {
            ticks = 0
            disable = false
            ChatLib.chat("§l§bJangotAddons§r>§cAirWalk renabled.")
        }
    }

    if (airwalk && float && !dontglide && !disable && !Player.getPlayer().field_70122_E) {
        timerSpeed(40)
    } else {
        timerSpeed(20)
    }

})
register("packetReceived", (packet, event) => {
    if (reached && !disable && packet.class.getSimpleName() === "S08PacketPlayerPosLook" && !nokick && disablertoggled) {
        ChatLib.chat("§l§bJangotAddons§r>§cDetected flag, disabling for 3s.")
        disable = true
    } else if (packet.class.getSimpleName() === "S08PacketPlayerPosLook" && nokick) {
        cancel(event)
        nokick = false
    }
})
packetselapsed = 0

register("packetSent", (packet, event) => {
    if (reached && !sending && !disable && float) {
        if (packet.class.getSimpleName() === "C04PacketPlayerPosition") {
            sending = true
            cancel(event)
            packetselapsed += 1
            ChatLib.chat(packet.func_148837_a())
            if (packetselapsed > 1) {
                packetselapsed = 0
                Client.sendPacket(new net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition(Player.getX(), Player.getY(), Player.getZ(), Player.getPlayer().field_70122_E))
            }
            sending = false
        } else if (packet.class.getSimpleName() === "C06PacketPlayerPosLook") {
            sending = true
            cancel(event)
            packetselapsed += 1
            if (packetselapsed > 1) {
                packetselapsed = 0
                Client.sendPacket(new net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook(Player.getX(), Player.getY(), Player.getZ(), Player.getYaw(), Player.getPitch(), Player.getPlayer().field_70122_E))
            }
            sending = false
        }
    }
})

function CheckBlocksBelowPlayer(range) {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    for (let i = 1; i < range; i++) {
        if (World.getBlockAt(x, y - i, z).type.getName() !== "tile.air.name") {
            return (World.getBlockAt(x, y - i, z))
        }
    }
    return false
}
function CheckBlocksAbovePlayer() {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    for (let i = 1; i < 4; i++) {
        if (World.getBlockAt(x, y + i, z).type.getName() !== "tile.air.name") {
            return (World.getBlockAt(x, y + i, z))
        }
    }
    return false
}
function CheckBlocksBesidePlayerX() {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    for (let i = 1; i < 4; i++) {
        if (World.getBlockAt(x + i, y, z).type.getName() !== "tile.air.name") {
            return (World.getBlockAt(x, y - i, z))
        }
        if (World.getBlockAt(x - i, y, z).type.getName() !== "tile.air.name") {
            return (World.getBlockAt(x, y - i, z))
        }
    }
    return false
}
function CheckBlocksBesidePlayerZ() {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    for (let i = 1; i < 4; i++) {
        if (World.getBlockAt(x, y, z + i).type.getName() !== "tile.air.name") {
            return (World.getBlockAt(x, y - i, z))
        }
        if (World.getBlockAt(x, y, z - i).type.getName() !== "tile.air.name") {
            return (World.getBlockAt(x, y - i, z))
        }
    }
    return false
}
function CheckBlocksAroundPlayer(x_size, y_size, z_size) {
    let middleX = Math.floor(x_size / 2);
    let middleY = Math.floor(y_size / 2);
    let middleZ = Math.floor(z_size / 2);

    for (let x = 0; x <= middleX + 1; x++) {
        for (let y = 0; y <= middleY + 2; y++) {
            for (let z = 0; z < middleZ + 1; z++) {
                //ESPtest.push(World.getBlockAt(Player.getX() + x, Player.getY() + y, Player.getZ() + z))
                if (World.getBlockAt(Player.getX() + x, Player.getY() + y, Player.getZ() + z).type.getName() !== "tile.air.name") {
                    return (World.getBlockAt(Player.getX() + x, Player.getY() + y, Player.getZ() + z))
                }
            }
        }
    }
    for (let x = 0; x <= middleX + 1; x++) {
        for (let y = 0; y <= middleY + 2; y++) {
            for (let z = 0; z < middleZ + 1; z++) {
                //ESPtest.push(World.getBlockAt(Player.getX() - x, Player.getY() + 1 - y, Player.getZ() - z))
                if (World.getBlockAt(Player.getX() - x, Player.getY() + 1 - y, Player.getZ() - z).type.getName() !== "tile.air.name") {
                    return (World.getBlockAt(Player.getX() - x, Player.getY() + 1 - y, Player.getZ() - z))
                }
            }
        }
    }
    for (let x = 0; x <= middleX + 1; x++) {
        for (let y = 0; y <= middleY + 2; y++) {
            for (let z = 0; z < middleZ + 1; z++) {
                //ESPtest.push(World.getBlockAt(Player.getX() - middleX + x, Player.getY() + y, Player.getZ() + z))
                if (World.getBlockAt(Player.getX() - middleX + x, Player.getY() + y, Player.getZ() + z).type.getName() !== "tile.air.name") {
                    return (World.getBlockAt(Player.getX() - middleX + x, Player.getY() + y, Player.getZ() + z))
                }
            }
        }
    }
    for (let x = 0; x <= middleX + 1; x++) {
        for (let y = 0; y <= middleY + 2; y++) {
            for (let z = 0; z < middleZ + 1; z++) {
                //ESPtest.push(World.getBlockAt(Player.getX() + middleX - x, Player.getY() + 1 - y, Player.getZ() - z))
                if (World.getBlockAt(Player.getX() + middleX - x, Player.getY() + 1 - y, Player.getZ() - z).type.getName() !== "tile.air.name") {
                    return (World.getBlockAt(Player.getX() + middleX - x, Player.getY() + 1 - y, Player.getZ() - z))
                }
            }
        }
    }
    for (let x = 0; x <= middleX + 1; x++) {
        for (let y = 0; y <= middleY + 2; y++) {
            for (let z = 0; z < middleZ + 1; z++) {
                //ESPtest.push(World.getBlockAt(Player.getX() + x, Player.getY() + y, Player.getZ() - middleZ + z))
                if (World.getBlockAt(Player.getX() + x, Player.getY() + y, Player.getZ() - middleZ + z).type.getName() !== "tile.air.name") {
                    return (World.getBlockAt(Player.getX() + x, Player.getY() + y, Player.getZ() - middleZ - 1 + z))
                }
            }
        }
    }
    for (let x = 0; x <= middleX + 1; x++) {
        for (let y = 0; y <= middleY + 2; y++) {
            for (let z = 0; z < middleZ + 1; z++) {
                //ESPtest.push(World.getBlockAt(Player.getX() - x, Player.getY() + 1 - y, Player.getZ() + middleZ - z))
                if (World.getBlockAt(Player.getX() - x, Player.getY() + 1 - y, Player.getZ() + middleZ - z).type.getName() !== "tile.air.name") {
                    return (World.getBlockAt(Player.getX() - x, Player.getY() + 1 - y, Player.getZ() + middleZ - 1 - z))
                }
            }
        }
    }
    return false
}
function CheckFaceForBlock(x, y, z) {
    if (World.getBlockAt(x + 1, y, z).type.getName() == "tile.air.name") {
        return 5
    } else if (World.getBlockAt(x - 1, y, z).type.getName() == "tile.air.name") {
        return 4
    } else if (World.getBlockAt(x, y + 1, z).type.getName() == "tile.air.name") {
        return 1
    } else if (World.getBlockAt(x, y - 1, z).type.getName() == "tile.air.name") {
        return 0
    } else if (World.getBlockAt(x, y, z + 1).type.getName() == "tile.air.name") {
        return 3
    } else if (World.getBlockAt(x, y, z - 1).type.getName() == "tile.air.name") {
        return 2
    } else {
        return 1
    }
}
function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}
/*
register("tick", (elapsed) => {
    if(elapsed % 17 == 16 && float && reached && !disable && airwalk) {
        Client.sendPacket(new C04(Player.getX(), CheckBlocksBelowPlayer().z + 0.5, Player.getZ(), true))
        nokick = true
    }
})
*/
/*
register("renderWorld", () => {
    for (let i = 0; i < ESPtest.length; i++) {
        RenderLib.drawEspBox(ESPtest[i].x + 0.5, ESPtest[i].y, ESPtest[i].z + 0.5, 1, 1, 0, 1, 1, 1, true)
    }
})
*/
register("chat", (event) => {
    if (cancelchatspam && ChatLib.getChatMessage(event, true) == "&r&c&lHey!&r&7 Sorry, but you can't place that block here.&r") {
        cancel(event)
        cancelchatspam = false
    }
})
register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() === "S08PacketPlayerPosLook" && cancelS08) {
        cancelS08 = false
        cancel(event)
        Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C06(packet.func_148932_c(), packet.func_148928_d(), packet.func_148933_e(), packet.func_148931_f(), packet.func_148930_g(), Player.getPlayer().field_70122_E))
    }
})