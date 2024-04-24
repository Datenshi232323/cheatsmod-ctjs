import { Minecraft, Color } from "../settings/settings"

// From Rise (intent.store)
function drawChinaHat(entity, partialTicks) {
    GL11.glPushMatrix()
    GL11.glBlendFunc(770, 771)
    GL11.glEnable(3042)
    GL11.glShadeModel(7425)
    GL11.glDisable(3553)
    GL11.glDisable(2884)
    GL11.glTranslated(entity.field_70142_S + (entity.field_70165_t - entity.field_70142_S) * partialTicks - (Minecraft.func_175598_ae()).field_78730_l, entity.field_70137_T + (entity.field_70163_u - entity.field_70137_T) * partialTicks - 
        (Minecraft.func_175598_ae()).field_78731_m + entity.field_70131_O + (Player.isSneaking() ? -0.1 : 0.1), entity.field_70136_U + (entity.field_70161_v - entity.field_70136_U) * partialTicks - 
        (Minecraft.func_175598_ae()).field_78728_n)
    GL11.glRotatef(((entity.field_70173_aa + partialTicks) * 5.0), 0.0, 1.0, 0.0)
    GL11.glBegin(6)
    let c1 = Color.getHSBColor(0.0, 1.0, 1.0)
    GL11.glColor4f(c1.getRed() / 255.0, c1.getGreen() / 255.0, c1.getBlue() / 255.0, 0.8)
    GL11.glVertex3d(0.0, 0.3, 0.0)
    for (i = 0; i <= 32; i++) {
        let color = Color.getHSBColor((i / 32), 1.0, 1.0)
        GL11.glColor4f(color.getRed() / 255.0, color.getGreen() / 255.0, color.getBlue() / 255.0, 0.8);
        GL11.glVertex3d(Math.cos(i * Math.PI / 8.0 / 2.0) * 0.7, 0.0, Math.sin(i * Math.PI / 8.0 / 2.0) * 0.7)
    } 
    GL11.glVertex3d(0.0, 0.3, 0.0)
    GL11.glEnd()
    GL11.glShadeModel(7424)
    GL11.glEnable(2884)
    GlStateManager.func_179117_G()
    GL11.glEnable(3553)
    GL11.glDisable(3042)
    GL11.glPopMatrix()
}

export { drawChinaHat }