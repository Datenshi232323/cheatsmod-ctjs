import { Minecraft, data } from "../../settings/settings"
import { mode } from "../../utils/mathUtils"

let inTerm = false
let correctPanes = []
let colorList = {
    "light gray": "silver",
    "light grey": "silver",
    "wool": "white wool",
    "ink": "black ink",
    "lapis": "blue lapis",
    "cocoa": "brown cocoa"
}
let colorCycle = [4, 13, 11, 14, 1]

function getCorrectPanes() {
    if (inTerm) return
    correctPanes = []
    let inventoryName = Player.getContainer().getName()
    if (inventoryName == "Correct all the panes!") {
        for (let index = 11; index < 34; index++) if (Player.getContainer().getStackInSlot(index)?.getMetadata() === 14) correctPanes.push(index)
    } else if (inventoryName == "Click in order!") {
        Player.getContainer().getItems().forEach((item, index) => {
            if (item?.getMetadata() === 14) correctPanes[parseInt(ChatLib.removeFormatting(item.getName())) - 1] = index
        })
    } else if (inventoryName.startsWith("What starts with: ")) {
        let letter = inventoryName.match(/What starts with: '(\w+)'?/)[1]
        Player.getContainer().getItems().forEach((item, index) => {
            if (ChatLib.removeFormatting(item?.getName()).startsWith(letter) && index < 44) correctPanes.push(index)
        })
    } else if (inventoryName.startsWith("Select all the ")) {
        let color = inventoryName.match(/Select all the (.+) items!/)[1].toLowerCase()
        Player.getContainer().getItems().forEach((item, index) => {
            let itemName = ChatLib.removeFormatting(item?.getName()).toLowerCase()
            Object.keys(colorList).forEach((key) => itemName = itemName.replace(key, colorList[key]))
            if (itemName.includes(color) && index < 44) correctPanes.push(index)
        })
    } else if (inventoryName == "Navigate the maze!") { 
        const getColour = (colour) => Array.from(Array(54).keys()).filter(slot => Player.getContainer().getStackInSlot(slot)?.getDamage() == colour)
        const adjacent = (slot1, slot2) => [slot1 % 9 == 0 ? -1 : slot1 - 1, slot1 % 9 == 8 ? -1 : slot1 + 1, slot1 + 9, slot1 - 9].filter(slot => slot >= 0).some(slot => slot == slot2)
        let unvisited = getColour(0)
        let previous = getColour(5)
        let red = getColour(14)
        while (!adjacent(previous, red)) {
            let nextStep = unvisited.filter(pane => adjacent(pane, previous) && !correctPanes.includes(pane))[0]
            previous = nextStep
            if (previous == null) break
            correctPanes.push(nextStep)
        }
    } else if (inventoryName == "Change all to same color!") {
        let optimal = mode(Player.getContainer().getItems().filter((item, index) => item?.getDamage() != 15 && index <= 33).map(pane => pane?.getDamage()))
        Player.getContainer().getItems().forEach((pane, index) => {
            if (pane?.getDamage() == 15 || !pane) return
            for (let i = 0; i < Math.abs(colorCycle.indexOf(optimal) - colorCycle.indexOf(pane.getDamage())); i++) correctPanes.push(index)
        })
    } else if (inventoryName == "Click the button on time!") {
        inTerm = true
        let stage = 9
        new Thread(() => {
            while (inTerm) {
                let slot = onTimeSolver() ?? 0
                if (Player.getContainer().getStackInSlot(slot + stage)?.getMetadata() == 5) {
                    Minecraft.field_71442_b.func_78753_a(Player.getPlayer().field_71070_bA.field_75152_c, (7 + stage), 2, 3, Player.getPlayer())
                    Thread.sleep(750)
                    stage += 9
                }
                if (stage > 36) {
                    inTerm = false
                }
            }
            data.metrics.terminals++
        }).start()
    }
    if (correctPanes.length) {
	    inTerm = true
        data.metrics.terminals++
        clickTerms()
        //ChatLib.chat("§2Correct:")
        //correctPanes.forEach((pane) => ChatLib.chat("§6" + pane))
    }
}

function onTimeSolver() {
    Player.getContainer().getItems().forEach((item, index) => {
        if (index > 8) return
        if (item?.getMetadata() == 10) slot = index
    })
    return slot
}

function clickTerms() {
    /* REGULAR
    if (Player.getContainer().getStackInSlot(correctPanes[0])?.getDamage() == 5) correctPanes.shift()
    if (!correctPanes.length) {inTerm = false; return}
    new Thread(() => {
        working = true
        Minecraft.field_71442_b.func_78753_a(Player.getPlayer().field_71070_bA.field_75152_c, correctPanes[0], 0, 0, Player.getPlayer())        
        Thread.sleep(randomDelay())
        working = false
    }).start()
    */
   // PINGLESS
   new Thread(() => {
        let windowId = Player.getPlayer().field_71070_bA.field_75152_c
        correctPanes.forEach((slot) => {
            if (windowId <= Player.getPlayer().field_71070_bA.field_75152_c) windowId = Player.getPlayer().field_71070_bA.field_75152_c
            if (Client.currentGui.get() == null) return
            Minecraft.field_71442_b.func_78753_a(windowId, slot, 2, 3, Player.getPlayer())
            Thread.sleep(randomDelay())
            windowId++
        })
        inTerm = false
    }).start()
}

function exitTerm() {
    inTerm = false
}

function randomDelay() {
    return Math.floor(Math.random() * (15) + data.features["F7"]["Auto Terminals"]["Delay"]) 
}

export { getCorrectPanes, exitTerm }