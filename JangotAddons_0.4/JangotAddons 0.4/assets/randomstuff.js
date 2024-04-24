/*
register("packetsent", (packet,event) => {
//    ChatLib.chat(packet.class.toString())
    if(packet.class.getSimpleName() == "C0DPacketCloseWindow") {
        cancel(event)
    }
})
*/
/*
register("packetReceived", (packet,event) => {
    if(packet.class.getSimpleName() == "S12PacketEntityVelocity") {
        cancel(event)
    }
})
*/
/*
            if(Player.getInventory().getStackInSlot(0).getItemStack()) {
                ChatLib.chat("a")
                Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1,-1,-1),255,Player.getInventory().getStackInSlot(0).getItemStack(),0,0,0))
                }
*/
/* 
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
register("command", () => {
    var EntitiesRendered = World.getAllEntities()
    for (let i = 0; i < EntitiesRendered.length; i++) {
        if (ChatLib.removeFormatting(EntitiesRendered[i].getName()).toString().includes("WALK TO ME")) {
            ChatLib.chat(EntitiesRendered[i].getName().toString())
                Player.getPlayer().func_70107_b(EntitiesRendered[i].x, EntitiesRendered[i].y, EntitiesRendered[i].z)
        }
    }
}).setName("autosolvecaptcha")
*/
/*
const Minecraft = Java.type("net.minecraft.client.Minecraft")
const mc = new Minecraft.func_71410_x()
mc.func_110432_I().func_111286_b()
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠛⠛⠛⠿⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⡀⠠⠤⠒⢂⣉⣉⣉⣑⣒⣒⠒⠒⠒⠒⠒⠒⠒⠀⠀⠐⠒⠚⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⡠⠔⠉⣀⠔⠒⠉⣀⣀⠀⠀⠀⣀⡀⠈⠉⠑⠒⠒⠒⠒⠒⠈⠉⠉⠉⠁⠂⠀⠈⠙⢿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠔⠁⠠⠖⠡⠔⠊⠀⠀⠀⠀⠀⠀⠀⠐⡄⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠉⠲⢄⠀⠀⠀⠈⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠊⠀⢀⣀⣤⣤⣤⣤⣀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠜⠀⠀⠀⠀⣀⡀⠀⠈⠃⠀⠀⠀⠸⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠥⠐⠂⠀⠀⠀⠀⡄⠀⠰⢺⣿⣿⣿⣿⣿⣟⠀⠈⠐⢤⠀⠀⠀⠀⠀⠀⢀⣠⣶⣾⣯⠀⠀⠉⠂⠀⠠⠤⢄⣀⠙⢿⣿⣿
⣿⡿⠋⠡⠐⠈⣉⠭⠤⠤⢄⡀⠈⠀⠈⠁⠉⠁⡠⠀⠀⠀⠉⠐⠠⠔⠀⠀⠀⠀⠀⠲⣿⠿⠛⠛⠓⠒⠂⠀⠀⠀⠀⠀⠀⠠⡉⢢⠙⣿
⣿⠀⢀⠁⠀⠊⠀⠀⠀⠀⠀⠈⠁⠒⠂⠀⠒⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⢀⣀⡠⠔⠒⠒⠂⠀⠈⠀⡇⣿
⣿⠀⢸⠀⠀⠀⢀⣀⡠⠋⠓⠤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠈⠢⠤⡀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⡠⠀⡇⣿
⣿⡀⠘⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠈⠑⡦⢄⣀⠀⠀⠐⠒⠁⢸⠀⠀⠠⠒⠄⠀⠀⠀⠀⠀⢀⠇⠀⣀⡀⠀⠀⢀⢾⡆⠀⠈⡀⠎⣸⣿
⣿⣿⣄⡈⠢⠀⠀⠀⠀⠘⣶⣄⡀⠀⠀⡇⠀⠀⠈⠉⠒⠢⡤⣀⡀⠀⠀⠀⠀⠀⠐⠦⠤⠒⠁⠀⠀⠀⠀⣀⢴⠁⠀⢷⠀⠀⠀⢰⣿⣿
⣿⣿⣿⣿⣇⠂⠀⠀⠀⠀⠈⢂⠀⠈⠹⡧⣀⠀⠀⠀⠀⠀⡇⠀⠀⠉⠉⠉⢱⠒⠒⠒⠒⢖⠒⠒⠂⠙⠏⠀⠘⡀⠀⢸⠀⠀⠀⣿⣿⣿
⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠑⠄⠰⠀⠀⠁⠐⠲⣤⣴⣄⡀⠀⠀⠀⠀⢸⠀⠀⠀⠀⢸⠀⠀⠀⠀⢠⠀⣠⣷⣶⣿⠀⠀⢰⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠁⢀⠀⠀⠀⠀⠀⡙⠋⠙⠓⠲⢤⣤⣷⣤⣤⣤⣤⣾⣦⣤⣤⣶⣿⣿⣿⣿⡟⢹⠀⠀⢸⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠑⠀⢄⠀⡰⠁⠀⠀⠀⠀⠀⠈⠉⠁⠈⠉⠻⠋⠉⠛⢛⠉⠉⢹⠁⢀⢇⠎⠀⠀⢸⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⠈⠢⢄⡉⠂⠄⡀⠀⠈⠒⠢⠄⠀⢀⣀⣀⣰⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⢀⣎⠀⠼⠊⠀⠀⠀⠘⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⡀⠉⠢⢄⡈⠑⠢⢄⡀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⢀⠀⠀⠀⠀⠀⢻⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⡈⠑⠢⢄⡀⠈⠑⠒⠤⠄⣀⣀⠀⠉⠉⠉⠉⠀⠀⠀⣀⡀⠤⠂⠁⠀⢀⠆⠀⠀⢸⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⡀⠁⠉⠒⠂⠤⠤⣀⣀⣉⡉⠉⠉⠉⠉⢀⣀⣀⡠⠤⠒⠈⠀⠀⠀⠀⣸⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣤⣤⣤⣤⣀⣀⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿
*/
//setTimeout(() => {ChatLib.chat("⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠛⠛⠛⠿⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⡀⠠⠤⠒⢂⣉⣉⣉⣑⣒⣒⠒⠒⠒⠒⠒⠒⠒⠀⠀⠐⠒⠚⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⡠⠔⠉⣀⠔⠒⠉⣀⣀⠀⠀⠀⣀⡀⠈⠉⠑⠒⠒⠒⠒⠒⠈⠉⠉⠉⠁⠂⠀⠈⠙⢿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠔⠁⠠⠖⠡⠔⠊⠀⠀⠀⠀⠀⠀⠀⠐⡄⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠉⠲⢄⠀⠀⠀⠈⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠊⠀⢀⣀⣤⣤⣤⣤⣀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠜⠀⠀⠀⠀⣀⡀⠀⠈⠃⠀⠀⠀⠸⣿⣿⣿⣿\n⣿⣿⣿⣿⡿⠥⠐⠂⠀⠀⠀⠀⡄⠀⠰⢺⣿⣿⣿⣿⣿⣟⠀⠈⠐⢤⠀⠀⠀⠀⠀⠀⢀⣠⣶⣾⣯⠀⠀⠉⠂⠀⠠⠤⢄⣀⠙⢿⣿⣿\n⣿⡿⠋⠡⠐⠈⣉⠭⠤⠤⢄⡀⠈⠀⠈⠁⠉⠁⡠⠀⠀⠀⠉⠐⠠⠔⠀⠀⠀⠀⠀⠲⣿⠿⠛⠛⠓⠒⠂⠀⠀⠀⠀⠀⠀⠠⡉⢢⠙⣿\n⣿⠀⢀⠁⠀⠊⠀⠀⠀⠀⠀⠈⠁⠒⠂⠀⠒⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⢀⣀⡠⠔⠒⠒⠂⠀⠈⠀⡇⣿\n⣿⠀⢸⠀⠀⠀⢀⣀⡠⠋⠓⠤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠈⠢⠤⡀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⡠⠀⡇⣿\n⣿⡀⠘⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠈⠑⡦⢄⣀⠀⠀⠐⠒⠁⢸⠀⠀⠠⠒⠄⠀⠀⠀⠀⠀⢀⠇⠀⣀⡀⠀⠀⢀⢾⡆⠀⠈⡀⠎⣸⣿\n⣿⣿⣄⡈⠢⠀⠀⠀⠀⠘⣶⣄⡀⠀⠀⡇⠀⠀⠈⠉⠒⠢⡤⣀⡀⠀⠀⠀⠀⠀⠐⠦⠤⠒⠁⠀⠀⠀⠀⣀⢴⠁⠀⢷⠀⠀⠀⢰⣿⣿\n⣿⣿⣿⣿⣇⠂⠀⠀⠀⠀⠈⢂⠀⠈⠹⡧⣀⠀⠀⠀⠀⠀⡇⠀⠀⠉⠉⠉⢱⠒⠒⠒⠒⢖⠒⠒⠂⠙⠏⠀⠘⡀⠀⢸⠀⠀⠀⣿⣿⣿\n⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠑⠄⠰⠀⠀⠁⠐⠲⣤⣴⣄⡀⠀⠀⠀⠀⢸⠀⠀⠀⠀⢸⠀⠀⠀⠀⢠⠀⣠⣷⣶⣿⠀⠀⢰⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠁⢀⠀⠀⠀⠀⠀⡙⠋⠙⠓⠲⢤⣤⣷⣤⣤⣤⣤⣾⣦⣤⣤⣶⣿⣿⣿⣿⡟⢹⠀⠀⢸⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠑⠀⢄⠀⡰⠁⠀⠀⠀⠀⠀⠈⠉⠁⠈⠉⠻⠋⠉⠛⢛⠉⠉⢹⠁⢀⢇⠎⠀⠀⢸⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⠈⠢⢄⡉⠂⠄⡀⠀⠈⠒⠢⠄⠀⢀⣀⣀⣰⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⢀⣎⠀⠼⠊⠀⠀⠀⠘⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⡀⠉⠢⢄⡈⠑⠢⢄⡀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⢀⠀⠀⠀⠀⠀⢻⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⡈⠑⠢⢄⡀⠈⠑⠒⠤⠄⣀⣀⠀⠉⠉⠉⠉⠀⠀⠀⣀⡀⠤⠂⠁⠀⢀⠆⠀⠀⢸⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⡀⠁⠉⠒⠂⠤⠤⣀⣀⣉⡉⠉⠉⠉⠉⢀⣀⣀⡠⠤⠒⠈⠀⠀⠀⠀⣸⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣤⣤⣤⣤⣀⣀⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿")},10000)
/*
register("tick", () => {
    let entitylist = World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand)
    for (let i = 0; i < entitylist.length; i++) {
        if (ChatLib.removeFormatting(entitylist[i].name).includes("")) {
            new net.minecraft.client.multiplayer.PlayerControllerMP.func_78768_b(Player.getPlayer(), entitylist[i])
            break
        }
    }
})
*/

