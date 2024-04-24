function setYaw(Yaw) {
    mc = Client.getMinecraft().func_71410_x()
    mc.field_71439_g.field_70177_z = Yaw
}
function setPitch(Pitch) {
    mc = Client.getMinecraft().func_71410_x()
    mc.field_71439_g.field_70125_A = Pitch
}

export { setYaw, setPitch }