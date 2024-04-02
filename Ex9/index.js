const readXlsxFile = require('read-excel-file/node');

readXlsxFile('./arquivo/aluno.xlsx').then(linhas => {
    let razao = []
    for (let i = 1; i < linhas.length; i++) {
        const element = linhas[i];
        let aluno = razao.find(e => e.ra === element[0])
        if (aluno == undefined) {
            if (element[2] == 'C') {
                razao.push({
                    ra: element[0],
                    R: [],
                    C: [element[1]]
                });
            }
            else {
                razao.push({
                    ra: element[0],
                    R: [element[1]],
                    C: []
                });
            }
        }
        else {
            if (element[2] == 'C') aluno.C.push(element[1])
            else aluno.R.push(element[1])
        }
    }
    console.log(razao)
});