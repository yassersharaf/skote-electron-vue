var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(process.resourcesPath + '/file.db');

db.serialize(function () {
    db.run("CREATE TABLE Products (name, barcode, quantity)");

    db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
    db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
    db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);

    db.each("SELECT * FROM Products", function (err, row) {
        console.log(row);
    });

    db.close();
});