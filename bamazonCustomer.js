const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'admin',
    password: 'XXXX',
    database: 'bamazon'
});

connection.connect(function(err){
    if (err) throw err;
    main();
});

function main(){
        inquirer
          .prompt([{
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to buy?",
          },
          {
            name: "quantity",
            type: "input",
            message: "How many units would you like to buy?"
          }
          ])
          .then(function(answer) {
            connection.query(
                'SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?', 
                {item_id: answer.id}, function(err,response){
                    
                    console.log("\n=================================================================");
                    console.log('\nPurchasing ' + answer.quantity + ' ' + response[0].product_name + "(s)" + ' - ' + response[0].department_name + ' - $' + response[0].price + ' each\n');
                    console.log("=================================================================\n");
                

                        if(answer.quantity > response[0].stock_quantity){
                            console.log("Sorry, not enough inventory, please try again\n\n=================================================================\n");
                            main();
                        }
                        
                        else{
                            let remQuant = response[0].stock_quantity - answer.quantity;
                            connection.query(
                        "UPDATE products SET ? WHERE ?", 
                        [{
                            stock_quantity:remQuant
                        }, {
                            item_id:answer.id
                        
                        }], function(err,response){
                            })

                        console.log("Order Confirmed\n");

                        let sub = response[0].price * answer.quantity;
                        let subtotal = sub.toFixed(2);

                        console.log("Thank you for your order, your total is:" + " $" + subtotal);
                        console.log("\n=================================================================\n");
                        main();
                    }
                }
                
        );
    })};