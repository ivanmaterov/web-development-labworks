import { ComponentType } from "react";
import { Col, Card, CardImg } from "react-bootstrap";

type ProductInfo = {
  name: string;
  description: string;
  img: string;
  price: number;
  averageEvaluation?: number;
  evaluations?: number;
}

const ProductCard: ComponentType<ProductInfo> = (product) => {
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
