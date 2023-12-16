import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const options = {
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (


    <div className="card">
      <Link className="productCard" to={`/product/${product?._id}`}>
        <img className="card-img-top" src={product?.images[0]?.url} alt={product?.name} />

        <div class="card-body">
          <p className="product-title">
            <b>{product.name}</b></p>

          <Rating  {...options} />{" "}
          <p className="product-ratting">
            {" "}
            ({product?.numOfReviews} Reviews)
          </p>

          <p className="product-price"><b>{`${product?.destination}`}</b></p>
          <p className="product-price"><b>{`Rs: ${product?.price}`}</b></p>
          <button className="read-more-btn">Read More</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;