export default function normalizeString(string) {

    let ss = string.split('|')

    for(let i = 1; i < ss.length; i++) {
        ss[i] = ` ${ss[i].toLowerCase()}`
    }

    let s = ss.reduce((p, c) => p + c)

    return s
}