/*
register("tick", () => {
    if (Player.isSneaking()) {
        Client.sendPacket(new net.minecraft.network.play.client.C0BPacketEntityAction(Player.getPlayer(), net.minecraft.network.play.client.C0BPacketEntityAction.Action.STOP_SNEAKING))
        Client.sendPacket(new net.minecraft.network.play.client.C0BPacketEntityAction(Player.getPlayer(), net.minecraft.network.play.client.C0BPacketEntityAction.Action.START_SNEAKING))
    }
})
*/
/*
flying = false
FlyingTicks = false
register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() === "S12PacketEntityVelocity" && packet.func_149412_c() == Player.getPlayer().func_145782_y()) {
        flying = true
    }
})
*/
/*
register("tick", () => {
    if (flying && FlyingTicks < 21) {
        FlyingTicks += 1
        let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
        let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
        let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x).getKeyCode()
        let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z).getKeyCode()
        let Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A).getKeyCode()
        Client.getMinecraft().field_71439_g.field_70181_x = 0
        Client.getMinecraft().field_71439_g.field_70159_w = 0
        Client.getMinecraft().field_71439_g.field_70179_y = 0
        if (Keyboard.isKeyDown(Forward) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * 3
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * 3
        }
        if (Keyboard.isKeyDown(Backward) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * -3
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * -3
        }
        if (Keyboard.isKeyDown(Left) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() + 90) * -3
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() + 90) * -3
        }
        if (Keyboard.isKeyDown(Right) && !Client.Companion.isInGui()) {
            Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() - 90) * -3
            Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() - 90) * -3
        }
        if (Keyboard.isKeyDown(Jump) && !Client.Companion.isInGui() && !Player.isSneaking()) {
            Client.getMinecraft().field_71439_g.field_70181_x = 3
        }
        if (Player.isSneaking() && !Client.Companion.isInGui() && !Keyboard.isKeyDown(Jump)) {
            Client.getMinecraft().field_71439_g.field_70181_x = -3
        }

    } else if(FlyingTicks > 20) {
        Client.getMinecraft().field_71439_g.field_70181_x = 0
        Client.getMinecraft().field_71439_g.field_70159_w = 0
        Client.getMinecraft().field_71439_g.field_70179_y = 0
        FlyingTicks = 0
        flying = false
    }
})

function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}
*/
/*
ModifierX = 0
ModifierY = 0
ModifierZ = 0
stop = false
BlockList = []
register("packetSent", (packet, event) => {
    if (packet.class.getSimpleName() === "C08PacketPlayerBlockPlacement" && Player.getHeldItem()) {
        let item = Player.getHeldItem().getNBT().toObject()
        if (item.id == "minecraft:diamond_sword" && packet.func_149568_f() == 255) {
            ModifierX = 0
            ModifierY = 0
            ModifierZ = 0
            let raytrace = raytraceBlock(10)
            if (raytrace.type.getRegistryName() !== "minecraft:air") {
                if (raytrace.y < Player.getY()) ModifierY = 1
                if(Player.facing() == "North" && Player.getPitch() < 70 && raytrace.y == Math.floor(Player.getY())) ModifierZ = 1
                if(Player.facing() == "South" && Player.getPitch() < 70 && raytrace.y == Math.floor(Player.getY())) ModifierZ = -1
                if(Player.facing() == "West" && Player.getPitch() < 70 && raytrace.y == Math.floor(Player.getY())) ModifierX = 1
                if(Player.facing() == "East" && Player.getPitch() < 70 ) ModifierX = -1
                Player.getPlayer().func_70107_b(
                    raytrace.x + 0.5 + ModifierX,
                    raytrace.y + ModifierY,
                    raytrace.z + 0.5 + ModifierZ
                )
                Client.getMinecraft().field_71439_g.field_70181_x = 0
                Client.getMinecraft().field_71439_g.field_70159_w = 0
                Client.getMinecraft().field_71439_g.field_70179_y = 0
            }
        }
    }
})
*/
/**
 * Raytraces from the player's look vector for the set number of blocks
 * @param {Number} distance 
 * @returns {Block|null}
 */
