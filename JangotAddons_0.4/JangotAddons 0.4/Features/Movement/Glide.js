register("tick", ()=> {
    if(!Player.getPlayer().field_70122_E && Player.getMotionY() < 0) {
        Player.getPlayer().field_70122_E = true
        Client.getMinecraft().field_71439_g.field_70181_x = -0.04
    }
})