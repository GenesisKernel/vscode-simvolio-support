const vscode = require('vscode')
const protypoCompletions = require('../protypo_defs').completions
const simvolioCompletions = require('../simvolio_defs').completions
const getWord = require('../fun/helpers').getWord

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
    provideSignatureHelp(document, position) {
        const text = document.lineAt(position.line).text
        const currentText = text.substring(0, position.character).replace(/[A-Z]\w+\([^(]+?\)/, '')
        const word = getWord(currentText)
        const items = []
        if (word) {
            let match = false
            this.completionsKeys.forEach(key => {
                if (key === word) {
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
                if (!match && key.indexOf(word) > -1) {
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