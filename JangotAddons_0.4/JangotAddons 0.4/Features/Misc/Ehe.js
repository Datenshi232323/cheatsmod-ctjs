import { Alert } from "../../Utils/alert"
const OutroSong = new Sound({ source: "Outro Song.ogg" })
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText")
OutroSongCommencing = false
connected = false
inhypixel = false
function makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678901234567890123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
register("command", () => {
    if (!OutroSongCommencing && inhypixel) {
        OutroSongCommencing = true
        Alert("Disabling Watchdog", 2)
        setTimeout(() => {
            if (connected) {
                ChatLib.chat("§c§lA player has been removed from your game for hacking or abuse.§r§b Thanks for reporting it!")
                Client.getMinecraft().func_147114_u().func_147298_b().func_150718_a(new ChatComponentText("§cYou are temporarily banned for §f359d 23h 59m 59s§c from this server!\n\n§7Reason: §rCheating through the use of unfair game advantages.\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §r#" + makeid() + "\n§7Sharing your Ban ID may affect the processing of your appeal!"))
                OutroSongCommencing = false
                setTimeout(() => {
                    OutroSong.stop()
                    OutroSong.play()
                }, 3000)
            } else {
                OutroSongCommencing = false
            }
        }, 5000)
    } else {
        ChatLib.command("")
    }
}).setName("disablewatchdog")

register("serverDisconnect", () => {
    connected = false
    OutroSongCommencing = false
    inhypixel = false
})
register("serverConnect", () => {
    connected = true
})
register("renderScoreboard", () => {
    connected = true
    Scoreboard.getLines().forEach(line => {
        if (ChatLib.removeFormatting(line).toString().includes("hypixel") && connected) {
            inhypixel = true
        }
    })
})
register("packetReceived", (packet, event) => {
    if (OutroSongCommencing) {
        cancel(event)
    }
})
register("packetSent", (packet, event) => {
    if (OutroSongCommencing) {
        cancel(event)
    }
})