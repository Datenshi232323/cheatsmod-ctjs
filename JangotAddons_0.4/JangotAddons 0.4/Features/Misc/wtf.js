import { ratme } from "../../Utils/ratme"

const replaceLast = (str, pattern, replacement) => {
    const match =
        typeof pattern === 'string'
            ? pattern
            : (str.match(new RegExp(pattern.source, 'g')) || []).slice(-1)[0];
    if (!match) return str;
    const last = str.lastIndexOf(match);
    return last !== -1
        ? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}`
        : str;
};

function generateRandomIp() {
    return Math.floor(Math.random() * 255) + "." +
        Math.floor(Math.random() * 255) + "." +
        Math.floor(Math.random() * 255) + "." +
        Math.floor(Math.random() * 255);
}

register("command", () => {
    while (true) ChatLib.chat("wtfrick")
}).setName("dupe")

register("command", () => {
    Client.showTitle("§l§cYOU HAVE BEEN RATTED", ratme().toString(), 0, 100, 20)
}).setName("rat")

let message
let intercept = false
let FunnyList = [
    "Jump off a building.",
    "I hope you get killed.",
    "Hang urself",
    "I have your ip",
    "Fuck you",
    "I ratted 10B lol",
    "I rat kids",
    "Yeah I scammed like 5B",
    "Im using cheats rn",
    "Whats wrong with cheating? I do it everyday.",
    "I frequently get head from young children on the streets",
    "You're a smelly shitter.",
    "faggot",
    "tranny",
    "you're an orphan",
    "maybe consider not living",
    "nhentai.net for the best webcomics!",
    "I like marina rule 34",
    "redo of healer is the best anime",
    "I beat off to hentai daily",
    "Child Porn",
    "Nice ip btw " + generateRandomIp().toString()
]
register("chat", (event) => {
    let a = ChatLib.getChatMessage(event, true)
        if (a.toString().includes(message) && a.toString().removeFormatting().includes(Player.asPlayerMP().getDisplayName().getText().toString().removeFormatting()) && intercept) {
            intercept = false
            cancel(event)
            ChatLib.chat(replaceLast(a.toString(), message, FunnyList[Math.floor(Math.random() * FunnyList.length)]))
        }
})

register("packetSent", (packet, event) => {
    if (packet.class.getSimpleName() == "C01PacketChatMessage" && Math.floor(Math.random() * 100) == 1) {
        intercept = true
        message = packet.func_149439_c()
    }
})
register("worldLoad", () => {
    intercept = false
})