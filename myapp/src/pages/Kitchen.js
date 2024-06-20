import React, { useState, useEffect } from 'react';
import '../css/Kitchen.css';
import logo from '../logo.png';
import splash from '../splash-image.jpg';
import { Link } from 'react-router-dom';

const Kitchen = () => {
  const [orders, setOrders] = useState([]);

  function ordersWithId(id) {
    return orders.filter(order => order.order_number === id);
  }

  const handleComplete = (id) => {
    if (window.confirm("Are you sure you have completed this order?")) {
      setOrders(orders.filter(orders => orders.order_number !== id));
      // Make a PUT request to update the 'complete' column in the database
      fetch(`http://localhost:3000/kitchen-orders/${id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: id
          }),
      }).then((response) => response.json())
          .then((data) => {
              setOrders(data);
          })
          .catch((error) => {
              console.log(error);
          });
    }
  }
  

  useEffect(() => {
    // Fetch the orders from the database here
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:3000/kitchen-orders');
      const data = await response.json();
      setOrders(data);
      console.log(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <Link to="/">
              <img src={logo} alt="the logo" className="header-image"/>
          </Link>
      </header>
      <div className="splash-div">
        <img src={splash} alt="splash" className="splash-image" />
      </div>
      <h2 className="Heading">Food Orders</h2>
      <div className="order-container">
        { [...new Set(orders.map(order => order.order_number))].map(id => {
          const time_ordered = ordersWithId(id)[0].time_ordered;
          return (
            <div className="order-box" key={id}>
              <div className='order-id'>Order #{id}</div>
              <div className="order-details"> Time Ordered: {time_ordered}</div>
              {ordersWithId(id).map(order => (
                <>
                  <div className='order-items'>
                    <div className='order-details'>Item: {order.name}</div>
                    <div className='order-details'>Quantity: {order.item_quantity}</div>
                  </div>
                </>
              ))}
              <div className='button-container'>
                <button className="complete-button" onClick={() => handleComplete(id)}>Complete Order</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Kitchen;
