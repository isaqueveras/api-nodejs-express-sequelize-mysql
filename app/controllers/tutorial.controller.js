const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Criar e salvar um novo tutorial
exports.create = (req, res) => {
  // Validar a requisição
  if (!req.body.title) {
    res.status(400).send({
      message: "Conteúdo não pode ser vazio!"
    });

    return;
  }

  // Cria um tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published: false,
  };

  // Salva o tutorial no banco de dados
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro enquanto criava um novo tutorial."
      });
    });

};

// Lista todos os tutoriais
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` }}: null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro enquanto listava todos os tutoriais."
      });
    });
};

// Lista um tutorial pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao encontar o tutorial com o id = " + id
      });
    });
};

// Atualiza um tutorial pelo id
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1){
        res.send({ message: "Tutorial foi atualizado com successo!" });
      } else {
        res.send({ message: `Não é possível atualizar o Tutorial com id = ${id}. Talvez Tutorial não tenha sido encontrado ou os campos estejam vazio!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Erro ao atualizar o tutorial com o id=" + id });
    });

};

// Deleta um tutorial passado pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Tutorial foi deletado com sucesso!" });
      } else {
        res.send({ message: "Não foi possivel deletar o tutorial com o id="+ id });
      }

    })
    .catch(err => {
      res.status(500).send({ 
        message: "Não foi possivel deletar o tutorial com o id="+ id 
      });
    });
};

// Deleta todos os tutoriais
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutoriais foram deletados com sucesso!`});
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro enquanto deletava todos os tutoriais."
      });
    });
};

// Lista todos tutoriais publicados
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ 
    where: { published: true } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao listar os tutoriais publicados."
      })
    });
};
