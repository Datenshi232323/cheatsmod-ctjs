import { Minecraft } from "../settings/settings"

function setColor(c) {
    GL11.glColor4f(c.getRed() / 255.0, c.getGreen() / 255.0, c.getBlue() / 255.0, c.getAlpha() / 255.0)
}

function drawLine(pos1, pos2, color) {
    GL11.glPushMatrix()
    GL11.glBlendFunc(770, 771)
    GL11.glEnable(3042)
    GL11.glLineWidth(2.5)
    GL11.glDisable(3553)
    GL11.glDisable(2929)
    GL11.glDepthMask(false)
    setColor(color)
    GL11.glTranslated(-(Minecraft.func_71410_x().func_175598_ae()).field_78730_l, -(Minecraft.func_71410_x().func_175598_ae()).field_78731_m, -(Minecraft.func_71410_x().func_175598_ae()).field_78728_n)
    GL11.glBegin(1)
    GL11.glVertex3d(pos1.field_72450_a, pos1.field_72448_b, pos1.field_72449_c)
    GL11.glVertex3d(pos2.field_72450_a, pos2.field_72448_b, pos2.field_72449_c)
    GL11.glEnd()
    GL11.glEnable(3553)
    GL11.glEnable(2929)
    GL11.glDepthMask(true)
    GL11.glDisable(3042)
    GL11.glPopMatrix()
}

function chestOutline(chest, trapped) {
    GL11.glBlendFunc(770, 771)
    GL11.glEnable(3042)
    GL11.glLineWidth(3.0)
    GL11.glDisable(3553)
    GL11.glDisable(2929)
    GL11.glDepthMask(false)
    if (trapped) GL11.glColor4f(0.8313725, 0.427451, 0.0235294, 1.0)
    if (!trapped) GL11.glColor4f(0.1764706, 0.49019608, 0.98039216, 1.0)
    tessellator = net.minecraft.client.renderer.Tessellator.func_178181_a()
    worldrenderer = tessellator.func_178180_c()
    worldrenderer.func_178969_c(chest.getX() - Player.getRenderX(), chest.getY() - Player.getRenderY(), chest.getZ() - Player.getRenderZ())
    Minecraft.field_71438_f.func_181561_a(new net.minecraft.util.AxisAlignedBB(0.062, 0, 0.062, 0.938, 0.875, 0.938))
    GL11.glColor4f(1, 1, 1, 1)
    GL11.glEnable(3553)
    GL11.glEnable(2929)
    GL11.glDepthMask(true)
    GL11.glDisable(3042)
    worldrenderer.func_178969_c(0, 0, 0)
}

function boxESP(entity, pt) {
    x = entity.getLastX() + (entity.getRenderX() - entity.getLastX()) * pt - entity.getRenderX()
    y = entity.getLastY() + (entity.getRenderY() - entity.getLastY()) * pt - entity.getRenderY()
    z = entity.getLastZ() + (entity.getRenderZ() - entity.getLastZ()) * pt - entity.getRenderZ()
    entityBox = entity.getEntity().func_174813_aQ().func_72314_b(0.4, 1, 0.4)
    boundBox = net.minecraft.util.AxisAlignedBB.func_178781_a(entityBox.field_72340_a + x - entity.getX(), entityBox.field_72338_b + y - entity.getY(), entityBox.field_72339_c + z - entity.getZ(), entityBox.field_72336_d + x - entity.getRenderX(), entityBox.field_72337_e + y - entity.getY(), entityBox.field_72334_f + z - entity.getZ())
    GlStateManager.func_179147_l()
    GlStateManager.func_179097_i()
    GlStateManager.func_179140_f()
    GlStateManager.func_179120_a(770, 771, 1, 0)
    GlStateManager.func_179090_x()
    tessellator = net.minecraft.client.renderer.Tessellator.func_178181_a()
    worldrenderer = tessellator.func_178180_c()
    GlStateManager.func_179131_c(38 / 255, 134 / 255, 106 / 255, 0.3)
    worldrenderer.func_178969_c(entity.getRenderX() - Player.getX(), entity.getRenderY() - Player.getY() - 1, entity.getRenderZ() - Player.getZ())
    worldrenderer.func_181668_a(7, net.minecraft.client.renderer.vertex.DefaultVertexFormats.field_181705_e)
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72338_b, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72338_b, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72338_b, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72338_b, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72337_e, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72337_e, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72337_e, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72337_e, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72338_b, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72337_e, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72337_e, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72338_b, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72338_b, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72337_e, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72337_e, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72338_b, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72337_e, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72337_e, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72338_b, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72338_b, boundBox.field_72339_c).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72338_b, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72338_b, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72336_d, boundBox.field_72337_e, boundBox.field_72334_f).func_181675_d()
    worldrenderer.func_181662_b(boundBox.field_72340_a, boundBox.field_72337_e, boundBox.field_72334_f).func_181675_d()
    tessellator.func_78381_a()
    GlStateManager.func_179131_c(38 / 255, 134 / 255, 106 / 255, 0.5)
    Minecraft.field_71438_f.func_181561_a(boundBox)
    worldrenderer.func_178969_c(0, 0, 0)
    GlStateManager.func_179098_w()
    GlStateManager.func_179126_j()
    GlStateManager.func_179084_k()
    GlStateManager.func_179131_c(1.0, 1.0, 1.0, 1.0)
}

