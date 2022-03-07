import { AppBar, Toolbar, IconButton, Badge, Button } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import React from 'react';
import { commerce } from '../lib/commerce';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function Navbar({ cartItems, isLogin }) {
    console.log(isLogin);
    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <IconButton href="/Products"><ShoppingBasketIcon /></IconButton>
                e-Comm Shop
                <IconButton href="/cart">
                    <Badge badgeContent={cartItems} color="secondary">
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </IconButton>

                <Button onClick={(event) => {
                    window.location.href = '/user/:userID'
                }}>
                    Orders
                </Button>

                <IconButton href="/profile">
                    <AccountCircleIcon />
                </IconButton>

                {!isLogin && <Button onClick={(event) => {
                    window.location.href = '/Login'
                }}>
                    LogIn
                </Button>}

                {isLogin && <Button onClick={(event) => {
                    commerce.customer.logout();
                    window.location.href = '/Products'
                }}>
                    Logout
                </Button>}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
