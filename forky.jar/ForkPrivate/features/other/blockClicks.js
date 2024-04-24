const blockedItems = ["Giant's Sword", "Gyrokinetic Wand"]
const animationItems = ["Rogue Sword", "Hyperion", "Scylla", "Astreaa", "Valkyrie", "Aspect of the End"]

function blockClicks(event) {
    blockedItems.forEach(item => {
        if (ChatLib.removeFormatting(Player.getHeldItem()?.getName())?.includes(item)) cancel(event)
    })
}

function blockAnimation(event) {
    animationItems.forEach(item => {
        if (ChatLib.removeFormatting(Player.getHeldItem()?.getName())?.includes(item)) {
            cancel(event)
            Client.sendPacket(new net.minecraft.network.play.client.C08PacketPlayerBlockPlacement(new net.minecraft.util.BlockPos(-1, -1, -1), 255, Player.getHeldItem().getItemStack(), 0, 0, 0))
        }
    })
}

export { blockClicks, blockAnimation }