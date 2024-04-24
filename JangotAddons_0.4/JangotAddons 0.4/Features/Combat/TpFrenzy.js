import { Alert } from "../../Utils/alert"

tpfrenzy = false
entityList = []
tpList = []
const tpauraBind = new KeyBind("Tp Aura", Keyboard.KEY_NONE, "JangotAddons")

register("tick", () => {
    if (tpauraBind.isPressed()) {
        if (!tpfrenzy) {
            Alert("Tp Frenzy Enabled", 1)
            tpfrenzy = true
        } else {
            Alert("Tp Frenzy Disabled", 1)
            tpfrenzy = false
        }
    }
    if(tpfrenzy) {
        entityList = World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand)
        for(let i = 0; i < entityList.length; i++) {
            if(!tpList.includes(entityList[i])) {
                ChatLib.chat("a")
                tpList.push(entityList[i])
            }
        }
        if(tpList.length > 0) {
            Player.getPlayer().func_70107_b(tpList[0].x, tpList[0].y, tpList[0].z)
            tpList.slice(0,1)
        }
    }
})