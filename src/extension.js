const vscode = require('vscode')
const CompleteProvider = require('./providers/completion_provider')
const SimpleFormatProvider = require('./providers/format_provider')
const SignatureProvider = require('./providers/signature_provider')

// class SimvolioDefinitionProvider {
//     provideDefinition(document, position) {
//         
//     }
// }

function activate(context) {
    const active = vscode.window.activeTextEditor
    if (!active || !active.document) return

    function registerProtypoProviders() {
        const type = 'protypo'
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(type), ' ', '#', '.', '(')
        )
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new SimpleFormatProvider(type))
        )
        context.subscriptions.push(
            vscode.languages.registerSignatureHelpProvider(type, new SignatureProvider(type), '(', ' ', '{')
        )
    }

    function registerSimvolioProviders() {
        const type = 'simvolio'
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new SimpleFormatProvider())
        )
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(type), '$', ' ', '.', '(')
        )
    }

    registerProtypoProviders()
    registerSimvolioProviders()
    // context.subscriptions.push(
    //     vscode.languages.registerDocumentRangeFormattingEditProvider(type, new SimvolioFormatProvider())
    // )
    // context.subscriptions.push(
    //     vscode.languages.registerDefinitionProvider(type, new SimvolioDefinitionProvider()))
}

exports.activate = activate