/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import { settings } from "./Settings/settings.js"
import RenderLib from "RenderLib"
import * as Elementa from "Elementa"
import "./Features/Exploit/NoMovementPackets"
import "./Features/Movement/AirWalk"
import "./Features/Movement/Bhop"
import "./Features/Movement/Elsa"
import "./Features/Movement/Flight"
import "./Features/Movement/FunnyFly"
import "./Features/Movement/HumanCannonball"
import "./Features/Movement/Phase"
import "./Features/Skyblock/cloakdisabler"
import "./Features/Skyblock/etqol"
import "./Features/Skyblock/simulateghostpick"
import "./Features/Misc/Ehe"
import "./Features/Misc/AutoHeal"
// import "./Features/Exploit/tpondeath"
import "./Features/Misc/selfban"
import "./Features/Exploit/ghostitems"
import "./Features/Misc/AutoChestClose"
import "./Features/Misc/AutoCaptcha"
import "./Features/Misc/Nuker"
import "./Features/Misc/AutoChatReaction"
import "./Features/Misc/ehehe"
import "./Features/Misc/NewChestAura"
//import "./Features/Misc/ChestAura"
import "./Features/Render/PlayerESP"
// import "./Features/Misc/ServerBeamer"
import "./Features/Movement/NewAirWalk"
import "./Features/Misc/NoFall"
import "./Features/Misc/ehehe"
import "./Features/Misc/wtf"
import "./Features/Misc/NoSlimeBounce"
import "./Features/Combat/FastBow"
import "./Features/Movement/PurplePrisonPhase"
// import "./Features/Misc/DisconnectCheck"
import "./Features/Movement/InvMove"
import "./Features/Movement/PPFLY"
import "./Features/Misc/BetterNuker"
import "./Features/Misc/ppautosell"
// import "./Features/Exploit/PingSpoof"
import "./Features/Movement/Jetpack"
import "./Features/Combat/KillAura"
import "./Features/Exploit/freeze"
// import "./Features/Combat/Criticals"
// import "./Features/Movement/Glide"
// import "./Features/Movement/PPTP"
// import "./Features/Movement/ChatMove"
// import "./Features/Render/ContainerESP"
// import "./Features/Exploit/disabler"
// import "./Features/Misc/copychat"
// import "./Features/Skyblock/noarmorstandinteractions"
import { setYaw, setPitch } from "./Utils/SetRotation"
import { timerSpeed } from "./Utils/timer.js"
import ServerRotations from "./Utils/ServerRotations.js"

