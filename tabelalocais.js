const connection = require('./connectiondb');
createTable(connection);
function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS Locais (\n"+
                "ID_locais int NOT NULL AUTO_INCREMENT,\n"+
                "Nome varchar(255),\n"+
                "local text NOT NULL,\n"+
                "PRIMARY KEY (ID_locais),\n"+
                "ID int,\n"+
                "foreign key(ID) references Usuario(ID)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}
