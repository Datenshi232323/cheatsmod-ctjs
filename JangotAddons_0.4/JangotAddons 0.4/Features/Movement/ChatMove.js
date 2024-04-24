import { Alert } from "../../Utils/alert"

let chatmove = false
let LastChat
const ChatMoveBind = new KeyBind("Chat Move", Keyboard.KEY_NONE, "JangotAddons")

register("tick", () => {
    if (ChatMoveBind.isPressed()) {
        if (chatmove) {
            Alert("Chat Move Disabled", 1)
            chatmove = false
        } else {
            Alert("Chat Move Enabled", 1)
            chatmove = true
        }
    }
    if (chatmove) {
        let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w)
        let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y)
        let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x)
        let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z)
        if (Client.isInChat()) {
            if (Keyboard.isKeyDown(Keyboard.KEY_NUMPAD8)) {
                Forward.setState(true)
            } else {
                Forward.setState(false)
            }
            if (Keyboard.isKeyDown(Keyboard.KEY_NUMPAD4)) {
                Left.setState(true)
            } else {
                Left.setState(false)
            }
            if (Keyboard.isKeyDown(Keyboard.KEY_NUMPAD5)) {
                Backward.setState(true)
            } else {
                Backward.setState(false)
            }
            if (Keyboard.isKeyDown(Keyboard.KEY_NUMPAD6)) {
                Right.setState(true)
            } else {
                Right.setState(false)
            }
        }
    }
})