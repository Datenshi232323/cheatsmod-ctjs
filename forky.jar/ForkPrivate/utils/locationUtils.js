function inSkyblock() {
    return ChatLib.removeFormatting(Scoreboard.getScoreboardTitle()).includes("SKYBLOCK")
}

// From IllegalMap :) https://github.com/UnclaimedBloom6/IllegalMap
function dungeonFloor(floor) {
    let scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) })
    for (let line of scoreboard) {
        let match = line.match(/ ⏣ The Catac.+ombs \((.+)\)/)
        if (match) {
            return parseInt(match[1].replace(/[^\d]/g, ""))
        }
    }
    return floor
}

export { inSkyblock, dungeonFloor }