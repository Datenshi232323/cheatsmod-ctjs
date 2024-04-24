function Alert(Alert, TimeUp) {
    Java.type("gg.essential.api.EssentialAPI").getNotifications().push(
        "§bJangotAddons§r", Alert, TimeUp
    )
}

export { Alert }