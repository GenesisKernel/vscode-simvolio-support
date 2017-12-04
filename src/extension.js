const vscode = require('vscode'),
    completions = require('./protypo_defs').completions,
    completionsKeys = Object.keys(completions),
    completionPattern = /\s*([A-Z][a-zA-Z]*)\(?([a-zA-Z]*.*[,:])*[\sa-zA-Z]*$/

class SimvolioCompleteProvider {
    provideCompletionItems(document, position, token) {
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
}
class SimvolioSignatureProvider {
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
            completionsKeys.forEach(key => {
                if (key.indexOf(el) > -1) {
                    let it = completions[key]
                    let label = it.label
                    let doc = [it.documentation]
                    it.params.forEach(p => doc.push(`${p.label}: ${p.documentation}`))
                    items.push(new vscode.SignatureInformation(label, doc.join('\n')))
                }
            })
        }
        const help = new vscode.SignatureHelp()
        help.signatures = items
        help.activeSignature = 0
        return help
    }
}

// class SimvolioFormatRangeProvider {
//     provideDocumentRangeFormattingEdits(document, range, options, token) {
//         
//     }
// }


// class SimvolioDefinitionProvider {
//     provideDefinition(document, position) {
//         
//     }
// }

function activate(context) {
    const active = vscode.window.activeTextEditor
    if (!active || !active.document) return

    function registerDocType(type) {
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, new SimvolioCompleteProvider(), '.')
        )
        // context.subscriptions.push(
        //     vscode.languages.registerDocumentRangeFormattingEditProvider(type, new SimvolioFormatRangeProvider())
        // )
        context.subscriptions.push(
            vscode.languages.registerSignatureHelpProvider(type, new SimvolioSignatureProvider(), '(', ' ')
        )
        // context.subscriptions.push(
        //     vscode.languages.registerDefinitionProvider(type, new SimvolioDefinitionProvider()));

    }
    registerDocType('simvolio')
}

exports.activate = activate