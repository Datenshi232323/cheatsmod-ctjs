import { wordList } from "../../assets/wordList" // Word List stolen from https://github.com/Fastxyz/GTBThemeSolver

function guessTheme(hint) {
    if (!hint.includes("_")) return
    let answers = []
    let raw = new RegExp(`^(${hint.replace(/_/g, "\\w")})$`)
    wordList.forEach(word => {
        if (word.match(raw) && word.length == hint.length) answers.push(word)
    })
    if (answers.length <= 10) return answers
}

export { guessTheme }