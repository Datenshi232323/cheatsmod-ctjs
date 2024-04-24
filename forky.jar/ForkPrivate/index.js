import { ghostBlocks } from "./features/dungeons/ghostBlocks"
import { ghostHands } from "./features/dungeons/ghostHands"
import { chestClose } from "./features/dungeons/chestClose"
import { getCorrectPanes, exitTerm } from "./features/f7/autoTerminals"
//import { autoSimon } from "./features/f7/autoSimon"
import { clickGUI } from "./settings/clickGUI"
import { itemMacro } from "./features/macros/itemMacro"
import { boneMacro } from "./features/macros/boneMacro"
import { entityESP } from "./features/render/entityESP"
import { findSecrets } from "./features/render/chestESP"
import { frame, textBox } from "./features/other/externalChat"
import { noPingMenu } from "./features/other/0pingMenus"
import { guessTheme } from "./features/other/guessTheBuild"
import { noRotate } from "./features/other/noRotate"
import { vclip } from "./features/other/vclip"
import { scanForAttunement } from "./features/other/blazeSlayer"
import { autoArachne } from "./features/macros/autoArachne"
import { blockAnimation, blockClicks } from "./features/other/blockClicks"
import { mithrilMacro } from "./features/scripts/mithril"
import { clearCats, catPeople } from "./features/jokes/catpeople"
import { inSkyblock, dungeonFloor } from "./utils/locationUtils"
import { analytics } from "./utils/analytics"
import { chestOutline } from "./utils/renderUtils"
import Discord from "./utils/discordRPC" // REMOVE THIS LINE IF YOU ARE ON MAC AND HAVE ISSUES
import { Minecraft, ghostBind, menuOpenBind, boneBind, vclipBind, iceSprayBind, grappleshotBind, powerOrbBind, tubaBind, healWandBind, rogueSwordBind, fishingRodBind, AOTSBind, rightBind, allowedBlocks, data, rightClick} from "./settings/settings"
import { commandHandler } from "./settings/commandHandler"

import { drawChinaHat } from "./cosmetics/chinaHat"

let renderQueue = []
let clickedBlocks = []
let alarm = false
let floor = 0
let counter = 0
let lastTime = java.lang.currentTimeMillis

register("worldUnload", () => {
    clickedBlocks = []
    floor = 0
})

register("command", () => {
    mithrilMacro()
}).setName("forkmithril")

//register("renderScoreboard", (event) => cancel(event))

/*
register("chat", () => {
    ChatLib.chat("arachne lived :))))))")
}).setCriteria("${player} placed an Arachne Keeper Fragment! Something is awakening! (4/4)")
*/

register("tick", () => {
    if (menuOpenBind.isPressed()) clickGUI()

    if (ghostBind.isKeyDown() && (data.features["Dungeons"]["Ghost Blocks"].toggle && !data.features["Dungeons"]["Ghost Blocks"]["Legit"])) ghostBlocks()

    let heldItem = ChatLib.removeFormatting(Player.getHeldItem()?.getName())
    if (data.features["Dungeons"]["Secret Aura"].toggle && floor > 0 && (heldItem.includes(data.features["Dungeons"]["Secret Aura"]["Item"]) || data.features["Dungeons"]["Secret Aura"]["Item"] == "none")) ghostHands(clickedBlocks, null)

    /*
    if (data.iceFillQOL && floor > 0) {
        // icefillqol
    }
    */

    if (data.features["F7"]["Auto Terminals"].toggle && floor == 7) {
        if (!(Client.currentGui.get() instanceof net.minecraft.client.gui.inventory.GuiChest)) exitTerm() 
        else getCorrectPanes()
    }

    //if (data.features["F7"]["Legit Aura"].toggle && floor == 7) {
    //    let terminals = World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand)
    //    terminalAura(terminals.filter(stand => stand.getName().includes("CLICK HERE")))
    //}

    if (data.features["Macros"]["Thorn Aura"].toggle && floor == 4) {
        if (heldItem?.includes("Tribal Spear") && !rightBind.isKeyDown()) rightBind.setState(true)
        else rightBind.setState(false)  
    }

    if (vclipBind.isPressed()) vclip(-5)

    if (boneBind.isPressed() && data.features["Macros"]["Bone Macro"].toggle) boneMacro()

    if (data.features["Macros"]["Item Macros"].toggle) {
        if (iceSprayBind.isPressed()) itemMacro("Ice Spray Wand")
        if (grappleshotBind.isPressed()) itemMacro("Moody Grappleshot")
        if (powerOrbBind.isPressed()) itemMacro("Power Orb")
        if (tubaBind.isPressed()) itemMacro("Weird Tuba")
        if (healWandBind.isPressed()) itemMacro("Wand of")
        if (rogueSwordBind.isPressed()) itemMacro("Rogue Sword")
        if (fishingRodBind.isPressed()) itemMacro("Fishing Rod")
    }

    if (AOTSBind.isKeyDown() && data.features["Macros"]["AOTS"].toggle && heldItem?.includes(data.features["Macros"]["AOTS"]["Item"]) && java.lang.currentTimeMillis - lastTime > 500) {
        lastTime = java.lang.currentTimeMillis()
        itemMacro("Axe of the Shredded")
    }
    if (alarm) {
        World.playSound("random.successful_hit", 100, 1)
        ticks++
        if (ticks >= 30) {ticks = 0; alarm = false}
    }
})

