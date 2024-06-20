import React, {useState, useEffect} from 'react';
import '../css/MenuLoggedIn.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import splash from '../splash-image.jpg';
import { Link } from 'react-router-dom';

let show = true;

// Main menu function, containing the core code and functionality for the menu page
function Menu() {
    const [expanded, setExpanded] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const [mains, setMains] = useState([]);
    const [sides, setSides] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [order, setOrder] = useState([]);
    const [counter, setCounter] = useState(0);

    /**
     * Responsible for obtaining calorie and ingredient/allergen information for a requested menu item by its id.
     * @param {number} id the menu item id
     */
    const infoPopup = (id) => {
        fetch(`http://localhost:3000/menu/info/${id}`)
          .then((response) => response.json())
          .then((data) => {
            alert(`------------------ Ingredients / Allergens ------------------\n\n${data[0].allingredients}`)
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      };

    /**
     * Adds an item, specified by item id, to an order.
     * @param {object} item the menu item object
     */
    const addToOrder = (item) => {
        const existingItemIndex = order.findIndex(orderItem => orderItem.name === item.name);
        if (existingItemIndex !== -1) {
            const updatedOrder = [...order];
            updatedOrder[existingItemIndex].quantity += 1;
            setOrder(updatedOrder);
        } else {
            setOrder([...order, {...item, quantity: 1}]);
        }
    };

    /**
     * Checkout and cart system that handles a checkout.
     * If there are no items, an alert is sent stating the cart is empty.
     * Else, the order is set and the user is alerted the items were added to the cart.
     */
    const handleCheckout = () => {
        if (order.length === 0) {
            alert('Your basket is empty');
        } else {
            console.log(order);
            localStorage.setItem("order", JSON.stringify(order));
            localStorage.setItem("tablenumber", JSON.stringify(tableNumber));
            setOrder([]);
            setCounter(counter + 1);
            alert('Your items are added to cart!');
        }
    };


    // Removes an item from the order

    /**
     * Removes an item from an order.
     * @param {object} itemToRemove the item object to remove
     */
    const handleRemove = (itemToRemove) => {
        const existingItemIndex = order.findIndex((item) => item.name === itemToRemove.name);
        if (existingItemIndex >= 0) {
            const updatedOrder = [...order];
            if (updatedOrder[existingItemIndex].quantity > 1) {
                updatedOrder[existingItemIndex].quantity -= 1;
            } else {
                updatedOrder.splice(existingItemIndex, 1);
            }
            setOrder(updatedOrder);
        }
    };

    // Calculates the total price of the order
    const totalMoney = order.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    // Responsible for obtaining the menu items of a requested category when button is clicked
    const handleButtonClick = (item) => {
        if (item === 'mains') {
            fetch('http://localhost:3000/menu/mains')
                .then((response) => response.json())
                .then((data) => {
                    setMains(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (item === 'sides') {
            fetch('http://localhost:3000/menu/sides')
                .then((response) => response.json())
                .then((data) => {
                    setSides(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (item === 'drinks') {
            fetch('http://localhost:3000/menu/drinks')
                .then((response) => response.json())
                .then((data) => {
                    setDrinks(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (item === 'desserts') {
            fetch('http://localhost:3000/menu/dessert')
                .then((response) => response.json())
                .then((data) => {
                    setDesserts(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setExpanded(item);
    };

    // Responsible for sending a help request to the server
    const sendHelpRequest = (event) => {
        window.alert("Help Requested!");
        // Send data to server to insert into database
        fetch('http://localhost:3000/requestHelp', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tableNumber),
        })
    }

    // Prompts user to enter their table number
    useEffect(() => {
        if (show) {
            setTableNumber(window.prompt('What is your table number?'));
            show = false; //Stops the prompt from loading multiple times
        }
    }, []);

    // Main front-end code for menu logged in page
    return (
        <div className="App">
            <header className="App-header">
                <Link to="/">
                    <img src={logo} alt="the logo" className="header-image"/>
                </Link>
                <div>
                    <Link to="/user">
                        <button className="user-button">User</button>
                    </Link>
                    <Link to="/cart">
                        <button className="cart-button">Cart</button>
                    </Link>
                </div>
            </header>
            <div className="splash-image">
                <img src={splash} alt="splash" className={"splash-image"}/>
            </div>
            <div className="menu-container">
                <div className="menu-categories-container">
                    <div className="menu-category-container">
                        <button onClick={() => handleButtonClick("mains")}>Mains</button>
                    </div>
                    <div className="menu-category-container">
                        <button onClick={() => handleButtonClick("sides")}>Sides</button>
                    </div>
                    <div className="menu-category-container">
                        <button onClick={() => handleButtonClick("desserts")}>Desserts</button>
                    </div>
                    <div className="menu-category-container">
                        <button onClick={() => handleButtonClick("drinks")}>Drinks</button>
                    </div>
                    <div className="ordering-container">
                        <h1 className="table">TABLE</h1>
                        <p className="table-number">{tableNumber}</p>
                        <hr className="underline"></hr>
                        <h1 className="simple-text">YOUR ORDER</h1>
                        <h4 className={"GAP"}/>
                        {order.map((item, index) => (
                                <div className= "order-row">
                                    <div key={index}>
                                        <div className="item-name">{item.quantity} {item.name}</div>
                                        <button className="remove" onClick={() => handleRemove(item)}>-</button>
                                        <div className="money">£{(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                                ))}
                        <hr className="underline"></hr>
                        <h1 className="simple-text">TOTAL</h1>
                        <h2 className="money">£{totalMoney.toFixed(2)}</h2>
                        <div>
                            <button className="invisible-button"></button>
                            <Link to = "/cart">
                                <button className="checkout" onClick={handleCheckout}>CHECKOUT</button>
                            </Link>
                            <button class="help-button" onClick={sendHelpRequest}>Call Waiter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="separate"/>
            {expanded === "mains" && (
                <div className='expanded-div'>
                    <div className='menu-items-container'>
                        {mains.map((item) => (
                            <>
                                <div className='food-item-container'>
                                    <div className='menu-items' key={item.id}>{item.name} - £{item.price}&nbsp;&nbsp;&nbsp;
                                        <div className='calories' key={item.id}>({item.calories} KCAL)</div>
                                        <button className='information' onClick={() => infoPopup(item.id)}>ⓘ</button>
                                        <br/></div>
                                    <div className='description' key={item.id}>{item.description} <br/></div>
                                    <button className='add-button' onClick={() => addToOrder(item)}> Add To Order
                                    </button>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            )}
            {expanded === "sides" && (
                <div className='expanded-div'>
                    <div className='menu-items-container'>
                        {sides.map((item) => (
                            <>
                                <div className='menu-items' key={item.id}>{item.name} - £{item.price}&nbsp;&nbsp;&nbsp;
                                    <div className='calories' key={item.id}>({item.calories} KCAL)</div>
                                    <button className='information' onClick={() => infoPopup(item.id)}>ⓘ</button>
                                    <br/></div>
                                <div className='description' key={item.id}>{item.description} <br/></div>
                                <button className='add-button' onClick={() => addToOrder(item)}> Add To Order</button>
                            </>
                        ))}
                    </div>
                </div>
            )}
            {expanded === "desserts" && (
                <div className='expanded-div'>
                    <div className='menu-items-container'>
                        {desserts.map((item) => (
                            <>
                                <div className='menu-items' key={item.id}>{item.name} - £{item.price}&nbsp;&nbsp;&nbsp;
                                    <div className='calories' key={item.id}>({item.calories} KCAL)</div>
                                    <button className='information' onClick={() => infoPopup(item.id)}>ⓘ</button>
                                    <br/></div>
                                <div className='description' key={item.id}>{item.description}<br/></div>
                                <button className='add-button' onClick={() => addToOrder(item)}> Add To Order</button>
                            </>
                        ))}
                    </div>
                </div>
            )}
            {expanded === "drinks" && (
                <div className='expanded-div'>
                    <div className='menu-items-container'>
                        {drinks.map((item) => (
                            <>
                                <div className='menu-items' key={item.id}>{item.name} - £{item.price}&nbsp;&nbsp;&nbsp;
                                    <div className='calories' key={item.id}>({item.calories} KCAL)</div>
                                    <button className='information' onClick={() => infoPopup(item.id)}>ⓘ</button>
                                    <br/></div>
                                <div className='description' key={item.id}>{item.description} <br/></div>
                                <button className='add-button' onClick={() => addToOrder(item)}> Add To Order</button>
                            </>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu;