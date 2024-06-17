import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "./Products.css";

function Products({ categoryId, typeId, minPrice, maxPrice }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 15;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          console.error("Access token not found in local storage");
          return;
        }

        let url = "http://127.0.0.1:8000/api/getAllProduct/";

        if (categoryId) {
          url = `http://127.0.0.1:8000/api/getByCategory/${categoryId}/`;
        } else if (typeId) {
          url = `http://127.0.0.1:8000/api/getByType/${typeId}/`;
        } else if (minPrice && maxPrice) {
          url = `http://127.0.0.1:8000/api/getByPrice/?min=${minPrice}&max=${maxPrice}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId, typeId, minPrice, maxPrice]);

  const handleProductClick = (product_id) => {
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

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Get current products based on page
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
      <Row className="grid-3">
        {currentProducts.map((product) => (
          <div
            className="p-1"
            key={product.product_id}
            style={{ marginBottom: "5px" }}
          >
            <Card
              style={{ width: "100%", height: "100%" }}
              onClick={() => handleProductClick(product.product_id)}
              className="card"
            >
              <Card.Img
                variant="top"
                src={`http://127.0.0.1:8000/media/${product.img}`}
                style={{ height: "200px" }}
                className="bd-bt"
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
                <button
                  type="button"
                  className="btn btn-primary border w-50 bg-login"
                >
                  Chọn mua
                </button>
              </div>
            </Card>
          </div>
        ))}
      </Row>
      <div className="pagination d-flex justify-content-center align-items-center">
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          Trước
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={i + 1 === page ? "active" : ""}
            id="hvclx"
          >
            {i + 1}
          </Button>
        ))}
        <Button onClick={handleNextPage} disabled={page === totalPages}>
          Tiếp
        </Button>
      </div>
    </Container>
  );
}

export default Products;
