import { Alert } from "../../Utils/alert"
let nuker = false
const nukerBind = new KeyBind("Nuker 2", Keyboard.KEY_NONE, "JangotAddons")
const BP = Java.type('net.minecraft.util.BlockPos')
const EnumFacing = Java.type('net.minecraft.util.EnumFacing')
const C07 = Java.type('net.minecraft.network.play.client.C07PacketPlayerDigging')
var PlayerX = Math.floor(Player.getX())
var PlayerY = Math.floor(Player.getY())
var PlayerZ = Math.floor(Player.getZ())
blocktomine = 0
rangetomine = 0
let BlocksToMine = []
let BlocksMined = []
let CheckIfBlockChanged = []
register("tick", () => {
    if (nukerBind.isPressed()) {
        if (!nuker) {
            Alert("Nuker Enabled", 1)
            nuker = true
        } else {
            Alert("Nuker Disabled", 1)
            nuker = false
            BlocksToMine = []
            BlocksMined = []
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
                        if (!BlocksMined.toString().includes(World.getBlockAt(x, y, z).toString())) {
                            BlocksToMine.push(World.getBlockAt(x, y, z))
                            return
                        }
                    }
                }
            }
        }
    }
})
register("tick", (elapsed) => {
    if (BlocksToMine.length > 0) {
        if (!BlocksMined.toString().includes(World.getBlockAt(BlocksToMine[0].x, BlocksToMine[0].y, BlocksToMine[0].z))) {
            Client.sendPacket(new C07(C07.Action.START_DESTROY_BLOCK, new BP(BlocksToMine[0].x, BlocksToMine[0].y, BlocksToMine[0].z), EnumFacing.DOWN))
            Client.sendPacket(new C07(C07.Action.STOP_DESTROY_BLOCK, new BP(BlocksToMine[0].x, BlocksToMine[0].y, BlocksToMine[0].z), EnumFacing.DOWN))
            BlocksMined.push(BlocksToMine[0])
        }
        BlocksToMine.splice(0, 1)
    }

})
register("tick", () => {
    ChatLib.chat(BlocksMined.length)
})
register("packetReceived", (packet, event) => {
    if (packet.class.getSimpleName() == "S23PacketBlockChange" && BlocksMined.toString().includes(packet.func_179827_b().toString())) {
        if (BlocksMined.toString().includes(packet.func_179827_b().toString())) {
            BlocksMined.forEach(i => {
                if (BlocksMined[i].toString().includes(packet.func_179827_b().toString())) {
                    BlocksMined.splice(i, 1)
                }
            })
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
}).setName("setNuker2")