export const raytraceBlock = (distance = 100) => {
    let rt = Player.getPlayer().func_174822_a(distance, 0)
    let bp = rt.func_178782_a()
    if (!bp) return null
    return World.getBlockAt(new BlockPos(bp))
}
/*
stop = false
XMod = 0
ZMod = 0
register("packetSent", (packet, event) => {
    if (packet.class.getSimpleName() === "C08PacketPlayerBlockPlacement" && Player.getHeldItem()) {
        let item = Player.getHeldItem().getNBT().toObject()
        if (item.id == "minecraft:diamond_sword" && packet.func_149568_f() == 255) {
            let raytrace = raytraceBlock(7)
            XMod = 0
            ZMod = 0
            if (raytrace.type.getRegistryName() == "minecraft:air") {
                if (Player.facing() == "North") ZMod = -1
                if (Player.facing() == "South") ZMod = 1
                if (Player.facing() == "West") XMod = -1
                if (Player.facing() == "East") XMod = 1
                ChatLib.chat("Teleported to " + (raytrace.x + 0.5 + XMod) + " " + raytrace.y + " " + (raytrace.z + 0.5 + ZMod))
                Player.getPlayer().func_70107_b(
                    raytrace.x + 0.5 + XMod,
                    raytrace.y,
                    raytrace.z + 0.5 + ZMod
                )
                Client.getMinecraft().field_71439_g.field_70179_y = 0
            }
        }
    }
})
*/

