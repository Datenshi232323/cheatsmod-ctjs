import { Alert } from "../../Utils/alert"
import ServerRotations from "../../Utils/ServerRotations"
import { setYaw } from "../../Utils/SetRotation"
import { setPitch } from "../../Utils/SetRotation"
import RenderLib from "RenderLib"
let killauratoggle = false
let wasBlocking = false
const KillAura = new KeyBind("KillAura", Keyboard.KEY_NONE, "JangotAddons")
const BP = Java.type('net.minecraft.util.BlockPos')
const C0A = Java.type('net.minecraft.network.play.client.C0APacketAnimation')
const C02 = Java.type('net.minecraft.network.play.client.C02PacketUseEntity')
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
const EnumFacing = Java.type('net.minecraft.util.EnumFacing')
const C07 = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging')
const C08 = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement')
let Locked = false
let blocking = false
let sending = false
let resetRot = false
let entity
let yaw
let pitch
let AuraTicks = 0

register("tick", (elapsed) => {
    if (KillAura.isPressed()) {
        if (!killauratoggle) {
            Alert("KillAura Enabled", 1)
            killauratoggle = true
        } else {
            Alert("KillAura Disabled", 1)
            killauratoggle = false
            ServerRotations.resetRotations()
            if (blocking && !wasBlocking) {
                let Block = new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G)
                Block.setState(false)
                blocking = false
                Locked = false
                entity
            }
        }
    }
    if (killauratoggle) {
        wasBlocking = false
        if (!blocking) wasBlocking = new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G).isKeyDown()
        let entitylist = World.getAllEntitiesOfType(net.minecraft.entity.EntityLivingBase)
        let Block = new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G)
        let minDistance = 3.3
        let EntityToAttack
        for (let i = 0; i < entitylist.length; i++) {
            if (Player.getPlayer().func_70032_d(entitylist[i].getEntity()) < minDistance && entitylist[i].getEntity() !== Player.asPlayerMP().getEntity() && !entitylist[i].isDead() && !entitylist[i].isInvisible() && !entitylist[i].hasNoClip() && entitylist[i].getEntity().func_110143_aJ() > 0 && entitylist[i].getEntity() !== Player.asPlayerMP()?.getRiding()?.getEntity()) {
                /*
                if (entitylist[i].getClassName() == "EntityOtherPlayerMP") {
                    if (World.getPlayerByName(entitylist[i].getName()).getPing() <= 0) {
                        return
                    }
                }
                */
                minDistance = Player.getPlayer().func_70032_d(entitylist[i].getEntity())
                EntityToAttack = entitylist[i]
            }
        }
        if (EntityToAttack) {
            if (EntityToAttack.getEntity() !== Player.asPlayerMP().getEntity() && Player.getPlayer().func_70032_d(EntityToAttack.getEntity()) < 3.3 && !EntityToAttack.isDead() && !EntityToAttack.isInvisible() && !EntityToAttack.hasNoClip() && EntityToAttack.getEntity().func_110143_aJ() > 0 && EntityToAttack.getEntity() !== Player.asPlayerMP()?.getRiding()?.getEntity()) {
                /*
                if (EntityToAttack.getClassName() == "EntityOtherPlayerMP") {
                    if (World.getPlayerByName(EntityToAttack.getName()).getPing() <= 0) {
                        return
                    }
                }
                */
                AuraTicks++
                //ServerRotations.set(lookAtCheck(EntityToAttack.x + EntityToAttack.getMotionX(), EntityToAttack.y - EntityToAttack.getHeight() / 2 + EntityToAttack.getMotionY() * 2, EntityToAttack.z + EntityToAttack.getMotionZ() * 2).Yaw + 0.0001, lookAtCheck(EntityToAttack.x + EntityToAttack.getMotionX(), EntityToAttack.y - EntityToAttack.getHeight() / 2 + EntityToAttack.getMotionY(), EntityToAttack.z + EntityToAttack.getMotionZ()).Pitch + 0.0001)
                ServerRotations.set(lookAtCheck(EntityToAttack.x + EntityToAttack.getMotionX(), EntityToAttack.y - EntityToAttack.getHeight() / 2 + EntityToAttack.getMotionY() * 2, EntityToAttack.z + EntityToAttack.getMotionZ() * 2).Yaw + 0.1 + Math.random() * EntityToAttack.getWidth() * 3 - Math.random() * EntityToAttack.getWidth() * 3, lookAtCheck(EntityToAttack.x + EntityToAttack.getMotionX() * 2, EntityToAttack.y - EntityToAttack.getHeight() / 2 + EntityToAttack.getMotionY(), EntityToAttack.z + EntityToAttack.getMotionZ()).Pitch + 0.0001 + Math.random() * Math.pow(EntityToAttack.getHeight(),1.1) - Math.pow(Math.random() * EntityToAttack.getHeight(),1.1))
                //Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C07(C07.Action.RELEASE_USE_ITEM, new BP(0, 0, 0), EnumFacing.DOWN))
                /*
                if (Player.getHeldItem()?.getItem() instanceof net.minecraft.item.ItemSword) {
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C07(C07.Action.RELEASE_USE_ITEM, new BP(0, 0, 0), EnumFacing.DOWN))
                    blocking = false
                }
                */
                if (AuraTicks % 2 == 1 && AuraTicks % Math.floor(Math.random() * 10) == 1) {
                    //Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C04(EntityToAttack.getX(), EntityToAttack.getY(), EntityToAttack.getZ(), false))
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0A())
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C02(EntityToAttack.getEntity(), C02.Action.ATTACK))
                } else if(Math.floor(Math.random() * 2) == 1) {
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0A())
                }
                entity = EntityToAttack
                Locked = true
                /*
                if (Player.getHeldItem()?.getItem() instanceof net.minecraft.item.ItemSword) {
                    Block.setState(true)
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C08(new BP(0, 0, 0), 255, Player.getHeldItem()?.getItemStack(), 0, 0, 0))
                    blocking = true
                }
                */
                return
            }
        }
        if (Locked) {
            Locked = false
            ServerRotations.resetRotations()
        }
        entity
        /*
        if (blocking && !wasBlocking) {
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C07(C07.Action.RELEASE_USE_ITEM, new BP(0, 0, 0), EnumFacing.DOWN))
            Block.setState(false)
            blocking = false
        }
        */
    }
})
register("renderWorld", (pticks) => {
    if (Locked && entity && killauratoggle) {
        renderPlayerEspBox(entity, pticks)
    }
})
function renderPlayerEspBox(player, pticks) {
    if (pticks !== undefined && World.isLoaded()) {
        let lastX = player.getLastX()
        let lastY = player.getLastY()
        let lastZ = player.getLastZ()
        let currentX = player.getX()
        let currentY = player.getY()
        let currentZ = player.getZ()
        Tessellator.drawString("§b||§r§c ❤ " + Math.round(entity.getEntity().func_110143_aJ()) + "§r §b||§r", lastX + (currentX - lastX) * pticks, lastY + (currentY - lastY) * pticks + player.getHeight() + 0.2, lastZ + (currentZ - lastZ) * pticks, 0, true, 0.03, false)
        RenderLib.drawEspBox(lastX + (currentX - lastX) * pticks, lastY + (currentY - lastY) * pticks, lastZ + (currentZ - lastZ) * pticks, player.getWidth(), player.getHeight(), 0, 1, 1, 1, true)
        RenderLib.drawInnerEspBox(lastX + (currentX - lastX) * pticks, lastY + (currentY - lastY) * pticks, lastZ + (currentZ - lastZ) * pticks, player.getWidth(), player.getHeight(), 0, 1, 1, 0.2, true)
    }
}
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
    return { Yaw: Player.getPlayer().field_70177_z + hoekYaw, Pitch: Player.getPlayer().field_70125_A + hoekPitch }
}

