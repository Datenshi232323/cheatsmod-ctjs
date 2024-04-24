import { Alert } from "../../Utils/alert"
import RenderLib from "RenderLib"
import { timerSpeed } from "../../Utils/timer"
const ItemStack = Java.type('net.minecraft.item.ItemStack')
const BP = Java.type('net.minecraft.util.BlockPos')
const Vec3 = Java.type("net.minecraft.util.Vec3")
let airwalk = false
let reached = false
let disable = false
let prepareforairwalk = false
let scanforserverresponse = false
let ticks = 0
let PreviousItem = 10
let float = true
let sending = false
let nokick = false
let SwitchedHand = false
let cancelchatspam = false
let disablertoggled = false
let dontglide = false
// let ESPtest = []
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
const C03 = Java.type('net.minecraft.network.play.client.C03PacketPlayer')
const C09 = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange')
const airwalkBind = new KeyBind("Purple Prison Fly", Keyboard.KEY_NONE, "JangotAddons")

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
                if (CheckBlocksAroundPlayer(4)) {
                    let checkBlocks = CheckBlocksAroundPlayer(4)
                    dontglide = false
                    cancelchatspam = true
                    if (elapsed % 11 == 10) Client.sendPacket(new net.minecraft.network.play.client.C0APacketAnimation())
                    Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(checkBlocks.x, checkBlocks.y, checkBlocks.z), CheckFaceForBlock(checkBlocks.x, checkBlocks.y, checkBlocks.z), new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 1, 1, 1))
                } else {
                    dontglide = true
                }
                Client.sendPacket(new C09(Player.getHeldItemIndex()))
                if (Player.getMotionY().toString().slice(0, 1) == "-" && float && !dontglide && !Player.getPlayer().field_70122_E) {
                    Client.getMinecraft().field_71439_g.field_70181_x -= Player.getMotionY()
                    Client.getMinecraft().field_71439_g.field_70181_x -= 0.05
                    let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
                    let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
                    let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x).getKeyCode()
                    let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z).getKeyCode()
                    let Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A).getKeyCode()
                    Client.getMinecraft().field_71439_g.field_70159_w = 0
                    Client.getMinecraft().field_71439_g.field_70179_y = 0
                    if (Keyboard.isKeyDown(Forward) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * 0.15
                        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * 0.15
                    }
                    if (Keyboard.isKeyDown(Left) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() + 90) * -0.15
                        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() + 90) * -0.15
                    }
                    if (Keyboard.isKeyDown(Backward) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * -0.15
                        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * -0.15
                    }
                    if (Keyboard.isKeyDown(Right) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() - 90) * -0.15
                        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() - 90) * -0.15
                    }
                    if (Keyboard.isKeyDown(Jump) && !Client.Companion.isInGui()) {
                        Client.getMinecraft().field_71439_g.field_70181_x = 0.4
                    }
                }
                if (Player.isSneaking() || Player.isFlying()) {
                    float = false
                } else {
                    float = true
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
    /*
    if(airwalk && float && !dontglide && !disable && !Player.getPlayer().field_70122_E) {
        timerSpeed(21)
    } else {
        timerSpeed(20)
    }
    */
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
/*
register("packetSent", (packet, event) => {
    if (reached && !sending && !disable && float) {
        if (packet.class.getSimpleName() === "C04PacketPlayerPosition") {
            sending = true
            cancel(event)
            Client.sendPacket(new net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition(Player.getX(), Player.getY(), Player.getZ(), true))
            sending = false
        } else if (packet.class.getSimpleName() === "C05PacketPlayerLook") {
            sending = true
            cancel(event)
            Client.sendPacket(new net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook(Player.getYaw(), Player.getPitch(), true))
            sending = false
        } else if (packet.class.getSimpleName() === "C06PacketPlayerPosLook") {
            sending = true
            cancel(event)
            Client.sendPacket(new net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook(Player.getX(), Player.getY(), Player.getZ(), Player.getYaw(), Player.getPitch(), true))
            sending = false
        }
    }
})
*/

function CheckBlocksAroundPlayer(range) {
    let lastClosestBlock
    let closest = range
    for (let x = Player.getX() - range; x <= Player.getX() + range; x++) {
        for (let y = Player.getY() - range; y <= Player.getY() + range; y++) {
            for (let z = Player.getZ() - range; z <= Player.getZ() + range; z++) {
                if (x === Player.getX() - range || x === Player.getX() + range || y === Player.getY() - range || y === Player.getY() + range || z === Player.getZ() - range || z === Player.getZ() + range) {
                    let raytrace = World.getWorld().func_147447_a(new Vec3(Player.getX(), Player.getY(), Player.getZ()), new Vec3(x + 0.5, y + 0.5, z + 0.5), false, false, false)
                    if (raytrace) {
                        if (raytrace.field_72313_a == "BLOCK") {
                            let blockpos = raytrace.func_178782_a()
                            let hitX = raytrace.field_72307_f.field_72450_a
                            let hitY = raytrace.field_72307_f.field_72448_b
                            let hitZ = raytrace.field_72307_f.field_72449_c
                            if (Math.sqrt(Math.pow(hitX - Player.getX(), 2) + Math.pow(hitZ - Player.getZ(), 2) + Math.pow(hitY - Player.getY(), 2)) < closest) {
                                closest = Math.sqrt(Math.pow(hitX - Player.getX(), 2) + Math.pow(hitZ - Player.getZ(), 2) + Math.pow(hitY - Player.getY(), 2))
                                lastClosestBlock = new BlockPos(blockpos)
                            }
                        }
                    }
                }
            }
        }
    }
    if (lastClosestBlock) {
        return lastClosestBlock
    } else {
        return false
    }
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