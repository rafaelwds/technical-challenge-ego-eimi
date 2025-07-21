// mock-server/index.js
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let mockUser = {
  id: "1",
  name: "Rafael Fernando",
  email: "rafaelfernando@develop.com",
  permissions: ["docs", "tickets"],
};

let history = [];

// Simula login via SSO
app.post("/login", (req, res) => {
  const { email } = req.body;
  return res.json({ ...mockUser, email });
});

// Responde pergunta com base em ACL
app.post("/ask", (req, res) => {
  const { question, user } = req.body;
  const answer = `Simulação de resposta para: \"${question}\" com base nas permissões: ${user.permissions.join(
    ", "
  )}`;

  const entry = {
    id: uuidv4(),
    question,
    answer,
    timestamp: new Date().toISOString(),
    permissionsUsed: user.permissions,
  };

  history.unshift(entry);

  res.json(entry);
});

// Retorna histórico
app.get("/history", (req, res) => {
  res.json(history);
});

app.listen(PORT, () => {
  console.log(`🚀 Mock server rodando em http://localhost:${PORT}`);
});
