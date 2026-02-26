import http from "http"; // Importa o módulo HTTP nativo

let idIncrement = 0

let list = [
  {
    id: idIncrement++,
    aluno: "Jeremias Verissimo Gomes",
    assunto: "Programação Web"
  },
  {
    id: idIncrement++,
    aluno: "Luiz Roberto",
    assunto: "Programação Orientada a Objeto"
  },
  {
    id: idIncrement++,
    aluno: "Pablo Franciolly",
    assunto: "Banco de Dados"
  },
]

const server = http.createServer((req, res) => { // Cria o servidor e define a função para cada requisição


  // GETRs

  if (req.method === "GET" && req.url === "/health") { // Verifica rota GET /health
    res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
    res.end(JSON.stringify({ status: "ok" })); // Envia JSON e encerra
    return; // Interrompe execução
  }

  if (req.method === "GET" && req.url === "/health") { // Verifica rota GET /health
    res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
    res.end(JSON.stringify({ message: "você está na página assunto", status: "ok" })); // Envia JSON e encerra
    return; // Interrompe execução
  }

  // RETORNA O TOTAL DE ELEMENTOS NA LISTA
  if (req.method === "GET" && req.url.startsWith("/student/")) {
    const id = Number(req.url.split("/")[2]); //pega o iDd
    const student = list.find((element) => element.id === id);

    if (!student) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Aluno não encontrado" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(student));
    return;
  }

  if (req.method === "POST" && req.url === "/student") {
    let body = "";
  }

  // RETORNA O TOTAL DE ELEMENTOS NA LISTA
  if (req.method === "GET" && req.url.startsWith("/student")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(list));
    return;
  }
}


  // if (req.method === "POST" && req.url === "/student") { // Verifica rota POST /student
  //   res.writeHead(201, { "Content-Type": "text/html" }); // Define status 201 e tipo HTML
  //   res.end("<h1>Estudante cadastrado com sucesso</h1>"); // Retorna mensagem HTML
  //   return; // Interrompe execução
  // }

  // res.writeHead(404); // Define status 404 para rota inexistente
  // res.end(); // Finaliza resposta
  //
);

server.listen(3000, () => { // Inicia o servidor na porta 3000
  console.log("Servidor HTTP executando na porta 3000"); // Log informativo
});