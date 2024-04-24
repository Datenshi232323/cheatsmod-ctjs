import { Alert } from "../../Utils/alert"
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
const airwalkBind = new KeyBind("New AirWalk", Keyboard.KEY_NONE, "JangotAddons")

register("tick", () => {
    if (airwalkBind.isPressed()) {
        if (!airwalk) {
            Alert("New Airwalk Enabled", 1)
            prepareforairwalk = true
        } else if (airwalk) {
            Alert("New Airwalk Disabled", 1)
            airwalk = false
            reached = false
            disable = false
            ticks = 0
        }
    }
    if (airwalk && !disable) {
        if (Player.getMotionY().toString().slice(0, 3) == "0.0" && !Player.isSneaking() && !Player.isFlying()) {
            Player.getPlayer().field_70122_E = true
            reached = true
        }
        if (reached) {
            if (Player.getMotionY().toString().slice(0, 1) == "-" && float) {
                Player.getPlayer().field_70122_E = true
                Client.getMinecraft().field_71439_g.field_70181_x = 0
            }
            if (Player.isSneaking() || Player.isFlying()) {
                float = false
            } else {
                float = true
            }
        }
    }
    if (prepareforairwalk) {
        prepareforairwalk = false
        Client.getMinecraft().field_71439_g.field_70181_x = 0.1
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
})
/*
register("packetReceived", (packet, event) => {
    if (reached && !disable && packet.class.getSimpleName() === "S08PacketPlayerPosLook") {
        ChatLib.chat("§l§bJangotAddons§r>§cDetected flag, disabling for 3s.")
        disable = true
    }
})
*/
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