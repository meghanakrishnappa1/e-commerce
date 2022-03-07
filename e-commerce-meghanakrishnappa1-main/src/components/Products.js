import { useState, useEffect } from "react";
import { commerce } from '../lib/commerce';
import { Card, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 200,
    border: '1px solid black',
  }
});

function Products() {
  const classes = useStyles();

  console.log("Products.js");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    commerce.products.list().then(result => {
      setProducts(result.data);
      //console.log(result.data);
    });
  }, []);
  //console.log("during the render");

  return (
    <Grid container spacing={2}>
      {products.length === 0 && <p>Loading . . .</p>}
      {
        products.map((product) => {

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} >
              <Card style={{ width: '14' }}>
                <CardActionArea className={classes.media}>
                  <CardMedia >
                    <a href={"/Products/" + product.id} >
                      <img key={product.id} src={product.image.url} alt={product.name} width={250} />
                    </a>
                  </CardMedia>
                </CardActionArea>
              </Card>
            </Grid>);
        })
      }
    </Grid>
  );
}

export default Products