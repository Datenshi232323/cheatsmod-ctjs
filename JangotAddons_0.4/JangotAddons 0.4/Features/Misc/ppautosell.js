register("chat", (event) => {
    let message = ChatLib.getChatMessage(event, true)
    if (message == "&r&5Your Inventory Is Full! &r&d&lUSE /SELLALL&r") {
        ChatLib.command("sellall")
    }
})