register("command", () => {
    ChatLib.chat("§l§bJangotAddons Command List")
    var cloakdisablerhoverablemessage = new TextComponent("/cloakdisabler <delay/toggle>").setHoverValue("De-activates Wither Cloak just before it expires!\nToggled: " + settings.Features["Cloak Disabler"].toggle)
    ChatLib.chat(cloakdisablerhoverablemessage)
    var enchantmenttableqolhoverablemessage = new TextComponent("/etqol <toggle/bottletype/amount> <type/amount>").setHoverValue("Makes enchanting items through the Enchantment Menu faster!\nToggled: " + settings.Features["Enchantment Table QOL"].toggle)
    ChatLib.chat(enchantmenttableqolhoverablemessage)
}).setName("JangotAddons")
/*
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
nofall = false
/*
register("tick", () => {
    if (CheckBlocksBelowPlayer(100)) {
        if (!Player.getPlayer().field_70122_E && Number(Player.getY()) - Number(CheckBlocksBelowPlayer(100).y) > 3 && Number(Player.getY()) - Number(CheckBlocksBelowPlayer(100).y) < 5 && nofall && !Player.asPlayerMP().isDead() && !Player.asPlayerMP().isInWater() && !Player.asPlayerMP().isInLava()) {
            nofall = false
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C04(Player.getX(), Player.getY() - CheckBlocksBelowPlayer(100).y - 1, Player.getZ(), Player.getPlayer().field_70122_E))
        } else if (Player.getPlayer().field_70122_E) {
            nofall = true
        }
    }
})
const C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook")

packets = 0
packetLimit = 1
LastPosX = 0
LastPosY = 0
LastPosZ = 0
register("packetReceived", (packet, event) => {
    ChatLib.chat(nofall)
    if (packet.class.getSimpleName() === "S08PacketPlayerPosLook" && !worldLoad && !nofall) {
        if (packets < packetLimit) {
            if (LastPosX == Math.floor(packet.func_148932_c()) && LastPosY == Math.floor(packet.func_148928_d()) && LastPosZ == Math.floor(packet.func_148933_e())) {
                packets += 1
            } else {
                packets = 0
            }
            cancel(event)
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C06(packet.func_148932_c(), packet.func_148928_d(), packet.func_148933_e(), packet.func_148931_f(), packet.func_148930_g(), Player.getPlayer().field_70122_E))
        } else if (packetLimit <= packets) {
            packets = 0
            if (LastPosX !== Math.floor(packet.func_148932_c()) && LastPosY !== Math.floor(packet.func_148928_d()) && LastPosZ !== Math.floor(packet.func_148933_e())) {
                Player.getPlayer().func_70107_b(packet.func_148932_c, packet.func_148928_d, packet.func_148933_e)
            }
        }
        LastPosX = Math.floor(packet.func_148932_c())
        LastPosY = Math.floor(packet.func_148928_d())
        LastPosZ = Math.floor(packet.func_148933_e())
    } else if (worldLoad) {
        worldLoad = false
    }
})
register("worldLoad", () => {
    worldLoad = true
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
*/
/*
let actualStepHeight = Client.getMinecraft().field_71439_g.field_70138_W
register("tick", () => {
    if (Player.getPlayer().field_70122_E) {
        Client.getMinecraft().field_71439_g.field_70138_W = 1
    } else {
        Client.getMinecraft().field_71439_g.field_70138_W = actualStepHeight
    }
})
*/
/*
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
let yawFaced = null
let hclipping = false
let xDist = 0
let hClipelapsed = 0
register("command", (x) => {
    if(!isNaN(x)) {
        ChatLib.chat("tping " + x + " blocks.")
        hclipping = true
        xDist = x
    }
}).setName("hclip")

register("tick", (elapsed) => {
    if (hclipping) {
        if(!yawFaced) yawFaced = Player.getYaw()
        hClipelapsed++
        //timerSpeed(1)
        Client.getMinecraft().field_71439_g.func_70016_h(0,0,0)
        if (hClipelapsed % 2 == 1) {
            for (let dist = 1; dist <= xDist; dist++) {
                //for(let i = 0; i < 3; i++)
                Client.sendPacket(new C04(Player.getX() + -sin(yawFaced) * dist, Player.getY(), Player.getZ() + cos(yawFaced) * dist, true))
            }
            hclip(xDist,yawFaced)
            hclipping = false
            xDist = 0
            yawFaced = null
            timerSpeed(20)
        }
    }
})
function hclip(x,yaw) { //directional clip towards where you are facing in the horizontal plane
    let dist = parseFloat(x)
    dClip(dist, yaw);
}
function clip(x, y, z) { // teleport relative to current position in mincerafts cartesian coords
    let X0 = Player.getX()
    let Y0 = Player.getY()
    let Z0 = Player.getZ()
    teleport(X0 + x, Y0 + y, Z0 + z)
}
*/
function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}
/*
function dClip(dist, yaw, pitch = 0) {// teleport relative to current position in minecrafts spherical coords
    if (typeof (pitch) === 'undefined') { var pitch = 0 }
    clip(-sin(yaw) * cos(pitch) * dist, -sin(pitch) * dist, cos(yaw) * cos(pitch) * dist)
}
function teleport(x, y, z) { // teleport to absolute coordinates
    if (isNaN(x) || isNaN(y) || isNaN(z)) { // check whether inputs are NaN to prevent kick
        ChatLib.chat("&r&6[Clip] &r&cArgument error.")
    } else {
        Player.getPlayer().func_70107_b(x, y, z)
    }
}
*/
/*
flytoggle = false
register("tick", () => {
    if (flytoggle) {
        if (!Player.isSneaking()) {
            Player.getPlayer().field_70122_E = true
        } else {
            Client.getMinecraft().field_71439_g.func_70016_h(0, -1, 0)
        }
        Client.getMinecraft().field_71439_g.field_70181_x = 0
        Player.getPlayer().func_70107_b(
            Player.getX(),
            stuckY,
            Player.getZ()
        )
    }
})
register("command", () => {
    if (!flytoggle) {
        ChatLib.chat('Toggled Fly!')
        stuckY = Player.getY()
        flytoggle = true
    } else {
        ChatLib.chat("Disabled Fly!")
        flytoggle = false
    }
}).setName("togglefly")
register("worldLoad", () => {
    flytoggle = false
})
*/
/*
register("tick", () => {
    let entitylist = World.getAllEntities()
    for (let i = 0; i < entitylist.length; i++) {
        if (ChatLib.removeFormatting(entitylist[i].name).includes("")) {
            ChatLib.chat(entitylist[i].getClassName())
            Client.getMinecraft().field_71439_g.func_71059_n(Player.getPlayer(), entitylist[i])
            break
        }
    }
})
*/
/*
register("command", () => {
    Client.getMinecraft().field_71439_g.field_70181_x = -1
}).setName("bounce")

let NormalFov = Client.getSettings().getFOV()
let i = 0
let e = 0
register("step", () => {
    if (!Client.isInGui()) {
        if (Keyboard.isKeyDown(Keyboard.KEY_O)) {
            e = 0
            if (Client.getSettings().getFOV() > 60) {
                i++
                Client.getSettings().setFOV(NormalFov - Math.log(i) * 12)
            }
        } else {
            i = 0
            if (Client.getSettings().getFOV() < NormalFov) {
                e++
                Client.getSettings().setFOV(Client.getSettings().getFOV() + Math.log(e) * 13)
            } else {
                e = 0
            }
        }
    }
})
*/
/*
const Color = java.awt.Color
const gui = new Gui()
const window = new Elementa.Window()
const offColor = new Color(26 / 255, 25 / 255, 26 / 255, 0.8)
const onColor = new Color(38 / 255, 134 / 255, 106 / 255)
const dragBarColor = new Color(20 / 255, 20 / 255, 20 / 255)
const moduleColor = new Color(25 / 255, 25 / 255, 25 / 255, 0.8)
let boxes = []
let settingsList = []
let selected = null

function clickGUI() {
    gui.open()
}
register("tick", () => {
    ChatLib.chat(Client.getSettings().getSettings().field_74335_Z)
})
let forkprivate = new Elementa.UIText("§b§lJangotAddons")
.setX(new Elementa.CenterConstraint())
.setY(new Elementa.AdditiveConstraint(new Elementa.CenterConstraint(), (-225).pixels()))
.setWidth((200).pixels())
.setHeight((25).pixels())
window.addChild(forkprivate)
gui.registerDraw(() => {
    window.draw()
})

register("command", () => {
    clickGUI()
}).setName("GUIOPEN")
*/
/*
const BP = Java.type('net.minecraft.util.BlockPos')
const EnumFacing = Java.type('net.minecraft.util.EnumFacing')
const C03 = Java.type('net.minecraft.network.play.client.C03PacketPlayer')
const C07 = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging')
register("tick", () => {
    if (new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G).isKeyDown() && Player.getHeldItem()) {
        if (Player.getHeldItem()?.getItemNBT()?.toObject()?.id) {
            if (Player.getHeldItem()?.getItem() instanceof net.minecraft.item.ItemFood || Player.getHeldItem()?.getItem() instanceof net.minecraft.item.ItemPotion) {
                for (let i = 0; i < 20; i++) {
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C03(Player.getPlayer().field_70122_E))
                }
            }
        }
    }
})
*/
/*
let sending = false
register("packetSent", (packet, event) => {
    if (!sending) {
        let yaw = packet.func_149462_g()
        let pitch = packet.func_149470_h()
        let x = packet.func_149464_c()
        let y = packet.func_149467_d()
        let z = packet.func_149472_e()
        let wasOnGround = packet.func_149465_i()
        cancel(event)
        if (packet.class.getSimpleName() === "C04PacketPlayerPosition") {
            sending = true
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition(x, y, z, wasOnGround))
            sending = false
        } else if (packet.class.getSimpleName() === "C05PacketPlayerLook") {
            sending = true
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook(yaw, pitch, wasOnGround))
            sending = false
        } else if (packet.class.getSimpleName() === "C06PacketPlayerPosLook") {
            sending = true
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook(x, y, z, yaw, pitch, wasOnGround))
            sending = false
        } else {
            sending = true
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new net.minecraft.network.play.client.C03PacketPlayer(wasOnGround))
            sending = false
        }
    }
}).setPacketClasses([net.minecraft.network.play.client.C03PacketPlayer])
*/
register("tick", () => {
    new KeyBind(Client.getMinecraft().field_71474_y.field_151444_V).setState(true)
})

