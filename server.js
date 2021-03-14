const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Desligue e sincronize novamente o banco de dados.");
// });

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// configurar as requisições do tipo json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Listar as rotas da aplicação dos tutoriais
require("./app/routes/tutorial.routes")(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

