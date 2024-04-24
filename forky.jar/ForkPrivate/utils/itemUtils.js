function getID(item) {
    if (item) {
        rawNBT = item.getItemStack().func_179543_a("ExtraAttributes", false)
        if (rawNBT != null && rawNBT.func_74764_b("id")) return rawNBT.func_74779_i("id") 
    }
}