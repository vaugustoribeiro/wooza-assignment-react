export default function normalizeString(string) {
    let s = string.toLowerCase().replace('|', ' ')
    s[0] = s[0].toUpperCase()
    return s
}