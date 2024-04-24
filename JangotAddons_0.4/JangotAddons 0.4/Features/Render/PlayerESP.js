import RenderLib from "RenderLib"
import { Alert } from "../../Utils/alert"

let esp = false
const espBind = new KeyBind("Player ESP", Keyboard.KEY_NONE, "JangotAddons")
register("tick", () => {
    if (espBind.isPressed()) {
        if (!esp) {
            Alert("Player ESP Enabled", 1)
            esp = true
        } else {
            Alert("Player ESP Disabled", 1)
            esp = false
        }
    }
})
register("renderWorld", (pticks) => {
    if (esp) {
        let players = World.getAllPlayers()
        for (let i = 0; i < players.length; i++) {
            if (players[i].getName() != Player.getName() && checkPlayer(players[i])) {
                renderPlayerEspBox(players[i], pticks)
            }
        }
    }
})

function renderPlayerEspBox(player, pticks) {
    if (pticks != undefined && World.isLoaded() && isInRange(player, 30)) {
        let lastX = player.getLastX()
        let lastY = player.getLastY()
        let lastZ = player.getLastZ()
        let currentX = player.getX()
        let currentY = player.getY()
        let currentZ = player.getZ()
        RenderLib.drawEspBox(lastX + (currentX - lastX) * pticks, lastY + (currentY - lastY) * pticks, lastZ + (currentZ - lastZ) * pticks, player.getWidth(), player.getHeight(), 0, 1, 1, 1, true)
    }
}

function checkPlayer(player) {
    if (World.getPlayerByName(player.name).getPing() == -1.0) {
        return false
    }
    else {
        return true
    }
}
function isInRange(player, range) {
    if (Player.getX() + range > player.getX() && Player.getX() - range < player.getX() && Player.getZ() + range > player.getZ() && Player.getZ() - range < player.getZ()) {
        return true
    }
    else {
        return false
    }
}