register("renderWorld", (pt) => {
    if (data.features["Cosmetics"]["China Hat"].toggle && Minecraft.field_71474_y.field_74320_O != 0) drawChinaHat(Minecraft.field_71439_g, pt)
    if (floor > 0 && data.features["Dungeons"]["Ghost Hands"].toggle || data.features["Dungeons"]["Secret Aura"].toggle || data.features["Render"]["Chest ESP"].toggle) {
        renderQueue.forEach((block) => {
            if (clickedBlocks.toString().includes(block?.getBlock()) || clickedBlocks.toString().includes(block)) return
            if (block?.getType()?.getRegistryName()?.includes("trapped_chest") || block?.getBlock()?.getType()?.getRegistryName()?.includes("trapped_chest")) {
                chestOutline(block, true)
            } else {
                chestOutline(block, false)
            }
        })
    }
    //drawLine(new net.minecraft.util.Vec3(1, 1, 1), new net.minecraft.util.Vec3(1, 10, 1), onColor) Line Drawing
})

register("renderEntity", (entity, vec3, pt) => {
    if (floor > 0) entityESP(entity, pt)
})

register("actionBar", (event) => {
    if (!ChatLib.removeFormatting(Scoreboard.getTitle()).includes("GUESS THE BUILD")) return
    let message = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    if (data.features["Other"]["Guess the Build"].toggle && counter % 5 == 0) guessTheme(message.substring(13, message.length))?.forEach((answer) => ChatLib.chat("§zFork Private > " + answer)) 
    counter++
})

register("hitBlock", (block, event) => {
    if (Player.getHeldItem()?.getRegistryName() == "minecraft:golden_pickaxe" && data.features["Dungeons"]["Ghost Blocks"].toggle && data.features["Dungeons"]["Ghost Blocks"]["Legit"] && floor > 0) {
        cancel(event)
        World.getWorld().func_175656_a(new net.minecraft.util.BlockPos(block.getX(), block.getY(), block.getZ()), net.minecraft.init.Blocks.field_150350_a.func_176223_P())
    }
})

register("attackEntity", () => {
    if (data.features["Macros"]["Soul Whip"].toggle) itemMacro("Soul Whip")
})

register("playerInteract", (click, pos, event) => {
    if (data.features["Dungeons"]["Ghost Hands"].toggle && floor > 0) ghostHands(clickedBlocks, event)
    if (data.features["Other"]["Block Clicks"].toggle && (click?.toString() == "RIGHT_CLICK_BLOCK" || click?.toString() == "RIGHT_CLICK_EMPTY")) blockClicks(event)
    if (data.features["Other"]["Block RC Animation"].toggle && (click?.toString() == "RIGHT_CLICK_BLOCK" || click?.toString() == "RIGHT_CLICK_EMPTY")) blockAnimation(event)
    if (click.toString() == "RIGHT_CLICK_BLOCK" && !clickedBlocks.toString().includes(World.getBlockAt(pos.getX(), pos.getY(), pos.getZ())) && floor > 0) {
        if (allowedBlocks.includes(World.getBlockAt(pos.getX(), pos.getY(), pos.getZ()).getType().getRegistryName())) clickedBlocks.push(World.getBlockAt(pos.getX(), pos.getY(), pos.getZ())) 
    }
})

register("postGuiRender", () => {
    if (data.features["Dungeons"]["Auto Chest Close"].toggle && floor > 0) chestClose()
})

