const connection = require('./connectiondb');
createTable(connection);
function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS Usuario (\n"+
                "ID int NOT NULL AUTO_INCREMENT,\n"+
                "Nome varchar(255) NOT NULL,\n"+
                "login varchar(255) NOT NULL,\n"+
                "senha varchar(255) NOT NULL,\n"+
                "PRIMARY KEY (ID)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}
