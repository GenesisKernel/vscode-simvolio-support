const vscode = require('vscode')
const completions = require('./protypo_defs').completions
const completionsKeys = Object.keys(completions)

const completionPattern = /\s*([A-Z][a-zA-Z]*)\(?([a-zA-Z]*.*[,:])*[\sa-zA-Z]*$/
const curveOpenClosePattern = /.*\{.*\}.*/
const spaceBeforeBracePattern = /\s*(\))\s*/g
const spaceBeforeCloseBracePattern = /\s*(\))\s*/g
const spaceAfterOpenBracePattern = /\s*(\()\s*/g
const spaceNormalizePattern = /\s*([,:])\s*/g
const capAfterBracePattern = /([\)\}])([A-Z])/g


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

class SimvolioFormatProvider {
    provideDocumentFormattingEdits(document, options, token) {
        return this.format(0, document.lineCount, document, options)
    }

    provideDocumentRangeFormattingEdits(document, range, options, token) {
        // console.log('provideDocumentRangeFormattingEdits', document)
        // return new vscode.TextEdit()
    }
    format(start, end, text, options) {
        try {
            const lines = []
            let tabs = 0
            for (let i = start; i < end; i++) {
                if (tabs < 0) tabs = 0
                let line = text.lineAt(i).text
                let lineLength = line.length
                line = line.replace(spaceNormalizePattern, '$1 ') // normalize spaces
                    .replace(spaceAfterOpenBracePattern, '$1') // remove space after '('
                    .replace(spaceBeforeCloseBracePattern, '$1')
                    .trim()

                if (line.indexOf('}') > -1) {
                    if (!curveOpenClosePattern.test(line)) {
                        --tabs
                    }
                }

                let spaceLength = (tabs * options.tabSize) + 1
                let spaces = spaceLength >= 0 ? new Array(spaceLength).join(' ') : ''
                line = spaces + line
                line = line.replace(capAfterBracePattern, '$1\n' + spaces + '$2')

                if (line.indexOf('{') > -1) {
                    if (!curveOpenClosePattern.test(line)) {
                        ++tabs
                    }
                }



                lines.push(new vscode.TextEdit(new vscode.Range(i, 0, i, lineLength), line))
            }
            return lines
        } catch (e) {
            console.log(e)
        }
    }
}


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
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new SimvolioFormatProvider())
        )
        // context.subscriptions.push(
        //     vscode.languages.registerDocumentRangeFormattingEditProvider(type, new SimvolioFormatProvider())
        // )
        // context.subscriptions.push(
        //     vscode.languages.registerSignatureHelpProvider(type, new SimvolioSignatureProvider(), '(', ' ')
        // )
        // context.subscriptions.push(
        //     vscode.languages.registerDefinitionProvider(type, new SimvolioDefinitionProvider()))

    }
    registerDocType('simvolio')
}

exports.activate = activate