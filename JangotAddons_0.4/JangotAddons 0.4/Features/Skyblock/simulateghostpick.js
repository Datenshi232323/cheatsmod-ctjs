import { Alert } from "../../Utils/alert"
ghostpick = false
const simulateGhostPick = new KeyBind("Ghost Pick", Keyboard.KEY_NONE, "JangotAddons")
register("tick", () => {
    if (simulateGhostPick.isPressed()) {
        if (ghostpick) {
            Alert("Ghostpick Disabled", 1)
            ghostpick = false
        } else {
            Alert("Ghostpick Enabled", 1)
            ghostpick = true
        }
    }
})
register("packetsent", (packet, event) => {
    if (packet.class.getSimpleName() == "C07PacketPlayerDigging" && ghostpick) {
        cancel(event)
    }
})