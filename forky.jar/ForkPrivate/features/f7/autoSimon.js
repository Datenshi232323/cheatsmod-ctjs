import { Minecraft, rightClick, working } from "../../settings/settings"

function autoSimon(click, pos) {
    if (click.toString() == "RIGHT_CLICK_BLOCK" && !working) {
        if (pos.getX() == 110 && pos.getY() >= 121 && pos.getY() <= 124 && pos.getZ() >= 92 && pos.getZ() <= 95) {
            for (i = 0; i < 4; i++) {
                working = true
                rightClick.invoke(Minecraft)
            }
            setTimeout(() => {working = false}, 500)
        }
    }
}

export { autoSimon }