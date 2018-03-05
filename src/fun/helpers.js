function getWord(line) {
    line = line.replace(/\([^\(]+?\)/, "").trim()
    let res, left
        i = line.length - 1,
        right = i
    while (i > 0 && '('.indexOf(line.charAt(i)) === -1) {
        right = --i
    }
    if (right > 0) {
        left = --i
        while (i > 0 && ' ,}({)'.indexOf(line.charAt(i)) === -1) {
            left = --i
        }
        res = line.substring(left, right).trim()
    } else {
        res = null
    }
    return res
}
exports.getWord = getWord