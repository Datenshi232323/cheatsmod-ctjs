let catRender = { img: [], ranwidth: [], ranheight: [] }

const catpeopleimages = [
    new Image("catboy1.png", "https://i.imgur.com/GhRSZYl.png"),
    new Image("catboy2.png", "https://i.imgur.com/Dsyb66E.png"),
    new Image("catboy3.png", "https://i.imgur.com/1EebUvv.png"),
    new Image("catboy4.png", "https://i.imgur.com/MiATTVr.png"),
    new Image("catboy5.png", "https://i.imgur.com/qpZFmIe.png"),
    new Image("catboy6.png", "https://i.imgur.com/JFeyydO.png"),
    new Image("catgirl1.png", "https://i.imgur.com/hGJEqWs.png"),
    new Image("catgirl2.png", "https://i.imgur.com/zEjvcyX.png"),
    new Image("catgirl3.png", "https://i.imgur.com/S9cIM1h.png"),
    new Image("catgirl4.png", "https://i.imgur.com/by4hljL.png"),
    new Image("catgirl5.png", "https://i.imgur.com/BFSv5kB.png"),
    new Image("catgirl6.png", "https://i.imgur.com/lo3RwkE.png"),
    new Image("catgirl7.png", "https://i.imgur.com/lV4SWQm.png"),
    new Image("catgirl8.png", "https://i.imgur.com/Lw2gC6B.png")
]

const catGen = register("step", () => {
    catRender.img.push(catpeopleimages[Math.floor(Math.random() * catpeopleimages.length)])
    catRender.ranwidth.push(Math.random() * (Renderer.screen.getWidth() - 50) - 50)
    catRender.ranheight.push(Math.random() * (Renderer.screen.getHeight() - 50) - 50)
}).setDelay(3)

const catPeople = register("renderOverlay", () => {
    catGen.register()
    catRender.img.forEach((image, index) => {
        image.draw(catRender.ranwidth[index], catRender.ranheight[index])
    })
})
catPeople.unregister()

function clearCats() {catRender = { img: [], ranwidth: [], ranheight: [] }; catPeople.unregister()}

export { clearCats, catPeople }