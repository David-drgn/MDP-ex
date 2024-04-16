const transactions = []
const transactionsFile = []
let select = document.getElementsByTagName('input');

const inputsData = []
const inputsData2 = []
for (let i = 0; i < select.length; i++) {
    const element = select[i];
    if (element.type == "text" || element.type == "number" || element.type == "datetime-local" || element.type == "date") {
        if (element.className == "base1") inputsData.push(element)
        else if (element.className == "base2") inputsData2.push(element)
    }
}

console.log(inputsData2)

const inputFile = document.getElementById('fileInput')

let users = []

const registerUser = async () => {
    let username = window.prompt('Digite o seu nome de usuário, para o cadastro')
    let userpass = window.prompt('Digite a senha de usuário, para o cadastro')

    if (username.length > 10) {
        alert("O CAMPO DE USUÁRIO NÃO PODE TER MAIS DE 10 CARECTERES")
        return false
    }

    if (username == "" || userpass == "") {
        alert("UM CAMPO ESTÁ VAZIO, TENTE NOVAMENTE")
        return false
    }

    let getUser = users.find(e => e.username === username)
    if (getUser != undefined) {
        alert("Esse usuário já existe")
        return false
    }

    let userLog = users.find(e => e.inuse)
    if (userLog != undefined) userLog.inuse = false

    users.push({
        inuse: true,
        username,
        userpass
    })

    inputsData[inputsData.length - 1].value = username
    inputsData2[inputsData2.length - 1].value = username
    return true
}

const login = () => {
    let username = window.prompt('Digite o seu nome de usuário, para o cadastro')
    let userpass = window.prompt('Digite a senha de usuário, para o cadastro')

    if (username.length > 10) {
        alert("O CAMPO DE USUÁRIO NÃO PODE TER MAIS DE 10 CARECTERES")
        return false
    }

    if (username == "" || userpass == "") {
        alert("UM CAMPO ESTÁ VAZIO, TENTE NOVAMENTE")
        return false
    }

    let getUser = users.find(e => e.username === username && e.userpass === userpass)
    if (getUser == undefined) {
        alert("Esse usuário não existe")
        return false
    }

    let userLog = users.find(e => e.inuse)
    if (userLog != undefined) userLog.inuse = false

    inputsData[inputsData.length - 1].value = username
    inputsData2[inputsData2.length - 1].value = username
    getUser.inuse = true
}

window.addEventListener('load', async () => {
    let recive = await registerUser()
    if (!recive) location.reload()
})

class TransactionExcel {
    pk;
    descAliquota;
    percAliquota;
    dataHoraManutencao;
    usuarioManutencao;

    constructor(inputs) {
        this.pk = {
            codMunicipio: inputs[0].value,
            dataVigencia: inputs[1].value,
            conta: inputs[2].value
        }
        this.codServico = inputs[3].value;
        this.dataHoraManutencao = inputs[5].value;
        this.usuarioManutencao = inputs[6].value
    }

    getEvery() {
        return [
            this.pk.codMunicipio,
            this.pk.dataVigencia,
            this.pk.codServico,
            this.descAliquota,
            this.percAliquota,
            this.dataHoraManutencao,
            this.usuarioManutencao]
    }
}

class Transaction {
    pk;
    descAliquota;
    percAliquota;
    dataHoraManutencao;
    usuarioManutencao;

    constructor(inputs) {
        this.pk = {
            codMunicipio: inputs[0].value,
            dataVigencia: inputs[1].value,
            codServico: inputs[2].value
        }
        this.descAliquota = inputs[3].value;
        this.percAliquota = parseFloat(inputs[4].value).toFixed(2);
        this.dataHoraManutencao = inputs[5].value;
        this.usuarioManutencao = inputs[6].value
    }

    getEvery() {
        return [
            this.pk.codMunicipio,
            this.pk.dataVigencia,
            this.pk.codServico,
            this.descAliquota,
            this.percAliquota,
            this.dataHoraManutencao,
            this.usuarioManutencao]
    }

    update(inputs) {
        this.pk = {
            codMunicipio: inputs[0].value,
            dataVigencia: inputs[1].value,
            codServico: inputs[2].value
        }
        this.descAliquota = inputs[3].value;
        this.percAliquota = parseFloat(inputs[4].value).toFixed(2);
        this.dataHoraManutencao = inputs[5].value;
        this.usuarioManutencao = inputs[6].value
    }
}

document.getElementById('register').addEventListener('click', () => {
    try {
        for (let i = 0; i < inputsData.length; i++) if (inputsData[i].value == "") throw "Dados incompletos"

        const newPk = {
            codMunicipio: inputsData[0].value,
            dataVigencia: inputsData[1].value,
            codServico: inputsData[2].value
        }

        for (let i = 0; i < transactions.length; i++) {
            const element = transactions[i];
            if (element.pk.codMunicipio == newPk.codMunicipio &&
                element.pk.dataVigencia == newPk.dataVigencia &&
                element.pk.codServico == newPk.codServico) {
                alert("Essa transação já existe")
                return
            }
        }

        transactions.push(new Transaction(inputsData))
        for (let i = 0; i < inputsData.length - 1; i++) inputsData[i].value = ""

    } catch (e) {
        alert(`${e}. Tente novamente`)
    }
})

