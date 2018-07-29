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
          .prompt({

          name: "manager",
          type: "rawlist",
          message: "What would you like to do?",
          choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT"]
          })
          .then(function(answer) {
            connection.query(
                "SELECT * FROM PRODUCTS", function(err,response){
                    
                if(answer.manager.toUpperCase() === "VIEW PRODUCTS FOR SALE"){
                        console.log("\nCURRENT PRODUCTS FOR SALE:")
                        console.log("\n=================================================================\n")
                        for(i=0;i<response.length;i++){
                        
                        console.log("ITEM ID: " + response[i].item_id + " | " + "NAME: " + response[i].product_name + " | " + "DEPARTMENT: " + response[i].department_name + " | " + "PRICE: " + response[i].price + " | " + "QUANTITY: " + response[i].stock_quantity);
                        }
                        console.log("\n=================================================================\n")
                        main();
                }
                if(answer.manager.toUpperCase() === "VIEW LOW INVENTORY"){
                    connection.query("SELECT * FROM PRODUCTS WHERE stock_quantity < 5", function(err,response){
                    console.log("\nCURRENT LOW INVENTORY PRODUCTS:")
                    console.log("\n=================================================================\n")
                        for(i=0;i<response.length;i++){
                        
                        console.log("ITEM ID: " + response[i].item_id + " | " + "NAME: " + response[i].product_name + " | " + "DEPARTMENT: " + response[i].department_name + " | " + "PRICE: " + response[i].price + " | " + "QUANTITY: " + response[i].stock_quantity);
                        }
                        console.log("\n=================================================================\n")
                        main();
                }

                    )
                }

                if(answer.manager.toUpperCase() === "ADD TO INVENTORY"){
                    inquirer.prompt([{
                            name: "addProd",
                            type: "input",
                            message: "What product would you like to restock?"
                            },
                            {
                            name: "addQuant",
                            type: "input",
                            message: "How many would you like to restock?"
                       }]).then(function(answer){
                            connection.query("SELECT * FROM PRODUCTS WHERE ?", {item_id:answer.addProd}, function(err,response){
                                let endQuant = parseInt(response[0].stock_quantity) + parseInt(answer.addQuant);
                                let prodName = response[0].product_name;
                                connection.query(
                                    "UPDATE products SET ? WHERE ?", 
                                    [{
                                        stock_quantity:endQuant
                                    }, {
                                        item_id:answer.addProd
                                    
                                    }], function(err,response){
                                        console.log("\nUPDATED PRODUCT QUANTITY:")
                                        console.log("\n=================================================================\n")   
                                        console.log("Restocked: " + answer.addQuant + " " + prodName + "(s)" + " | " + "NEW TOTAL: " + endQuant)
                                        console.log("\n=================================================================\n")
                                        main();
                                    })
                                
                                

                            })



                       })






                }

                if(answer.manager.toUpperCase() === "ADD NEW PRODUCT"){
                    inquirer.prompt([{
                        name: "newItemID",
                        type: "input",
                        message: "What is it's Item ID?"},
                    {
                        name: "newName",
                        type: "input",
                        message: "What is the Product Name?"},
                    {
                        name: "newDep",
                        type: "input",
                        message: "What department does it belong in?"},
                    {
                        name: "newPrice",
                        type: "input",
                        message: "What is its price?"},
                    {
                        name: "newQuant",
                        type: "input",
                        message: "How much inventory is available?"
                    }]).then(function(answer){

                        let nID = answer.newItemID;
                        let nName = answer.newName;
                        let nDep = answer.newDep;
                        let nPrice = answer.newPrice;
                        let nQuant = answer.newQuant;

                        connection.query('INSERT INTO PRODUCTS SET ?', {
                            item_id:nID,
                        
                            product_name:nName
                        ,
                            department_name:nDep
                        ,
                            price:nPrice
                        ,
                            stock_quantity:nQuant
                        }, function(err,response){
                            console.log("\nPRODUCT(s) ADDED:")
                            console.log("\n=================================================================\n")
                            console.log("ITEM ID: " + nID + " | " + "PRODUCT NAME: " + nName + " | " + "DEPARTMENT: " + nDep + " | " + "PRICE: " + nPrice + " | " + "QUANTITY: " + nQuant)
                            console.log("\n=================================================================\n")
                            main();
                        })




                    })



                }
            }
                
        );
    })};