/*
const C0B = Java.type('net.minecraft.network.play.client.C0BPacketEntityAction')
register("packetSent", (packet, event) => {
    if (packet.class.getSimpleName() == "C02PacketUseEntity" && packet.func_149565_c().toString() == "ATTACK") {
        let wasSprinting = false
        if (Player.isSprinting()) wasSprinting = true
        Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.STOP_SPRINTING))
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.START_SPRINTING))
            Client.scheduleTask(1, () => {
                if (!wasSprinting) Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.STOP_SPRINTING))
            })
        }
})
*/
let lag = false
let lastpacket = []
register("packetSent", (packet, event) => {
    if (!ServerRotations.sending && lag) {
        for (let i = 0; i < lastpacket.length; i++) {
            if (packet == lastpacket[i]) {
                return lastpacket.splice(i, 1)
            }
        }
        if (!event.isCancelled()) cancel(event)
        Client.scheduleTask(10, () => {
            lastpacket.push(packet)
            Client.sendPacket(packet)
        })
    }
})
register("command", () => {
    if (lag) {
        lag = false
    } else {
        lag = true
    }
}).setName("togglelag")
register("command", () => {
    Client.connect("purpleprison.net")
}).setName("testing")
/*
let Boosting = false
register("step", () => {
    if(!Boosting) {
        new Thread(() => {
            Boosting  = true
            Thread.sleep(900)
            timerSpeed(200)
            Thread.sleep(100)
            timerSpeed(2)
            Boosting = false
        }).start()
    }
})
*/

/*
const C02 = Java.type('net.minecraft.network.play.client.C02PacketUseEntity')
register("tick", () => {
    let entitylist = World.getAllEntities()
    for (let i = 0; i < entitylist.length; i++) {
        //ChatLib.chat(entitylist[i].getEntity().func_174819_aU())
        if (Player.getPlayer().func_70032_d(entitylist[i].getEntity()) < 4 && entitylist[i].getEntity() !== Player.asPlayerMP().getEntity()) {
            //Client.getMinecraft().field_71439_g.func_71059_n(entitylist[i].getEntity())
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C02(entitylist[i].getEntity(), C02.Action.INTERACT))
            //Client.getMinecraft().field_71442_b.func_78768_b(Player.getPlayer(), entitylist[i].getEntity())
            ChatLib.chat("a")
            break
        }
    }
})
*/
/*
register("packetSent", (packet,event) => {
    ChatLib.chat(packet)
})
*/
