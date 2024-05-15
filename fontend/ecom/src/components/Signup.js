import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirm_password", formData.confirm_password);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("phone", formData.phone);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
      // Redirect or show success message
    } catch (error) {
      console.error("Registration error:", error.response.data);
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-login">
      <div className="form_container p-3 rounded bg-white w-450">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Đăng ký</h1>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="confirm_password">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Nhập lại mật khẩu"
              className="form-control"
              onChange={handleChange}
              value={formData.confirm_password}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              name="address"
              placeholder="Nhập địa chỉ"
              className="form-control"
              onChange={handleChange}
              value={formData.address}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              className="form-control"
              onChange={handleChange}
              value={formData.phone}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary border w-50">Đăng ký</button>
          </div>
          <p className="text-center mt-2">
            Đã có tài khoản ?
            <Link to="/login" className="ms-2">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
