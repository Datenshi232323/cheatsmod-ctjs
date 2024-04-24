const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
entityList = []
register("command", () => {
    entityList = World.getAllEntitiesOfType(net.minecraft.client.entity.EntityOtherPlayerMP)
    for(let i = 0; i < entityList.length; i++) {
        ChatLib.chat(entityList[i].x + " " + entityList[i].y + " " + entityList[i].z)
    Client.sendPacket(new C04(entityList[i].x,entityList[i].y,entityList[i].z ,true))
    break
    }
}).setName("test")
