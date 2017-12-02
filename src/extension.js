const vscode = require('vscode')
const pretty = require('./jspretty')

const CONFIG = vscode.workspace.getConfiguration("simvolio-support")

const prettyDiff = (document, range, options) => {
    const result = []
    const content = document.getText(range)

    const newText = pretty({
        source: content,
        insize: options.tabSize
    })
    // .replace(/;/g, '')
    // .replace(/\s*(-|:)\s*/g, '$1')
    // .replace(/([ \t]+)(.*)(\)|\])\s([a-zA-Z-_])/g, '$1$2$3\n$1$4')

    result.push(vscode.TextEdit.replace(range, newText))
    return result
}

function activate(context) {
    const active = vscode.window.activeTextEditor
    if (!active || !active.document) return

    function registerDocType(type) {
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(
                type, {
                    provideDocumentFormattingEdits: (document, options, token) => {
                        const start = new vscode.Position(0, 0)
                        const end = new vscode.Position(
                            document.lineCount - 1,
                            document.lineAt(document.lineCount - 1).text.length
                        )
                        const rng = new vscode.Range(start, end)
                        return prettyDiff(document, rng, options)
                    }
                })
        )
        // context.subscriptions.push(
        //     vscode.languages.registerCompletionItemProvider(CONFIG, new GoCompletionItemProvider(), '.', '\"')
        // )
        context.subscriptions.push(
            vscode.languages.registerDocumentRangeFormattingEditProvider(
                type, {
                    provideDocumentRangeFormattingEdits: (document, range, options, token) => {
                        let end = range.end
                        if (end.character === 0) {
                            end = end.translate(-1, Number.MAX_VALUE)
                        } else {
                            end = end.translate(0, Number.MAX_VALUE)
                        }

                        const rng = new vscode.Range(new vscode.Position(range.start.line, 0), end)

                        return prettyDiff(document, rng, options)
                    }
                }
            )
        )
    }
    registerDocType('simvolio')
}

exports.activate = activate