import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", formData);

      // Save token and role to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      console.log(res);

      setSuccess("Login Successful! Redirecting...");

      // Redirect based on role

      if (res.data.role === "admin") {
        setTimeout(() => navigate("/dashboard"), 2000); // Redirect Admin
      } else {
        setTimeout(() => navigate("/home"), 2000); // Redirect User
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Container className="mt-5" style={{ width: "450px", padding: "20px", backgroundColor: "gray", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={email} onChange={onChange} required placeholder="Enter your Email" />
        </Form.Group><br/>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={password} onChange={onChange} required placeholder="Enter your Password"/>
        </Form.Group><br/>

        <Button type="submit" className="mt-3" style={{ backgroundColor: "green" }}>
          Login
        </Button>
      </Form>
      <p className="mt-3" style={{ textAlign: "center", color: "white" }}>
        You have no account? <Link to="/users" style={{ color: "lightgreen", textDecoration: "underline" }}>Create Account</Link>
      </p>
    </Container>
  );
};

export default Login;
