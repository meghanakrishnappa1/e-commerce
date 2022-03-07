import { Grid, Button } from '@material-ui/core';
import CartItem from './cartItem';

function Cart({ cart, handleUpdateCart, handleRemoveFromCart, handleEmptyCart }) {

    if (!cart || !cart.line_items) {
        return <div>loading the cart ....</div>
    }

    if (cart.total_items === 0) {
        return <div>Your shopping cart is empty.</div>
    }

    return (
        <Grid container direction="column">
            <h3>Your shopping cart</h3>

            {
                cart.line_items.map(
                    (cartItem => {
                        return (
                            <CartItem Key={cartItem.id} cartItem={cartItem} handleUpdateCart={handleUpdateCart} handleRemoveFromCart={handleRemoveFromCart} />
                        );
                    }
                    )
                )
            }

            <div>
                <Button onClick={handleEmptyCart}>Empty Cart</Button>
                <Button onClick=
                    {(event) => {
                        window.location.href = '/Checkout'
                    }}>
                    Checkout</Button>
            </div>
        </Grid>
    );
}

export default Cart;

