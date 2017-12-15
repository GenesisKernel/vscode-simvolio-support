const vscode = require('vscode')
const protypoCompletions = require('../protypo_defs').completions
const simvolioCompletions = require('../simvolio_defs').completions

const completionPattern = /([\w\$#]+)/i

class SignatureProvider {
    constructor(type) {
        if (type === 'simvolio') {
            this.completions = simvolioCompletions
            this.isSimvolio = true
        }
        if (type === 'protypo') {
            this.completions = protypoCompletions
            this.isProtypo = true
        }
        this.completionsKeys = Object.keys(this.completions)
    }
    provideSignatureHelp(document, position, token) {
        const text = document.lineAt(position.line).text
        const currentText = text.substr(0, position.character).trim()

        if (currentText.match(/^\d+$/)) {
            return []
        }
        const paramsMatch = currentText.match(completionPattern)
        const items = []
        if (paramsMatch && paramsMatch[1]) {
            let el = paramsMatch[1]
            this.completionsKeys.forEach(key => {
                if (key.indexOf(el) > -1) {
                    let it = this.completions[key]
                    let label = it.label
                    let doc = it.documentation
                    // it.params.forEach(p => doc.push(`${p.label}: ${p.documentation}`))
                    items.push(new vscode.SignatureInformation(label, doc))
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