const readXlsxFile = require('read-excel-file/node');

readXlsxFile('./files/dados.xlsx').then(linhas => {
    console.log(linhas);
});