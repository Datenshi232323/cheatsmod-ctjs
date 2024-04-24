function vclip(distance) {
    if (!typeof parseFloat(distance) == "number") return
    ChatLib.chat("§zFork Private > §gClipping by: §3" + distance + " blocks")
    Player.getPlayer().func_70107_b(
        Math.floor(Player.getX()) + 0.5,
        Player.getY() + parseFloat(distance),
        Math.floor(Player.getZ()) + 0.5
    )
}

export { vclip }