function sin(alpha) {
    return Math.sin(alpha * Math.PI / 180);
}

function cos(alpha) {
    return Math.cos(alpha * Math.PI / 180);
}

/*
const BP = Java.type('net.minecraft.util.BlockPos')
register("tick", () => {
    if (Player.getHP() / Player.asPlayerMP().getMaxHP() < 0.25) {
        Player.getInventory()?.getItems()?.forEach((item, index) => {
            if (item) {
                let SkyblockId = item.getNBT().getTag('tag')?.getTag('ExtraAttributes')?.getTag('id')?.toString()
                if (SkyblockId == '"IRON_HELMET"' && index > 8) {
                    Client.getMinecraft().field_71442_b.func_78753_a(0, index, Player.getHeldItemIndex(), 2, Player.getPlayer())
                    Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(0, 0, 0), 255, item.getItemStack(), 0, 0, 0))
                    Client.getMinecraft().field_71442_b.func_78753_a(0, index, Player.getHeldItemIndex(), 2, Player.getPlayer())
                    return
                }
            }
        })
    } else {
        Player.getInventory()?.getItems()?.forEach((item, index) => {
            if (index == 39) {
                let SkyblockId = item?.getNBT()?.getTag('tag')?.getTag('ExtraAttributes')?.getTag('id')?.toString()
                if (SkyblockId == '"IRON_HELMET"') {
                    Client.getMinecraft().field_71442_b.func_78753_a(0, 5, 0, 2, Player.getPlayer())
                    return
                }
            }
        })
    }
})
*/
//if(Player.getInventory()?.getStackInSlot(39)?.getNBT()?.getTag('tag')?.getTag('ExtraAttributes')?.getTag('id')?.toString() == '"IRON_HELMET"') ChatLib.chat("a")
/*
register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() === "S08PacketPlayerPosLook") {
        let LastPosX = packet.func_148932_c()
        let LastPosY = packet.func_148928_d()
        let LastPosZ = packet.func_148933_e()
        ChatLib.chat(LastPosX + " " + LastPosY + " " + LastPosZ)
    }
})

ClippableBlocks = ["minecraft:skull","minecraft:flower_pot","minecraft:torch","minecraft:redstone_torch","minecraft:tallgrass","minecraft:red_flower"]
YMod = 0
register("packetSent", (packet, event) => {
    if (packet.class.getSimpleName() === "C08PacketPlayerBlockPlacement" && Player.getHeldItem()) {
        let item = Player.getHeldItem().getNBT().toObject()
        if (item.id == "minecraft:diamond_sword" && packet.func_149568_f() == 255) {
            YMod = 0
            let raytrace = raytraceBlock(56)
            if (raytrace.type.getRegistryName() !== "minecraft:air") {
                for (let i = 0; i < 2; i++) {
                    if (Player.asPlayerMP().isInWater() || Player.asPlayerMP().isInLava() && World.getBlockAt(raytrace.x, raytrace.y + 1 + i, raytrace.z).type.getRegistryName() !== "minecraft:air" && !ClippableBlocks.toString().includes(World.getBlockAt(raytrace.x, raytrace.y + 1 + i, raytrace.z).type.getRegistryName())) return ChatLib.chat("Block Detected")
                }
                Player.getPlayer().func_70107_b(
                    raytrace.x + 0.5,
                    raytrace.y + 1,
                    raytrace.z + 0.5
                )
                Client.getMinecraft().field_71439_g.field_70181_x = 0
                Client.getMinecraft().field_71439_g.field_70159_w = 0
                Client.getMinecraft().field_71439_g.field_70179_y = 0
            }
        }
    }
})
*/
/*
const C04 = Java.type('net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition')
const C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook")

LastPosX = 0
LastPosY = 0
LastPosZ = 0
packets = 0
packetLimit = 5
register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() === "S08PacketPlayerPosLook") {
        if (packets < packetLimit) {
            packets += 1
            cancel(event)
            ChatLib.chat("cancelled")
            Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(new C06(packet.func_148932_c(), packet.func_148928_d(), packet.func_148933_e(), packet.func_148931_f(), packet.func_148930_g(), Player.getPlayer().field_70122_E))
        } else if(packetLimit <= packets) {
            packets = 0
            if(LastPosX !== Math.floor(packet.func_148932_c()) && LastPosY !== Math.floor(packet.func_148928_d()) && LastPosZ !== Math.floor(packet.func_148933_e())) Player.getPlayer().func_70107_b(packet.func_148932_c,packet.func_148928_d,packet.func_148933_e)
        }
        LastPosX = Math.floor(packet.func_148932_c())
        LastPosY = Math.floor(packet.func_148928_d())
        LastPosZ = Math.floor(packet.func_148933_e())
    }
})
*/

