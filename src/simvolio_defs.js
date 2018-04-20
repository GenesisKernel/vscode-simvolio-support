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
        label: 'CallContract(name string, params map)',
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
        label: 'AddressToId(address string) int',
        documentation: '',
        insertText: 'AddressToId(',
        params: []
    },
    IdToAddress: {
        label: 'IdToAddress(id int) string',
        documentation: '',
        insertText: 'IdToAddress(',
        params: []
    },
    Contains: {
        label: 'Contains(in, find string) bool',
        documentation: '',
        insertText: 'Contains(',
        params: []
    },
    Float: {
        label: 'Float(val int|string) float',
        documentation: '',
        insertText: 'Float(',
        params: []
    },
    HasPrefix: {
        label: 'HasPrefix',
        documentation: 'HasPrefix(in, prefix string) bool',
        insertText: 'HasPrefix(',
        params: []
    },
    HexToBytes: {
        label: 'HexToBytes',
        documentation: 'HexToBytes(hexdata string) bytes',
        insertText: 'HexToBytes(',
        params: []
    },
    Join: {
        label: 'Join',
        documentation: 'Join(in array, sep string) string',
        insertText: 'Join(',
        params: []
    },
    JSONToMap: {
        label: 'JSONToMap',
        documentation: 'JSONToMap(json string) map',
        insertText: 'JSONToMap(',
        params: []
    },
    Split: {
        label: 'Split',
        documentation: 'Split(s, sep string) array',
        insertText: 'Split(',
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
        label: 'UpdateSysParam(Name, Value string, Conditions string "optional")',
        documentation: '',
        insertText: 'UpdateSysParam("Name,Value,Conditions", ',
        params: []
    },
    EcosysParam: {
        label: 'EcosysParam',
        documentation: 'EcosysParam(name string) string',
        insertText: 'EcosysParam(',
        params: []
    },
    DBInsert: {
        label: 'DBInsert',
        documentation: 'DBInsert(table, params string, val ...)',
        insertText: 'DBInsert(',
        params: []
    },
    DBFind: {
        label: 'DBRow(table string)',
        documentation: '.Columns(columns string) .Where(where string, params ...) .WhereId(id int) .Order(order string) .Limit(limit int) .Offset(offset int) .Ecosystem(id int) .Row() .One(col string) .Count()',
        insertText: 'DBFind(',
        params: []
    },
    DBRow: {
        label: 'DBFind(table string)',
        documentation: '.Columns(columns string) .Where(where string, params ...) .WhereId(id int) .Order(order string) .Ecosystem(id int)',
        insertText: 'DBFind(',
        params: []
    },
    AppParam: {
        label: 'AppParam(app int, name string) string',
        documentation: '',
        insertText: 'AppParam(',
        params: []
    },
    DBInsertReport: {
        label: 'DBInsertReport',
        documentation: '',
        insertText: 'DBInsertReport(',
        params: []
    },
    DBUpdate: {
        label: 'DBUpdate',
        documentation: 'DBUpdate(table string, id int, params string, val...)',
        insertText: 'DBUpdate(',
        params: []
    },
    DBUpdateExt: {
        label: 'DBUpdateExt',
        documentation: '',
        insertText: 'DBUpdateExt(',
        params: []
    },
    DBUpdateSysParam: {
        label: 'DBUpdateSysParam',
        documentation: 'DBUpdateSysParam(name, value, conditions string)',
        insertText: 'DBUpdateSysParam(',
        params: []
    },
    DecodeBase64: {
        label: 'DecodeBase64(text string) string',
        documentation: '',
        insertText: 'DecodeBase64(',
        params: []
    },
    DateTime: {
        label: 'DateTime',
        documentation: '',
        insertText: 'DateTime(',
        params: [
            {
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
    MoneyTransfer: {
        label: 'MoneyTransfer(Recipient, Amount string, Comment string "optional")',
        documentation: '',
        insertText: 'MoneyTransfer("Recipient,Amount,Comment", ',
        params: []
    },
    NewContract: {
        label: 'NewContract(Value, Conditions string, Wallet string "optional", TokenEcosystem int "optional")',
        documentation: '',
        insertText: 'NewContract("Value,Conditions,Wallet,TokenEcosystem", ',
        params: []
    },
    EditContract: {
        label: 'EditContract(Id int, Value, Conditions string, WalletId string "optional")',
        documentation: '',
        insertText: 'EditContract("Id,Value,Conditions,WalletId",',
        params: []
    },
    ActivateContract: {
        label: 'ActivateContract(Id int)',
        documentation: '',
        insertText: 'ActivateContract("Id", ',
        params: []
    },
    NewEcosystem: {
        label: 'NewEcosystem(Name  string "optional")',
        documentation: '',
        insertText: 'NewEcosystem("Name", ',
        params: []
    },
    NewParameter: {
        label: 'NewParameter(Name, Value, Conditions string)',
        documentation: '',
        insertText: 'NewParameter("Name,Value,Conditions", ',
        params: []
    },
    EditParameter: {
        label: 'EditParameter(Id int, Value, Conditions string)',
        documentation: '',
        insertText: 'EditParameter("Id,Value,Conditions", ',
        params: []
    },
    NewMenu: {
        label: 'NewMenu(Name, Value, Conditions string, Title string "optional")',
        documentation: '',
        insertText: 'NewMenu("Name,Value,Conditions,Title", ',
        params: []
    },
    EditMenu: {
        label: 'EditMenu(Id int, Value, Conditions string, Title string "optional")',
        documentation: '',
        insertText: 'EditMenu("Id,Value,Conditions,Title", ',
        params: []
    },
    AppendMenu: {
        label: 'AppendMenu(Id int, Value string)',
        documentation: '',
        insertText: 'AppendMenu("Id,Value", ',
        params: []
    },
    NewPage: {
        label: 'NewPage(Name, Value, Menu, Conditions string)',
        documentation: '',
        insertText: 'NewPage("Name,Value,Menu,Conditions", ',
        params: []
    },
    EditPage: {
        label: 'EditPage(Id int, Value, Menu, Conditions string)',
        documentation: '',
        insertText: 'EditPage("Id,Value,Menu,Conditions", ',
        params: []
    },
    AppendPage: {
        label: 'AppendPage(Id int, Value string)',
        documentation: '',
        insertText: 'AppendPage("Id,Value", ',
        params: []
    },
    NewLang: {
        label: 'NewLang(Name, Trans string)',
        documentation: '',
        insertText: 'NewLang("Name,Trans", ',
        params: []
    },
    EditLang: {
        label: 'EditLang(Name, Trans string)',
        documentation: '',
        insertText: 'EditLang("Name,Trans", ',
        params: []
    },
    NewSign: {
        label: 'NewSign(Name, Value, Conditions string)',
        documentation: '',
        insertText: 'NewSign("Name,Value,Conditions", ',
        params: []
    },
    EditSign: {
        label: 'EditSign(Id int, Value, Conditions string)',
        documentation: '',
        insertText: 'EditSign("Id,Value,Conditions", ',
        params: []
    },
    NewBlock: {
        label: 'NewBlock(Name, Value, Conditions string)',
        documentation: '',
        insertText: 'NewBlock("Name,Value,Conditions", ',
        params: []
    },
    EditBlock: {
        label: 'EditBlock(Id int, Value, Conditions string)',
        documentation: '',
        insertText: 'EditBlock("Id,Value,Conditions", ',
        params: []
    },
    NewTable: {
        label: 'NewTable(Name, Columns, Permissions string)',
        documentation: '',
        insertText: 'NewTable("Name,Columns,Permissions", ',
        params: []
    },
    EditTable: {
        label: 'EditTable(Name, Permissions string)',
        documentation: '',
        insertText: 'EditTable("Name,Permissions", ',
        params: []
    },
    NewColumn: {
        label: 'NewColumn(TableName, Name, Type, Permissions string)',
        documentation: '',
        insertText: 'NewColumn("TableName,Name,Type,Permissions", ',
        params: []
    },
    EditColumn: {
        label: 'EditColumn(TableName, Name, Permissions string)',
        documentation: '',
        insertText: 'EditColumn("TableName,Name,Permissions", ',
        params: []
    },
    Import: {
        label: 'Import(Data string)',
        documentation: '',
        insertText: 'Import("Data", ',
        params: []
    },
    DeactivateContract: {
        label: 'DeactivateContract(Id int)',
        documentation: '',
        insertText: 'DeactivateContract("Id", ',
        params: []
    },
    GetContractById: {
        label: 'GetContractById(id int) string',
        documentation: '',
        insertText: 'GetContractById(',
        params: []
    },
    GetContractByName: {
        label: 'GetContractByName(name string) int',
        documentation: '',
        insertText: 'GetContractByName(',
        params: []
    },

}

exports.completions = functionDefs