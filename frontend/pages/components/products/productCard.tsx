import { ComponentType } from "react";
import { Col, Card, CardImg } from "react-bootstrap";
import { ProductInfo } from "../../../types/productInfo";

interface ProductCard {
  readonly product: ProductInfo;
}

const ProductCard: ComponentType<ProductCard> = ({product}: ProductCard) => {
  return (
    <Col>
      <Card className="shadow-sm">
        <CardImg
          src={product.img}
          alt="product image"
        />
        <div className="card-header">
          {product.name}
          <h3>{product.price}</h3>
        </div>
        <div className="card-body">
          {product.description}
        </div>
        <div className="card-footer">
          {product.averageEvaluation}
        </div>
      </Card>
    </Col>
  );
};

export default ProductCard;