/*
const ItemStack = Java.type('net.minecraft.item.ItemStack')
const BP = Java.type('net.minecraft.util.BlockPos')
const EnumFacing = Java.type('net.minecraft.util.EnumFacing')

register("tick", () => {
    if (World.getBlockAt(Math.floor(Player.getX()), Math.ceil(Player.getY()) - 1, Math.floor(Player.getZ())).toString().includes("minecraft:air")) Player.getPlayer().field_70122_E = true
    if (World.getBlockAt(Math.floor(Player.getX()), Math.ceil(Player.getY()) - 1, Math.floor(Player.getZ())).toString().includes("minecraft:air")) Client.getMinecraft().field_71439_g.field_70181_x = 0
    if (World.getBlockAt(Math.floor(Player.getX()), Math.ceil(Player.getY()) - 1, Math.floor(Player.getZ())).toString().includes("minecraft:air")) Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new BP(Player.getX(), Player.getY() - 1, Player.getZ()), 0,  new ItemStack(Java.type('net.minecraft.item.Item').func_150899_d(Number(1))), 0, 0, 0))
})
*/
/*
register("tick", () => {
    let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
    let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
    let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x).getKeyCode()
    let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z).getKeyCode()
    let Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A)
    Jump.setState(false)
    Client.getMinecraft().field_71439_g.field_70159_w = 0
    Client.getMinecraft().field_71439_g.field_70179_y = 0
    if (Keyboard.isKeyDown(Forward) && !Client.Companion.isInGui()) {
        Client.getMinecraft().field_71439_g.field_70159_w += 2 * -sin(Player.getYaw()) * Client.getMinecraft().field_71439_g.field_71075_bZ.func_75094_b()
        Client.getMinecraft().field_71439_g.field_70179_y += 2 * cos(Player.getYaw()) * Client.getMinecraft().field_71439_g.field_71075_bZ.func_75094_b()
    }
    if (Keyboard.isKeyDown(Left) && !Client.Companion.isInGui()) {
        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() + 90) * 2 * (0 - Client.getMinecraft().field_71439_g.field_71075_bZ.func_75094_b())
        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() + 90) * 2 * (0 - Client.getMinecraft().field_71439_g.field_71075_bZ.func_75094_b())
    }
    if (Keyboard.isKeyDown(Backward) && !Client.Companion.isInGui()) {
        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw()) * 2 * (0 - Client.getMinecraft().field_71439_g.field_71075_bZ.func_75094_b())
        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw()) * 2 * (0 - Client.getMinecraft().field_71439_g.field_71075_bZ.func_75094_b())
    }
    if (Keyboard.isKeyDown(Right) && !Client.Companion.isInGui()) {
        Client.getMinecraft().field_71439_g.field_70159_w += -sin(Player.getYaw() - 90) * 2 * (0 - Client.getMinecraft().field_71439_g.field_71075_bZ.func_75094_b())
        Client.getMinecraft().field_71439_g.field_70179_y += cos(Player.getYaw() - 90) * 2 * (0 - Client.getMinecraft().field_71439_g.field_71075_bZ.func_75094_b())
    }
    if (Keyboard.isKeyDown(Forward) || Keyboard.isKeyDown(Left) || Keyboard.isKeyDown(Backward) || Keyboard.isKeyDown(Right)) {
        if (!Client.Companion.isInGui() && Player.getPlayer().field_70122_E == true) {
            //Client.getMinecraft().field_71439_g.field_70181_x = 0.42
            Jump.setState(true)
        }
    }
    if (Player.getMotionY() > 0) {
        Client.getMinecraft().field_71439_g.field_70181_x -= 0.001
    }
})
*/
