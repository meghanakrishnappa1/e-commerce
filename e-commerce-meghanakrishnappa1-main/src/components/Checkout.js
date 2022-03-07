import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { commerce } from "../lib/commerce"
import { Button, Grid } from '@material-ui/core';
import ShippingForm from './ShippingForm';
import PaymentForm from './paymentForm';

function Checkout({ cart }) {

    const [checkout, setCheckout] = useState({});

    useEffect(() => {
        if (cart.id) {
            commerce.checkout.generateToken(cart.id, { type: 'cart' }).then(
                (checkout) => {
                    setCheckout(checkout)
                    //console.log(checkoutToken.id);
                }
            );
        }
    }, [cart]);
    console.log(checkout);

    const [shippingInfo, setShippingInfo] = useState({});
    const [paymentMethod, setPaymentMethod] = useState({});
    // console.log(shippingInfo)

    const handlePlaceOrder = (checkout, shippingInfo, paymentMethod) => {
        console.log(checkout);
        console.log(shippingInfo);
        console.log(paymentMethod);

        const indexofspace = shippingInfo.fullName.indexOf(' ');
        const orderData = {
            "line_items": checkout.live.line_items,
            "customer": {
                "email": shippingInfo["email"],
                "firstname": shippingInfo["fullName"].substring(0, indexofspace),
                "lastname": shippingInfo["fullName"].substring(indexofspace + 1),
                "phone": shippingInfo["phone"]
            },
            "shipping": {
                "name": shippingInfo["fullName"],
                "street": shippingInfo["streetAddress"],
                "town_city": shippingInfo["city"],
                "county_state": shippingInfo["region"],
                "postal_zip_code": shippingInfo["zipcode"],
                "country": shippingInfo["country"]
            },
            "fulfillment": {
                "shipping_method": shippingInfo["shipping"],
            },
            "payment": {
                "gateway": 'stripe',
                "stripe": {
                    "payment_method_id": paymentMethod["id"]
                }
            }

        };
        //console.log(orderData);

        commerce.checkout.capture(checkout.id, orderData).then(
            (response) => {
                console.log(response);
                setIsOrderPlaced(true);
            }
        );
    }

    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    if (isOrderPlaced) {
        return <h4> Order Placed </h4>
    }

    if (!checkout.id) return <h4>Loading...</h4>

    return (

        <Grid container direction="column">

            <Grid item >
                <h3> Checkout</h3>
                <Grid item >
                    <p> Shipping Form</p>
                    <ShippingForm checkoutToken={checkout.id} setShippingInfo={setShippingInfo} />

                    {
                        console.log(shippingInfo)
                    }
                </Grid>
                <Grid item >
                    <PaymentForm setPaymentMethod={setPaymentMethod} />
                </Grid>
                <Grid item >
                    <Button onClick={(event) => { handlePlaceOrder(checkout, shippingInfo, paymentMethod) }}>confirm to place an order</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Checkout;