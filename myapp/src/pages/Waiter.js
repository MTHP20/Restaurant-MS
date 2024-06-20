import React, {useState} from 'react';
import '../css/Waiter.css';
import logo from '../logo.png';
import {Link} from 'react-router-dom';

// main waiter function 
function Waiter() {
    const [orders, setOrders] = useState([]);
    const [expanded, setExpanded] = useState('');
    const [selected, setSelected] = useState([]);
    const [orderID, setOrderID] = useState('');

    // fetches all orders with given id from the database
    function ordersWithId(id) {
        return orders.filter((order) => order.order_number === id);
    }
    let total = 0;

    const updateTotal = (price) => {
        total = total + parseFloat(price);
    }

    const handleButtonClick = (item) => {
        console.log(selected);
        if (item === 'Active') {
            fetch('http://localhost:3000/orders')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (item === 'Completed') {
            fetch('http://localhost:3000/finished-orders')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (item === 'Unpaid') {
            fetch('http://localhost:3000/unpaid-orders')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setExpanded(item);
    };

    // filter click handler
    const handleFilterClick = (item) => {
        if (item === 'Active') {
            fetch('http://localhost:3000/ordersFiltered')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (item === 'Completed') {
            fetch('http://localhost:3000/finished-ordersFiltered')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (item === 'Unpaid') {
            fetch('http://localhost:3000/unpaid-ordersFiltered')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    // handler for confirming order
    const handleConfirmOrder = (id) => {
        fetch(`http://localhost:3000/orders/${id}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                id: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
        alert(`Order number ${id} has been confirmed`)
    }

    // handler for deleting order
    const handleDeleteOrder = (id) => {
        fetch(`http://localhost:3000/orders/delete/${id}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                id: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
        alert(`Order number ${id} has been deleted`)
    }

    // handler for marking order as delivered
    const handleDeliverOrder = (id) => {
        fetch(`http://localhost:3000/orders/delivered/${id}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                id: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
        alert(`Order number ${id} has been marked as delivered`)
    }

    // handler for marking order as paid
    const handleMarkAsPaid = (id) => {
        fetch(`http://localhost:3000/orders/paid/${id}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                id: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function handleOrderClick(id) {
        fetch(`http://localhost:3000/orders/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSelected(data);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(id)
        setOrderID(id);
    }

    const deleteNotifications = (number) => {
        fetch(`http://localhost:3000/deleteAssistance/${number}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tableNumber: number,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const fetchNotifications = () => {
        fetch('http://localhost:3000/assistanceTable')
            .then((response) => response.json())
            .then((data) => {
                const notifications = data.map((record) => `Table ${record.tablenumber} needs assistance`).join('\n');
                deleteNotifications(prompt(notifications));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (<div className="App">
        <header className="App-header">
            <Link to="/">
                <img src={logo} alt="the logo" className="header-image"/>
            </Link>
            <div>
                <Link to="/edit">
                    <button className="edit-button">Edit Menu</button>
                </Link>
                <button className="notifications-button" onClick={fetchNotifications}>
                    Notifications
                </button>
            </div>
        </header>
        <div className="ordersContainer">
            <button className="activeButton" onClick={() => handleButtonClick("Active")}>
                Active
            </button>
            <button className="completedButton" onClick={() => handleButtonClick("Completed")}>
                Completed
            </button>
            <button className="paidButton" onClick={() => handleButtonClick("Unpaid")}>
                Unpaid
            </button>
            <button className="filterButton" onClick={() => handleFilterClick(expanded)}>
                Sort by time ordered
            </button>
            <hr className="underline"/>
            {[...new Set(orders.map((order) => order.order_number))].map((id) => {
                const order_time = ordersWithId(id)[0].time_ordered;
                const table = ordersWithId(id)[0].table_number;
                return (<div
                    className="orderContainer"
                    onClick={() => handleOrderClick(id)}
                >
                    <div
                        className="order-left"
                        onClick={() => handleOrderClick(id)}
                    >
                        Order #{id} <br/>
                        Table: {table}
                    </div>
                    <div className="order-right" onClick={() => handleOrderClick(id)}>
                        <div className="order-right">
                            {order_time} <br/>
                        </div>
                    </div>
                    <br/>
                </div>);
            })}
        </div>
        <div className="orderDisplay">
            <div>
                {[...new Set(selected.map(order => order.order_number))].map(id => {
                    return (
                        <div key={id}>
                        <div className='order-id'>Order #{id}</div>
                            <h1 className="table">TABLE</h1>
                            <div className="table-number">{selected[0].table_number}</div>
                            <hr className="underline"></hr>
                        {ordersWithId(id).map(order => (<>
                            <div className='order-items'>
                                <div className='order-details'>Item: {order.name}
                                    <br/> Quantity: {order.item_quantity}</div>
                                <div className='order-details'>Price:
                                    £{updateTotal((order.price * order.item_quantity).toFixed(2))}{(order.price * order.item_quantity).toFixed(2)}</div>
                            </div>
                        </>))}
                        <hr className="underline"></hr>
                        <h1 className="simple-text">TOTAL: £{total} </h1>
                    </div>)
                })}
            </div>
            {expanded === "Active" && (<>
                <div
                    className="confirm-order"
                    onClick={() => handleConfirmOrder(orderID)}
                >
                    Confirm Order
                </div>
                <div
                    className="delete-order"
                    onClick={() => handleDeleteOrder(orderID)}
                >
                    Delete Order
                </div>
            </>)}
            {expanded === "Completed" && (<>
                <div
                    className="deliver-order"
                    onClick={() => handleDeliverOrder(orderID)}
                >
                    Delivered
                </div>
                <div
                    className="pay-order"
                    onClick={() => handleMarkAsPaid(orderID)}
                >
                    Mark as Paid
                </div>
            </>)}
            {expanded === "Unpaid" && (<>
                <div
                    className="pay-order"
                    onClick={() => handleMarkAsPaid(orderID)}
                >
                    Mark as Paid
                </div>
            </>)}


        </div>
    </div>);
}

export default Waiter;
