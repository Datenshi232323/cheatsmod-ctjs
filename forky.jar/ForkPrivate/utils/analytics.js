import { Minecraft, data } from "../settings/settings"
import { grabNewCapes } from "../cosmetics/capes"
import request from "requestV2"

// hash function from ner :)
function hash(uuid) {
    const md = java.security.MessageDigest.getInstance("sha1")
    const salt = new java.math.BigInteger(130, new java.util.Random()).toString(32)
    const string = new java.lang.String(uuid + salt)
    return new java.math.BigInteger(md.digest(string.getBytes())).toString(16)
}

function analytics() {
    grabNewCapes()
    let date = new Date().toUTCString()
    if (data.lastUse != new Date().getDate()) {
        data.lastUse = new Date().getDate()
        ChatLib.chat(new TextComponent("§zFork Private > §gThank you for using §zFork Private. §gClick here to join the discord!").setClick("open_url", "https://discord.gg/forkprivate").setHoverValue("Join!"))
    }
    const serverId = hash(Minecraft.func_110432_I().func_148255_b())
    const Session = Java.type("session.Session").INSTANCE // YES THIS GETS YOUR SESSION TOKEN, READ #FAQ BEFORE COMPLAINING
    try { Minecraft.func_152347_ac().joinServer(Minecraft.func_110432_I().func_148256_e(), Session.getToken(), serverId) } catch (e) {
        ChatLib.chat("§zFork Private > §gThis error has occured because you are using Skytils V1.2 - Please downgrade version and make a complaint in the Skytils discord about their shit \"antirat\". Thank you for using Fork Private!")
    }
    request({
        url: "https://api.forkdev.xyz/users/",
        method: "POST",   
        headers: {
            'Content-type': 'application/json',
            "User-Agent":"Mozilla/5.0"
        }, body: {           
            username: Player.getName(),
            uuid: Minecraft.func_110432_I().func_148255_b(),
            server: serverId,
            time: date,
            ghostblocks: data.metrics.ghostblocks,
            secretaura: data.metrics.secretaura,
            terminals: data.metrics.terminals,
            itemmacros: data.metrics.itemmacros
        }                 
    }).catch(error => {
        ChatLib.chat("§zFork Private > §gAPI Error! Please DM fork#9999!")
    })
    data.metrics = {
        ghostblocks: 0,
        secretaura: 0,
        terminals: 0,
        itemmacros: 0
    }
}

export { analytics }