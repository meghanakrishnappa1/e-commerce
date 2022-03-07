import './App.css';
import Product from "./components/Product";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { commerce } from './lib/commerce';
import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Cart from "./components/cart/cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";

function App() {

  const [cart, setCart] = useState({});
  useEffect(() => {
    commerce.cart.retrieve().then(
      (response) => {
        console.log(response);
        setCart(response)
      }
    );
  }, []);

  const handleAddToCart = (productId, quantity) => {
    //console.log("Handling add to cart....")
    commerce.cart.add(productId, quantity).then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    );

  }

  const handleUpdateCart = (productId, quantity) => {
    commerce.cart.update(productId, quantity).then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    );
  }

  const handleRemoveFromCart = (productId) => {
    commerce.cart.remove(productId).then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    );
  }

  const handleEmptyCart = () => {
    commerce.cart.empty().then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    );
  }

  const [isLogin, setIsLogin] = useState(false);
  const isLoggedIn = commerce.customer.isLoggedIn();

  useEffect(() => {
    if (commerce.customer.isLoggedIn()) {
      setIsLogin(true);
    }
  }, [isLoggedIn]);

  return (
    <Grid container direction="column">

      <Grid item>

        <header><Navbar cartItems={cart.total_items} isLogin={isLogin} /></header>

      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={1} md={2} lg={2}></Grid>
        <Grid item xs={12} sm={10} md={8} lg={8}>

          <BrowserRouter>
            <Switch>

              <Route exact path={["/Products/:ProductId"]}>
                <Product
                  handleAddToCart={handleAddToCart}
                />
              </Route>

              <Route exact path={["/Products"]}>
                <Products />
              </Route >

              <Route exact path="/cart">
                <Cart
                  cart={cart}
                  handleUpdateCart={handleUpdateCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleEmptyCart={handleEmptyCart}
                />
              </Route>

              <Route exact path="/Checkout">
                <Checkout cart={cart} />
              </Route>

              <Route exact path="/Login">
                <Login />
              </Route >

              <Route exact path="/user/:userID">
                <HomePage isLogin={isLogin} setIsLogin={setIsLogin} />
              </Route >

              <Route exact path="/Profile">
                <Profile />
              </Route >

            </Switch>
          </BrowserRouter>

        </Grid>
        <Grid item xs={false} sm={1} md={2} lg={2}></Grid>
      </Grid>
    </Grid>
  );
}

export default App;
