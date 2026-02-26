import http from "http"; // Importa o módulo HTTP nativo
import { json } from "stream/consumers"

let idIncrement = 0
let list = []

const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => { // Cria o servidor e define a função para cada requisição


  // GETRs

  if (req.method === "GET" && req.url === "/health") { // Verifica rota GET /health
    return sendJSON(res,200,{ status: "ok" });
    // res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
    // res.end(JSON.stringify({ status: "ok" })); // Envia JSON e encerra
    // return; // Interrompe execução
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

  // RETORNA O TOTAL DE ELEMENTOS NA LISTA
  if (req.method === "GET" && req.url.startsWith("/student")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(list));
    return;
  }


  if (req.method === "POST" && req.url === "/student") {
    try {
        const data = await json(req);

        const { aluno, assunto } = data;

        if (!aluno || !assunto) {
            return sendJSON(res, 422, {
                erro: "Campos obrigatórios: aluno, assunto"
            });
        }

        const novoAluno = {
            id: idIncrement++,
            aluno,
            assunto,
        };

        list.push(novoAluno);

        return sendJSON(res, 201, novoAluno);

    } catch (error) {
        return sendJSON(res, 400, { erro: "JSON inválido" });
    }
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