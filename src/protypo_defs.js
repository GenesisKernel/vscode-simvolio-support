const vscode = require('vscode')

// *** https://github.com/AplaProject/apla-front/blob/master/src/components/Editor/protypo/index.ts
// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

const staticParamTypes = {
    Body: {
        label: 'Body',
        documentation: 'Contents of this element',
        insertText: 'Body: '
    },
    Class: {
        label: 'Class',
        documentation: 'HTML class value',
        insertText: 'Class: '
    }
};

const functionDefs = {
    Address: {
        label: 'Address',
        documentation: 'Converts wallet ID to address in readable format',
        insertText: 'Address(',
        params: [{
            label: 'Wallet',
            documentation: 'Wallet ID to convert',
            insertText: 'Wallet: '
        }]
    },
    AddToolButton: {
        label: 'AddToolButton',
        documentation: 'Add a tool button to the page header',
        insertText: 'AddToolButton(',
        params: [{
                label: 'Title',
                documentation: 'Button title to show',
                insertText: 'Title:'
            },
            {
                label: 'Icon',
                documentation: 'Optional icon to show near the button',
                insertText: 'Icon: '
            },
            {
                label: 'Page',
                documentation: 'Page that will be loaded on click',
                insertText: 'Page: '
            },
            {
                label: 'PageParams',
                documentation: 'Parameters which will be passed to the page upon redirection',
                insertText: 'Params: '
            }
        ]
    },
    And: {
        label: 'And',
        documentation: 'Logical "And" operator. All parameters must be truthy',
        insertText: 'And('
    },
    DBFind: {
        label: 'DBFind',
        documentation: 'Database search',
        insertText: 'DBFind(',
        params: [{
                label: 'Name',
                documentation: 'Table name to search',
                insertText: 'Name: '
            },
            {
                label: 'Source',
                documentation: 'Source identificator to bind results',
                insertText: 'Source: '
            }
        ]
    },
    Button: {
        label: 'Button',
        documentation: 'Button element',
        insertText: 'Button(',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class,
            {
                label: 'Page',
                documentation: 'Page to redirect after successful action',
                insertText: 'Page: '
            },
            {
                label: 'Contract',
                documentation: 'Contract name to execute (case-sensitive)',
                insertText: 'Contract: '
            },
            {
                label: 'Params',
                documentation: 'Contract execution parameters (case-sensitive)',
                insertText: 'Params: '
            },
            {
                label: 'PageParams',
                documentation: 'Parameters which will be passed to the page upon successful redirection',
                insertText: 'PageParams: '
            }
        ]
    },
    Data: {
        label: 'Data',
        documentation: 'Data emitter that is filled with data by hand',
        insertText: 'Data(',
        params: [{
                label: 'Source',
                documentation: 'Source identificator to bind results',
                insertText: 'Source: '
            },
            {
                label: 'Columns',
                documentation: 'List of columns separated with comma',
                insertText: 'Columns: '
            },
            {
                label: 'Data',
                documentation: 'Emitted data separated with comma line by line for each row',
                insertText: 'Data: '
            }
        ]
    },
    Div: {
        label: 'Div',
        documentation: 'Generic container for the content. You can use it to group other elements and apply specific styling or classes',
        insertText: 'Div(',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    Em: {
        label: 'Em',
        documentation: 'Specific element that marks the text that has stress emphasis',
        insertText: 'Em(',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    ForList: {
        label: 'ForList',
        documentation: 'List-iteration function. Body will be rendered once per element of the source',
        insertText: 'ForList(',
        params: [{
                label: 'Source',
                documentation: 'Source identificator to fetch the results',
                insertText: 'Source: '
            },
            staticParamTypes.Body
        ]
    },
    Form: {
        label: 'Form',
        documentation: 'Contract form container. All input elements must be placed within a form',
        insertText: 'Form(',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    GetVar: {
        label: 'GetVar',
        documentation: 'Get variable value',
        insertText: 'GetVar(',
        params: [{
            label: 'Name',
            documentation: 'Variable name to get the value of',
            insertText: 'Name: '
        }]
    },
    If: {
        label: 'If',
        documentation: 'Conditional clause. Body elements will be shown only if the condition is truthy',
        insertText: 'If(',
        params: [
            staticParamTypes.Body,
            {
                label: 'Condition',
                documentation: 'Condition to met for this function to succeed',
                insertText: 'Condition: '
            }
        ]
    },
    Image: {
        label: 'Image',
        documentation: 'Static image element',
        insertText: 'Image(',
        params: [{
                label: 'Src',
                documentation: 'Image URI',
                insertText: 'Src: '
            },
            {
                label: 'Alt',
                documentation: 'Alternative text that is displayed when image is unable to load',
                insertText: 'Alt: '
            },
            staticParamTypes.Class
        ]
    },
    ImageInput: {
        label: 'ImageInput',
        documentation: 'Image upload component with ability to crop images',
        insertText: 'ImageInput(',
        params: [{
                label: 'Name',
                documentation: 'Unique input name to bind the value to',
                insertText: 'Name: '
            },
            {
                label: 'Width',
                documentation: 'Minimum width of the resulting image',
                insertText: 'Width: '
            },
            {
                label: 'Ratio',
                documentation: 'Aspect ratio of the resulting image (WIDTH / HEIGHT)',
                insertText: 'Ratio: '
            },
            {
                label: 'Format',
                documentation: 'What format to use when generating the result',
                insertText: 'Format: '
            },
            staticParamTypes.Class
        ]
    },
    Include: {
        label: 'Include',
        documentation: 'Include another page or block and output its contents',
        insertText: 'Include(',
        params: [{
            label: 'Name',
            documentation: 'Page or block name to include',
            insertText: 'Name: '
        }]
    },
    Input: {
        label: 'Input',
        documentation: 'Form input element to request user to enter some data',
        insertText: 'Input(',
        params: [
            staticParamTypes.Class,
            {
                label: 'Name',
                documentation: 'Unique input name to bind the value to',
                insertText: 'Name: '
            },
            {
                label: 'Placeholder',
                documentation: 'Placeholder text to show when input is empty',
                insertText: 'Placeholder: '
            },
            {
                label: 'Type',
                documentation: 'Input type such as text or password',
                insertText: 'Type: '
            },
            {
                label: 'Value',
                documentation: 'Default input value',
                insertText: 'Value: '
            },
            {
                label: 'Disabled',
                documentation: 'Sets input state to read-only. Any non-empty value will be treated as true',
                insertText: 'Disabled: '
            }
        ]
    },
    InputErr: {
        label: 'InputErr',
        documentation: 'Validation message for the specific input',
        insertText: 'InputErr(',
        params: [
            staticParamTypes.Class,
            {
                label: 'Name',
                documentation: 'Unique input name to validate',
                insertText: 'Name: '
            }
        ]
    },
    Label: {
        label: 'Label',
        documentation: 'Form input label. Will set focus to bound input on click',
        insertText: 'Label(',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class,
            {
                label: 'For',
                documentation: 'Unique input name to bind the label',
                insertText: 'For: '
            }
        ]
    },
    LangRes: {
        label: 'LangRes',
        documentation: 'Get language resource by name',
        insertText: 'LangRes(',
        params: [{
                label: 'Name',
                documentation: 'Unique resource name to get',
                insertText: 'Name: '
            },
            {
                label: 'Lang',
                documentation: 'Explicitly set language of the resource to get',
                insertText: 'Lang: '
            }
        ]
    },
    LinkPage: {
        label: 'LinkPage',
        documentation: 'Static redirect link',
        insertText: 'LinkPage(',
        params: [
            staticParamTypes.Body,
            {
                label: 'Page',
                documentation: 'Page that will be loaded on click',
                insertText: 'Page: '
            },
            staticParamTypes.Class,
            {
                label: 'PageParams',
                documentation: 'Parameters which will be passed to the page upon redirection',
                insertText: 'Params: '
            }
        ]
    },
    MenuGroup: {
        label: 'MenuGroup',
        documentation: 'Menu group that will replace current menu on click',
        insertText: 'MenuGroup(',
        params: [
            staticParamTypes.Body,
            {
                label: 'Title',
                documentation: 'Title of the menu button',
                insertText: 'Title: '
            },
            {
                label: 'Icon',
                documentation: 'Optional icon to show near the menu button',
                insertText: 'Icon: '
            }
        ]
    },
    MenuItem: {
        label: 'MenuItem',
        documentation: 'Menu item button used to redirect user to another page',
        insertText: 'MenuItem(',
        params: [{
                label: 'Title',
                documentation: 'Title of the menu button',
                insertText: 'Title: '
            },
            {
                label: 'Page',
                documentation: 'Page that will be loaded on click',
                insertText: 'Page: '
            },
            {
                label: 'Params',
                documentation: 'Parameters which will be passed to the page upon redirection',
                insertText: 'Params: '
            },
            {
                label: 'Icon',
                documentation: 'Optional icon to show near the button',
                insertText: 'Icon: '
            }
        ]
    },
    Or: {
        label: 'Or',
        documentation: 'Logical "Or" operator. One of the parameters must be truthy',
        insertText: 'Or('
    },
    P: {
        label: 'P',
        documentation: 'HTML element that represents a paragraph of text',
        insertText: 'P(',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    RadioGroup: {
        label: 'RadioGroup',
        documentation: 'List of options represented with radio buttons',
        insertText: 'RadioGroup(',
        params: [{
                label: 'Name',
                documentation: 'Unique input name to bind the value to',
                insertText: 'Name: '
            },
            {
                label: 'Source',
                documentation: 'Source identificator to fetch the results',
                insertText: 'Source: '
            },
            {
                label: 'NameColumn',
                documentation: 'Name of the column that will be shown near the button',
                insertText: 'NameColumn: '
            },
            {
                label: 'ValueColumn',
                documentation: 'Value that will be passed to the form',
                insertText: 'ValueColumn: '
            },
            {
                label: 'Value',
                documentation: 'Default value that will be selected',
                insertText: 'Value: '
            },
            staticParamTypes.Class
        ]
    },
    Select: {
        label: 'Select',
        documentation: 'Element with dropdown menu used to select one value from multiple choices',
        insertText: 'Select(',
        params: [{
                label: 'Name',
                documentation: 'Unique input name to bind the value to',
                insertText: 'Name: '
            },
            {
                label: 'Source',
                documentation: 'Source identificator to fetch the results',
                insertText: 'Source: '
            },
            {
                label: 'NameColumn',
                documentation: 'Name of the column that will be shown in the dropdown menu',
                insertText: 'NameColumn: '
            },
            {
                label: 'ValueColumn',
                documentation: 'Value that will be passed to the form',
                insertText: 'ValueColumn: '
            },
            {
                label: 'Value',
                documentation: 'Default value that will be selected',
                insertText: 'Value: '
            },
            staticParamTypes.Class
        ]
    },
    SetVar: {
        label: 'SetVar',
        documentation: 'Set variable value by name',
        insertText: 'SetVar(',
        params: [{
                label: 'Name',
                documentation: 'Variable name to set the value of',
                insertText: 'Name: '
            },
            {
                label: 'Value',
                documentation: 'Variable name to set the value of',
                insertText: 'Value: '
            }
        ]
    },
    SetTitle: {
        label: 'SetTitle',
        documentation: 'Set text shown in the page header',
        insertText: 'SetTitle(',
        params: [{
            label: 'Title',
            documentation: 'Text to show in the header',
            insertText: 'Title: '
        }]
    },
    Span: {
        label: 'Span',
        documentation: 'Generic container for the content. You can use it to group other elements and apply specific styling or classes',
        insertText: 'Span(',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    Strong: {
        label: 'Strong',
        documentation: '',
        insertText: 'Strong(',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    Table: {
        label: 'Table',
        documentation: '',
        insertText: 'Table(',
        params: [{
                label: 'Source',
                documentation: 'Source identificator to fetch the results',
                insertText: 'Source: '
            },
            {
                label: 'Columns',
                documentation: 'Optional filter for the coulmns to show. Format: ColumnTitle1=column1,ColumnTitl2=column2',
                insertText: 'Columns: '
            }
        ]
    },
    EcosysParam: {
        label: 'EcosysParam',
        documentation: '',
        insertText: 'EcosysParam(',
        params: [{
                label: 'Source',
                documentation: '',
                insertText: 'Source: '
            },
            {
                label: 'Index',
                documentation: '',
                insertText: 'Index: '
            },
            {
                label: 'Name',
                documentation: '',
                insertText: 'Name: '
            }
        ]
    },
    DateTime: {
        label: 'DateTime',
        documentation: '',
        insertText: 'DateTime(',
        params: [{
                label: 'DateTime',
                documentation: '',
                insertText: 'DateTime: '
            },
            {
                label: 'Format',
                documentation: '',
                insertText: 'Format: YYYY-MM-DD HH:MI:SS'
            }
        ]
    },
}

exports.completions = functionDefs