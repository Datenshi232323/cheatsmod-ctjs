
class ServerData {
    constructor() {
        register("packetSent", (packet, event) => {
            if(!event.isCancelled()) {
            this.serverYaw = packet.func_149462_g()
            this.serverPitch = packet.func_149470_h()
            this.serverOnGround = packet.func_149465_i()
            }
        }).setPacketClasses([net.minecraft.network.play.client.C03PacketPlayer])
        
        register("renderEntity", (entity) => {
            if (entity.getEntity() != Player.getPlayer() || !this.yaw || !this.pitch || Player.getPlayer().field_70154_o) return
            Player.getPlayer().field_70761_aq = this.yaw
            Player.getPlayer().field_70759_as = this.yaw
        })
        
        register("gameUnload", this.reset)
    }

    set(y, p) {
        //setYaw(y)
        //setPitch(p)
        this.yaw = y
        this.pitch = p
    }
    
    reset() {
        this.yaw = null
        this.pitch = null
    }
    resetRotations() {
        this.set(Player.getYaw(), Player.getPitch())
        this.resetRot = true
    }

}

export default new ServerRotations()