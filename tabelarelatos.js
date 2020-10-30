const connection = require('./connectiondb');
createTable(connection);
function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS Relatos (\n"+
                "ID_relatos int NOT NULL AUTO_INCREMENT,\n"+
                "Nome varchar(255),\n"+
                "relato text NOT NULL,\n"+
                "PRIMARY KEY (ID_relatos),\n"+
                "ID int,\n"+
                "foreign key(ID) references Usuario(ID)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}
