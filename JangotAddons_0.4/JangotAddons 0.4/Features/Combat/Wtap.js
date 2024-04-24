const C0B = Java.type('net.minecraft.network.play.client.C0BPacketEntityAction')
/*
const Wtap = Client.getMinecraft().getClass().getDeclaredField("field_74351_w")
Wtap.setAccessible(true)
const Stap = Client.getMinecraft().getClass().getDeclaredField("field_74368_y")
Stap.setAccessible(true)
*/

register("packetSent", (packet, event) => {
    if (packet.class.getSimpleName() == "C02PacketUseEntity" && packet.func_149565_c().toString() == "ATTACK") {
        let wasSprinting = false
        let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
        let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
        let ForwardKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w)
        let BackwardKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y)
        if (Keyboard.isKeyDown(Forward)) {
            if (Player.isSprinting()) wasSprinting = true
            Player.getPlayer().func_70031_b(false)
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.STOP_SPRINTING))
            ForwardKey.setState(false)
            BackwardKey.setState(true)
            if (!Player.isSprinting()) {
                Player.getPlayer().func_70031_b(true)
                Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.START_SPRINTING))
                Client.scheduleTask(1, () => {
                    Player.getPlayer().func_70031_b(false)
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.STOP_SPRINTING))
                })
            } else {
                Player.getPlayer().func_70031_b(false)
                Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.STOP_SPRINTING))
                Client.scheduleTask(1, () => {
                    Player.getPlayer().func_70031_b(true)
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.START_SPRINTING))
                })
            }
            Client.scheduleTask(1, () => {
                if (!Keyboard.isKeyDown(Backward)) {
                    BackwardKey.setState(false)
                }
                if (Keyboard.isKeyDown(Forward)) {
                    ForwardKey.setState(true)
                }
            })
            if (Keyboard.isKeyDown(Backward)) BackwardKey.setState(true)
            Client.scheduleTask(2, () => {
                if (!wasSprinting && Player.isSprinting()) {
                    Player.getPlayer().func_70031_b(false)
                    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C0B(Player.getPlayer(), C0B.Action.STOP_SPRINTING))
                }
            })
        }
    }
})
