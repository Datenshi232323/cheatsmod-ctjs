const C01 = Java.type("net.minecraft.network.play.client.C01PacketChatMessage")
register("command", (length) => {
    if (!isNaN(length)) {
        for (let i = 0; i < length; i++) {
            Client.sendPacket(new C01(makeid()))
        }
    }
}).setName("spamthechat")
function makeid() {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz~!@#$%^&*()_-+={[}]|:;<,>.?0123456789012345678901234567890123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 100; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}