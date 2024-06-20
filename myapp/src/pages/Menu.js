import React, { useState, useEffect } from 'react';
import '../css/Menu.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import splash from '../splash-image.jpg';
import { Link } from 'react-router-dom';


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
    const [imageVisible, setImageVisible] = useState(false);
    const [imageName, setImageName] = useState('');

    function toggleImage(name) {
        if (imageName === name) {
            setImageVisible(!imageVisible);
        } else {
            setImageName(name);
            setImageVisible(true);
        }
    }

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
            setOrder([...order, { ...item, quantity: 1 }]);
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
            const itemsAdded = [];
            let totalQuantity = 0;
            order.forEach((item) => {
                for (let i = 0; i < item.quantity; i++) {
                    itemsAdded.push(item.name);
                    totalQuantity++;
                }
            });
            console.log(order);
            localStorage.setItem("order", JSON.stringify(order));
            localStorage.setItem("tablenumber", JSON.stringify(tableNumber));
            setOrder([]);
            setCounter(counter + totalQuantity);
            alert(`The following items: ${itemsAdded.join(', ')}, are added to cart!`);
        }
    };
    const handleVeganClick = (type) => {
        if (type === 'mains') {
            fetch('http://localhost:3000/menu/mains/vegan')
                .then((response) => response.json())
                .then((data) => {
                    setMains(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'sides') {
            fetch('http://localhost:3000/menu/sides/vegan')
                .then((response) => response.json())
                .then((data) => {
                    setSides([])
                    setSides(data);
                })
                .catch((error) => {
                    console.log(error);
                });
            setExpanded('sides')
        }
        if (type === 'drinks') {
            fetch('http://localhost:3000/menu/drinks/vegan')
                .then((response) => response.json())
                .then((data) => {
                    setDrinks(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'desserts') {
            fetch('http://localhost:3000/menu/dessert/vegan')
                .then((response) => response.json())
                .then((data) => {
                    setDesserts(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleVegetarianClick = (type) => {
        if (type === 'mains') {
            fetch('http://localhost:3000/menu/mains/vegetarian')
                .then((response) => response.json())
                .then((data) => {
                    setMains(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'sides') {
            fetch('http://localhost:3000/menu/sides/vegetarian')
                .then((response) => response.json())
                .then((data) => {
                    setSides(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'drinks') {
            fetch('http://localhost:3000/menu/drinks/vegetarian')
                .then((response) => response.json())
                .then((data) => {
                    setDrinks(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'desserts') {
            fetch('http://localhost:3000/menu/dessert/vegetarian')
                .then((response) => response.json())
                .then((data) => {
                    setDesserts(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleDairyFreeClick = (type) => {
        if (type === 'mains') {
            fetch('http://localhost:3000/menu/mains/dairy_free')
                .then((response) => response.json())
                .then((data) => {
                    setMains(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'sides') {
            fetch('http://localhost:3000/menu/sides/dairy_free')
                .then((response) => response.json())
                .then((data) => {
                    setSides(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'drinks') {
            fetch('http://localhost:3000/menu/drinks/dairy_free')
                .then((response) => response.json())
                .then((data) => {
                    setDrinks(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'desserts') {
            fetch('http://localhost:3000/menu/dessert/dairy_free')
                .then((response) => response.json())
                .then((data) => {
                    setDesserts(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


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
    const sendHelpRequest = () => {
        window.alert("Help Requested!");
        // Send data to server to insert into database
        fetch(`http://localhost:3000/helpRequest/${tableNumber}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tableNumber }),
        })
    }

    // Prompts user to enter their table number
    // Will only take integers
    useEffect(() => {
        let isPrompting = true;

        while (isPrompting) {
            const input = window.prompt('What is your table number?');
            const tableNumber = parseInt(input);

            if (!isNaN(tableNumber)) {
                setTableNumber(tableNumber);
                isPrompting = false;
            }
        }
    }, []);

    // Main front-end code for menu page
    return (
        <div className="App">
            <header className="App-header">
                <Link to="/">
                    <img src={logo} alt="the logo" className="header-image" />
                </Link>
                <div>
                    <Link to="/login">
                        <button className="login-button">Login</button>
                    </Link>
                    <Link to="/cart">
                        <button className="cart-button">Cart ({counter})</button>
                    </Link>
                </div>
            </header>
            <div className="splash-image">
                <img src={splash} alt="splash" className={"splash-image"} />
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
                        <h4 className={"GAP"} />
                        {order.map((item, index) => (<div className="order-row">
                            <div key={index}>
                                <div className="item-name">{item.quantity} {item.name}</div>
                                <button className="remove" onClick={() => handleRemove(item)}>-</button>
                                <div className="money">£{(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>))}
                        <hr className="underline"></hr>
                        <h1 className="simple-text">TOTAL</h1>
                        <h2 className="money">£{totalMoney.toFixed(2)}</h2>
                        <br />
                        <div>
                            <button className="invisible-button"></button>
                            <Link to="/cart">
                                <button className="checkout" onClick={() => handleCheckout()}>CHECKOUT</button>
                            </Link>
                            <button className="help-button" onClick={() => sendHelpRequest()}>Call Waiter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="separate" />

            {expanded === "mains" && (<div className='expanded-div'>
                <div className="filters">
                    <button className="vegan-filter" onClick={() => handleVeganClick(expanded)}>Vegan</button>
                    <button className="vegetarian-filter" onClick={() => handleVegetarianClick(expanded)}>Vegetarian
                    </button>
                    <button className="dairy-filter" onClick={() => handleDairyFreeClick(expanded)}>Dairy Free</button>
                </div>
                <div className='menu-items-container'>
                    {mains.map((item) => (<>
                        <div className='food-item-container'>
                            <div className='menu-items' key={item.id}>
                                <span className='toggle-item-name' onClick={() => toggleImage(item.name)}>{item.name}</span>&nbsp;-
                                £{item.price}&nbsp;&nbsp;&nbsp;
                                <div className='calories' key={item.id}>({item.calories}KCAL)</div>
                                {imageVisible && imageName === item.name && (
                                    <img className='menu-images' src={require(`./images/${item.name}.jpg`)} alt={item.name} />
                                )}
                                <button className='information' onClick={() => infoPopup(item.id)}>ⓘ</button>
                            </div>
                            <br />
                            <div className='description'>{item.description} <br /></div>
                            <button className='add-button' onClick={() => addToOrder(item)}> Add To Order
                            </button>
                            <br />
                        </div>
                        <div>
                            <hr className="solid"></hr>
                        </div>
                    </>))}
                </div>
            </div>)
            }
            {
                expanded === "sides" && (<div className='expanded-div'>
                    <div className="filters">
                        <button className="vegan-filter" onClick={() => handleVeganClick(expanded)}>Vegan</button>
                        <button className="vegetarian-filter" onClick={() => handleVegetarianClick(expanded)}>Vegetarian
                        </button>
                        <button className="dairy-filter" onClick={() => handleDairyFreeClick(expanded)}>Dairy Free</button>
                    </div>
                    <div className='menu-items-container'>
                        {sides.map((item) => (<>
                            <div className='menu-items' key={item.id}>
                                <span className='toggle-item-name' onClick={() => toggleImage(item.name)}>{item.name}</span>&nbsp;-
                                £{item.price}&nbsp;&nbsp;&nbsp;
                                <div className='calories' key={item.id}>({item.calories}KCAL)</div>
                                {imageVisible && imageName === item.name && (
                                    <img className='menu-images' src={require(`./images/${item.name}.jpg`)} alt={item.name} />
                                )}
                                <button className='information' onClick={() => infoPopup(item.id)}>ⓘ</button>
                            </div>
                            <br />
                            <div className='description'>{item.description} <br /></div>
                            <button className='add-button' onClick={() => addToOrder(item)}> Add To Order
                            </button>
                            <br />
                            <div>
                                <hr className="solid"></hr>
                            </div>
                        </>))}
                    </div>
                </div>)
            }
            {
                expanded === "desserts" && (<div className='expanded-div'>
                    <div className="filters">
                        <button className="vegan-filter" onClick={() => handleVeganClick(expanded)}>Vegan</button>
                        <button className="vegetarian-filter" onClick={() => handleVegetarianClick(expanded)}>Vegetarian
                        </button>
                        <button className="dairy-filter" onClick={() => handleDairyFreeClick(expanded)}>Dairy Free</button>
                    </div>
                    <div className='menu-items-container'>
                        {desserts.map((item) => (<>
                            <div className='menu-items' key={item.id}>
                                <span className='toggle-item-name' onClick={() => toggleImage(item.name)}>{item.name}</span>&nbsp;-
                                £{item.price}&nbsp;&nbsp;&nbsp;
                                <div className='calories' key={item.id}>({item.calories}KCAL)</div>
                                {imageVisible && imageName === item.name && (
                                    <img className='menu-images' src={require(`./images/${item.name}.jpg`)} alt={item.name} />
                                )}
                                <button className='information' onClick={() => infoPopup(item.id)}>ⓘ</button>
                            </div>
                            <br />
                            <div className='description'>{item.description} <br /></div>
                            <button className='add-button' onClick={() => addToOrder(item)}> Add To Order
                            </button>
                            <br />
                            <hr className="solid"></hr>
                </>))}
        </div>
                </div >)
}
{
    expanded === "drinks" && (<div className='expanded-div'>
        <div className="filters">
            <button className="vegan-filter" onClick={() => handleVeganClick(expanded)}>Vegan</button>
            <button className="vegetarian-filter" onClick={() => handleVegetarianClick(expanded)}>Vegetarian
            </button>
            <button className="dairy-filter" onClick={() => handleDairyFreeClick(expanded)}>Dairy Free</button>
        </div>
        <div className='menu-items-container'>
            {drinks.map((item) => (<>
                <div className='menu-items' key={item.id}>
                    <span className='toggle-item-name' onClick={() => toggleImage(item.name)}>{item.name}</span>&nbsp;-
                    £{item.price}&nbsp;&nbsp;&nbsp;
                    <div className='calories' key={item.id}>({item.calories}KCAL)</div>
                    {imageVisible && imageName === item.name && (
                        <img className='menu-images' src={require(`./images/${item.name}.jpg`)} alt={item.name} />
                    )}
                    <button className='information' onClick={() => infoPopup(item.id)}>ⓘ</button>
                </div>
                <br />
                <div className='description'>{item.description} <br /></div>
                <button className='add-button' onClick={() => addToOrder(item)}> Add To Order
                </button>
                <br />
                <div>
                    <hr className="solid"></hr>
                </div>
            </>))}
        </div>
    </div>)
}
        </div >)
}

export default Menu;