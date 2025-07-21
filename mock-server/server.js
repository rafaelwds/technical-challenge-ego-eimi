const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.listen(3001, () => {
  console.log("🚀 Mock API rodando em http://localhost:3001");
});

server.use(router);
