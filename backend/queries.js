// Code adapted from https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#creating-routes-crud-operations

const { request, response } = require("express");
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'aekkmejk',
    host: 'trumpet.db.elephantsql.com',
    database: 'aekkmejk',
    password: 't0tYetmAy50WtSeI_zAQBcyI_Fmkt6AE',
    port: 5432,
})

/**
 * Gets all menu items by ascending order of their id's.
 * @param {object} request is an empty request
 * @param {object} response contains our rows of data in JSON format
 * @throws {Error} SQL error
 */
const getMenu = (request, response) => {
    pool.query('SELECT * FROM menu ORDER BY id asc', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Uses the specified item type to return the rows of menu items where they belong to that type only.
 * Example: if the category is "drinks" then only drinks items are returned
 * @param {object} request contains the item type
 * @param {object} response contains the complete rows of menu items containing that type
 * @throws {Error} SQL error
 */
const getMenuByType = (request, response) => {
    const category = request.params.category

    pool.query('SELECT * FROM menu WHERE category= $1 and available = true', [category], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMenuVegan = (request, response) => {
    const category = request.params.category
    pool.query('SELECT * FROM menu WHERE category = $1 and vegan = true and available = true', [category], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMenuVegetarian = (request, response) => {
    const category = request.params.category
    pool.query('SELECT * FROM menu WHERE category = $1 and vegetarian = true and available = true', [category], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMenuDairy = (request, response) => {
    const category = request.params.category
    pool.query('SELECT * FROM menu WHERE category = $1 and dairy_free = true and available = true', [category], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
/**
 * Updates the menu table to mark an orders' availability.
 * @param {object} request contains the availability state and the menu item id
 * @param {object} response holds the message that the table was modified
 * @throws {Error} SQL error
 */
const updateMenu = (request, response) => {
    const id = parseInt(request.params.id)
    const { available } = request.body

    pool.query(
        'UPDATE menu SET available = $1 WHERE id = $2',
        [available, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

/**
 * Gets order information for each item in an order that has not yet been confirmed.
 * Order information, for each item in every order, contains the overall order information as well as the information for each individual item under that order.
 * @param {object} request contains the order id
 * @param {object} response Contains the rows of order items that have not been confirmed
 * @throws {Error} SQL error
 */
const getWaitOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, orders.table_number, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.confirmed = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSingleOrder = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query("SELECT orders.order_number, orders.time_ordered, orders.table_number, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.order_number = $1",
        [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


/**
 * Gets order information for each item in an order that has not yet been confirmed, and orders them by the time ordered.
 * Order information, for each item in every order, contains the overall order information as well as the information for each individual item under that order.
 * @param {object} request contains the order id
 * @param {object} response Contains the rows of order items that have not been confirmed, ordered by the time they were ordered
 * @throws {Error} SQL error
 */
const getWaitOrdersFiltered = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, orders.table_number, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.confirmed = false ORDER BY time_ordered;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Updates the orders table to declare an order as confirmed.
 * @param {object} req holds the JSON data containing the order number
 * @param {object} res holds the mssage to tell the user their order has been confirmed
 * @throws {Error} SQL error
 */
const updateWaitOrders = (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'UPDATE orders SET confirmed = TRUE WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as confirmed`)
        }
    )
}

/**
 * Deletes a specific order depending on its order number and confirms the deletion as a response.
 * @param {object} req contains the order number to delete
 * @param {object} res contains a confirmation message stating which order (by order number) has been deleted
 * @throws {Error} the SQL error if it cannot be deleted
 */
const deleteOrders = (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'DELETE FROM orders WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Order number ${order_number} deleted`)
        }
    )
}

/**
 * Marks a specific order as delivered depending on the order id provided.
 * @param {object} req contains the order id to use
 * @param {object} res contains the confirmation message to state an order was marked as delivered
 * @throws {Error} the SQL error if it can not be marked as delivered
 */
const deliverOrders = (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'UPDATE orders SET delivered = true WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as delivered`)
        }
    )
}

/**
 * Gets the overall order information and order item information for orders that have been confirmed but have not been completed.
 * @param {object} request an empty request
 * @param {object} response contains the data for all the rows of orders
 * @throws {Error} SQL error
 */
const getKitchenOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, orders.table_number, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.confirmed = true AND orders.complete = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Sets the orders specified by an order id to complete.
 * @param {object} req contains the order id
 * @param {object} res contains the confirmation message to state if an order was marked as completed
 * @throws {Error} SQL error if it could not be marke as completed
 */
const updateKitchenOrders = (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'UPDATE orders SET complete = TRUE WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as completed`)
        }
    )
}

/**
 * Gets the rows of finished orders.
 * @param {object} request an empty request
 * @param {object} response contains the rows of finished orders in JSON format
 * @throws {Error} SQL error
 */
const getFinishedOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, orders.table_number, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.complete = true and orders.delivered = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Gets the finished orders, ordered by the time they were ordered.
 * @param {object} request  an empty request
 * @param {object} response contains the rows of finished orders
 * @throws {Error} SQL error
 */
const getFinishedOrdersFiltered = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, orders.table_number, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.complete = true and orders.delivered = false ORDER BY time_ordered;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Gets the rows of orders that have not yet been paid for and have been delivered.
 * @param {object} request an empty request
 * @param {object} response contains the rows of unpaid and delivered orders in JSON format
 * @throws {Error} SQL error
 */
const getUnpaidOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, orders.table_number, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.delivered = true and orders.paid = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Gets the rows of orders that have not yet been paid, have been delivered and ordered by the time they were ordered.
 * @param {*} request an empty request
 * @param {*} response contains the rows of unpaid, delivered and active orders in JSON format
 */
const getUnpaidOrdersFiltered = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, orders.table_number, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.delivered = true and orders.paid = false ORDER BY time_ordered;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Creates a user based on their email, password and status.
 * Status is either customer, waiter or kitchen.
 * @param {object} request used by the POST request that contains JSON data holding the email, password and status
 * @param {object} response holds a message stating that a user has been confirmed as added
 * @throws {Error} SQL error
 */
const createUser = (request, response) => {
    const { email, password, status } = request.body
    pool.query('INSERT INTO users (email, password, status) VALUES ($1, $2, $3)',
        [email, password, status],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added: ${result.insertId}`)
        })
}

/**
 * Authenticates a user as either a customer, waiter or kitchen staff member. 
 * This makes use of an email and password. Also determines the role the user has.
 * @param {object} req used by the POST request that contains the email and password of the user
 * @param {object} res holds JSON data that holds the role of the user. Also holds messages stating errors.
 */
const authenticate = (req, res) => {
    const { email, password } = req.params;
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while authenticating');
        } else if (result.rowCount === 0) {
            res.status(401).send('Incorrect email or password');
        } else {
            const user = result.rows[0];
            if (user.status === 'customer') {
                res.json({ message: 'customer' });
            } else if (user.status === 'waiter') {
                res.json({ message: 'waiter' });
            } else if (user.status === 'kitchen') {
                res.json({ message: 'kitchen' });
            }
        }
    });
}

/**
 * Updates the paid orders table to mark an order as paid, where an order is specified by its id.
 * @param {object} req used by the POST request that contains the order id
 * @param {object} res contains the message that confirms an order has been marked as paid
 * @throws {Error} SQL error if an order could not be marked as paid
 */
const payOrders = (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'UPDATE orders SET paid = true WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as paid`)
        }
    )
}

/**
 * Updates the assistance table to declare the table number provided is in need of assistance.
 * @param {object} req used by the POST request that holds the table number in JSON format
 * @param {object} res holds the message that states that help has been requested to the user
 * @throws {Error} SQL error
 */
const helpRequest = (req, res) => {
    const  table_number  = parseInt(req.params.id);
    pool.query('INSERT INTO assistance VALUES ($1)', [table_number], (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send('Table added: ${ result.insertId }')
    })
}

const getAssistanceTable = (request, response) => {
    pool.query('SELECT tablenumber FROM assistance', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Retrieves the calories and string concatenation of ingredients for a single specified menu item by its id.
 * @param {URL} request the URL used by the GET request containing the menu item id.
 * @param {JSON} response contains the rows of data containing the calorie and ingredient information.
 * @throws {Error} SQL error
 */
const getItemCaloriesAndIngredients = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query(
        "SELECT Menu.calories, string_agg(DISTINCT ItemContains.ingredient, ', ') as AllIngredients " +
        "FROM Menu, ItemContains "+
        "WHERE Menu.id = $1 AND ItemContains.item_id = $1 " +
        "GROUP BY Menu.id",
        [id],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).json(result.rows)
        }
    )
}

const checkout = (request, response) => {
    const { tableNumber, items, paid, time } = request.body

    // Insert the order into the database and return the order ID
    pool.query('INSERT INTO orders (time_ordered, paid, table_number) VALUES ($1, $2, $3) RETURNING order_number', [time, paid, tableNumber], (error, results) => {
        if (error) {
            throw error
        }

        const orderId = results.rows[0].order_number;

        // Insert the items for the order into the order_items table
        items.forEach((item) => {
            pool.query('INSERT INTO order_items (order_number, item_id, item_quantity) VALUES ($1, $2, $3)', [orderId, item.id, item.quantity], (error, results) => {
                if (error) {
                    throw error
                }
            })
        })

        response.status(201).send(`Order added with ID: ${orderId}`)
    })
}

const deleteAssistance = (req, res) => {
    const tableNumber = parseInt(req.params.tablenumber)
    pool.query(
        'DELETE FROM assistance WHERE tablenumber = $1',
        [tableNumber],
        (error) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Assistance record for table number ${tableNumber} deleted`)
        }
    )
}


module.exports = {
    getMenu,
    updateMenu,
    getMenuByType,
    checkout,
    createUser,
    authenticate,
    getWaitOrders,
    getKitchenOrders,
    updateWaitOrders,
    updateKitchenOrders,
    getFinishedOrders,
    deleteOrders,
    deliverOrders,
    getUnpaidOrders,
    payOrders,
    getFinishedOrdersFiltered,
    getUnpaidOrdersFiltered,
    getWaitOrdersFiltered,
    getSingleOrder,
    getItemCaloriesAndIngredients,
    helpRequest,
    getAssistanceTable,
    getMenuVegan,
    getMenuVegetarian,
    getMenuDairy,
    deleteAssistance
}