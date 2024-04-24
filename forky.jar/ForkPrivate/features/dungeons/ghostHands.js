import { Minecraft, allowedBlocks, data } from "../../settings/settings"

function ghostHands(clickedBlocks, event) {
    let lookvec = Player.getPlayer().func_70040_Z() 
    let vecX = lookvec.field_72450_a
    let vecY = lookvec.field_72448_b
    let vecZ = lookvec.field_72449_c
    
    let pX = Player.getX()
    let pY = Player.getY() + Player.getPlayer().func_70047_e()
    let pZ = Player.getZ()
        
    for (i = 0; i <= data.features["Dungeons"]["Secret Aura"]["Reach"] * 10; i++) {
        let tX = pX + (vecX * (0.1 * i))
        let tY = pY + (vecY * (0.1 * i))
        let tZ = pZ + (vecZ * (0.1 * i))
        
        let block = World.getBlockAt(Math.floor(tX), Math.floor(tY), Math.floor(tZ))
        if (allowedBlocks.includes(block.getType().getRegistryName()) && !clickedBlocks.toString().includes(block)) {
            clickedBlocks.push(block)
            if (block.getType().getRegistryName() == "minecraft:chest" || block.getType().getRegistryName() == "minecraft:trapped_chest") interact(block.getX(), block.getY(), block.getZ(), event, false)
            else if (block.getType().getRegistryName() == "minecraft:lever") {
                interact(block.getX(), block.getY(), block.getZ(), event, true)
            } else if (World.getWorld().func_175625_s(new net.minecraft.util.BlockPos(Math.floor(tX), Math.floor(tY), Math.floor(tZ)))?.func_145904_a() == 3 && i < 50) {
                if (World.getWorld().func_175625_s(new net.minecraft.util.BlockPos(Math.floor(tX), Math.floor(tY), Math.floor(tZ))).func_152108_a()?.getProperties()?.get("textures")?.[0]?.value
                == "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzRkYjRhZGZhOWJmNDhmZjVkNDE3MDdhZTM0ZWE3OGJkMjM3MTY1OWZjZDhjZDg5MzQ3NDlhZjRjY2U5YiJ9fX0=") interact(block.getX(), block.getY(), block.getZ(), event, false)
            } 
        }
    }
}

function interact(x, y, z, event, lever) {
    if (y >= 133 && y <= 136) return
    if (event) cancel(event)
    let blockPos = new net.minecraft.util.BlockPos(x, y, z)
    Minecraft.field_71442_b.func_78765_e()
    if (Minecraft.field_71442_b.func_178890_a(
        Player.getPlayer(),
        World.getWorld(),
        Player.getHeldItem()?.itemStack ?? null,
        blockPos,
        net.minecraft.util.EnumFacing.func_176733_a(Player.getYaw()),
        new net.minecraft.util.Vec3(blockPos).func_72441_c(0, 0, 0)
    )) Player.getPlayer().func_71038_i()
    Minecraft.field_71442_b.func_78765_e()
    if (lever) interact(x, y, z, false)
    if (!lever) data.metrics.secretaura++
}

export { ghostHands }