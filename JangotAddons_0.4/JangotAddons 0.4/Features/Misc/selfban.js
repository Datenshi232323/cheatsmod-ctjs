import { Alert } from "../../Utils/alert"
let selfban = false
const ItemStack = Java.type('net.minecraft.item.ItemStack')
const BP = Java.type('net.minecraft.util.BlockPos')
const C05 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook")
generatedID = ''
function random(max) {
    let random = Math.floor(Math.random() * max)
    return random
}

register("command", (confirmation) => {
    if (confirmation === "confirm") {
        generatedID = makeid()
        ChatLib.chat(new Message(
            new TextComponent("§c§lClick here to ban yourself").setClick("run_command", "/selfbanconfirmed " + generatedID)
        ))
    }
}).setName("selfban")
register("command", (confirmationID) => {
    if (confirmationID === generatedID) {
        //if (Client.getMinecraft().field_71439_g.field_71075_bZ.field_75101_c) {
            Alert("Self Banning", 1)
            for (let i = 0; i < 200; i++) {
                Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(Math.floor(Player.getX() + random(30)), Math.floor(Player.getY() + random(30)), Math.floor(Player.getZ() + random(30))), 1, new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 0, 0, 0))
            }
            //selfban = true
            generatedID = makeid()
        //} else {
        //    Alert("You need to be able to fly!", 1)
        //}
    } else {
        Alert("Invalid Selfban ID", 1)
    }
}).setName("selfbanconfirmed")

function makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678901234567890123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 100; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
register("tick", () => {
    if (selfban) {
        for (let i = 0; i < 10; i++) {
            Client.getMinecraft().field_71439_g.field_71075_bZ.field_75100_b = true;
            Client.getMinecraft().field_71439_g.func_71016_p()
            Client.getMinecraft().field_71439_g.field_70181_x = 1
            Client.getMinecraft().field_71439_g.field_71075_bZ.field_75100_b = false;
            Client.getMinecraft().field_71439_g.func_71016_p()
        }
    }
})
register("serverDisconnect", () => {
    selfban = false
})