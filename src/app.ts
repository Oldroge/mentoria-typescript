// Desafio 1:

let employeeTest: {code: number, name: string} = {
    code: 0,
    name: "Roge"
};

employeeTest.code = 10;
employeeTest.name = "John";

console.log("Desafio 1:");
console.log(employeeTest);

// Desafio 2:
console.log("Desafio2:")
let pessoaTest1: {nome: string, idade: number, profissao: string} = {
    nome: "",
    idade: 0,
    profissao: ""
};

pessoaTest1.nome = "maria";
pessoaTest1.idade = 29;
pessoaTest1.profissao = "atriz"
console.log(pessoaTest1);

let pessoaTest2: {nome: string, idade: number, profissao: string} = {
    nome: "",
    idade: 0,
    profissao: ""
}
pessoaTest2.nome = "roberto";
pessoaTest2.idade = 19;
pessoaTest2.profissao = "Padeiro";
console.log(pessoaTest2);


let pessoaTest3: {nome: string, idade: number, profissao: string} = {
    nome: "laura",
    idade: 32,
    profissao: "Atriz"
};
console.log(pessoaTest3);


let pessoaTest4: {nome: string, idade: number, profissao: string} = {
    nome: "carlos",
    idade: 19,
    profissao: "padeiro"
}
console.log(pessoaTest4);


// Desafio 3:
let botaoAtualizarTest = document.getElementById('atualizar-saldo');
let botaoLimparTest = document.getElementById('limpar-saldo');
let somaTest = document.getElementById('soma') as HTMLInputElement;
let campoSaldoTest = document.getElementById('campo-saldo');

let saldoTotalTest = 0;


function somarAoSaldoTest(soma: number): void {
    if (campoSaldoTest) {
        saldoTotalTest += soma;
        campoSaldoTest.innerHTML = saldoTotalTest.toString();
    }
}

function limparSaldoTest() {
    if (campoSaldoTest) {
        campoSaldoTest.innerHTML = '';
    }
}

botaoAtualizarTest?.addEventListener('click', function () {
    if (somaTest) {
        somarAoSaldoTest(Number(somaTest.value));
    }
});

botaoLimparTest?.addEventListener('click', function () {
    limparSaldoTest();
});