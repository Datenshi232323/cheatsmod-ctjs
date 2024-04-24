import { data, allowedBlocks } from "../../settings/settings"

function findSecrets() {
    let secrets = []
    if (data.features["Render"]["Chest ESP"].toggle) {
        World.getAllTileEntitiesOfType(net.minecraft.tileentity.TileEntityChest).forEach((chest) => {
            secrets.push(chest)
        })
    } if (data.features["Dungeons"]["Ghost Hands"].toggle || data.features["Dungeons"]["Secret Aura"].toggle) { 
        for (let x = 0; x < 20; x++) {
            for (let z = 0; z < 20; z++) {
                for (let y = 0; y < 20; y++) {
                    let block = World.getBlockAt(Player.getX() + x - 10, Player.getY() + y - 10, Player.getZ() + z - 10)
                    if (allowedBlocks.includes(block?.getType()?.getRegistryName())) 
                    if (block?.getType()?.getRegistryName() != "minecraft:skull") secrets.push(block)
                    else if (World.getWorld().func_175625_s(new net.minecraft.util.BlockPos(block.getX(), block.getY(), block.getZ()))?.func_145904_a() == 3) {
                        if (World.getWorld().func_175625_s(new net.minecraft.util.BlockPos(block.getX(), block.getY(), block.getZ())).func_152108_a()?.getProperties()?.get("textures")?.[0]?.value
                        == "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzRkYjRhZGZhOWJmNDhmZjVkNDE3MDdhZTM0ZWE3OGJkMjM3MTY1OWZjZDhjZDg5MzQ3NDlhZjRjY2U5YiJ9fX0=") secrets.push(block)
                    }
                }
            }
        }
    }
    return secrets
}

export { findSecrets }