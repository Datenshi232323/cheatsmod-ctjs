import { Minecraft, rightBind } from "../../settings/settings"
import { facePos } from "../../utils/rotation"
const leftBind = new KeyBind(Minecraft.field_71474_y.field_74312_F)
let points = []
let blocks = []
let toggled = false

register("worldUnload", () => {
    toggled = false
})

function mithrilMacro() {
    toggled = !toggled
    if (toggled) run()
}

function run() {
    new Thread(() => {
        while (toggled) {
            findBlocks()
            facePos(points[0])
            Thread.sleep(350)
            leftBind.setState(true)
            let beginClick = java.lang.System.currentTimeMillis()
            try { while (Player.lookingAt()?.getType()?.getRegistryName() != "minecraft:bedrock" && java.lang.System.currentTimeMillis() - beginClick <= 4000 && toggled) Thread.sleep(1) } catch (e) { leftBind.setState(false) }
            leftBind.setState(false)
        }
    }).start()
}

function findBlocks() {
    points = []
    blocks = []
    for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 12; y++) {
            for (let z = 0; z < 12; z++) {
                let block = World.getBlockAt(Player.getX() + x - 6, Player.getY() + y - 6, Player.getZ() + z - 6) ?? null
                if (block?.getType()?.getRegistryName() == "minecraft:wool" && block?.getMetadata() == 3) {
                    let pos = new net.minecraft.util.BlockPos(block.getX(), block.getY(), block.getZ())
                    getPointsOnBlock(pos).forEach(point => {
                        const rayTraceResult = World.getWorld().func_72933_a(Player.getPlayer().func_174824_e(1), point)
                        if (rayTraceResult && rayTraceResult.field_72313_a == net.minecraft.util.MovingObjectPosition.MovingObjectType.BLOCK && !blocks.includes(block) && rayTraceResult.func_178782_a().equals(pos) && point.func_72438_d(Player.getPlayer().func_174824_e(1)) < Minecraft.field_71442_b.func_78757_d()) {
                            points.push(point)
                            blocks.push(block)
                        }
                    })
                }
            }
        }
    }
}

const sides = [[0.5, 0.01, 0.5 ], [0.5, 0.99, 0.5], [0.01, 0.5, 0.5], [0.99, 0.5, 0.5], [0.5, 0.5, 0.01], [0.5, 0.5, 0.99]]
function getPointsOnBlock(bp) {
    let returnArray = []
    sides.forEach(side => {
        for (i = 0; i < 20; i++) {
            x = side[0]
            y = side[1]
            z = side[2]
            if (x == 0.5)
            x = Math.random() * (0.8) + 0.1
            if (y == 0.5)
            y = Math.random() * (0.8) + 0.1
            if (z == 0.5)
            z = Math.random() * (0.8) + 0.1
            returnArray.push(new net.minecraft.util.Vec3(bp).func_72441_c(x, y, z))
        } 
    })
    return returnArray
}

export { mithrilMacro }