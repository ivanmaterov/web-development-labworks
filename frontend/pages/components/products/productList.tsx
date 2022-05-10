import { ComponentType } from "react";

import ProductCard from "./productCard";

import { Row } from "react-bootstrap";

import { ProductInfo } from "../../../types/productInfo";

const ProductList: ComponentType = () => {
	const product: ProductInfo = {
		name: 'test',
		description: 'test',
		img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		price: 1234
	}
	return (
		<Row>
			<ProductCard product={product} />
			<ProductCard product={product} />
			<ProductCard product={product} />
		</Row>
	);
};

export default ProductList;
