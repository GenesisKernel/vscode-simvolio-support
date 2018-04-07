const vscode = require('vscode')

class SimpleFormatProvider {
    provideDocumentFormattingEdits(document, options) {
        return this.format(0, document.lineCount, document, options)
    }

    provideDocumentRangeFormattingEdits(document, range, options) {
        return this.format(range.start.line, range.end.line, document, options)
    }
    format(start, end, text, options) {
        this.offset = 0
        this.tabs = 0
        const countLines = text.lineCount

        const hasClosedBrace = /^\s*([})\]]).*/
        const hasOpenBrace = /[{([](:?\s|\/\/.*)*$/

        const spaceCloseBrace = /\s*(\))(\s)*/g
        const spaceOpenBrace = /(\s)+(\()\s*/g
        const commaSpace = /\s*(,)(\s)*/g
        const commentLine = /^\s*\/\/.*$/
        const doubleSpaces = /(\s)+/g
        const notClosedBrace = /[^}]*\}$/
        const strings = /".*?"/g

        const newLineBlock = /([)}])(Div|Button|Table|Form|Image|ImageInput|Input|InputErr|LinkPage|MenuGroup|MenuItem|P|RadioGroup|Select|EcosysParam|DBFind)/g
        const newLineBlock2 = /([({])(If)/g

        if (text.lineAt(0).text.match(/^\s*\{/)) return // do not format export.sim
        try {
            const lines = []
            let isCode = false
            let bracesStack = []
            for (let i = 0; i < countLines; i++) {
                let line = text.lineAt(i).text
                let lineLength = line.length

                isCode = this.checkIsCode(line, bracesStack, isCode)

                // if (!isCode) {
                if (this.tabs < 0) this.tabs = 0
                line = line
                    .replace(commaSpace, '$1$2')
                    .replace(spaceOpenBrace, '$1$2')
                    .replace(spaceCloseBrace, '$1$2')
                    .replace(doubleSpaces, '$1')
                    .trim()

                line = this.fixSyntax(line)
                // console.log(i, lastWord, isCode, bracesStack)

                let testLine = line.replace(strings, '')
                if (!commentLine.test(testLine)) {
                    if (hasClosedBrace.test(testLine)) {
                        this.tabs--
                    }
                }


                let spaceLength = (this.tabs - this.offset) * options.tabSize + 1
                let spaces = spaceLength >= 0 ? new Array(spaceLength).join(' ') : ''
                line = spaces + line
                line = line.replace(newLineBlock, '$1\n' + spaces + '$2')
                line = line.replace(newLineBlock2, '$1\n' + spaces + '$2')

                testLine = line.replace(strings, '')
                if (!commentLine.test(testLine)) {
                    if (hasOpenBrace.test(testLine)) {
                        ++this.tabs
                        if (notClosedBrace.test(testLine)) {
                            ++this.tabs
                        }
                    }
                }
                // }
                isCode = this.checkIsCode(line, bracesStack, isCode)
                if (i >= start && i <= end) {
                    lines.push(new vscode.TextEdit(new vscode.Range(i, 0, i, lineLength), line))
                }
            }
            return lines
        } catch (e) {
            // console.log(e)
        }
    }

    checkIsCode(line, bracesStack, isCode) {
        for (let l = 0; l < line.length; l++) {
            let c = line.charAt(l)
            if (c === '(') {
                if (!isCode) {
                    let lastWord = this.getLastWord(line.substring(0, l))
                    isCode = lastWord === 'Code'
                    if (isCode) {
                        this.offset = this.tabs
                    }
                }
                if (isCode) {
                    bracesStack.push(c)
                }
            } else if (c === ')') {
                if (isCode) {
                    if (bracesStack[bracesStack.length - 1] === '(') {
                        bracesStack.pop()
                    }
                    isCode = bracesStack.length > 0
                }
            }
        }
        if (!isCode) {
            this.offset = 0
        }
        return isCode
    }

    getLastWord(line) {
        const notWordChars = ' <>,.(){}"[]`'
        line = line.trim()
        let last = line.length - 1
        let i
        for (i = last; i >= 0; i--) {
            let ch = line.charAt(i)
            if (notWordChars.indexOf(ch) != -1) {
                return line.substring(i + 1)
            }
        }
        return line.substring(i)
    }

    fixSyntax(line) {
        if (this.type === 'protypo') {
            this.protypoRules.forEach(rule => line = line.replace(rule.pattern, rule.fix))
        }
        return line
    }
    constructor(type) {
        this.offset = 0
        this.tabs = 0
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
            pattern: /^Tag\(([\w-\s]+?),(.+)\)$/, // Divs (a,b)
            fix: 'Div($1){$2}'
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
            fix: 'If($1){'
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
            pattern: /BtnContract\s*\(([\s\w$"]+?),([\s\w$")(-]+?),([\s\w$"]+?),([\s\w$"#:]+?),([\s\w$"'-]+?),([\s\w$"]+?),([\s\w$"]+?)\)/,
            fix: 'Button(Contract: $1, Body: $2, Params: $4, Class: $5, Page: $6, PageParams: $7).Alert($3, confirm, cancel)'
        },
        { // fix langres on  button alert
            pattern: /(\.Alert.*?)LangRes\((\w+)\)(.*?)LangRes\((\w+)\)(.*?)LangRes\((\w+)\)(.*?\))$/g,
            fix: '$1$$$2$$$3$$$4$$$5$$$6$$$7'
        },
        ]
    }
}
module.exports = SimpleFormatProvider