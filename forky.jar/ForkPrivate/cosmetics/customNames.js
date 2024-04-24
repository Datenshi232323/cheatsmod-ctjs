import { inSkyblock } from "../utils/locationUtils"
const DigestUtils = Java.type("org.apache.commons.codec.digest.DigestUtils")
let names = JSON.parse(FileLib.getUrlContent("https://forkdev.xyz/cosmetics/customNames.json", "Mozilla/5.0"))
let tabPlayerList = net.minecraft.network.play.server.S38PacketPlayerListItem.class.getDeclaredField("field_179769_b")
tabPlayerList.setAccessible(true)

function updateNames(name) {
    if (names[name]) return
    Object.keys(names).forEach(hash => { 
        if (DigestUtils.sha256Hex(name) == hash) delete Object.assign(names, {[name]: names[hash] })[hash]
    })
    World.getAllPlayers().forEach(player => {
        Object.keys(names).forEach(hash => {
            if (names[player.getName()]) return
            if (DigestUtils.sha256Hex(player.getName()) == hash) delete Object.assign(names, {[player.getName()]: names[hash] })[hash]
        })
        let replacement = replaceName(player.getDisplayName().getText())
        player.setNametagName(new TextComponent(replacement))
        if (!inSkyblock()) player.setTabDisplayName(new TextComponent(replacement))
    })
}

function replaceName(message) {
    Object.keys(names).forEach((key) => {
        if (message?.includes(key)) message = message.replaceAll(key, names[key])
    })
    return message
}

function replaceTab(packet) {
    let playerListTabList = packet.func_179767_a()
    let newPlayerList = []
    playerListTabList.forEach((player) => {
        if (player.func_179961_d() !== null) {
            newPlayerList.push(new net.minecraft.network.play.server.S38PacketPlayerListItem$AddPlayerData(packet, player.func_179962_a(), player.func_179963_b(), player.func_179960_c(), new net.minecraft.util.IChatComponent(new net.minecraft.util.ChatComponentText(replaceName(player.func_179961_d().func_150254_d()))))) 
        } else newPlayerList.push(player)
    })
    if (newPlayerList.length > 0) tabPlayerList.set(packet, newPlayerList)
}

function replaceScoreboard(packet) {
    let PrefixField = packet.getClass().getDeclaredField("field_149319_c")
    PrefixField.setAccessible(true)
    let prefix = PrefixField.get(packet)
    let SuffixField = packet.getClass().getDeclaredField("field_149316_d")
    SuffixField.setAccessible(true)
    let suffix = SuffixField.get(packet)
    let newString = replaceName(prefix + suffix)
    PrefixField.set(packet, newString.substring(0, prefix.length))
    SuffixField.set(packet, newString.substring(prefix.length))
}

function customNames(message, event) {
    username = ChatLib.removeFormatting(message).match(/^((?:Guild|Party|Co-op|From|To) ?(>)?? |(?:(?:\[✌️\] )?(?:\[[\w\s]+\] )??))??(\[\w{3,}\+{0,2}\] )??(\w{1,16})(?: \[\w{1,6}\])??: (.*)$/)?.[4]
    updateNames(username)
    newmsg = new TextComponent(replaceName(ChatLib.getChatMessage(event, true)))
    if (newmsg != ChatLib.getChatMessage(event, true)) {
        new Message(event).getMessageParts().forEach(part => {
            if (part.clickValue) newmsg.setClick(part.clickAction, part.clickValue)
            if (part.hoverValue) newmsg.setHoverValue(part.hoverValue)
        })
        cancel(event)
        ChatLib.chat(newmsg)
    }
}

register("worldUnload", () => tabCache = [])

export { replaceTab, replaceScoreboard, customNames }