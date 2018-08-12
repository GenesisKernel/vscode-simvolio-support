const vscode = require('vscode')
const CompleteProvider = require('./providers/completion_provider')
const FormatProvider = require('./providers/format_provider')
const SignatureProvider = require('./providers/signature_provider')

function activate(context) {
    const active = vscode.window.activeTextEditor
    if (!active || !active.document) return

    function registerProviders() {
        let type = 'protypo'
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: type }, new CompleteProvider(type), ' ', '#', '.', '('),
            vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: type }, new FormatProvider(type)),
            vscode.languages.registerDocumentRangeFormattingEditProvider({ scheme: 'file', language: type }, new FormatProvider()),
            vscode.languages.registerSignatureHelpProvider({ scheme: 'file', language: type }, new SignatureProvider(type), '(', ' ', '{')
        )

        type = 'simvolio'
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: type }, new FormatProvider()),
            vscode.languages.registerDocumentRangeFormattingEditProvider({ scheme: 'file', language: type }, new FormatProvider()),
            vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: type }, new CompleteProvider(type), '$', ' ', '.', '('),
            vscode.languages.registerSignatureHelpProvider({ scheme: 'file', language: type }, new SignatureProvider(type), '(', ' ', '{')
        )
    }

    registerProviders()
}
exports.activate = activate