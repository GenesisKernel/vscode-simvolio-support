const vscode = require('vscode')
const protypoCompletions = require('../protypo_defs').completions
const simvolioCompletions = require('../simvolio_defs').completions

class CompleteProvider {
    constructor(type) {
        this.type = type
        if (type === 'simvolio') {
            this.completions = simvolioCompletions
            this.isSimvolio = true
            this.varMatch = /\$(\w+)[\s,]/g
        }
        if (type === 'protypo') {
            this.completions = protypoCompletions
            this.isProtypo = true
            this.varMatch = /#\w+#/g
        }
        this.completionsKeys = Object.keys(this.completions)
        this.completes = []

    }
    provideCompletionItems(document, position, token) {
        const text = document.lineAt(position.line).text,
            currentText = text.substr(0, position.character),
            tokens = currentText.split(/[\)\(]/),
            textToken = tokens.length ? tokens[tokens.length - 1] : currentText

        const tagMatch = textToken.match(/([\w\$#]{2,})/i),
            items = []


        if (tagMatch && tagMatch[1]) {
            let el = tagMatch[1]
            let match = false
            this.completionsKeys.forEach(key => {
                if (key === el) { // Element complete - params helper
                    this.completions[key].params.forEach(it => {
                        if (textToken.indexOf(it.insertText) < 0) { // not repeat params
                            items.push(' ' + new vscode.CompletionItem(it.insertText))
                        }
                    })
                }
            })
            this.completionsKeys.forEach(key => {
                if (!match && key.indexOf(el) > -1) { // Element NOT complete - element helper
                    items.push(new vscode.CompletionItem(' ' + this.completions[key].insertText))
                }
            })
        }


        const vars = document.getText(document.getWordRangeAtPosition(position))
            .split(/[\s,\]\[\(\)=]+/)
            .map(w => w.match(/^[\$#]/) ? w.substr(1, w.length - 1) : null)
            .filter(w => w)

        vars.forEach(v => {
            if (this.completes.indexOf(v) < 0) {
                this.completes.push(v)
            }
        })
        this.completes.forEach(c => {
            if (c.length > 2) {
                let item = new vscode.CompletionItem(c)
                // item.detail = c
                // item.filterText = c
                item.insertText = c
                items.push(item)
            }
        })


        return new vscode.CompletionList(items)
    }
}

module.exports = CompleteProvider