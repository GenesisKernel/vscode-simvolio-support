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
        documentation: 'Address(Wallet)',
        insertText: 'Address',
        params: [{
            label: 'Wallet',
            documentation: 'Wallet ID to convert',
            insertText: 'Wallet: '
        }]
    },
    AddToolButton: {
        label: 'AddToolButton(Title, Icon, Page, PageParams)',
        documentation: '',
        insertText: 'AddToolButton',
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
        documentation: 'And(parameters)',
        insertText: 'And('
    },
    DBFind: {
        label: 'DBFind(Name, Source)',
        documentation: '[.Columns(columns)][.Where(conditions)][.WhereId(id)][.Order(name)][.Limit(limit)][.Offset(offset)][.Ecosystem(id)][.Custom(Column,Body)][.Vars(Prefix)]',
        insertText: 'DBFind',
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
        label: 'Button(Body, Page, Class, Contract, Params, PageParams)',
        documentation: '[.Alert(Text,ConfirmButton,CancelButton,Icon)] [.Style(Style)]',
        insertText: 'Button',
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
        label: 'Data(Source,Columns,Data)',
        documentation: '[.Custom(Column,Body)]',
        insertText: 'Data',
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
    CmpTime: {
        label: 'CmpTime(Time1, Time2)',
        documentation: '',
        insertText: 'CmpTime',
        params: [{
                label: 'Time1',
                documentation: '',
                insertText: 'Time1: '
            },
            {
                label: 'Time2',
                documentation: '',
                insertText: 'Time2: '
            },
        ]
    },
    Div: {
        label: 'Div(Class, Body) ',
        documentation: '[.Style(Style)]',
        insertText: 'Div',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    Calculate: {
        label: 'Calculate(Exp, Type, Prec) ',
        documentation: '',
        insertText: 'Calculate(',
        params: [{
            label: 'Type',
            documentation: 'int, float, money',
            insertText: 'Name: '
        }, {
            label: 'Exp',
            documentation: '',
            insertText: 'Exp: '
        }, {
            label: 'Prec',
            documentation: 'count of number after dot in "float" and "money"',
            insertText: 'Prec: '
        }]
    },
    Em: {
        label: 'Em',
        documentation: 'Em(Body, Class)',
        insertText: 'Em',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    ForList: {
        label: 'ForList(Source, Body)',
        documentation: '',
        insertText: 'ForList',
        params: [{
                label: 'Source',
                documentation: 'Source identificator to fetch the results',
                insertText: 'Source: '
            },
            staticParamTypes.Body
        ]
    },
    Form: {
        label: 'Form(Class, Body)',
        documentation: '[.Style(Style)]',
        insertText: 'Form',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    GetVar: {
        label: 'GetVar(Name)',
        documentation: '',
        insertText: 'GetVar',
        params: [{
            label: 'Name',
            documentation: 'Variable name to get the value of',
            insertText: 'Name: '
        }]
    },
    If: {
        label: 'If(Condition){ Body }',
        documentation: '[.ElseIf(Condition){ Body }] [.Else{ Body }]',
        insertText: 'If',
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
        label: 'Image(Src,Alt,Class)',
        documentation: '[.Style(Style)]',
        insertText: 'Image',
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
        label: 'ImageInput(Name, Width, Ratio, Format)',
        documentation: '',
        insertText: 'ImageInput',
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
        label: 'Include(Name)',
        documentation: '',
        insertText: 'Include',
        params: [{
            label: 'Name',
            documentation: 'Page or block name to include',
            insertText: 'Name: '
        }]
    },
    Input: {
        label: 'Input(Name,Class,Placeholder,Type,Value)',
        documentation: '[.Validate(validation parameters)] [.Style(Style)]',
        insertText: 'Input',
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
        label: 'InputErr(Name,validation errors)',
        documentation: '',
        insertText: 'InputErr',
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
        label: 'Label(Body, Class, For)',
        documentation: '[.Style(Style)]',
        insertText: 'Label',
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
        label: 'LangRes(Name, Lang)',
        documentation: '',
        insertText: 'LangRes',
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
        label: 'LinkPage(Body, Page, Class, PageParams)',
        documentation: '[.Style(Style)]',
        insertText: 'LinkPage',
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
        label: 'MenuGroup(Title, Body, Icon)',
        documentation: '',
        insertText: 'MenuGroup',
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
        label: 'MenuItem(Title, Page, Params, Icon, Vde)',
        documentation: '',
        insertText: 'MenuItem',
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
        label: 'Or(parameters)',
        documentation: '',
        insertText: 'Or('
    },
    P: {
        label: 'P(Body, Class)',
        documentation: '[.Style(Style)]',
        insertText: 'P',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    RadioGroup: {
        label: 'RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class)',
        documentation: '[.Validate(validation parameters)] [.Style(Style)]',
        insertText: 'RadioGroup',
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
        label: 'Select(Name, Source, NameColumn, ValueColumn, Value, Class)',
        documentation: '[.Validate(validation parameters)] [.Style(Style)]',
        insertText: 'Select',
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
        label: 'SetVar(Name, Value)',
        documentation: '',
        insertText: 'SetVar',
        params: [{
                label: 'Name',
                documentation: '',
                insertText: 'Name: '
            },
            {
                label: 'Value',
                documentation: '',
                insertText: 'Value: '
            }
        ]
    },
    SetTitle: {
        label: 'SetTitle(Title)',
        documentation: '',
        insertText: 'SetTitle',
        params: [{
            label: 'Title',
            documentation: '',
            insertText: 'Title: '
        }]
    },
    Span: {
        label: 'Span(Body, Class)',
        documentation: '[.Style(Style)]',
        insertText: 'Span',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    Strong: {
        label: 'Strong(Body, Class)',
        documentation: '',
        insertText: 'Strong',
        params: [
            staticParamTypes.Body,
            staticParamTypes.Class
        ]
    },
    Table: {
        label: 'Table(Source, Columns)',
        documentation: '[.Style(Style)]',
        insertText: 'Table',
        params: [{
                label: 'Source',
                documentation: '',
                insertText: 'Source: '
            },
            {
                label: 'Columns',
                documentation: '',
                insertText: 'Columns: '
            }
        ]
    },
    EcosysParam: {
        label: 'EcosysParam(Name, Index, Source)',
        documentation: '',
        insertText: 'EcosysParam',
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
    SysParam: {
        label: 'SysParam(Name)',
        documentation: '',
        insertText: 'SysParam',
        params: [{
                label: 'Name',
                documentation: '',
                insertText: 'Name: '
            }
        ]
    },
    DateTime: {
        label: 'DateTime(DateTime, Format)',
        documentation: '',
        insertText: 'DateTime',
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
    Code: {
        label: 'Code(some code)',
        documentation: '',
        insertText: 'Code(',
    },
    Chart: {
        label: 'Chart(Type, Source, FieldLabel, FieldValue, Colors)',
        documentation: '',
        insertText: 'Chart(',
        params: [{
                label: 'Type',
                documentation: '',
                insertText: 'Type: '
            },
            {
                label: 'Source',
                documentation: '',
                insertText: 'Source:'
            },
            {
                label: 'FieldLabel',
                documentation: '',
                insertText: 'FieldLabel:'
            },
            {
                label: 'FieldValue',
                documentation: '',
                insertText: 'FieldValue:'
            },
            {
                label: 'Colors',
                documentation: '',
                insertText: 'Colors:'
            }
        ]
    },
    InputMap: {
        label: 'InputMap(Name, Value, Type:poligon, MapType)',
        documentation: 'MapType:hybrid|roadmap|satellite|terrain',
        insertText: 'InputMap(',
        params: [{
                label: 'Name',
                documentation: '',
                insertText: 'Name: '
            },
            {
                label: 'Value',
                documentation: '',
                insertText: 'Value:'
            },
            {
                label: 'Type',
                documentation: '',
                insertText: 'Type:'
            },
            {
                label: 'MapType',
                documentation: '',
                insertText: 'MapType:'
            }
        ]
    },
    Map: {
        label: 'Map(Name, Value, Type:poligon, MapType)',
        documentation: 'MapType:hybrid|roadmap|satellite|terrain',
        insertText: 'InputMap(',
        params: [
            {
                label: 'Value',
                documentation: '',
                insertText: 'Value:'
            },
            {
                label: 'Type',
                documentation: '',
                insertText: 'Type:'
            },
            {
                label: 'MapType',
                documentation: '',
                insertText: 'MapType:'
            }
        ]
    },
}

exports.completions = functionDefs