import * as Elementa from "../../Elementa"
import { Color, data } from "./settings"

const gui = new Gui()
const window = new Elementa.Window()
const offColor = new Color(26 / 255, 25 / 255, 26 / 255, 0.8)
const onColor = new Color(38 / 255, 134 / 255, 106 / 255)
const dragBarColor = new Color(20 / 255, 20 / 255, 20 / 255)
const moduleColor = new Color(25 / 255, 25 / 255, 25 / 255, 0.8)
let boxes = []
let settingsList = []
let selected = null

function clickGUI() {
    gui.open()
}

let forkprivate = new Elementa.UIText("§zFork Private")
  .setX(new Elementa.CenterConstraint())
  .setY(new Elementa.AdditiveConstraint(new Elementa.CenterConstraint(), (-225).pixels()))
  .setWidth((200).pixels())
  .setHeight((25).pixels())
window.addChild(forkprivate)

Object.keys(data.features).forEach((key, index) => {
	let lengthNumber = Object.keys(data.features[key]).length

	const box = new Elementa.UIRoundedRectangle(5)
	.setColor(new Elementa.ConstantColorConstraint(offColor))
	.setWidth((100).pixels())
	.setHeight((data.newHeight[index]).pixels())
	.enableEffect(new Elementa.ScissorEffect())

    box.setX((data.Xbox[index]).pixels())
	box.setY((data.Ybox[index]).pixels())

	const dragBar = new Elementa.UIBlock()
	.setColor(new Elementa.ConstantColorConstraint(dragBarColor))
	.setX((0).pixels())
	.setY((0).pixels())
	.setWidth((100).pixels())
	.setHeight((25).pixels())
	.onMouseClick((clicked, event) => {
		selected = box
		if (event.mouseButton === 1) {
			const anim = box.makeAnimation()
			if (box.getHeight() !== 25) data.newHeight[boxes.indexOf(box)] = 25
			else if (box.getHeight() === 25) data.newHeight[boxes.indexOf(box)] = 25 * (lengthNumber + 1) + (lengthNumber * 1.4)
			if (data.newHeight[boxes.indexOf(box)] !== 0) {
				anim.setHeightAnimation(Elementa.Animations.LINEAR, 0.2, new Elementa.PixelConstraint(data.newHeight[boxes.indexOf(box)]))
				box.animateTo(anim)
				if (box.getWidth() != 100) {
					anim.setWidthAnimation(Elementa.Animations.LINEAR, 0.2, new Elementa.PixelConstraint(100))
					box.animateTo(anim)
				}
			}
		}
	})

	const title = new Elementa.UIText("§z" + key)
	.setX((2).pixels())
	.setY(new Elementa.CenterConstraint())

	dragBar.addChild(title)
	box.addChild(dragBar)

	const bottomBar = new Elementa.UIBlock()
	.setColor(new Elementa.ConstantColorConstraint(dragBarColor))
	.setX((0).pixels())
	.setY((206).pixels())
	.setWidth((100).pixels())
	.setHeight((2).pixels())

	box.addChild(bottomBar)

	Object.keys(data.features[key]).forEach((key2, index2) => {
		let lengthNumber2 = Object.keys(data.features[key][key2]).length - 1

		const label = new Elementa.UIText(key2)
		.setX((2).pixels())
		.setY(new Elementa.CenterConstraint())

		const settingsBar = new Elementa.UIBlock()
		.setColor(new Elementa.ConstantColorConstraint(data.features[key][key2].toggle ? onColor : moduleColor))
		.setX((0).pixels())
		.setY((26 + 26 * index2).pixels())
		.setWidth((100).pixels())
		.setHeight((25).pixels())
		.onMouseClick((clicked, event) => {
			if (event.mouseButton === 0) {
				if (key2 == "No Blindness" && Player.getPlayer().func_82165_m(15)) {
					ChatLib.chat("§zFork Private > §gYou currently have blindness! Wait until it is gone then try again!")
					return
				}
				data.features[key][key2].toggle = !data.features[key][key2].toggle
				settingsBar.setColor(new Elementa.ConstantColorConstraint(data.features[key][key2].toggle ? onColor: moduleColor))
			} if (event.mouseButton === 1) {
				if (lengthNumber2 < 1) return
				let settings = Object.keys(data.features[key][key2]).filter(key => key.toString() != "toggle")
				settingsList.filter(setting => !settings.includes(setting.getChildren()[0]?.getText())).forEach(setting => {
					if (setting.getLeft() != 200) setting.setX((200).pixels())
					else settingsList.forEach(setting => setting.setX((100).pixels()))
				})
				const anim = box.makeAnimation()
				anim.setWidthAnimation(Elementa.Animations.LINEAR, 0.2, new Elementa.PixelConstraint(box.getWidth() == 100 ? 200 : 100))
				box.animateTo(anim)
			}
		})

		settingsBar.addChild(label)
		box.addChild(settingsBar)

		Object.keys(data.features[key][key2]).filter(key => key != "toggle").forEach((key3, index3) => {
			const settingsButton = new Elementa.UIBlock()
			.setColor(new Elementa.ConstantColorConstraint(data.features[key][key2][key3] ? onColor : offColor))
			.setX((100).pixels())
			.setY((26 * index3).pixels())
			.setWidth((100).pixels())
			.setHeight((25).pixels())
			.onMouseClick((clicked, event) => {
				if (event.mouseButton === 0) {
					if (typeof data.features[key][key2][key3] == typeof true) {
						data.features[key][key2][key3] = !data.features[key][key2][key3]
						settingsButton.setColor(new Elementa.ConstantColorConstraint(data.features[key][key2][key3] ? onColor: offColor))
					} //else if (typeof data.features[key][key2][key3] == typeof "string") settingsText.grabWindowFocus()
				}
			})

			if (typeof data.features[key][key2][key3] == typeof true) {
				const settingsLabel = new Elementa.UIText(key3)
				.setX((2).pixels())
				.setY(new Elementa.CenterConstraint())
				settingsButton.addChild(settingsLabel)
			}

			settingsList.push(settingsButton)
			//if (settingsText) settingsButton.addChild(settingsText)
			box.addChild(settingsButton)
		})
	})
	boxes.push(box)
	window.addChild(box)
})

gui.registerDraw(() => {
	window.draw()
})

gui.registerKeyTyped((char, key) => {
	window.keyType(char, key)
})

register("clicked", (mx, my, btn, state) => {
	if (btn == 0) selected = null
	if (gui.isOpen() && state) {
		window.mouseClick(mx, my, btn)
	}
})

register("dragged", (dx, dy, x, y, button) => {
	let drag = false
	if (button === 0) boxes.forEach((box, index) => box.getChildren().forEach(child => {
		if ((box.getChildren()[0].isHovered() || !child.isHovered()) && box === selected && drag == false) {
			drag = true
			data.Xbox[index] = box.getLeft() + dx
			data.Ybox[index] = box.getTop() + dy
			box.setX((box.getLeft() + dx).pixels())
			box.setY((box.getTop() + dy).pixels())
		}
	}))
})

export { clickGUI }