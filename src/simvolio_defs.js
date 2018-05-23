const functionDefs = {
    LangRes: {
        label: 'LangRes(appID int64, name, lang string) string',
        documention: '',
        insertText: 'LangRes(',
        params: []
    },
    CallContract: {
        label: 'CallContract(name string, params map)',
        documentation: '',
        insertText: 'CallContract(',
        params: []
    },
    ContractAccess: {
        label: 'ContractAccess(name [,name] string) bool',
        documentation: '',
        insertText: 'ContractAccess(',
        params: []
    },
    ContractConditions: {
        label: 'ContractConditions(name [,name] string) bool',
        documentation: '',
        insertText: 'ContractConditions(',
        params: []
    },
    EvalCondition: {
        label: 'EvalCondition(table, name, condfield string)',
        documentation: '',
        insertText: 'EvalCondition(',
        params: []
    },
    ValidateCondition: {
        label: 'ValidateCondition(condition string, ecosystemid int)',
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
        label: 'HasPrefix(in, prefix string) bool',
        documentation: '',
        insertText: 'HasPrefix(',
        params: []
    },
    HexToBytes: {
        label: 'HexToBytes(hexdata string) bytes',
        documentation: '',
        insertText: 'HexToBytes(',
        params: []
    },
    Join: {
        label: 'Join(in array, sep string) string',
        documentation: '',
        insertText: 'Join(',
        params: []
    },
    JSONToMap: {
        label: 'JSONToMap(json string) map',
        documentation: 'deprecated. Better using JSONEncode',
        insertText: 'JSONToMap(',
        params: []
    },
    Split: {
        label: 'Split(s, sep string) array',
        documentation: '',
        insertText: 'Split(',
        params: []
    },
    Int: {
        label: 'Int(n string|nil|int) int',
        documentation: '',
        insertText: 'Int(',
        params: []
    },
    Len: {
        label: 'Len(a array) int',
        documentation: '',
        insertText: 'Len(',
        params: []
    },
    PubToID: {
        label: 'PubToID(hexkey string) int',
        documentation: '',
        insertText: 'PubToID(',
        params: []
    },
    Replace: {
        label: 'Replace(s, old, new string) string',
        documentation: '',
        insertText: 'Replace(',
        params: []
    },
    Size: {
        label: 'Size(s string) int',
        documentation: '',
        insertText: 'Size(',
        params: []
    },
    Sha256: {
        label: 'Sha256(s string) string',
        documentation: '',
        insertText: 'Sha256(',
        params: []
    },
    Sprintf: {
        label: 'Sprintf(pattern string, vals...) string',
        documentation: '%d int, %s string, %f float, %v any, %T type value',
        insertText: 'Sprintf(',
        params: []
    },
    Str: {
        label: 'Str(s int|float) string',
        documentation: '',
        insertText: 'Str(',
        params: []
    },
    Substr: {
        label: 'Substr(s string, offset, length int) string',
        documentation: '',
        insertText: 'Substr(',
        params: []
    },
    UpdateLang: {
        label: 'UpdateLang(appID int, name, trans string)',
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
        label: 'SysParamInt(name string) int',
        documentation: '',
        insertText: 'SysParamInt(',
        params: []
    },
    UpdateSysParam: {
        label: 'UpdateSysParam(Name, Value, Conditions "optional" string)',
        documentation: '',
        insertText: 'UpdateSysParam("Name,Value,Conditions", ',
        params: []
    },
    EcosysParam: {
        label: 'EcosysParam(name string) string',
        documentation: '',
        insertText: 'EcosysParam(',
        params: []
    },
    DBInsert: {
        label: 'DBInsert(table, params string, vals...)',
        documentation: '',
        insertText: 'DBInsert(',
        params: []
    },
    DBFind: {
        label: 'DBFind(table string)',
        documentation: '.Columns(columns string) .Where(where string, params ...) .WhereId(id int) .Order(order string) .Limit(limit int) .Offset(offset int) .Ecosystem(id int) .Row() .One(col string) .Count()',
        insertText: 'DBFind(',
        params: []
    },
    AppParam: {
        label: 'AppParam(app int, name string) string',
        documentation: '',
        insertText: 'AppParam(',
        params: []
    },
    DBUpdate: {
        label: 'DBUpdate(table string, id int, params string, vals...)',
        documentation: '',
        insertText: 'DBUpdate(',
        params: []
    },
    DBUpdateExt: {
        label: 'DBUpdateExt(table, column string, val (int|string), params string, vals...)',
        documentation: '',
        insertText: 'DBUpdateExt(',
        params: []
    },
    DBUpdateSysParam: {
        label: 'DBUpdateSysParam(name, value, conditions string)',
        documentation: '',
        insertText: 'DBUpdateSysParam(',
        params: []
    },
    DecodeBase64: {
        label: 'DecodeBase64(text string) string',
        documentation: '',
        insertText: 'DecodeBase64(',
        params: []
    },
    MoneyTransfer: {
        label: 'MoneyTransfer(Recipient, Amount, Comment "optional" string)',
        documentation: '',
        insertText: 'MoneyTransfer("Recipient,Amount,Comment", ',
        params: []
    },
    NewContract: {
        label: 'NewContract(Value, Conditions, Wallet "optional" string, TokenEcosystem int "optional")',
        documentation: '',
        insertText: 'NewContract("Value,Conditions,Wallet,TokenEcosystem", ',
        params: []
    },
    EditContract: {
        label: 'EditContract(Id int, Value, Conditions, WalletId "optional" string)',
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
        label: 'GetContractByName(s string) int',
        documentation: '',
        insertText: 'GetContractByName(',
        params: []
    },
    StringToBytes: {
        label: 'StringToBytes(s string) bytes',
        documentation: '',
        insertText: 'StringToBytes(',
        params: []
    },
    BytesToString: {
        label: 'BytesToString(s bytes) string',
        documentation: '',
        insertText: 'BytesToString(',
        params: []
    },
    Println: {
        label: 'Println(... any)',
        documentation: '',
        insertText: 'Println(',
        params: []
    },
    JSONEncode: {
        label: 'JSONEncode(n int|float|string|map|array) string',
        documentation: '',
        insertText: 'JSONEncode(',
        params: []
    },
    JSONDecode: {
        label: 'JSONDecode(s string) int|float|string|map|array',
        documentation: '',
        insertText: 'JSONDecode(',
        params: []
    },
    UploadBinary: {
        label: 'UploadBinary(ApplicationId int, Name string, Data bytes "file", DataMimeType string "optional")',
        documentation: '',
        insertText: 'UploadBinary("ApplicationId,Name,Data,DataMimeType", ',
        params: []
    },

}

exports.completions = functionDefs