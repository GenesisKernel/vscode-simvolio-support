const vscode = require('vscode')
const protypoCompletions = require('./protypo_defs').completions
const simvolioCompletions = require('./simvolio_defs').completions

const completionPattern = /([\w\$#]+)/i


class CompleteProvider {
    constructor(type) {
        this.type = type
        if (type === 'simvolio') {
            this.completions = simvolioCompletions
            this.isSimvolio = true
            this.varMatch = /\$\w+[\s,]/g
        }
        if (type === 'protypo') {
            this.completions = protypoCompletions
            this.isProtypo = true
            this.varMatch = /#\w+#/g
        }
        this.completionsKeys = Object.keys(this.completions)
        this.completes = []
    }
    provideCompletionItems(document, position, token) {
        const text = document.lineAt(position.line).text,
            currentText = text.substr(0, position.character),
            tokens = currentText.split(') '),
            textToken = tokens.length ? tokens[tokens.length - 1] : currentText

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
        }
        //  else {
        //     this.completionsKeys.forEach(key => { // Element NOT exist - list all elements
        //         items.push(new vscode.CompletionItem(this.completions[key].insertText))
        //     })
        // }

        const vars = document.getText(new vscode.Range(0, 0, position.line, position.character)).match(this.varMatch)
        if (vars.length > 1) {
            vars.slice(1).forEach(it => {
                let v = it.trim()
                if (this.completes.indexOf(v) < 0) {
                    this.completes.unshift(v)
                }
            })
            this.completes.slice(0, 10).forEach(c => {
                let item = new vscode.CompletionItem(c)
                item.detail = c
                item.filterText = c
                item.insertText = c.replace(/[#$]/, '')
                items.push(item)
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

                line = this.fixSyntax(line)

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
    fixSyntax(line) {
        if (this.type === 'protypo') {
            this.protypoRules.forEach(rule => line = line.replace(rule.pattern, rule.fix))
        }
        return line
    }
    constructor(type) {
        this.type = type
        this.protypoRules = [{
                pattern: /^Div\((.*?),(.+)\)$/, // short Div
                fix: 'Div($1){$2}'
            },
            {
                pattern: /^Divs:?\(?([\w-\s]+)\)?$/, // Divs: a | Divs(a)
                fix: 'Div($1){'
            },
            {
                pattern: /^Divs\(([\w-\s]+?),(.+)\)$/, // Divs (a,b)
                fix: 'Div($1){Div($2){'
            },
            {
                pattern: /^(Form\(.*?\))$/, // Form ()
                fix: '$1{'
            },
            {
                pattern: /^PageEnd:$/,
                fix: ''
            },
            {
                pattern: /^.+End:$/, // *End:
                fix: '}'
            },
            {
                pattern: /If\s*\(([=<>#\w]+)\)$/, // If(a)
                fix: 'If ($1){'
            },
            {
                pattern: /^(Else):$/, // Else(a)
                fix: '}.$1{'
            },
            { // GetRow(prefix, table, colname, [value])
                pattern: /GetRow\(\s*(["\w-]+?)\s*,\s*#state_id#_([\w]+?)\s*,\s*"?([\w-]+?)"?\s*,\s*([#\w-]+?)\)/,
                fix: 'DBFind(Name: $2, Source: src_$2).Where("$3=$4").Vars($1)'
            },
            { // GetRow(prefix, table, cols)
                pattern: /GetRow\(\s*(.+?)\s*,\s*#state_id#_([\w]+?)\s*,\s*"(.*?)"\)/,
                fix: 'DBFind(Name: $2, Source: src_$2).Where("$3").Vars($1)'
            },
            { // StateVal(name, [index])
                pattern: /StateVal\(\s*([\w-]+?)\s*,\s*([#\w-]+)\s*\)/,
                fix: 'EcosysParam(Name: $1, Index: $2)'
            },
            { // ValueById(table,idval,columns,[aliases])
                pattern: /ValueById\(\s*#state_id#_([\w]+?)\s*,\s*(.+?),(.*)\)$/,
                fix: 'DBFind(Name: $1, Source: src_$1).WhereId($2)\n$3'
            },
            { // SetVar(a=b)
                pattern: /SetVar\((.*?)=(.*?)\)/,
                fix: 'SetVar(Name: $1, Value: $2)'
            },
            { // Input(idname,[class],[placeholder],[type],[value])
                pattern: /Input\((\w+?)\s*,\s*("[\w\s-]+?")\s*,\s*(\w+?)\s*,\s*(\w+?)\s*,\s*([#\w]+?)\)/,
                fix: 'Input(Name: $1, Class: $2, Placeholder: $3, Type: $4, Value: $5)'
            },
            {
                pattern: /^Title:([\w\s]+)$/,
                fix: 'SetTitle($1)'
            },

        ]
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
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(type), '#', '.', '(')
        )
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new SimpleFormatProvider(type))
        )
    }

    function registerSimvolioProviders() {
        const type = 'simvolio'
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, new SimpleFormatProvider())
        )
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(type, new CompleteProvider(type), '$', '.', '(')
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