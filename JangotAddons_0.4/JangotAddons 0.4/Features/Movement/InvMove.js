import { Alert } from "../../Utils/alert"

let invmove = false
const InvMoveBind = new KeyBind("Inventory Move", Keyboard.KEY_NONE, "JangotAddons")

register("tick", () => {
    if (InvMoveBind.isPressed()) {
        if (invmove) {
            Alert("Inventory Move Disabled", 1)
            invmove = false
        } else {
            Alert("Inventory Move Enabled", 1)
            invmove = true
        }
    }
    if (invmove) {
        let Forward = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w)
        let Backward = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y)
        let Left = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x)
        let Right = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z)
        let Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A)
        let Sneak = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)
        let ForwardKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w).getKeyCode()
        let BackwardKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74368_y).getKeyCode()
        let LeftKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74370_x).getKeyCode()
        let RightKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74366_z).getKeyCode()
        let JumpKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A).getKeyCode()
        let SneakKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E).getKeyCode()
        if (Client.isInGui() && !Client.isInChat()) {
            if (Keyboard.isKeyDown(ForwardKey)) {
                Forward.setState(true)
            } else {
                Forward.setState(false)
            }
            if (Keyboard.isKeyDown(LeftKey)) {
                Left.setState(true)
            } else {
                Left.setState(false)
            }
            if (Keyboard.isKeyDown(BackwardKey)) {
                Backward.setState(true)
            } else {
                Backward.setState(false)
            }
            if (Keyboard.isKeyDown(RightKey)) {
                Right.setState(true)
            } else {
                Right.setState(false)
            }
            if (Keyboard.isKeyDown(JumpKey)) {
                Jump.setState(true)
            } else {
                Jump.setState(false)
            }
            if (Keyboard.isKeyDown(SneakKey)) {
                Sneak.setState(true)
            } else {
                Sneak.setState(false)
            }
        }
    }
})