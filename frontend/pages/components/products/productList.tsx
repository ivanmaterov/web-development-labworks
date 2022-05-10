import { ComponentType } from "react";

import ProductCard from "./productCard";

import { Row } from "react-bootstrap";

const ProductList: ComponentType = () => {
	return (
		<Row>
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</Row>
	);
};

export default ProductList;
