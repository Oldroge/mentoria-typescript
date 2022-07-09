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

// Desafio 4:
let apiKey: string = 'cbb81f5bd5e8d822f546b0055a4ce9a7';
let requestToken: string;
let username: string;
let password: string;
let sessionId: number;
let listId = '7101979';

let loginButton = document.getElementById('login-button');
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');

loginButton?.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
})

searchButton?.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }

  let query = <HTMLInputElement> document.getElementById('search');
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"



  if (typeof listaDeFilmes === 'object') {
      for (const item of listaDeFilmes?.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title))
        ul.appendChild(li)
      }
  }
  console.log(listaDeFilmes);
  searchContainer?.appendChild(ul);
})

function preencherSenha() {
  password = document.getElementById('senha').value;
  validateLoginButton();
}

function preencherLogin() {
  username =  document.getElementById('login').value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = document.getElementById('api-key').value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {
  static async get({url, method, body = null}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function adicionarFilme(filmeId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken () {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista, descricao) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId, listaId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}