/*
const EXTFramebufferObject = Java.type("org.lwjgl.opengl.EXTFramebufferObject")
const OpenGlHelper = Java.type("net.minecraft.client.renderer.OpenGlHelper")

const OutlineEvent = new JavaAdapter(event.getEvent(), {
    getModelBase() {
        return this.modelBase
    }, getP_77036_2_() {
        return this.P_77036_2_
    }, getP_77036_3_() {
        return this.P_77036_3_
    }, getP_77036_4_() {
        return this.P_77036_4_
    }, getP_77036_5_() {
        return this.P_77036_5_
    }, getP_77036_6_() {
        return this.P_77036_6_
    }, getScaleFactor() {
        return this.scaleFactor
    }
})

function outlineESP(entity) {
    fancyGraphics = Minecraft.field_71474_y.field_74347_j
    gamma = Minecraft.field_71474_y.field_74333_Y
    Minecraft.field_71474_y.field_74347_j = false
    Minecraft.field_71474_y.field_74333_Y = 100000
    GL11.glPushMatrix()
    GL11.glPushAttrib(1048575)
    checkSetupFBO()
    GL11.glColor4f(color.getRed() / 255.0, color.getGreen() / 255.0, color.getBlue() / 255.0, color.getAlpha() / 255.0)
    renderOne()
    render(entity, event)
    renderTwo()
    render(entity, event)
    renderThree()
    render(entity, event)
    renderFour()
    render(entity, event)
    GL11.glPopAttrib()
    GL11.glPopMatrix()
    Minecraft.field_71474_y.field_74347_j = fancyGraphics
    Minecraft.field_71474_y.field_74333_Y = gamma
}
    
function render(entity, event) {event.getModelBase().func_78088_a(entity.getEntity(), event.getP_77036_2_(), event.getP_77036_3_(), event.getP_77036_4_(), event.getP_77036_5_(), event.getP_77036_6_(), event.getScaleFactor())}
    
function renderOne() {
    GL11.glDisable(3008)
    GL11.glDisable(3553)
    GL11.glDisable(2896)
    GL11.glEnable(3042)
    GL11.glBlendFunc(770, 771)
    GL11.glLineWidth(1)
    GL11.glEnable(2848)
    GL11.glEnable(2960)
    GL11.glClear(1024)
    GL11.glClearStencil(15)
    GL11.glStencilFunc(512, 1, 15)
    GL11.glStencilOp(7681, 7681, 7681)
    GL11.glPolygonMode(1032, 6913)
}

function renderTwo() {
    GL11.glStencilFunc(512, 0, 15)
    GL11.glStencilOp(7681, 7681, 7681)
    GL11.glPolygonMode(1032, 6914)
}

function renderThree() {
    GL11.glStencilFunc(514, 1, 15)
    GL11.glStencilOp(7680, 7680, 7680)
    GL11.glPolygonMode(1032, 6913)
}

function renderFour() {
    GL11.glDepthMask(false)
    GL11.glDisable(2929)
    GL11.glEnable(10754)
    GL11.glPolygonOffset(1.0, -2000000.0)
    OpenGlHelper.func_77475_a(OpenGlHelper.field_77476_b, 240.0, 240.0)
}

function checkSetupFBO() {
    fbo = Minecraft.func_147110_a()
    if (fbo != null && fbo.field_147624_h > -1) {
        setupFBO(fbo)
        fbo.field_147624_h = -1
    } 
}

function setupFBO(fbo) {
    EXTFramebufferObject.glDeleteRenderbuffersEXT(fbo.field_147624_h)
    stencilDepthBufferID = EXTFramebufferObject.glGenRenderbuffersEXT()
    EXTFramebufferObject.glBindRenderbufferEXT(36161, stencilDepthBufferID)
    EXTFramebufferObject.glRenderbufferStorageEXT(36161, 34041, Minecraft.field_71443_c, Minecraft.field_71440_d)
    EXTFramebufferObject.glFramebufferRenderbufferEXT(36160, 36128, 36161, stencilDepthBufferID)
    EXTFramebufferObject.glFramebufferRenderbufferEXT(36160, 36096, 36161, stencilDepthBufferID)
}
*/
export { boxESP, chestOutline, setColor, drawLine }