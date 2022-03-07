import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    image: {
        width: 128,
        height: 128,
    },

    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',

    },

    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
});

function CartItem({ cartItem, handleUpdateCart, handleRemoveFromCart }) {
    const classes = useStyles();

    return (
        <Grid item container>
            <Grid item xs={12} sm={4}>
                <div className={classes.image}>
                    <img src={cartItem.image.url} className={classes.img} alt={cartItem.id} ></img>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} container direction="column" >
                <Grid item>
                    {cartItem.name}
                </Grid>
                <Grid item>
                    Quantity:{cartItem.quantity}
                </Grid>
                <Grid>
                    <Button onClick={
                        () => {
                            handleUpdateCart(cartItem.id, { quantity: cartItem.quantity - 1 });
                            console.log(cartItem.id);
                            console.log(cartItem.quantity);
                        }
                    } > - </Button>

                    {cartItem.quantity}
                    <Button onClick={
                        () => {
                            handleUpdateCart(cartItem.id, { quantity: cartItem.quantity + 1 });
                            console.log(cartItem.id);
                            console.log(cartItem.quantity);
                        }
                    } > + </Button>

                    <Button onClick={
                        () => {
                            handleRemoveFromCart(cartItem.id);
                        }
                    }> Remove </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={2}>
                <div>{cartItem.line_total.formatted_with_symbol}</div>
            </Grid>
        </Grid>
    );
}

export default CartItem;