document.getElementById('registerB2').addEventListener('click', function () {
    try {
        for (let i = 0; i < inputsData.length; i++) if (inputsData[i].value == "") throw "Dados incompletos"

        const newPk = {
            codMunicipio: inputsData[0].value,
            dataVigencia: inputsData[1].value,
            conta: inputsData[2].value
        }

        for (let i = 0; i < transactions.length; i++) {
            const element = transactions[i];
            if (element.pk.codMunicipio == newPk.codMunicipio &&
                element.pk.dataVigencia == newPk.dataVigencia &&
                element.pk.conta == newPk.conta) {
                alert("Essa transação já existe")
                return
            }
        }

        transactions.push(new Transaction(inputsData))
        for (let i = 0; i < inputsData.length - 1; i++) inputsData[i].value = ""

    } catch (e) {
        alert(`${e}. Tente novamente`)
    }
})

document.getElementById('view').addEventListener('click', function () {
    if (document.getElementsByClassName('register')[0].style.display != 'none') {
        this.textContent = "Voltar ao cadastro"
        document.getElementsByClassName('register')[0].style.display = 'none'
        document.getElementsByClassName('viewer')[0].style.display = 'flex'

        const container = document.querySelector('.viewer');

        if (container) {
            // Limpa todos os elementos filhos da seção
            container.innerHTML = '';
        } else {
            console.error('Seção com a classe "viewer" não encontrada.');
        }

        for (let i = 0; i < transactions.length; i++) {
            const element = transactions[i];
            view(element)
        }
    }
    else {
        document.getElementsByClassName('register')[0].style.display = 'flex'
        document.getElementsByClassName('viewer')[0].style.display = 'none'
        this.textContent = "Ver dados"
    }
})

const view = (item) => {


    // Array of field names
    const fieldNames = ["Código de município", "Data de vigência", "Código de serviço", "Descrição da aliquota", "Percentual Alíquota (%)", "Data e hora de manutenção", "Usuário de manutenção"];

    // Get the form element
    const form = document.createElement('form');
    form.classList = "register"

    let inputs = []

    // Create input fields dynamically
    fieldNames.forEach((fieldName, index) => {
        const div = document.createElement("div");
        const span = document.createElement("span");
        span.textContent = fieldName;
        div.appendChild(span);
        const input = document.createElement("input");
        switch (index) {
            case 0:
                input.disabled = true
                break;
            case 1:
                input.disabled = true
                break;
            case 2:
                input.disabled = true
                break;
            case 3:
                input.type = 'text'
                break;
            case 4:
                input.type = 'number'
                break;
            case 5:
                input.type = 'datetime-local'
                break;
            case 6:
                input.disabled = true
                break;
            default:
                break;
        }
        input.value = item.getEvery()[index]
        div.appendChild(input);
        form.appendChild(div);
        inputs.push(input)
    });

    // Create Edit and Delete buttons
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.type = "button";
    editButton.addEventListener('click', () => {
        let transacao = transactions.find(e => e === item)
        transacao.update(inputs)
    });
    form.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Deletar";
    deleteButton.type = "button";
    deleteButton.addEventListener('click', () => {
        form.remove()
        transactions = transactions.filter(e => e !== item)

    });

    form.appendChild(deleteButton);

    document.getElementsByClassName('viewer')[0].appendChild(form)
}

document.getElementById("exportFile").addEventListener('click', () => {
    inputFile.click()
})

const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

inputFile.addEventListener("change", async function (e) {
    if (e.target.files[0]) {
        const file = e.target.files[0];

        if (!file.name.includes(".xlsx")) {
            return;
        }

        const convertedFile = await convertToBase64(file);

        const fileSet = {
            content: convertedFile,
            mimeType: file.type,
            fileName: file.name,
            fileSize: file.size,
        };

        const allText = await readText(convertedFile);
        const lines = [];

        for (let i = 0; i < allText.length; i++) {
            const element = allText[i];
            let select = lines.find(e => e.line === element.index.split(element.index.replace(/\d+/g, ""))[1])
            if (select) {
                select.columns.push(element)
            }
            else {
                lines.push({
                    line: element.index.split(element.index.replace(/\d+/g, ""))[1],
                    columns: [
                        element
                    ]
                })
            }
        }

        console.log(lines)
    }
});

const readText = async (content) => {
    return new Promise((resolve, reject) => {
        fetch(`${window.location.origin}/file`, {
            method: "POST",
            body: JSON.stringify({ file: content }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

document.getElementById('changeBase').addEventListener('click', function () {
    if (this.textContent.split(" ")[1] == "2") {
        this.textContent = "Base 1"
        document.getElementById('register').style.display = "none"
        document.getElementById('registerB2').style.display = "block"
        let base1 = document.getElementsByClassName("base1")
        let base2 = document.getElementsByClassName("base2")
        for (let i = 0; i < base1.length; i++) base1[i].style.display = "none"
        for (let i = 0; i < base2.length; i++) base2[i].style.display = "flex"
    }
    else {
        this.textContent = "Base 2"
        document.getElementById('register').style.display = "block"
        document.getElementById('registerB2').style.display = "none"
        let base1 = document.getElementsByClassName("base1")
        let base2 = document.getElementsByClassName("base2")
        for (let i = 0; i < base1.length; i++) base1[i].style.display = "flex"
        for (let i = 0; i < base2.length; i++) base2[i].style.display = "none"
    }
})

document.getElementById('changeBase').click()