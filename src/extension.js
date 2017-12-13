const vscode = require('vscode')
const protypoCompletions = require('./protypo_defs').completions
const simvolioCompletions = require('./simvolio_defs').completions

const completionPattern = /\s*([A-Z][a-zA-Z]*)\(?([a-zA-Z]*.*[,:])*[\sa-zA-Z]*$/


class CompleteProvider {
    constructor(completions) {
        this.completions = completions
        this.completionsKeys = Object.keys(completions)
    }
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
            this.completionsKeys.forEach(key => {
                if (key === el) { // Element complete - params helper
                    this.completions[key].params.forEach(it => {
                        if (textToken.indexOf(it.insertText) < 0) { // not repeat params
                            items.push(new vscode.CompletionItem(it.insertText))
                        }
                    })
                } else if (key.indexOf(el) > -1) { // Element NOT complete - element helper
                    items.push(new vscode.CompletionItem(this.completions[key].insertText))
                }
            })
        } else {
            this.completionsKeys.forEach(key => { // Element NOT exist - list all elements
                items.push(new vscode.CompletionItem(this.completions[key].insertText))
            })
        }
        return items
    }
}
class SignatureProvider {
    constructor(completions) {
        this.completions = completions
        this.completionsKeys = Object.keys(completions)
    }
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
            this.completionsKeys.forEach(key => {
                if (key.indexOf(el) > -1) {
                    let it = this.completions[key]
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

class SimpleFormatProvider {
    provideDocumentFormattingEdits(document, options, token) {
        return this.format(0, document.lineCount, document, options)
    }

    provideDocumentRangeFormattingEdits(document, range, options, token) {
        // console.log('provideDocumentRangeFormattingEdits', document)
        // return new vscode.TextEdit()
    }
    format(start, end, text, options) {
        const curveOpenClose = /[a-zA-Z0-9_-\s.,]*\{.*\}$/g
        const firstBrace = /^(\}).*/
        const lastBrace = /(\{)[^\}]*$/
        const firstBraceSq = /^(\]).*/
        const lastBraceSq = /(\[)[^\]]*$/

        const spaceBeforeBrace = /\s*(\))\s*/g
        const spaceCloseBrace = /\s*(\))(\s)*/g
        const spaceOpenBrace = /\s*(\()\s*/g
        const commaSpace = /\s*(,)(\s)*/g
        const commentLine = /^\s*\/\/.*$/
        const doubleSpaces = /(\s)+/g

        const oldProtypoDiv = /^Div\((.*?),([^\(]+?)\)$/
        const oldProtypoDiv2 = /^Divs:?\(?([\w-\s]+)\)?$/
        const oldProtypoDiv3 = /^Divs\(([\w-\s]+?),(.+)\)$/
        const oldProtypoForm = /^(Form\(.*?\))$/
        const oldProtypoEndBlock = /^.+End:$/
        const oldProtypoIf = /If\s*\((.+?),(.+?),(.+?)\)/
        const oldProtypoIf2 = /(If\s*\(.+\))$/
        const oldProtypoElse = /^(Else):$/

        const newLineBlock = /([\)\}])(Div|Button|Table|Form|Image|ImageInput|Input|InputErr|LinkPage|MenuGroup|MenuItem|P|RadioGroup|Select|EcosysParam|DBfind)/g
        const newLineBlock2 = /([\(\{])(If)/g

        try {
            const lines = []
            let tabs = 0
            for (let i = start; i < end; i++) {
                if (tabs < 0) tabs = 0
                let line = text.lineAt(i).text
                let lineLength = line.length
                line = line
                    .replace(commaSpace, '$1$2')
                    .replace(spaceOpenBrace, '$1')
                    .replace(spaceCloseBrace, '$1$2')
                    .replace(doubleSpaces, '$1')
                    .trim()
                    .replace(oldProtypoDiv, 'Div($1){$2}')
                    .replace(oldProtypoDiv2, 'Div($1){')
                    .replace(oldProtypoDiv3, 'Div($1){Div($2){')
                    .replace(oldProtypoForm, '$1{')
                    .replace(oldProtypoEndBlock, '}')
                    .replace(oldProtypoIf, 'If($1){\n$2\n}.Else{\n$3\n}')
                    .replace(oldProtypoIf2, '$1{')
                    .replace(oldProtypoElse, '}.$1{')

                if (!commentLine.test(line)) {
                    if (firstBrace.test(line) | firstBraceSq.test(line)) {
                        tabs--
                    }
                }

                let spaceLength = tabs * options.tabSize + 1
                let spaces = spaceLength >= 0 ? new Array(spaceLength).join(' ') : ''
                line = spaces + line
                line = line.replace(newLineBlock, '$1\n' + spaces + '$2')
                line = line.replace(newLineBlock2, '$1\n' + spaces + '$2')

                if (!commentLine.test(line)) {
                    if (lastBrace.test(line) | lastBraceSq.test(line)) {
                        ++tabs
                        if (/[^\}]*\}$/.test(line)) {
                            ++tabs
                        }
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

    function registerProtypoProviders() {
        const type = 'protypo'
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(protypoCompletions), '.', '(')
        )
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new SimpleFormatProvider())
        )
    }

    function registerSimvolioProviders() {
        const type = 'simvolio'
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new SimpleFormatProvider())
        )
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(simvolioCompletions), '.', '(')
        )
    }
    registerProtypoProviders()
    registerSimvolioProviders()
    // context.subscriptions.push(
    //     vscode.languages.registerDocumentRangeFormattingEditProvider(type, new SimvolioFormatProvider())
    // )
    // context.subscriptions.push(
    //     vscode.languages.registerSignatureHelpProvider(type, new SimvolioSignatureProvider(), '(', ' ')
    // )
    // context.subscriptions.push(
    //     vscode.languages.registerDefinitionProvider(type, new SimvolioDefinitionProvider()))
}

exports.activate = activate