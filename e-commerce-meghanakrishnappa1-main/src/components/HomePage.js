import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core";
import { commerce } from "../lib/commerce";
import { Grid, Card } from "@material-ui/core";

function HomePage({ isLogin, setIsLogin }) {

    const { userID } = useParams();
    console.log(userID);

    const useStyles = makeStyles({

        height: 200,
        border: '1px solid black',
    });

    const classes = useStyles();

    const [customerEmail, setCustomerEmail] = useState("");

    useEffect(() => {
        commerce.customer.getToken(userID).then(
            (jwt) => {
                console.log(jwt);
                setIsLogin(true);
            }
        );
    }, [userID, setIsLogin]);

    useEffect(() => {
        if (commerce.customer.isLoggedIn()) {
            commerce.customer.about().then(
                (customer) => {
                    console.log(customer);
                    setCustomerEmail(customer.email);
                }
            );
        }
    }, [isLogin]);
    console.log(userID);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (commerce.customer.isLoggedIn() && isLogin) {
            commerce.customer.getOrders(commerce.customer.id()).then(
                (response) => {
                    console.log(response);
                    setOrders(response.data);
                }
            );
        }
    }, [isLogin]);

    if (!commerce.customer.isLoggedIn()) {
        return (
            <h5>Please log in</h5>
        );
    }
    console.log(orders);

    return (
        <div>
            {customerEmail && <h4> Welcome! {customerEmail}</h4>}

            {orders.map(
                (orderItem) => {
                    var date = new Date(0);
                    date.setUTCSeconds(orderItem.created);
                    return (
                        <Grid container>
                            <Grid container justify="space-around"  >
                                <Card style={{ width: '80%', height: '80%', fontSize: '10px', margin: '20px' }} >
                                    <Card style={{ backgroundColor: "lightgrey" }}>
                                        <Grid item><h4>Ordered Date: {date.toLocaleDateString()}</h4></Grid>
                                        <Grid item><p> Total:{orderItem.order_value.formatted_with_code}</p></Grid>
                                    </Card>
                                    {orderItem.order.line_items.map((lineItem) => {
                                        return (
                                            <Grid container direction="row" spacing={1} xs={10} className={classes.items} >
                                                <Grid item xs={8}><p>{lineItem.product_name}</p></Grid>
                                                <Grid item xs={2}> <p>{lineItem.quantity}</p></Grid>
                                                <Grid item xs={2}><p>{lineItem.line_total.formatted_with_code}</p></Grid>
                                            </Grid>
                                        )
                                    })
                                    }
                                </Card>
                            </Grid>
                        </Grid>
                    )
                })
            }
        </div>
    );
}

export default HomePage;