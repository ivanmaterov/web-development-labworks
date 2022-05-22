import { ComponentType } from "react";
import ProductCard from "../../components/products/ProductCard";

import { useAppSelector, useAppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/product/dispatchers";
import { selectAllProducts } from "../../redux/product/selectors";
import { Box, Grid } from "@mui/material";


const GoodsPage: ComponentType = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(selectAllProducts)

	useEffect(() => {
		dispatch(fetchProducts())
	},
	[dispatch])
	return (
		<Box sx={{ padding: '2% 15%', height: '100%', width: '100%' }}>
      <Grid container spacing={4} direction="column" justifyContent="space-evenly" alignItems="center">
				{products.map((item) => <ProductCard product={item}/>)}
      </Grid>
    </Box>
	);
};

export default GoodsPage;
