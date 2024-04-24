const rightClick = Minecraft.getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)
let autoBatphone = [true, "rev", 5]
let options = ["Revenant Horror", "Tarantula Broodfather", "Sven Packmaster", "Voidgloom Seraph"]

register("chat", () => {
    itemMacro("Maddox Batphone")
}).setCriteria("NICE! SLAYER BOSS SLAIN!").setContains()

register("step", () => {
    try {
        if (autoBatphone[0]) {
            if (Player.getOpenedInventory().getContainer().func_85151_d().func_145748_c_().func_150260_c() == "Slayer") {
                switch (autoBatphone[1]) {           
// DO IT WITH NUMBERS AND ADDITION TO MAKE IT 10 TIMES BETTER!!!!!
                    case "rev":
                        Player.getOpenedInventory().click(10, false, "MIDDLE")
                    case "tara":
                        Player.getOpenedInventory().click(11, false, "MIDDLE")
                    case "sven":
                        Player.getOpenedInventory().click(12, false, "MIDDLE")
                    case "void":
                        Player.getOpenedInventory().click(13, false, "MIDDLE")
                }
            } else if (options.includes(Player.getOpenedInventory().getContainer().func_85151_d().func_145748_c_().func_150260_c())) {
                switch (autoBatphone[2]) {
                    case 1:
                        Player.getOpenedInventory().click(11, false, "MIDDLE")
                    case 2:
                        Player.getOpenedInventory().click(12, false, "MIDDLE")
                    case 3:
                        Player.getOpenedInventory().click(13, false, "MIDDLE")
                    case 4:
                        Player.getOpenedInventory().click(14, false, "MIDDLE")
                    case 5:
                        Player.getOpenedInventory().click(15, false, "MIDDLE")
                }
            } else if (Player.getOpenedInventory().getContainer().func_85151_d().func_145748_c_().func_150260_c().includes("Confirm")) {
                Player.getOpenedInventory().click(11, false, "MIDDLE")
            }
        }
    } catch (e) {}
}).setDelay(0.5)