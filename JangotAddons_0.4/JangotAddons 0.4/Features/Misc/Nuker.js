import { Alert } from "../../Utils/alert"
let nuker = false
const nukerBind = new KeyBind("Nuker", Keyboard.KEY_NONE, "JangotAddons")
const BP = Java.type('net.minecraft.util.BlockPos')
const EnumFacing = Java.type('net.minecraft.util.EnumFacing')
const C07 = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging')
var PlayerX = Math.floor(Player.getX())
var PlayerY = Math.floor(Player.getY())
var PlayerZ = Math.floor(Player.getZ())
blocktomine = 0
rangetomine = 0
register("tick", () => {
    if (nukerBind.isPressed()) {
        if (!nuker) {
            Alert("Nuker Enabled", 1)
            nuker = true
        } else {
            Alert("Nuker Disabled", 1)
            nuker = false
        }
    }
})
register("tick", () => {
    if (nuker) {
        PlayerX = Math.floor(Player.getX())
        PlayerY = Math.floor(Player.getY())
        PlayerZ = Math.floor(Player.getZ())
        for (let x = PlayerX - rangetomine; x < PlayerX + 2 * rangetomine; x++) {
            for (let y = PlayerY - rangetomine; y < PlayerY + 2 * rangetomine; y++) {
                for (let z = PlayerZ - rangetomine; z < PlayerZ + 2 * rangetomine; z++) {
                    if (World.getBlockAt(x, y, z).toString().includes("minecraft:" + blocktomine) && !World.getBlockAt(x, y, z).toString().includes("minecraft:bedrock") && !World.getBlockAt(x, y, z).toString().includes("minecraft:air")) {
                        Client.sendPacket(new C07(C07.Action.START_DESTROY_BLOCK, new BP(x, y, z), EnumFacing.DOWN))
                        Client.sendPacket(new C07(C07.Action.STOP_DESTROY_BLOCK, new BP(x, y, z), EnumFacing.DOWN))
                    }
                }
            }
        }
    }
})
register("command", (blocktype, range) => {
    if (blocktype && range) {
        if (blocktype.length > 0 && range.length > 0) {
            if (isNaN(blocktype)) {
                blocktomine = blocktype
                Alert("Set block type to " + blocktype, 1)
            } else {
                Alert("Invalid Block Value!", 1)
            }
            if (!isNaN(range)) {
                if (range > 0 && range < 7) {
                    rangetomine = range
                    Alert("Set range to " + range, 1)
                } else {
                    Alert("Invalid Range!", 1)
                }
            }
        } else {
            Alert("Invalid Values!", 1)
        }
    }
}).setName("setNuker")