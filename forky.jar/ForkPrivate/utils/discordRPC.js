import { data } from "../settings/settings"

// hi this is stolen from IllegalMap since old way was breaking a ton: https://github.com/UnclaimedBloom6/IllegalMap
const DiscordRPC = Java.type("net.arikia.dev.drpc.DiscordRPC")
const DiscordEventHandlers = Java.type("net.arikia.dev.drpc.DiscordEventHandlers")
const DiscordRichPresence = Java.type("net.arikia.dev.drpc.DiscordRichPresence")

class Discord {
    constructor() {
        this.initialize()
        this.reset()

        register("gameUnload", () => { DiscordRPC.discordShutdown() })

        register("step", () => {
            if (!data.features["Other"]["Discord Presence"].toggle) return this.reset()
            this.details = "Playing Fork Private"
            this.state = "Enjoying Singeplayer 1.8.9"
            if (!this.startTimeStamp) this.startTimeStamp = Date.now()
            this.bigImage = "icon"
            this.bigImageText = "forkdev.xyz"
            this.update()
        }).setDelay(1)

        register("worldLoad", () => this.reset())
    }
    reset() {
        DiscordRPC.discordClearPresence()
        this.state = null
        this.details = null
        this.startTimeStamp = null
        this.endTimeStamp = null
        this.bigImage = null
        this.bigImageText = null
        this.smallImage = null
    }
    initialize() {
        const handler = new DiscordEventHandlers.Builder().build()
        DiscordRPC.discordInitialize("910217064692740126", handler, true)
    }
    update() {
        let presence = new DiscordRichPresence.Builder(this.state)
        if (this.details) presence.setDetails(this.details)
        if (this.startTimeStamp) presence.setStartTimestamps(this.startTimeStamp)
        if (this.endTimeStamp) presence.setEndTimestamp(this.endTimeStamp)
        if (this.bigImage) presence.setBigImage(this.bigImage, this.bigImageText)
        if (this.smallImage) presence.setSmallImage(this.smallImage)
        DiscordRPC.discordUpdatePresence(presence.build())
    }

    shutDown() {
        DiscordRPC.discordShutdown()
    }

    setState(state) { this.state = state }
    setDetails(details) { this.details = details }
    setStart(timestamp) { this.startTimeStamp = timestamp }
    setEnd(timestamp) { this.endTimeStamp = timestamp }
    setBigImage(image) { this.bigImage = image }
    setBigImageText(text) { this.bigImageText = text }
    setSmallImage(image) { this.smallImage = image }
}
export default new Discord()