import { Alert } from "../../Utils/alert"

Toolkit = Java.type("java.awt.Toolkit")
DataClipboard = Java.type("java.awt.datatransfer.Clipboard")
StringSelection = Java.type("java.awt.datatransfer.StringSelection")
Clipboard = Toolkit.getDefaultToolkit().getSystemClipboard()

register("chat", (event) => {
    cancel(event)
    let e = ChatLib.getChatMessage(event,true)
    ChatLib.chat(new Message(
        new TextComponent(e).setClick("run_command", "/copymessage " + ChatLib.removeFormatting(ChatLib.getChatMessage(event,false).toString()))
    ))
})
register("command", (...message) => {
    string = message.join(" ")
    Alert('Copied "' + string + '" to your clipboard!', 1)
    stringselection = new StringSelection(string)
    Clipboard.setContents(stringselection, null)
}).setName("copymessage")