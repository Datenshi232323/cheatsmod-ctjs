frame = new javax.swing.JFrame("Chat")

textBox = new javax.swing.JTextArea()
textBox.setFont(new java.awt.Font("Segoe UI", java.awt.Font.PLAIN, 18))
textBox.setEditable(false)
textBox.setAutoscrolls(true)
textBox.setLineWrap(true)
textBox.setWrapStyleWord(true)
textBox.setBackground(java.awt.Color.gray)
textBox.append("External Chat:")

textField = new javax.swing.JTextField("")
textField.setFont(new java.awt.Font("Segoe UI", java.awt.Font.PLAIN, 22))
textField.setBorder(javax.swing.BorderFactory.createEmptyBorder())
textField.addActionListener(new java.awt.event.ActionListener({
    actionPerformed: () => {
        ChatLib.say(textField.getText())
        textField.setText("")
    }
}))

frame.add(new javax.swing.JScrollPane(textBox), java.awt.BorderLayout.CENTER)
frame.add(textField, java.awt.BorderLayout.SOUTH)
frame.setSize(480, 450)
frame.setResizable(false)

export { frame, textBox }