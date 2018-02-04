const vscode = require('vscode')
const CompleteProvider = require('./providers/completion_provider')
const FormatProvider = require('./providers/format_provider')
const SignatureProvider = require('./providers/signature_provider')
const exportHelpers = require('./fun/exportHelpers')
// const importFun = require('./fun/importFun')

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
            vscode.languages.registerDocumentFormattingEditProvider(type, new FormatProvider(type))
        )
        context.subscriptions.push(
            vscode.languages.registerDocumentRangeFormattingEditProvider(type, new FormatProvider())
        )
        context.subscriptions.push(
            vscode.languages.registerSignatureHelpProvider(type, new SignatureProvider(type), '(', ' ', '{')
        )
    }

    function registerSimvolioProviders() {
        const type = 'simvolio'
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new FormatProvider())
        )
        context.subscriptions.push(
            vscode.languages.registerDocumentRangeFormattingEditProvider(type, new FormatProvider())
        )
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(type), '$', ' ', '.', '(')
        )
        context.subscriptions.push(
            vscode.languages.registerSignatureHelpProvider(type, new SignatureProvider(type), '(', ' ', '{')
        )
    }

    registerProtypoProviders()
    registerSimvolioProviders()
    
    // context.subscriptions.push(
    //     vscode.languages.registerDefinitionProvider(type, new SimvolioDefinitionProvider()))

    vscode.commands.registerCommand('extension.exportFile', () => {
        exportHelpers.exportFile()
    })
    vscode.commands.registerCommand('extension.exportPackage', () => {
        exportHelpers.exportPackage()
    })
}

exports.activate = activate