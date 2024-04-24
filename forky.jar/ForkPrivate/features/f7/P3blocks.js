const P3Blocks = [new net.minecraft.util.BlockPos(88, 167, 41), new net.minecraft.util.BlockPos(89, 167, 41), new net.minecraft.util.BlockPos(90, 167, 41), new net.minecraft.util.BlockPos(91, 166, 40), new net.minecraft.util.BlockPos(91, 166, 41), new net.minecraft.util.BlockPos(91, 167, 40), new net.minecraft.util.BlockPos(91, 167, 41), new net.minecraft.util.BlockPos(92, 166, 40), new net.minecraft.util.BlockPos(92, 166, 41), new net.minecraft.util.BlockPos(92, 167, 40), new net.minecraft.util.BlockPos(92, 167, 41), new net.minecraft.util.BlockPos(93, 166, 40), new net.minecraft.util.BlockPos(93, 166, 41), new net.minecraft.util.BlockPos(93, 167, 40), new net.minecraft.util.BlockPos(93, 167, 41), new net.minecraft.util.BlockPos(94, 166, 40), new net.minecraft.util.BlockPos(94, 166, 41), new net.minecraft.util.BlockPos(94, 167, 40), new net.minecraft.util.BlockPos(94, 167, 41), new net.minecraft.util.BlockPos(95, 166, 40), new net.minecraft.util.BlockPos(95, 166, 41), new net.minecraft.util.BlockPos(95, 167, 41), new net.minecraft.util.BlockPos(95, 167, 40)]

function ghostP3() {
    P3Blocks.forEach((P3Pos) => {
        World.getWorld().func_175656_a(P3Pos, net.minecraft.init.Blocks.field_150350_a.func_176223_P())
    })
}

export { ghostP3 }