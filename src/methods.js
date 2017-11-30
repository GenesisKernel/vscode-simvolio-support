function Methods(e) {
    if (!monaco.languages.getLanguages().find(function (e) {
            return "protypo" === e.id
        })) {
        var t = {
                Body: {
                    label: "Body",
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: "Contents of this element",
                    insertText: "Body: "
                },
                Class: {
                    label: "Class",
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: "HTML class value",
                    insertText: "Class: "
                }
            },
            a = {
                Address: {
                    label: "Address",
                    documentation: "Converts wallet ID to address in readable format",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "Address(",
                    params: [{
                        label: "Wallet",
                        documentation: "Wallet ID to convert",
                        insertText: "Wallet: "
                    }]
                },
                AddToolButton: {
                    label: "AddToolButton",
                    documentation: "Add a tool button to the page header",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "AddToolButton(",
                    params: [{
                        label: "Title",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Button title to show",
                        insertText: "Title:"
                    }, {
                        label: "Icon",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Optional icon to show near the button",
                        insertText: "Icon: "
                    }, {
                        label: "Page",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Page that will be loaded on click",
                        insertText: "Page: "
                    }, {
                        label: "PageParams",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Parameters which will be passed to the page upon redirection",
                        insertText: "Params: "
                    }]
                },
                And: {
                    label: "And",
                    documentation: 'Logical "And" operator. All parameters must be truthy',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "And("
                },
                DBFind: {
                    label: "DBFind",
                    documentation: "Database search",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "DBFind(",
                    params: [{
                        label: "Name",
                        documentation: "Table name to search",
                        insertText: "Name: "
                    }, {
                        label: "Source",
                        documentation: "Source identificator to bind results",
                        insertText: "Source: "
                    }]
                },
                Button: {
                    label: "Button",
                    documentation: "Button element",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Button(",
                    params: [t.Body, t.Class, {
                        label: "Page",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Page to redirect after successful action",
                        insertText: "Page: "
                    }, {
                        label: "Contract",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Contract name to execute (case-sensitive)",
                        insertText: "Contract: "
                    }, {
                        label: "Params",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Contract execution parameters (case-sensitive)",
                        insertText: "Params: "
                    }, {
                        label: "PageParams",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Parameters which will be passed to the page upon successful redirection",
                        insertText: "PageParams: "
                    }]
                },
                Data: {
                    label: "Data",
                    documentation: "Data emitter that is filled with data by hand",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "Data(",
                    params: [{
                        label: "Source",
                        documentation: "Source identificator to bind results",
                        insertText: "Source: "
                    }, {
                        label: "Columns",
                        documentation: "List of columns separated with comma",
                        insertText: "Columns: "
                    }, {
                        label: "Data",
                        documentation: "Emitted data separated with comma line by line for each row",
                        insertText: "Data: "
                    }]
                },
                Div: {
                    label: "Div",
                    documentation: "Generic container for the content. You can use it to group other elements and apply specific styling or classes",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Div(",
                    params: [t.Body, t.Class]
                },
                Em: {
                    label: "Em",
                    documentation: "Specific element that marks the text that has stress emphasis",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Em(",
                    params: [t.Body, t.Class]
                },
                ForList: {
                    label: "ForList",
                    documentation: "List-iteration function. Body will be rendered once per element of the source",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "ForList(",
                    params: [{
                        label: "Source",
                        documentation: "Source identificator to fetch the results",
                        insertText: "Source: "
                    }, t.Body]
                },
                Form: {
                    label: "Form",
                    documentation: "Contract form container. All input elements must be placed within a form",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Form(",
                    params: [t.Body, t.Class]
                },
                GetVar: {
                    label: "GetVar",
                    documentation: "Get variable value",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "GetVar(",
                    params: [{
                        label: "Name",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Variable name to get the value of",
                        insertText: "Name: "
                    }]
                },
                If: {
                    label: "If",
                    documentation: "Conditional clause. Body elements will be shown only if the condition is truthy",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "If(",
                    params: [t.Body, {
                        label: "Condition",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Condition to met for this function to succeed",
                        insertText: "Condition: "
                    }]
                },
                Image: {
                    label: "Image",
                    documentation: "Static image element",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Image(",
                    params: [{
                        label: "Src",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Image URI",
                        insertText: "Src: "
                    }, {
                        label: "Alt",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Alternative text that is displayed when image is unable to load",
                        insertText: "Alt: "
                    }, t.Class]
                },
                ImageInput: {
                    label: "ImageInput",
                    documentation: "Image upload component with ability to crop images",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "ImageInput(",
                    params: [{
                        label: "Name",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Unique input name to bind the value to",
                        insertText: "Name: "
                    }, {
                        label: "Width",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Minimum width of the resulting image",
                        insertText: "Width: "
                    }, {
                        label: "Ratio",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Aspect ratio of the resulting image (WIDTH / HEIGHT)",
                        insertText: "Ratio: "
                    }, t.Class]
                },
                Include: {
                    label: "Include",
                    documentation: "Include another page or block and output its contents",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "Include(",
                    params: [{
                        label: "Name",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Page or block name to include",
                        insertText: "Name: "
                    }]
                },
                Input: {
                    label: "Input",
                    documentation: "Form input element to request user to enter some data",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Input(",
                    params: [t.Class, {
                        label: "Name",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Unique input name to bind the value to",
                        insertText: "Name: "
                    }, {
                        label: "Placeholder",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Placeholder text to show when input is empty",
                        insertText: "Placeholder: "
                    }, {
                        label: "Type",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Input type such as text or password",
                        insertText: "Type: "
                    }, {
                        label: "Value",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Default input value",
                        insertText: "Value: "
                    }]
                },
                InputErr: {
                    label: "InputErr",
                    documentation: "Validation message for the specific input",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "InputErr(",
                    params: [t.Class, {
                        label: "Name",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Unique input name to validate",
                        insertText: "Name: "
                    }]
                },
                Label: {
                    label: "Label",
                    documentation: "Form input label. Will set focus to bound input on click",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Label(",
                    params: [t.Body, t.Class, {
                        label: "For",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Unique input name to bind the label",
                        insertText: "For: "
                    }]
                },
                LangRes: {
                    label: "LangRes",
                    documentation: "Get language resource by name",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "LangRes(",
                    params: [{
                        label: "Name",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Unique resource name to get",
                        insertText: "Name: "
                    }, {
                        label: "Lang",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Explicitly set language of the resource to get",
                        insertText: "Lang: "
                    }]
                },
                LinkPage: {
                    label: "LinkPage",
                    documentation: "Static redirect link",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "LinkPage(",
                    params: [t.Body, {
                        label: "Page",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Page that will be loaded on click",
                        insertText: "Page: "
                    }, t.Class, {
                        label: "PageParams",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Parameters which will be passed to the page upon redirection",
                        insertText: "Params: "
                    }]
                },
                MenuGroup: {
                    label: "MenuGroup",
                    documentation: "Menu group that will replace current menu on click",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "MenuGroup(",
                    params: [t.Body, {
                        label: "Title",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Title of the menu button",
                        insertText: "Title: "
                    }, {
                        label: "Icon",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Optional icon to show near the menu button",
                        insertText: "Icon: "
                    }]
                },
                MenuItem: {
                    label: "MenuItem",
                    documentation: "Menu item button used to redirect user to another page",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "MenuItem(",
                    params: [{
                        label: "Title",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Title of the menu button",
                        insertText: "Title: "
                    }, {
                        label: "Page",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Page that will be loaded on click",
                        insertText: "Page: "
                    }, {
                        label: "Params",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Parameters which will be passed to the page upon redirection",
                        insertText: "Params: "
                    }, {
                        label: "Icon",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Optional icon to show near the button",
                        insertText: "Icon: "
                    }]
                },
                Or: {
                    label: "Or",
                    documentation: 'Logical "Or" operator. One of the parameters must be truthy',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "Or("
                },
                P: {
                    label: "P",
                    documentation: "HTML element that represents a paragraph of text",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "P(",
                    params: [t.Body, t.Class]
                },
                Select: {
                    label: "Select",
                    documentation: "Element with dropdown menu used to select one value from multiple choices",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Select(",
                    params: [{
                        label: "Name",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Unique input name to bind the value to",
                        insertText: "Name: "
                    }, {
                        label: "Source",
                        documentation: "Source identificator to fetch the results",
                        insertText: "Source: "
                    }, {
                        label: "NameColumn",
                        documentation: "Name of the column that will be shown in the dropdown menu",
                        insertText: "NameColumn: "
                    }, {
                        label: "ValueColumn",
                        documentation: "Value that will be passed to the form",
                        insertText: "ValueColumn: "
                    }, {
                        label: "Value",
                        documentation: "Default value that will be selected",
                        insertText: "Value: "
                    }, t.Class]
                },
                SetVar: {
                    label: "SetVar",
                    documentation: "Set variable value by name",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "SetVar(",
                    params: [{
                        label: "Name",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Variable name to set the value of",
                        insertText: "Name: "
                    }, {
                        label: "Value",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Variable name to set the value of",
                        insertText: "Value: "
                    }]
                },
                SetTitle: {
                    label: "SetTitle",
                    documentation: "Set text shown in the page header",
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: "SetTitle(",
                    params: [{
                        label: "Title",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Text to show in the header",
                        insertText: "Title: "
                    }]
                },
                Span: {
                    label: "Span",
                    documentation: "Generic container for the content. You can use it to group other elements and apply specific styling or classes",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Span(",
                    params: [t.Body, t.Class]
                },
                Strong: {
                    label: "Strong",
                    documentation: "Generic container for the content that will give text strong importance",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Strong(",
                    params: [t.Body, t.Class]
                },
                Table: {
                    label: "Table",
                    documentation: "Generic container for the content that will give text strong importance",
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: "Table(",
                    params: [{
                        label: "Source",
                        documentation: "Source identificator to fetch the results",
                        insertText: "Source: "
                    }, {
                        label: "Columns",
                        kind: monaco.languages.CompletionItemKind.Property,
                        documentation: "Optional filter for the coulmns to show. Format: ColumnTitle1=column1,ColumnTitl2=column2",
                        insertText: "Columns: "
                    }]
                }
            },
            o = function () {
                return r.map(a, function (e) {
                    return e
                })
            };
        e.languages.registerCompletionItemProvider("protypo", {
            provideCompletionItems: function (e, t) {
                var n = e.getValueInRange({
                        startLineNumber: 1,
                        startColumn: 1,
                        endLineNumber: t.lineNumber,
                        endColumn: t.column
                    }),
                    r = n.match(/ ?([A-Z][a-zA-Z]*)\(([a-zA-Z]*.*,)*[ a-zA-Z]*$/);
                return r && a[r[1]] ? a[r[1]].params : o()
            }
        }), monaco.languages.register({
            id: "protypo"
        }), e.languages.setMonarchTokensProvider("protypo", n.i(i.a)(r.map(a, function (e, t) {
            return e.kind === monaco.languages.CompletionItemKind.Method ? t : null
        }).filter(function (e) {
            return e
        }), r.map(a, function (e, t) {
            return e.kind === monaco.languages.CompletionItemKind.Function ? t : null
        }).filter(function (e) {
            return e
        })))
    }
};