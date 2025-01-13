import React, { useState } from "react";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import instance from "../../services/endpoint";
import img from '../Sign&Regs/image.png'
const LoginPage = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    Email: "",
    Password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await instance.post("/api/v1/auth/login", value);
    
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      
      if (error?.response?.status === 403) {
        navigate("/verify-email");
      } else {
        toast.error(errorMessage || "Login failed.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#000" }}
    >
      <div
        style={{
          backgroundColor: "#000",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid gold",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          src={img} // Replace with your logo path
          alt="Richesse Logo"
          style={{ marginBottom: "20px", width: "150px", borderRadius: "150px" }}
        />
        <h5 className="mb-4" style={{color:"#ffd700"}}>Login to Richesse</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
             style={{backgroundColor:"#8b8b8b", color:"#fff"}}
              type="email"
              placeholder="Email"
              name="Email"
              value={value.Email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3"  controlId="formPassword">
            <Form.Control
             style={{backgroundColor:"#8b8b8b", color:"#fff"}}
              type="password"
              placeholder="Password"
              name="Password"
              value={value.Password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* <Form.Check type="checkbox" label="Remember me" /> */}
            <Link to="/forgot-password" style={{ fontSize: "0.9rem", color: "#ffd700"}}>
              Forgot password?
            </Link>
          </div>

          <Button variant="warning" type="submit" className="w-100" disabled={isLoading} style={{ backgroundColor: "#ffd700" }}>
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <p className="mt-3 mb-0" style={{ fontSize: "0.9rem", color: "#ffd700" }}>
          Don't have an account?{" "}
          <Link to="/register" className="text-warning">
            Signup now!
          </Link>
        </p>

        <footer className="mt-4" style={{ fontSize: "0.8rem", color: "#6c757d" }}>
          <p>Privacy Policy | Terms & Conditions</p>
          <p>© 2025 Richesse</p>
        </footer>
      </div>
    </Container>
  );
};

export default LoginPage;
