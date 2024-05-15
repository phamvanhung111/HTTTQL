import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, ListGroup, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./DetailProduct.css";
import NavigationBar from "../NavigationBar/NavigationBar";

function DetailProduct() {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleBuyButtonClick = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("Access token not found in local storage");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/addToCart/",
        {
          product_id: product.product_id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data); // Xử lý kết quả từ server sau khi thêm vào giỏ hàng
      navigate("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          console.error("Access token not found in local storage");
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/getDetailProduct/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProduct(response.data); // Lưu thông tin sản phẩm vào state
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]); // Khi id thay đổi, fetch lại thông tin của sản phẩm

  return (
    <div style={{ backgroundColor: "var(--color-bg" }}>
      <div>
        <NavigationBar />
      </div>
      <div className="container ctn-product-detail">
        <div className="row">
          <div className="col">
            {product && (
              <Row className="ctn-card">
                <Col>
                  <Card className="d-flex flex-row">
                    <div>
                      <Card.Img
                        variant="top"
                        src={`http://127.0.0.1:8000/media/${product.img}`}
                        alt={product.name}
                        style={{ width: "400px", height: "auto" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="description">
                        {product.description}
                      </Card.Text>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          Quantity: {product.quantity}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Category: {product.category}
                        </ListGroup.Item>
                        <ListGroup.Item className="price-product">
                          {(product.buy_price / 1000)
                            .toFixed(3)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          đ
                        </ListGroup.Item>
                      </ListGroup>
                      <Form>
                        <Form.Group controlId="quantity">
                          <Form.Label>Chọn số lượng</Form.Label>
                          <Form.Control
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            style={{ width: "65px" }}
                          />
                        </Form.Group>
                        <p></p>
                        <Button
                          variant="primary"
                          onClick={handleBuyButtonClick}
                        >
                          Chọn mua
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
