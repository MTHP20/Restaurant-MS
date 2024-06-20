# Team Project

This repository has been created to store your Team Project.

You may edit it as you like, but please do not remove the default topics or the project members list. These need to stay as currently defined in order for your lecturer to be able to find and mark your work.

# DEPLOYMENT INSTRUCTIONS
1. Navigate to the backend directory in your terminal and type 'node index.js'
2. Open a second terminal and navigate to the myapp directory
3. Type 'npm run start' in the terminal.
4. If you get an error saying 'react-scripts' is not installed, just type 'npm i react-scripts' and try to run start again after.
5. If prompted 'Would you like to run the app on another port instead?' press the Y key.
6. The web-app should now be ready to go.

# NAVIGATING THE WEB-APP
1. Once the webpack is compiled successfully, the web-app is ready to view in the browser.
2. First, enter your table number in the prompt.
3. The web-app will display the menu screen. From here, we can navigate the site using buttons which are linked to different pages. A "Cart" button is also available as well as a "Login" button.
4. Menu items are shown under the mains, sides, desserts and drinks tabs with their corresponding description, calories, and price and ingredient/allergen information, as well as the option to "Add to Order".
5. Additionally, the user has an overview of the total amount to pay during checkout.
6. All users must register and make an account so the system can take them to the appropriate page.
7. The "Oaxaca" logo can be used as a button to return to the menu page.

# CUSTOMER
1. The customer does not need to declare their status as a customer when they are registering, instead it is preferred if it is just left blank.
2. There will be a pop-up asking for the table number. 
3. Once entered, the menu page will appear, showing all the items, as well as the price, description and calorie count for that dish.
4. The customer has the option to choose their dishes and add them to their checkout cart.
5. The customer can see their items, prices, and quantities in a tab next to the menu. They also have the option to delete items.
6. After pressing "Checkout", a pop-up will appear telling us that "Your items are added to your cart!"
7. A separate page appears with the order summary, table number and order total on the right hand side and payment method on the left.
8. After that, you will be able to select payment method, using card or PayPal, as well as entering name, card number, expiry and CVV. 
9. The customer also has the option to pay later, using cash and ordering via the waiter in person. In this case, the waiter would be able to mark the orders as paid and unpaid accordingly.
10. The customer can now place an order.

# WAITER
1. The waiter must clarify their status as a waiter when registering.
2. Once the waiter has logged in, a different page will appear, where they can see 3 tabs, showing if the order is "Active", "Completed" or "Unpaid".
3. On the right hand side, there is a summary of each table number, the order and the total amount.
4. Under the "Active" tab, we can see any orders placed by the customer, as well as the order number, table number, and the time the order was placed. On the right hand side, the waiter has 2 buttons: "Delete Order" and "Confirm Order". These are used to either confirm the order, or if there was a mistake, to delete the order and ask the customer again.
5. Under the "Completed" tab, we can see all the previously completed orders, with the option to either "Mark as Paid" or be "Delivered". "Mark as Paid" will be used if the customer has ordered via the waiter and wants to pay after, rather than straight away after ordering online.
6. Under the "Unpaid" tab, we will see any unpaid orders as well as the order number, table number, and the time the order was placed. Once the customer has paid, you can mark them as "Paid".
7. The waiter also has the option to hide and show menu items, depending on availability. There is an "Edit Menu" button in the top right hand corner, and you can hide items using the "Show" and "Hide" buttons.

# KITCHEN
1. Kitchen staff will have to confirm their status as "kitchen" when registering.
2. They will be able to see all the orders that need to be made, as well as the time, menu item and quantity of each item.
3. Staff can view the active order once it has been completed.
4. Once "Complete Order" is pressed, a pop-up will appear, prompting "Are you sure you have completed this order?".
5. If done, confirm and click "OK", and that specific order will disappear from the screen.
6. The waiter will take over from there and deliver it to the customer.