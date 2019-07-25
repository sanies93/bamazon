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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results from products table
        console.log(res);
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
    ]).then(function(answer) {
        var id = answer.id;
        var num = answer.quantity;
        connection.query("SELECT * FROM products WHERE item_id =  " + id, function(err, res) {
            if (err) {
                console.log(err);
            }

            if (num <= res[0].stock_quantity) {
                console.log("Available!");
 
                var total = num * res[0].price;
                console.log("Your total price is: " + total);
            
                var stock = res[0].stock_quantity - num;
                connection.query("UPDATE products SET stock_quantity = " + stock + "WHERE item_id = " + id);
                // console.log(res);
                connection.end();
            } else {
                console.log("Insufficient quantity!");
                connection.end();
            }
        });
    });
}