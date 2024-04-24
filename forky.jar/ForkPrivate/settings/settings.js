import PogObject from "PogData"
const Minecraft = Client.getMinecraft()
const ghostBind = new KeyBind("Ghost Blocks", Keyboard.KEY_F, "[Fork Private]")
const menuOpenBind = new KeyBind("Open Settings Menu", Keyboard.KEY_RSHIFT, "[Fork Private]")
const boneBind = new KeyBind("Bone Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const crystalBind = new KeyBind("Crystal Reach", Keyboard.KEY_NONE, "[Fork Private]")
const vclipBind = new KeyBind("P3 Vertical Clip", Keyboard.KEY_NONE, "[Fork Private]")
const iceSprayBind = new KeyBind("Ice Spray Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const grappleshotBind = new KeyBind("Moody Grappleshot Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const powerOrbBind = new KeyBind("Power Orb Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const tubaBind = new KeyBind("Weird Tuba Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const healWandBind = new KeyBind("Healing Wand Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const rogueSwordBind = new KeyBind("Rogue Sword Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const fishingRodBind = new KeyBind("(Vanilla) Fishing Rod Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const AOTSBind = new KeyBind("Axe of the Shredded Macro", Keyboard.KEY_NONE, "[Fork Private Item Macros]")
const rightBind = new KeyBind(Minecraft.field_71474_y.field_74313_G)
const rightClick = Minecraft.getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)

const allowedBlocks = ["minecraft:chest", "minecraft:trapped_chest", "minecraft:lever", "minecraft:skull"]
const Color = java.awt.Color

let working = false

function sendNotif(message, time) {
    Java.type("gg.essential.api.EssentialAPI").getNotifications().push(
        "Fork Private",
        message, 
        time
    )
}

var data = new PogObject("ForkPrivate", {
    features: {
        "Combat": {
            "Right Clicker": {
                toggle: 0,
                "CPS": 0
            },
            "No Rotate": {
                toggle: false,
                "Keep Motion": false,
            },
            "Anti KB": {toggle: false}
        },
        "Dungeons": {
            "Ghost Blocks": {
                toggle: false,
                "Legit": false
            },
            "Ghost Hands": {toggle: false}, 
            "Secret Aura": {
                toggle: false,
                "Item": "Stonk",
                "Reach": 4.5
            }, 
            "Auto Chest Close": {toggle: false}
            //"Ice Fill QOL": {toggle: false}
        }, "F7": {
            "Auto Terminals": {
                toggle: false,
                "Delay": 250
            }
            //"Legit Aura": {
            //    toggle: false,
            //    "Reach": 4.5
            //},
            //"P3 Ghost Blocks": {toggle: false}
            //autoSimon: {toggle: false}
        }, "Render": {
            "Chest ESP": {toggle: false},
            "Starred Mob ESP": {toggle: false},
            "Show Hidden Mobs": {toggle: false},
            "Bat ESP": {toggle: false},
            "No Portal Effects": {toggle: false},
            //"No Hurt Cam": {toggle: false},
            //"Camera Clip": {toggle: false},
            //"No Blindness": {toggle: false}
        }, "Macros": {
            "Item Macros": {toggle: false},
            "Soul Whip": {toggle: false},
            "AOTS": {
                toggle: false,
                "Item": "Giant's Sword"
            },
            "Bone Macro": {
                toggle: false,
                "Delay": 150
            },
            "Auto Arachne Place": {toggle: false},
            "Thorn Aura": {toggle: false}
        }, "Other": {
            "Blaze Slayer": {
                toggle: false
            },
            "0 Ping Menus": {toggle: false},
            "Guess the Build": {toggle: false},
            "Discord Presence": {toggle: true},
            "Block Clicks": {toggle: false},
            "Block RC Animation": {toggle: false}
        }, "Cosmetics": {
            //"Custom Names": {toggle: false},
            "China Hat": {toggle: false}
        }, "Jokes": {
            "Catpeople": {toggle: false},
            "Esex": {toggle: false}
        }
    },
    esexMessages: {
        "players": [],
        "messages": []
    },
    lookVelocity: 300,
    newHeight: [25, 25, 25, 25, 25, 25, 25, 25],
    Xbox: [100, 100, 100, 100, 100, 100, 100, 100],
    Ybox: [101, 127, 153, 179, 205, 231, 257, 283],
    lastUse: null,
    metrics: {
        ghostblocks: 0,
        secretaura: 0,
        terminals: 0,
        itemmacros: 0
    }
})
data.autosave(5)

//register("step", () => {
    //hurtCam.hurtCam = data.features["Render"]["No Hurt Cam"].toggle
    //cameraClip.cameraClip = data.features["Render"]["Camera Clip"].toggle
    //noBlind.noBlind = !data.features["Render"]["No Blindness"].toggle
//}).setFps(4)

//export const hurtCam = { hurtCam: true }
//export const noBlind = { noBlind: false }
//export const cameraClip = { cameraClip: false }

export {Minecraft, ghostBind, menuOpenBind, boneBind, crystalBind, vclipBind, iceSprayBind, grappleshotBind, powerOrbBind, tubaBind, healWandBind, rogueSwordBind, fishingRodBind, AOTSBind, rightBind, rightClick, allowedBlocks, Color, working, data, sendNotif}