function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}

/* 
    MADE BY FORK ON 11/01/2023 (github.com/realfork)
    EDITED BY JANGOT TO FIX PROBLEMS & ADAPTED FOR KILLAURA ON 4/2/2023
    + Added ResetRotations Function
    = Fixed StackOverFlow Problems
*/
/*
register("packetSent", (packet, event) => {
    if (sending) return
    if (!yaw || !pitch || Player.getPlayer().field_70154_o) return
    if (yaw == packet.func_149462_g() && pitch == packet.func_149470_h()) return
    cancel(event)
    sending = true
    if (yaw && pitch) {
        if (packet.class.getSimpleName() == "C05PacketPlayerLook") Client.sendPacket(
            new net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook(
                yaw,
                pitch,
                Player.getPlayer().field_70122_E
            )
        )
        else Client.sendPacket(
            new net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook(
                Player.getX(),
                Player.getPlayer().func_174813_aQ().field_72338_b,
                Player.getZ(),
                yaw,
                pitch,
                Player.getPlayer().field_70122_E
            )
        )
    }
    if (resetRot) {
        resetRot = false
        yaw = null
        pitch = null
    }
    sending = false
}).setPacketClasses([net.minecraft.network.play.client.C03PacketPlayer])

register("renderEntity", (entity) => {
    if (entity.getEntity() != Player.getPlayer() || !yaw || !pitch || Player.getPlayer().field_70154_o) return
    Player.getPlayer().field_70761_aq = yaw
    Player.getPlayer().field_70759_as = yaw
})

register("gameUnload", reset())

function set(y, p) {
    //setYaw(y)
    //setPitch(p)
    yaw = y
    pitch = p
}

function reset() {
    yaw = null
    pitch = null
}
function resetRotations() {
    set(Player.getYaw(), Player.getPitch())
    resetRot = true
}
*/ //This is now a class.