const connection = require('./connectiondb');
createTable(connection);
function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS Contatos (\n"+
                "ID_contatos int NOT NULL AUTO_INCREMENT,\n"+
                "Nome varchar(255),\n"+
                "telefone int NOT NULL,\n"+
                "PRIMARY KEY (ID_contatos),\n"+
                "ID int,\n"+
                "foreign key(ID) references Usuario(ID)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}
