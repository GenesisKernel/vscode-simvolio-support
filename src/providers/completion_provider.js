const vscode = require('vscode')
const protypoCompletions = require('../protypo_defs').completions
const simvolioCompletions = require('../simvolio_defs').completions
const completionPattern = /([\w\$#]{4,})/i

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

        // vscode.commands.registerTextEditorCommand('simvolioCompletion', editor => {
        //     // enter snippet mode
        //     return editor.insertSnippet(
        //         new vscode.SnippetString('I have $0computed ${1:this}'),
        //         new vscode.Position(0, 0)
        //     );
        // })
    }
    provideCompletionItems(document, position, token) {
        const text = document.lineAt(position.line).text,
            currentText = text.substr(0, position.character),
            tokens = currentText.split(') '),
            textToken = tokens.length ? tokens[tokens.length - 1] : currentText

        const paramsMatch = textToken.match(completionPattern),
            items = []
        if (paramsMatch && paramsMatch[1]) {
            let el = paramsMatch[1]
            this.completionsKeys.forEach(key => {
                if (key === el) { // Element complete - params helper
                    this.completions[key].params.forEach(it => {
                        if (textToken.indexOf(it.insertText) < 0) { // not repeat params
                            items.push(new vscode.CompletionItem(it.insertText))
                        }
                    })
                } else if (key.indexOf(el) > -1) { // Element NOT complete - element helper
                    items.push(new vscode.CompletionItem(this.completions[key].insertText))
                }
            })
        }
        //  else {
        //     this.completionsKeys.forEach(key => { // Element NOT exist - list all elements
        //         items.push(new vscode.CompletionItem(this.completions[key].insertText))
        //     })
        // }

        const vars = document.getText(document.getWordRangeAtPosition(position)).split(/[\s,\]\[\(\)=]+/).map(w => w.indexOf('$') === 0 ? w.substr(1).trim() : null).filter(w => w)
        // const word = currentText.split(/[\s,\]\[\(\)=]+/).map(w => w.length > 3 ? w : null).filter(w => w).reverse()[0]

        console.log(vars)


        vars.forEach(v => {
            if (this.completes.indexOf(v) < 0) {
                this.completes.push(v)
            }
        })
        this.completes.forEach(c => {
            let item = new vscode.CompletionItem(c)
            // item.detail = c
            // item.filterText = c
            item.insertText = c
            items.push(item)
        })


        return items
    }
}

module.exports = CompleteProvider