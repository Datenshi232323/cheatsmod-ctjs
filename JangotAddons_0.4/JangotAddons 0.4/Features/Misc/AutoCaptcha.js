register("tick", () => {
    let inventoryName = Player.getContainer().getName()
    if (ChatLib.removeFormatting(inventoryName).toString().includes("click"))
        {
            Player.getContainer().getItems().forEach((item, index) => {
                if (ChatLib.removeFormatting(item?.getName()) === ("Please click this!")||ChatLib.removeFormatting(item?.getName()) === ("Please do click this!")||ChatLib.removeFormatting(item?.getName()) === ("Click this!")||ChatLib.removeFormatting(item?.getName()) === ("Please click!")) {
                    if(index < 25) {
                 let windowId = Player.getPlayer().field_71070_bA.field_75152_c
                     if (windowId <= Player.getPlayer().field_71070_bA.field_75152_c) windowId = Player.getPlayer().field_71070_bA.field_75152_c
                     if (Client.currentGui.get() == null) return
                     Client.getMinecraft().field_71442_b.func_78753_a(windowId, index, 2, 3, Player.getPlayer())
                }
            }
            })
        }
    })
//InvadedLands AutoCaptcha