import PogObject from "PogData"
var settings = new PogObject("JangotAddons", {
    Features: {
        "Cloak Disabler": {
            "Delay": 9000,
            toggle: false
        },
        "Enchantment Table QOL": {
            "Delay": 0,
            "BottleType": "Grand Experience Bottle",
            "Amount": 1,
            toggle: false
        }
    }
}, "./Settings/settings.json")

export { settings }