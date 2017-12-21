const vscode = require('vscode')

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
                let testLine = line.replace(/".*?"/g, "")
                if (!commentLine.test(testLine)) {
                    if (firstBrace.test(testLine) | firstBraceSq.test(testLine)) {
                        tabs--
                    }
                }

                let spaceLength = tabs * options.tabSize + 1
                let spaces = spaceLength >= 0 ? new Array(spaceLength).join(' ') : ''
                line = spaces + line
                line = line.replace(newLineBlock, '$1\n' + spaces + '$2')
                line = line.replace(newLineBlock2, '$1\n' + spaces + '$2')

                testLine = line.replace(/".*?"/g, "")
                if (!commentLine.test(testLine)) {
                    if (lastBrace.test(testLine) | lastBraceSq.test(testLine)) {
                        ++tabs
                        if (/[^\}]*\}$/.test(testLine)) {
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
                pattern: /^If\s*\((.+)\)$/, // If(a)
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
            { // StateVal(name)
                pattern: /StateVal\(([\w-]+?)\)/,
                fix: 'EcosysParam(Name: $1)'
            },
            { // ValueById(table,idval,columns,[aliases])
                pattern: /ValueById\(\s*#state_id#_([\w]+?)\s*,\s*(.+?),(.*)\)$/,
                fix: 'DBFind(Name: $1, Source: src_$1).WhereId($2)\n$3'
            },
            { // SetVar(a=b)
                pattern: /SetVar\("?([\w]+?)=([\w]+?)"?\)/,
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
            {
                pattern: /^Navigation\((.+)\)$/,
                fix: 'Div(breadcrumb){Div(){$1}}'
            },
            {
                pattern: /^Title:([\w\s$]+)$/,
                fix: 'SetTitle($1)'
            },
            { //BtnPage
                pattern: /BtnPage\s*\(([\s\w$"]+?),([\s\w$"]+?),([\s\w$"]+?),([\s\w$"-]+?)\)/,
                fix: 'Button(Page: $1, Body: $2, PageParams: $3, Class: $4)'
            },
            { //BtnContract(contract, name, message, params, [class], [onsuccess], [pageparams])
                pattern: /BtnContract\s*\(([\s\w\$"]+?),([\s\w\$"\)\(-]+?),([\s\w\$"]+?),([\s\w\$"#:]+?),([\s\w\$"'-]+?),([\s\w\$"]+?),([\s\w\$"]+?)\)/,
                fix: 'Button(Contract: $1, Body: $2, Params: $4, Class: $5, Page: $6, PageParams: $7).Alert($3, confirm, cancel)'
            },
            // { 
            //     pattern: /(\.Alert.*?)\$(\w+)\$(.*?)\$(\w+)\$(.*?)\$(\w+)\$(.*?\))$/g,
            //     fix: '$1LangRes($2)$3LangRes($4)$5LangRes($6)$7'
            // },
            { // fix langres on  button alert
                pattern: /(\.Alert.*?)LangRes\((\w+)\)(.*?)LangRes\((\w+)\)(.*?)LangRes\((\w+)\)(.*?\))$/g,
                fix: '$1$$$2$$$3$$$4$$$5$$$6$$$7'
            },
        ]
    }
}
module.exports = SimpleFormatProvider