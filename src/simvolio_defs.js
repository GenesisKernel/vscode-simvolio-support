const functionDefs = {
    LangRes: {
        label: 'LangRes',
        documention: '',
        insertText: 'LangRes(',
        params: []
    },
    FindEcosystem: {
        label: 'FindEcosystem',
        documentation: '',
        insertText: 'FindEcosystem(',
        params: []
    },
    CallContract: {
        label: 'CallContract',
        documentation: '',
        insertText: 'CallContract(',
        params: []
    },
    ContractAccess: {
        label: 'ContractAccess',
        documentation: '',
        insertText: 'ContractAccess(',
        params: []
    },
    ContractConditions: {
        label: 'ContractConditions',
        documentation: '',
        insertText: 'ContractConditions(',
        params: []
    },
    EvalCondition: {
        label: 'EvalCondition',
        documentation: '',
        insertText: 'EvalCondition(',
        params: []
    },
    ValidateCondition: {
        label: 'ValidateCondition',
        documentation: '',
        insertText: 'ValidateCondition(',
        params: []
    },
    AddressToId: {
        label: 'AddressToId(address string)',
        documentation: '',
        insertText: 'AddressToId(',
        params: []
    },
    Contains: {
        label: 'Contains',
        documentation: '',
        insertText: 'Contains(',
        params: []
    },
    Float: {
        label: 'Float',
        documentation: '',
        insertText: 'Float(',
        params: []
    },
    HasPrefix: {
        label: 'HasPrefix',
        documentation: '',
        insertText: 'HasPrefix(',
        params: []
    },
    HexToBytes: {
        label: 'HexToBytes',
        documentation: '',
        insertText: 'HexToBytes(',
        params: []
    },
    Int: {
        label: 'Int',
        documentation: '',
        insertText: 'Int(',
        params: []
    },
    Len: {
        label: 'Len',
        documentation: '',
        insertText: 'Len(',
        params: []
    },
    PubToID: {
        label: 'PubToID',
        documentation: '',
        insertText: 'PubToID(',
        params: []
    },
    Replace: {
        label: 'Replace',
        documentation: '',
        insertText: 'Replace(',
        params: []
    },
    Size: {
        label: 'Size',
        documentation: '',
        insertText: 'Size(',
        params: []
    },
    Sha256: {
        label: 'Sha256',
        documentation: '',
        insertText: 'Sha256(',
        params: []
    },
    Sprintf: {
        label: 'Sprintf',
        documentation: '',
        insertText: 'Sprintf(',
        params: []
    },
    Str: {
        label: 'Str',
        documentation: '',
        insertText: 'Str(',
        params: []
    },
    Substr: {
        label: 'Substr',
        documentation: '',
        insertText: 'Substr(',
        params: []
    },
    UpdateLang: {
        label: 'UpdateLang',
        documentation: '',
        insertText: 'UpdateLang(',
        params: []
    },
    SysParamString: {
        label: 'SysParamString',
        documentation: '',
        insertText: 'SysParamString(',
        params: []
    },
    SysParamInt: {
        label: 'SysParamInt',
        documentation: '',
        insertText: 'SysParamInt(',
        params: []
    },
    UpdateSysParam: {
        label: 'UpdateSysParam',
        documentation: '',
        insertText: 'UpdateSysParam(',
        params: []
    },
    EcosysParam: {
        label: 'EcosysParam',
        documentation: '',
        insertText: 'EcosysParam(',
        params: []
    },
    DBInsert: {
        label: 'DBInsert(tblname string, params string, val ...)',
        documentation: '',
        insertText: 'DBInsert(',
        params: []
    },
    DBFind: {
        label: 'DBRow(table string)',
        documentation: '[.Columns(columns string)][.Where(where string, params ...)][.WhereId(id int)][.Order(order string)][.Limit(limit int)][.Offset(offset int)][.Ecosystem(ecosystemid int)]',
        insertText: 'DBFind(',
        params: []
    },
    DBRow: {
        label: 'DBFind(table string)',
        documentation: '[.Columns(columns string)] [.Where(where string, params ...)] [.WhereId(id int)] [.Order(order string)] [.Ecosystem(ecosystemid int)]',
        insertText: 'DBFind(',
        params: []
    },
    Where: {
        label: 'Where',
        documentation: '',
        insertText: '.Where(',
        params: []
    },
    DBInsertReport: {
        label: 'DBInsertReport',
        documentation: '',
        insertText: 'DBInsertReport(',
        params: []
    },
    DBUpdate: {
        label: 'DBUpdate(tblname string, id int, params string, val...)',
        documentation: '',
        insertText: 'DBUpdate(',
        params: []
    },
    DBUpdateExt: {
        label: 'DBUpdateExt',
        documentation: '',
        insertText: 'DBUpdateExt(',
        params: []
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