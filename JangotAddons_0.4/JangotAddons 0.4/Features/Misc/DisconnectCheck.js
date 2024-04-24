import { Alert } from "../../Utils/alert"

let packetrate = 0
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText")

register("packetReceived", (packet,event) => {
    packetrate += 1
})
register("tick", (elapsed) => {
    if(elapsed %21 == 20) {
        if(packetrate < 2 && Server.getIP() !== "localhost") {
            let ServerIp = Server.getIP()
            Alert("Detected Server Kick, manually disconnecting.", 3)
            Client.getMinecraft().func_147114_u().func_147298_b().func_150718_a(new ChatComponentText("§cJangotAddons Disconnected you from " + ServerIp + "."))
        }
        packetrate = 0
    }
})