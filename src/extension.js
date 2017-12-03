const vscode = require('vscode'),
    completions = require('./protypo_defs').completions,
    completionsKeys = Object.keys(completions),
    completionPattern = /\s*([A-Z][a-zA-Z]*)\(?([a-zA-Z]*.*[,:])*[\sa-zA-Z]*$/

// console.log(completionsKeys)
const completeProvider = (document, position, token) => {
    const lineText = document.lineAt(position.line).text,
        lineTill = lineText.substr(0, position.character)
    if (lineTill.match(/^\d+$/)) {
        return []
    }
    const paramsMatch = lineTill.match(completionPattern),
        items = []
    if (paramsMatch && paramsMatch[1]) {
        let el = paramsMatch[1]
        completionsKeys.forEach(key => {
            if (key === el) {
                completions[key].params.forEach(it => {
                    items.push(new vscode.CompletionItem(it.insertText))
                })
            } else if (key.indexOf(el) > -1) {
                items.push(new vscode.CompletionItem(completions[key].insertText))
            }
        })
    } else {
        completionsKeys.forEach(key => {
            items.push(new vscode.CompletionItem(completions[key].insertText))
        })
    }
    return items
}
const signatureProvider = (document, position, token) => {
    const lineText = document.lineAt(position.line).text,
        lineTill = lineText.substr(0, position.character)
    if (lineTill.match(/^\d+$/)) {
        return []
    }
    const paramsMatch = lineTill.match(completionPattern),
        items = []
    if (paramsMatch && paramsMatch[1]) {
        let el = paramsMatch[1]
        completionsKeys.forEach(key => {
            if (key === el) {
                completions[key].params.forEach(it => {
                    items.push(new vscode.CompletionItem(it.insertText))
                })
            } else if (key.indexOf(el) > -1) {
                items.push(new vscode.CompletionItem(completions[key].insertText))
            }
        })
    } else {
        completionsKeys.forEach(key => {
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
        context.subscriptions.push(
            vscode.languages.registerSignatureHelpProvider(type, {
                provideSignatureHelp: (document, position, token) => signatureProvider(document, position, token)
            }, '.')
        )
    }
    registerDocType('simvolio')
}

exports.activate = activate