import { Minecraft } from "../settings/settings"
const EnumPlayerModelParts = Java.type("net.minecraft.entity.player.EnumPlayerModelParts")
const LayerRenderer = Java.type("net.minecraft.client.renderer.entity.layers.LayerRenderer")
const MathHelper = Java.type("net.minecraft.util.MathHelper")
let players = []
let capes

function renderCape(player) {
    let hashedPlayer = org.apache.commons.codec.digest.DigestUtils.sha256Hex(player.getUUID())
    Object.keys(capes).forEach(key => {
        if (key != hashedPlayer) return
        delete Object.assign(capes, {[player.getName()]: capes[key] })[key]
        players.push(player.getName())
    })
    Minecraft.field_71474_y.func_178878_a(EnumPlayerModelParts.CAPE, true)
    Minecraft.func_175598_ae().getSkinMap().values().forEach(render => { render.func_177094_a(CapeLayer(render))})
}

function grabNewCapes() {
    capes = JSON.parse(FileLib.getUrlContent("https://forkdev.xyz/cosmetics/capes.json", "Mozilla/5.0"))
    Object.keys(capes).forEach(key => {
        const resourceLocation = new net.minecraft.util.ResourceLocation("ForkPrivate" + key + ".png")
        Minecraft.func_110434_K().func_110579_a(resourceLocation, new net.minecraft.client.renderer.ThreadDownloadImageData(null, capes[key], null, null))
        capes[key] = resourceLocation
    })
}

function CapeLayer(playerRendererIn) {
    let layerRenderer = new JavaAdapter(LayerRenderer, {
        init: (playerRendererIn) => {
            this.playerRenderer = playerRendererIn
        },

        func_177141_a: (entity, limbSwing, limbSwingAmount, partialTicks, ageInTicks, netHeadYaw, headPitch, scale) => {
            let entityName = new Entity(entity).getName()
            if (!entity.func_82150_aj() && entity.func_175148_a(EnumPlayerModelParts.CAPE) && players.includes(entityName)) {
                GlStateManager.func_179131_c(1.0, 1.0, 1.0, 1.0)
                try {this.playerRenderer.func_110776_a(capes[entityName]) } catch (e) {}
                GlStateManager.func_179094_E()
                GlStateManager.func_179109_b(0.0, entity.func_70093_af() ? 0.09 : 0, entity.func_70093_af() ? 0.1 : 0.14)
                let d0 = entity.field_71091_bM + (entity.field_71094_bP - entity.field_71091_bM) * partialTicks - (entity.field_70169_q + (entity.field_70165_t - entity.field_70169_q) * partialTicks)
                let d1 = entity.field_71096_bN + (entity.field_71095_bQ - entity.field_71096_bN) * partialTicks - (entity.field_70167_r + (entity.field_70163_u - entity.field_70167_r) * partialTicks)
                let d2 = entity.field_71097_bO + (entity.field_71085_bR - entity.field_71097_bO) * partialTicks - (entity.field_70166_s + (entity.field_70161_v - entity.field_70166_s) * partialTicks)
                let f = entity.field_70760_ar + (entity.field_70761_aq - entity.field_70760_ar) * partialTicks
                let d3 = MathHelper.func_76126_a(f * 0.017453292)
                let d4 = (-MathHelper.func_76134_b(f * 0.017453292))
                let f1 = d1 * 10.0
                f1 = MathHelper.func_76131_a(f1, 3, 32.0)
                let f2 = (d0 * d3 + d2 * d4) * 100.0
                let f3 = (d0 * d4 - d2 * d3) * 100.0
                if (f2 < 0.0) f2 = 0.0
                let f4 = entity.field_71107_bF + (entity.field_71109_bG - entity.field_71107_bF) * partialTicks
                f1 += MathHelper.func_76126_a((entity.field_70141_P + (entity.field_70140_Q - entity.field_70141_P) * partialTicks) * 6.0) * 32.0 * f4
                if (entity.func_70093_af()) f1 += 20.0
                GlStateManager.func_179114_b(5.0 + f2 / 2.0 + f1, 1.0, 0.0, 0.0)
                GlStateManager.func_179114_b(f3 / 2.0, 0.0, 0.0, 1.0)
                GlStateManager.func_179114_b(-f3 / 2.0, 0.0, 1.0, 0.0)
                GlStateManager.func_179114_b(180.0, 0.0, 1.0, 0.0)
                this.playerRenderer.func_177087_b().func_178728_c(0.0625)
                GlStateManager.func_179121_F()
            }
        },

        func_177142_b: () => {
            return false
        }
    })
    layerRenderer.init(playerRendererIn)
    return layerRenderer
}

export { renderCape, grabNewCapes }