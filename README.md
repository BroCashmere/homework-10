# homework-10

bamazon Node.js + mySQL

Requires inquirer and mySQL packages to be installed

The two apps included (bamazonCustomer and bamazonManager) allow the user, to make purchases as a Customer, or manage inventory as a Manager.

bamazonCustomer.js contains 2 prompts:
  Asks for ITEM ID to select which Product.  
  Asks for Quantity to select how many to Purchase.  
  
If there is quantity, it will return with purchase price subtotal and update the quantity of the product in the product database.  If   there is no quantity, it will return with out of stock and ask to re-enter purchase.

bamazonManager.js contains 4 prompts:
  View products for sale: to display all products currently in table
  View low inventory: displays all products with < 5 quantity
  Add to inventory: allows additional prompts to add inventory to a product via ITEM ID
  Add new product: allows additional prompts to add a new product to the database table


Demo of bamazonCustomer.js: https://drive.google.com/file/d/1DcpOjKCAYZYjO1XXVc7cCRV_NA9CY6WC/view

Demo of bamazonManager.js: https://drive.google.com/file/d/1aZIBdY5t79UW372wiy8D48uA2FG-uJlw/view
