// Code adapted from https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#creating-routes-crud-operations

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const cors = require('cors')
app.use(cors())


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/menu', db.getMenu)
app.get('/menu/:category', db.getMenuByType)
app.get('/menu/:category/vegan', db.getMenuVegan)
app.get('/menu/:category/vegetarian', db.getMenuVegetarian)
app.get('/menu/:category/dairy_free', db.getMenuDairy)
app.get('/menu/info/:id', db.getItemCaloriesAndIngredients)
app.post('/login', db.authenticate)
app.post('/register', db.createUser)
app.get('/orders', db.getWaitOrders)
app.get('/orders/:id', db.getSingleOrder)
app.get('/ordersFiltered', db.getWaitOrdersFiltered)
app.get('/kitchen-orders', db.getKitchenOrders)
app.post('/orders/:id', db.updateWaitOrders)
app.post('/orders/', db.checkout)
app.post('/orders/delete/:id',db.deleteOrders)
app.post('/orders/delivered/:id', db.deliverOrders)
app.post('/kitchen-orders/:id', db.updateKitchenOrders)
app.get('/finished-orders', db.getFinishedOrders)
app.get('/finished-ordersFiltered', db.getFinishedOrdersFiltered)
app.post('/update/:id', db.updateMenu)
app.get('/unpaid-orders', db.getUnpaidOrders)
app.get('/unpaid-ordersFiltered', db.getUnpaidOrdersFiltered)
app.post('/orders/paid/:id', db.payOrders)
app.post('/helpRequest/:id', db.helpRequest)
app.get('/assistanceTable', db.getAssistanceTable)
app.post('/deleteAssistance/:tablenumber', db.deleteAssistance)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})