const C01 = Java.type("net.minecraft.network.play.client.C01PacketChatMessage")
register("chat", (event) => {
    let e = ChatLib.getChatMessage(event,true)
    if(e.includes("&r&6&lChat Reaction &r&7&l» &r&eThe first person to type")) {
        let message = e.match(/&r&6&lChat Reaction &r&7&l» &r&eThe first person to type "(.+)" will win a prize!&r/)
        Client.sendPacket(new C01(ChatLib.removeFormatting(message[1])))
    }
})