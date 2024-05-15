import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "./SearchResult.css";

function SearchResult({ searchResult }) {
  const [products, setProducts] = useState(searchResult);
  const navigate = useNavigate();

  const handleProductClick = (product_id) => {
    console.log(product_id);
    navigate(`/product/${product_id}`);
  };

  const sortProductsByPrice = (order) => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      if (order === "asc") {
        return a.buy_price - b.buy_price;
      } else {
        return b.buy_price - a.buy_price;
      }
    });
    setProducts(sortedProducts);
  };

  return (
    <Container>
      <div className="sort mb-3">
        <h5 className="m-0">Danh sách sản phẩm</h5>
        <div className="d-flex" style={{ alignItems: "center" }}>
          <h6 className="m-0" style={{ paddingRight: "5px" }}>
            Sắp xếp theo
          </h6>
          <ul className="d-flex m-0 p-0" style={{ alignItems: "center" }}>
            <li className="item-sort">Bán chạy</li>
            <li
              className="item-sort"
              onClick={() => sortProductsByPrice("asc")}
            >
              Giá cao
            </li>
            <li
              className="item-sort"
              onClick={() => sortProductsByPrice("desc")}
            >
              Giá thấp
            </li>
          </ul>
        </div>
      </div>
      <Row className="equal-height-row">
        {products.map((product) => (
          <Col key={product.product_id} style={{ marginBottom: "15px" }}>
            <Card
              style={{ width: "100%", height: "100%" }}
              onClick={() => handleProductClick(product.product_id)}
              className="card"
            >
              <Card.Img
                variant="top"
                src={`http://127.0.0.1:8000/media/${product.img}`}
              />
              <Card.Body>
                <Card.Text className="title-product">{product.name}</Card.Text>
                <Card.Text className="price-product">
                  {(product.buy_price / 1000)
                    .toFixed(3)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  đ
                </Card.Text>
              </Card.Body>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn-primary">
                  Chọn mua
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchResult;
