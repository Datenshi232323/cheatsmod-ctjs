import { facePos } from "../utils/rotation"
import { clickGUI } from "./clickGUI"
import { data } from "./settings"
import { wardrobe } from "../features/macros/wardrobe"
import { frame } from "../features/other/externalChat"
import { vclip } from "../features/other/vclip"
import { deleteWebhook } from "../features/other/webhookDeleter"
let override = false

function commandHandler(args) {
    try {
        switch (args[0]) {
            case "rotate":
                if (!Number.isInteger((parseInt(args[1]) + parseInt(args[2]) + parseInt(args[3])))) ChatLib.chat("§zFork Private > §gInvalid coordinates!")
                else {
                    facePos(new net.minecraft.util.Vec3(args[1], args[2], args[3]))
                    ChatLib.chat("§zFork Private > §gRotating towards: §3[" + args[1] + ", " + args[2] + ", " + args[3] + "]")
                }
                break
            case "deletewebhook":
                if (args[1] && args[1].startsWith("https://discord.com/api/webhooks/")) deleteWebhook(args[1])
                else ChatLib.chat("§zFork Private > §gInvalid URL!")
                break
            case "clip":
                vclip(args[1])
                break
            case "secretreach":
                if (args[1]) {
                    if (parseInt(args[1]) <= 6 || override) {
                        data.features["Dungeons"]["Secret Aura"]["Reach"] = parseInt(args[1])
                        ChatLib.chat("§zFork Private > §gSecret Reach has been set to: §3" + data.features["Dungeons"]["Secret Aura"]["Reach"])
                    } else {
                        ChatLib.chat("§zFork Private > §gAre you sure you would like to be banned? Try a value under 6, or run §z/fp override")
                    }
                } else {
                    ChatLib.chat("§zFork Private > §gSecret Reach is set to: §3" + data.features["Dungeons"]["Secret Aura"]["Reach"])
                }
                break
            case "lookspeed":
                if (args[1]) {
                    if (parseInt(args[1]) >= 15 || override) {
                        data.lookVelocity = parseInt(args[1])
                        ChatLib.chat("§zFork Private > §gLook Speed has been set to: §3" + data.lookVelocity)
                    } else {
                        ChatLib.chat("§zFork Private > §gAre you sure you would like to be banned? Try a value over 15, or run §z/fp override")
                    }
                } else {
                    ChatLib.chat("§zFork Private > §gLook Speed is set to: §3" + data.lookVelocity)
                }
                break
            case "clicker":
                if (args[1] <= 200) {
                    data.features["Combat"]["Right Clicker"]["CPS"] = parseInt(args[1]) 
                    ChatLib.chat("§zFork Private > §gRight Clicker has been set to: §3" + args[1])
                } else ChatLib.chat("§zFork Private > §gRight Clicker is set to: §3" + data.features["Combat"]["Right Clicker"]["CPS"])
                break
            case "terminaldelay":
                if (args[1]) {
                    data.features["F7"]["Auto Terminals"]["Delay"] = parseInt(args[1])
                    ChatLib.chat("§zFork Private > §gTerminal Delay has been set to: §3" + data.features["F7"]["Auto Terminals"]["Delay"])
                } else {
                    ChatLib.chat("§zFork Private > §gTerminal Delay is set to: §3" + data.features["F7"]["Auto Terminals"]["Delay"])
                }
                break
            case "bonedelay":
                if (args[1]) {
                    data.features["Macros"]["Bone Macro"]["Delay"] = parseInt(args[1])
                    ChatLib.chat("§zFork Private > §gBone Delay has been set to: §3" + data.features["Macros"]["Bone Macro"]["Delay"])
                } else {
                    ChatLib.chat("§zFork Private > §gBone Delay is set to: §3" + data.features["Macros"]["Bone Macro"]["Delay"])
                }
                break
            case "axeswapitem":
                if (args[1]) {
                    data.features["Macros"]["AOTS"]["Item"] = args.splice(1, args.length).join(" ")
                    ChatLib.chat("§zFork Private > §gAxe Swap Item has been set to: §3" + data.features["Macros"]["AOTS"]["Item"])
                } else {
                    ChatLib.chat("§zFork Private > §gAxe Swap Item is set to: §3" + data.features["Macros"]["AOTS"]["Item"])
                }
                break
            case "secretauraitem":
                if (args[1]) {
                    data.features["Dungeons"]["Secret Aura"]["Item"] = args.splice(1, args.length).join(" ")
                    ChatLib.chat("§zFork Private > §gSecret Aura Item has been set to: §3" + data.features["Dungeons"]["Secret Aura"]["Item"])
                } else {
                    ChatLib.chat("§zFork Private > §gSecret Aura Item is set to: §3" + data.features["Dungeons"]["Secret Aura"]["Item"])
                }
                break
            case "externalchat":
                frame.setVisible(true)
                frame.setAlwaysOnTop(true)
                break
            case "esex":
                if (args[1] == "add") {
                    if (args[3] == null) ChatLib.chat("§zFork Private > §g/fp esex add §3<player> <message>")
                    else if (data.esexMessages.players.includes(args[2])) {
                        ChatLib.chat("§zFork Private > §gThis player is already being sexted!")
                    } else {
                        data.esexMessages.players.push(args[2])
                        data.esexMessages.messages.push(args.splice(3, args.length).join(" "))
                        ChatLib.chat("§zFork Private > §gSuccessfully added §3" + args[2])
                    }
                } else if (args[1] == "remove") {
                    if (args[2] == null) ChatLib.chat("§zFork Private > §g/fp esex remove §3<player>")
                    data.esexMessages.players.splice(data.esexMessages.players.indexOf(args[2]), 1)
                    data.esexMessages.messages.splice(data.esexMessages.messages.indexOf(args[2]), 1)
                    ChatLib.chat("§zFork Private > §gSuccessfully removed §3" + args[2])
                } else if (args[1] == "list") {
                    data.esexMessages.players.forEach((player, index) => ChatLib.chat("§zFork Private > §gTarget " + (index + 1) + ": §3" + player + " §gMessage: §3" + data.esexMessages.messages[index]))
                } else {
                    ChatLib.chat("§zFork Private > §g/fp esex add §3<player> <message>")
                    ChatLib.chat("§zFork Private > §g/fp esex remove §3<player>")
                    ChatLib.chat("§zFork Private > §g/fp esex list")
                }
                break
            case "override":
                override = !override
                ChatLib.chat("§zFork Private > §gOverride has been set to: §3" + override.toString().toUpperCase())
                break
            default:
                clickGUI()
        }
    } catch (e) {
        clickGUI()
    }
}

export { commandHandler }