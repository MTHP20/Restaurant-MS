CREATE VIEW Order_Nutritional_Information AS
SELECT orders.order_number, SUM(DISTINCT order_items.item_quantity*Menu.calories), string_agg(DISTINCT ItemContains.ingredient, ', ')
FROM orders, order_items, Menu, ItemContains
WHERE orders.order_number = order_items.order_number
	AND order_items.item_id = Menu.id
	AND Menu.id = ItemContains.item_id
GROUP BY orders.order_number;