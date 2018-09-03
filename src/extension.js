const vscode = require('vscode')
const CompleteProvider = require('./providers/completion_provider')
const FormatProvider = require('./providers/format_provider')
const SignatureProvider = require('./providers/signature_provider')

function activate(context) {
    const active = vscode.window.activeTextEditor
    if (!active || !active.document) return

    function registerProviders() {
        let typeProtypo = 'protypo'
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: typeProtypo }, new CompleteProvider(typeProtypo), ' ', '#', '.', '('),
            vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: typeProtypo }, new FormatProvider(typeProtypo)),
            vscode.languages.registerDocumentRangeFormattingEditProvider({ scheme: 'file', language: typeProtypo }, new FormatProvider(typeProtypo)),
            vscode.languages.registerSignatureHelpProvider({ scheme: 'file', language: typeProtypo }, new SignatureProvider(typeProtypo), '(', ' ', '{')
        )

        let typeSimvolio = 'simvolio'
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: typeSimvolio }, new FormatProvider(typeSimvolio)),
            vscode.languages.registerDocumentRangeFormattingEditProvider({ scheme: 'file', language: typeSimvolio }, new FormatProvider(typeSimvolio)),
            vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: typeSimvolio }, new CompleteProvider(typeSimvolio), '$', ' ', '.', '('),
            vscode.languages.registerSignatureHelpProvider({ scheme: 'file', language: typeSimvolio }, new SignatureProvider(typeSimvolio), '(', ' ', '{')
        )
    }

    registerProviders()
}
exports.activate = activate