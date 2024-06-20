import {Route, Routes} from "react-router-dom"
import { default as Menu } from './pages/Menu.js';
import { default as Kitchen} from './pages/Kitchen';
import { default as Waiter} from './pages/Waiter';
import { default as Login} from './pages/Login';
import Register from "./pages/Register";
import MenuLoggedIn from "./pages/MenuLoggedIn";
import User from "./pages/User";
import EditMenu from "./pages/EditMenu";
import Cart from "./pages/Cart";


export function App() {
    return (
            <Routes>
                <Route path = "/" element = {<Menu />} />
                <Route path = "menuL" element = {<MenuLoggedIn />} />
                <Route path = "kitchen" element={<Kitchen />} />
                <Route path = "waiter" element = {<Waiter />} />
                <Route path = "login" element = {<Login />} />
                <Route path = "register" element = {<Register />} />
                <Route path = "user" element = {<User />} />
                <Route path = "edit" element={<EditMenu />} />
                <Route path = "cart" element={<Cart />} />
            </Routes>
    )
}