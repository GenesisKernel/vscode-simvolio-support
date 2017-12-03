const vscode = require('vscode'),
    completions = require('./protypo_defs').completions,
    completionsKeys = Object.keys(completions),
    completionPattern = /\s*([A-Z][a-zA-Z]*)\(?([a-zA-Z]*.*[,:])*[\sa-zA-Z]*$/

// console.log(completionsKeys)
const completeProvider = (document, position, token) => {
    const text = document.lineAt(position.line).text,
        currentText = text.substr(0, position.character),
        tokens = currentText.split(') '),
        textToken = tokens.length ? tokens[tokens.length - 1] : currentText

    if (textToken.match(/^\d+$/)) {
        return []
    }
    const paramsMatch = textToken.match(completionPattern),
        items = []
    if (paramsMatch && paramsMatch[1]) {
        let el = paramsMatch[1]
        completionsKeys.forEach(key => {
            if (key === el) { // Element complete - params helper
                completions[key].params.forEach(it => {
                    if (textToken.indexOf(it.insertText) < 0) { // not repeat params
                        items.push(new vscode.CompletionItem(it.insertText))
                    }
                })
            } else if (key.indexOf(el) > -1) { // Element NOT complete - element helper
                items.push(new vscode.CompletionItem(completions[key].insertText))
            }
        })
    } else {
        completionsKeys.forEach(key => { // Element NOT exist - list all elements
            items.push(new vscode.CompletionItem(completions[key].insertText))
        })
    }
    return items
}


function activate(context) {
    const active = vscode.window.activeTextEditor
    if (!active || !active.document) return

    function registerDocType(type) {
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, {
                provideCompletionItems: (document, position, token) => completeProvider(document, position, token)
            }, '.')
        )
    }
    registerDocType('simvolio')
}

exports.activate = activate