const vscode = require('vscode')
const protypoCompletions = require('../protypo_defs').completions
const simvolioCompletions = require('../simvolio_defs').completions

class SignatureProvider {
    constructor(type) {
        if (type === 'simvolio') {
            this.completions = simvolioCompletions
            this.completionPattern = /(\w+)/i
        }
        if (type === 'protypo') {
            this.completions = protypoCompletions
            this.completionPattern = /([A-Z]\w+)/i
        }
        this.completionsKeys = Object.keys(this.completions)
    }
    provideSignatureHelp(document, position, token) {
        const text = document.lineAt(position.line).text
        const currentText = text.substr(0, position.character).trim()

        if (currentText.match(/^\d+$/)) {
            return []
        }
        const paramsMatch = currentText.match(this.completionPattern)
        console.log(paramsMatch)
        const items = []
        let match = false
        if (paramsMatch && paramsMatch[1]) {
            let el = paramsMatch[1]
            this.completionsKeys.forEach(key => {
                if (key === el) {
                    match = true
                    const it = this.completions[key]
                    const sign = new vscode.SignatureInformation(it.label)
                    if (it.documentation) {
                        sign.documentation = it.documentation
                    }
                    items.push(sign)
                }
            })
            this.completionsKeys.forEach(key => {
                if (!match && key.indexOf(el) > -1) {
                    const it = this.completions[key]
                    const sign = new vscode.SignatureInformation(it.label)
                    if (it.documentation) {
                        sign.documentation = it.documentation
                    }
                    items.push(sign)
                }
            })
        }
        const help = new vscode.SignatureHelp()
        help.signatures = items
        help.activeSignature = 0
        return help
    }
}
module.exports = SignatureProvider