import http from "http"; // Importa o módulo HTTP nativo

let list = [{}];

const server = http.createServer((req, res) => { // Cria o servidor e define a função para cada requisição

  if (req.method === "GET" && req.url === "/health") { // Verifica rota GET /health
    res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
    res.end(JSON.stringify({ status: "ok" })); // Envia JSON e encerra
    return; // Interrompe execução
  }

  if (req.method === "GET" && req.url === "/") { // rota "/" retorna status da requisição e a list
    res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
    res.end(JSON.stringify({ status: "ok", result: list})); // Envia JSON e encerra
    return; // Interrompe execução
  }
  res.writeHead(404); // Define status 404 para rota inexistente
  res.end(JSON.stringify({
    "aluno": "aluno1",
    "assunto": "assunto1",
  })); // Finaliza resposta
});

server.listen(3000, () => { // Inicia o servidor na porta 3000
  let address = server.address();
  console.log(`Acesse o servidor em: http://localhost:${address.port}` ); // Log informativo
});