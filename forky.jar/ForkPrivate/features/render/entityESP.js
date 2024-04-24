import { data } from "../../settings/settings"
import { boxESP } from "../../utils/renderUtils"

function entityESP(entity, pt) {
    if (data.features["Render"]["Show Hidden Mobs"].toggle && entity.getEntity().func_82150_aj()) {
        if (entity.getEntity() instanceof net.minecraft.entity.monster.EntityEnderman || entity.getName().includes("Shadow Assassin") && !(entity.getEntity() instanceof net.minecraft.entity.item.EntityArmorStand)) entity.getEntity().func_82142_c(false)
    } if (data.features["Render"]["Starred Mob ESP"].toggle && (entity.getEntity() instanceof net.minecraft.entity.item.EntityArmorStand) && (entity.getName().includes("✯") || entity.getName().includes("Shadow Assassin") || entity.getName().includes("Lost Adventurer") || entity.getName().includes("Diamond Guy"))) {
        boxESP(entity, pt)
    } else if (data.features["Render"]["Bat ESP"].toggle && entity.getEntity() instanceof net.minecraft.entity.passive.EntityBat && !entity.getEntity().func_82150_aj()) {
        boxESP(entity, pt)
    }
}

export { entityESP }