register("renderPortal", (event) => {
    if (!data.features["Render"]["No Portal Effects"].toggle) return
    Player.getPlayer().field_71086_bY = 0
    cancel(event)
})

register("soundPlay", (pos, name, volume, pitch, category, event) => { // Why so many args :(
    if (name == "portal.portal" || name == "portal.trigger" && data.features["Render"]["No Portal Effects"].toggle) cancel(event)
})

register("guiMouseClick", (mx, my, btn, gui, event) => {
    if (btn == 0 && data.features["Other"]["0 Ping Menus"].toggle) noPingMenu(gui, event)
})

register("chat", (message, event) => {
    //if (data.features["Cosmetics"]["Custom Names"].toggle) customNames(message, event)
    textBox.append("\n" + ChatLib.removeFormatting(message))
    textBox.setCaretPosition(textBox.getDocument().getLength())
}).setCriteria("${message}")

//register("chat", () => {
//    if (data.features["F7"]["P3 Ghost Blocks"].toggle) ghostP3()
//}).setCriteria("[BOSS] Necron: You caused me many troubles, your journey ends here adventurers!")

register("chat", () => {
    if (data.features["Macros"]["Auto Arachne Place"].toggle) autoArachne()
}).setCriteria("[BOSS] Arachne: You are lucky this time that you only called out a portion of my power. If you dared to face me at my peak, you would not survive!") //[BOSS] Arachne: You are lucky this time that you only called out a portion of my power").setContains()

register("packetReceived", (packet, event) => {
    if (data.features["Combat"]["No Rotate"].toggle) noRotate(packet, event)
    if (((packet.class.getSimpleName() == "S12PacketEntityVelocity" && World.getWorld().func_73045_a(packet.func_149412_c()) == Player.getPlayer()) || packet.class.getSimpleName() == "S27PacketExplosion") && data.features["Combat"]["Anti KB"].toggle) {
        if (Player.getHeldItem()?.getName()?.includes("Bonzo's Staff") || Player.getHeldItem()?.getName()?.includes("Jerry-chine Gun") || Player.getPlayer().func_180799_ab()) return // || !inSkyblock()
        cancel(event)
    }
    //if (packet.class.getSimpleName() == "S38PacketPlayerListItem" && data.features["Cosmetics"]["Custom Names"].toggle && inSkyblock()) replaceTab(packet)
    //if (packet.class.getSimpleName() == "S3EPacketTeams" && data.features["Cosmetics"]["Custom Names"].toggle) replaceScoreboard(packet) 
})

const rclicker = register("step", () => {
    if (!data.features["Combat"]["Right Clicker"].toggle) return
    rclicker.setFps(data.features["Combat"]["Right Clicker"]["CPS"])
    if (rightBind.isKeyDown()) rightClick.invoke(Minecraft)
}).setFps(data.features["Combat"]["Right Clicker"]["CPS"])

register("step", () => {
    floor = dungeonFloor(floor)
    data.features["Jokes"]["Catpeople"].toggle ? catPeople.register() : clearCats()
    if ((data.features["Dungeons"]["Ghost Hands"].toggle || data.features["Dungeons"]["Secret Aura"].toggle || data.features["Render"]["Chest ESP"].toggle) && floor > 0) {
        renderQueue = findSecrets()
    } else renderQueue = []
}).setDelay(1)

register("step", () => {
    analytics()
    if (!data.features["Jokes"]["Esex"].toggle) return
    data.esexMessages.players?.forEach((target, index) => {
        ChatLib.command("msg " + target + " " + data.esexMessages.messages?.[index])
    })
}).setDelay(1200)

register("step", () => {
    if (data.features["Other"]["Blaze Slayer"].toggle) scanForAttunement()
}).setFps(1)

//register("playerJoined", (player) => renderCape(player))

register("gameLoad", () => analytics())

register("gameUnload", () => {
    frame.dispose()
})

register("command", () => {
    ChatLib.chat(Player.lookingAt())
    Player.lookingAt().getEntity().func_70106_y()
}).setName("setdead")

register("command", (...args) => {
    commandHandler(args)
}).setTabCompletions("rotate", "wardrobe", "deletewebhook", "clip", "secretreach", "clicker", "terminaldelay", "lookspeed", "bonedelay","axeswapitem", "secretauraitem", "externalchat", "esex", "override").setName("fp")