CREATE VIEW OrderToMake AS
SELECT order_items.order_number, Menu.name, order_items.item_quantity, orders.time_ordered
FROM order_items, orders, Menu
WHERE order_items.order_number = Orders.order_number
	AND order_items.item_id = Menu.id
ORDER BY orders.time_ordered;