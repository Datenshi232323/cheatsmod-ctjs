const timer = Client.getMinecraft().getClass().getDeclaredField("field_71428_T")
timer.setAccessible(true)

function timerSpeed(speed) {
    timer.get(Client.getMinecraft()).field_74278_d = (speed / 20)
}

export { timerSpeed }