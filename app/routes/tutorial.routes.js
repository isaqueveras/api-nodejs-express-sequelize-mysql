module.exports = app => {
  const tutorials = require('../controllers/tutorial.controller');

  var router = require("express").Router();

  // Criar um novo tutorial
  router.post("/", tutorials.create);

  // Listar todos os tutoriais
  router.get("/", tutorials.findAll);

  // Recupere todos os tutoriais publicados
  router.get("/published", tutorials.findAllPublished);

  // Recupere um único tutorial com id
  router.get("/:id", tutorials.findOne);

  // Atualizar um tutorial com id
  router.put("/:id", tutorials.update);

  // Excluir um tutorial com id
  router.delete("/:id", tutorials.delete);

  // Apagar todos os tutoriais
  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials', router);

};