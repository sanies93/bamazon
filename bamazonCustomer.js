var mysql = require('mysql');
var inquirer = require('inquirer');

// Create connection for sql database
var connection = mysql.createConnection({
    host: "35.192.16.53",
    port: 3306,
    user: "sahra",
    password: "Mishmish0",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    displayItems();
    purchase();
});

function displayItems() {
    connection.query("Select * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results from products table
        console.log(res);
        connection.end();
    });
}

function purchase() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter product ID"
        },
        {
            name: "quantity",
            type: "number",
            message: "How many units do you wish to purchase?"
        }
    ]).then(function (answer) {
        console.log("Insufficient quantity!");
    });
}