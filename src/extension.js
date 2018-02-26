const vscode = require('vscode')
const CompleteProvider = require('./providers/completion_provider')
const FormatProvider = require('./providers/format_provider')
const SignatureProvider = require('./providers/signature_provider')
const exportHelpers = require('./fun/exportHelpers')

function activate(context) {
    const active = vscode.window.activeTextEditor
    if (!active || !active.document) return

    function registerProtypoProviders() {
        const type = 'protypo'
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(type), ' ', '#', '.', '('),
            vscode.languages.registerDocumentFormattingEditProvider(type, new FormatProvider(type)),
            vscode.languages.registerDocumentRangeFormattingEditProvider(type, new FormatProvider()),
            vscode.languages.registerSignatureHelpProvider(type, new SignatureProvider(type), '(', ' ', '{')
        )
    }

    function registerSimvolioProviders() {
        const type = 'simvolio'
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new FormatProvider()),
            vscode.languages.registerDocumentRangeFormattingEditProvider(type, new FormatProvider()),
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(type), '$', ' ', '.', '('),
            vscode.languages.registerSignatureHelpProvider(type, new SignatureProvider(type), '(', ' ', '{')
        )
    }

    registerProtypoProviders()
    registerSimvolioProviders()

    vscode.commands.registerCommand('extension.exportFile', () => {
        exportHelpers.exportFile()
    })
    vscode.commands.registerCommand('extension.exportPackage', () => {
        exportHelpers.exportPackage()
    })
}
exports.activate = activate