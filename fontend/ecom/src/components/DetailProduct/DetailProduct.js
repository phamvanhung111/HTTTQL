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
                    <div className="d-flex flex-column justify-content-center">
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
                <div className="mt-2">
                  <h2> Mô tả sản phẩm </h2>
                  <div>
                    <h4>Giới Thiệu Chung</h4>
                    <span>
                      Chào mừng bạn đến với thế giới của những chiếc laptop hiện
                      đại, nơi công nghệ đỉnh cao gặp gỡ với thiết kế tinh tế để
                      mang lại cho bạn những trải nghiệm tuyệt vời nhất. Chúng
                      tôi tự hào giới thiệu dòng sản phẩm laptop đa dạng, phù
                      hợp với mọi nhu cầu từ công việc, học tập đến giải trí và
                      sáng tạo. Với những tính năng vượt trội, hiệu năng mạnh mẽ
                      và thiết kế bắt mắt, chiếc laptop này chắc chắn sẽ trở
                      thành người bạn đồng hành đáng tin cậy trong cuộc sống
                      hàng ngày của bạn.
                    </span>
                    <h4>Thiết Kế Sang Trọng và Tinh Tế</h4>
                    <span>
                      Laptop của chúng tôi không chỉ mạnh mẽ về hiệu năng mà còn
                      nổi bật với thiết kế sang trọng và tinh tế. Vỏ máy được
                      làm từ chất liệu nhôm cao cấp, bề mặt mịn màng với các
                      đường nét tinh xảo mang đến cảm giác chắc chắn và sang
                      trọng. Với độ mỏng ấn tượng và trọng lượng nhẹ, bạn có thể
                      dễ dàng mang theo chiếc laptop này đến bất kỳ đâu, từ văn
                      phòng, quán cà phê đến các cuộc họp quan trọng.
                    </span>
                    <h4>Hiệu Năng Mạnh Mẽ</h4>
                    <span>
                      Bộ Vi Xử Lý Hiệu Suất Cao Trang bị bộ vi xử lý Intel Core
                      i7 hoặc AMD Ryzen 7 thế hệ mới nhất, chiếc laptop này đảm
                      bảo xử lý mượt mà mọi tác vụ từ cơ bản đến nâng cao. Bạn
                      có thể thoải mái làm việc với các ứng dụng văn phòng,
                      chỉnh sửa hình ảnh và video, lập trình hay thậm chí là
                      chơi các tựa game nặng mà không gặp bất kỳ trở ngại nào.
                      Bộ Nhớ và Lưu Trữ Với dung lượng RAM lên đến 16GB, chiếc
                      laptop này cho phép bạn mở nhiều ứng dụng cùng lúc mà
                      không lo bị giật lag. Ổ cứng SSD 512GB hoặc 1TB mang lại
                      không gian lưu trữ rộng rãi cho mọi dữ liệu quan trọng của
                      bạn, đồng thời tăng tốc độ khởi động máy và truy xuất dữ
                      liệu nhanh chóng.
                    </span>
                    <h4>Màn Hình Sắc Nét và Chân Thực</h4>
                    <span>
                      Độ Phân Giải Cao Màn hình của laptop được trang bị độ phân
                      giải Full HD (1920x1080) hoặc 4K (3840x2160), mang đến
                      hình ảnh sắc nét và chi tiết đến từng pixel. Công Nghệ Màn
                      Hình Sử dụng công nghệ IPS (In-Plane Switching), màn hình
                      laptop cho màu sắc chính xác và góc nhìn rộng lên đến 178
                      độ. Điều này có nghĩa là bạn có thể nhìn rõ nội dung từ
                      hầu hết mọi góc độ mà không bị biến dạng màu sắc hay giảm
                      độ sáng.{" "}
                    </span>
                    <h4>Âm Thanh Sống Động</h4>
                    <span>
                      Loa Chất Lượng Cao Hệ thống âm thanh của laptop được tinh
                      chỉnh bởi các chuyên gia âm thanh hàng đầu, mang đến chất
                      lượng âm thanh sống động và trung thực. Dù bạn đang nghe
                      nhạc, xem phim hay chơi game, âm thanh phát ra luôn rõ
                      ràng và chi tiết, tạo nên trải nghiệm giải trí tuyệt vời.
                      Công Nghệ Âm Thanh Vòm Laptop còn hỗ trợ công nghệ âm
                      thanh vòm Dolby Atmos, mang đến hiệu ứng âm thanh 3D sống
                      động, giúp bạn đắm chìm trong không gian âm thanh như đang
                      ở rạp chiếu phim hay phòng hòa nhạc.
                    </span>
                    <h4>Kết Nối Toàn Diện</h4>
                    <span>
                      Cổng Kết Nối Đa Dạng Chiếc laptop này được trang bị đầy đủ
                      các cổng kết nối hiện đại, bao gồm USB Type-C, USB 3.0,
                      HDMI, và khe cắm thẻ nhớ SD. Điều này giúp bạn dễ dàng kết
                      nối với các thiết bị ngoại vi như màn hình, máy chiếu, ổ
                      cứng di động, và nhiều thiết bị khác. Kết Nối Không Dây
                      Với kết nối Wi-Fi 6 và Bluetooth 5.0, bạn có thể truy cập
                      Internet nhanh chóng và ổn định, cũng như kết nối không
                      dây với các thiết bị như tai nghe, loa, và chuột mà không
                      gặp phải tình trạng giật lag hay mất kết nối.
                    </span>
                    <h4>Bàn Phím và Touchpad</h4>
                    <span>
                      Bàn Phím Có Đèn Nền Bàn phím của laptop có thiết kế
                      ergonomic, mang lại cảm giác gõ phím êm ái và chính xác.
                      Đèn nền bàn phím giúp bạn làm việc hiệu quả ngay cả trong
                      điều kiện ánh sáng yếu, hỗ trợ tốt cho những người thường
                      xuyên làm việc vào ban đêm. Touchpad Nhạy Bén Touchpad
                      được thiết kế rộng rãi và nhạy bén, hỗ trợ đa điểm
                      (multi-touch) giúp bạn dễ dàng thực hiện các thao tác như
                      kéo, thả, zoom và cuộn trang một cách mượt mà.
                    </span>
                    <h4> Bảo Mật và Tiện Ích </h4>
                    <span>
                      Bảo Mật Vân Tay Laptop được trang bị cảm biến vân tay tích
                      hợp, giúp bạn đăng nhập nhanh chóng và an toàn chỉ với một
                      chạm. Công nghệ này đảm bảo rằng chỉ có bạn mới có thể
                      truy cập vào dữ liệu cá nhân của mình. Hệ Điều Hành và Ứng
                      Dụng Laptop đi kèm với hệ điều hành Windows 10 hoặc
                      Windows 11 bản quyền, cùng với bộ ứng dụng văn phòng
                      Microsoft Office, giúp bạn sẵn sàng làm việc và giải trí
                      ngay từ khi mở hộp.
                    </span>
                    <h4> Pin và Hiệu Năng </h4>
                    <span>
                      Thời Lượng Pin Lâu Với dung lượng pin lớn và công nghệ
                      tiết kiệm năng lượng tiên tiến, laptop có thể hoạt động
                      liên tục từ 8 đến 10 giờ chỉ với một lần sạc. Điều này cho
                      phép bạn làm việc suốt cả ngày mà không cần phải lo lắng
                      về việc tìm chỗ sạc pin. Sạc Nhanh Tính năng sạc nhanh
                      giúp bạn nạp đầy pin từ 0 lên 50% chỉ trong vòng 30 phút,
                      giúp bạn nhanh chóng trở lại công việc hay giải trí mà
                      không bị gián đoạn lâu.
                    </span>
                    <h4>Dịch Vụ Hỗ Trợ và Bảo Hành</h4>
                    <span>
                      Hỗ Trợ Khách Hàng Chúng tôi cung cấp dịch vụ hỗ trợ khách
                      hàng 24/7, luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ
                      kỹ thuật cho bạn. Bạn có thể liên hệ với chúng tôi qua
                      điện thoại, email, hoặc chat trực tuyến. Bảo Hành Sản phẩm
                      laptop được bảo hành chính hãng từ 12 đến 24 tháng, đảm
                      bảo rằng bạn luôn nhận được sự hỗ trợ và bảo trì cần thiết
                      trong suốt thời gian sử dụng.
                    </span>
                  </div>
                </div>
              </Row>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
