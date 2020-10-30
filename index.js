const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);
router.get('/usuario/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM usuario' + filter, res);
})
//inicia o servidor
app.listen(port);
console.log('API funcionando! Acesse localhost:3000');
function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : 'DFO828y7',
        database : 'mulher'
    });
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
}
/*usuário é excluído do sistema
router.delete('/usuario/:id', (req, res) =>{
    execSQLQuery('DELETE FROM usuario WHERE ID=' + parseInt(req.params.id), res);
})
/*atualizando os dados de usuário
router.patch('/usuario/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const Nome = req.body.Nome.substring(0,255);
  const Login = req.body.login.substring(0,255);
  const senha = req.body.senha.substring(0,10);
  execSQLQuery(`UPDATE usuario SET Nome='${Nome}', login='${Login}', senha='${senha}'  WHERE ID=${id}`, res);
})*/
//usuário se cadastra ao sistema
router.post('/cadastroaosistema', (req, res) =>{
  const Nome = req.body.Nome.substring(0,255);
  const Login = req.body.login.substring(0,255);
  const senha = req.body.senha.substring(0,10);
  execSQLQuery(`INSERT INTO usuario(Nome, login, senha) VALUES('${Nome}','${Login}','${senha}' )`, res);
});
//usuário cadastra contatos
router.post('/cadastrocontatos', (req, res) =>{
  const Nome = req.body.Nome.substring(0,255);
  const telefone = req.body.telefone;
  const ID = req.body.ID;
  execSQLQuery(`insert into contatos(Nome, telefone, ID) values ('${Nome}',${telefone},${ID} )`, res);
});
//usuário cadastra relatos
router.post('/cadastrorelato', (req, res) =>{
  const Nome = req.body.Nome.substring(0,255);
  const relato = req.body.relato.substring(0,255);
  const ID = req.body.ID;
  execSQLQuery(`insert into relatos(Nome, relato, ID) values ('${Nome}','${relato}',${ID} )`, res);
});
//usuário efetua login
router.get('/login/:id', (req, res) =>{
  execSQLQuery(`select * from usuario where id=` + parseInt(req.params.id), res);
});
//carrega os contatos do usuario
router.get('/contatos/:ID', (req, res) =>{
  execSQLQuery(`SELECT usuario.ID, contatos.telefone, contatos.nome
  FROM (usuario
  INNER JOIN contatos ON usuario.ID= contatos.ID)where usuario.ID=` + parseInt(req.params.ID), res);
});
//carrega os relatos do usuario
router.get('/relatos/:ID', (req, res) =>{
  execSQLQuery(`SELECT usuario.ID, relatos.Nome, relatos.relato
  FROM (usuario
  INNER JOIN relatos ON usuario.ID = relatos.ID)where usuario.ID=` + parseInt(req.params.ID), res);
});
