import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Courgette', cursive;
    background: white; 
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

// Keyframe Animations
const fadeIn = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Main Container
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  padding: 200px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    height: auto;
  }
`;

// Left Side - Image Section
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: -220px;

  img {
    width: 120%;
    max-width: 600px;
    animation: ${fadeIn} 2s ease-in-out;
    padding-right: 10px;

    @media (max-width: 768px) {
      width: 90%;
      max-width: 300px;
      margin-bottom: 20px;
    }
  }
`;

// Right Side - Login Form
const LoginSection = styled.div`
  flex: 1;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  width: 400px;
  animation: ${fadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

// Form Heading
const Heading = styled.h2`
  font-size: 2rem;
  color: #da4744;
  text-shadow: 2px 2px 10px rgba(218, 71, 68, 0.5);
  text-align: center;
  margin-bottom: 1.5rem;
`;

// Input Field
const Input = styled.input`
  width: 90%;
  padding: 12px 15px;
  border: 2px solid transparent;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #333;

  &:focus {
    border-color: #eaae40;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 15px rgba(234, 174, 64, 0.8);
  }
`;

// Label
const Label = styled.label`
  font-size: 1rem;
  color: #eaae40;
  margin-bottom: 0.5rem;
  display: block;
`;

// Error Message
const ErrorText = styled.p`
  color: #da4744;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
`;

// Button
const Button = styled.button`
  width: 50%;
  padding: 10px;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #da4744, #eaae40);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(218, 71, 68, 0.5);
  display: block;
  margin: 1rem auto 0;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 30px rgba(234, 174, 64, 0.7);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 5px 10px rgba(218, 71, 68, 0.7);
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 1rem;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://sony-admin-be.onrender.com/api/login", formData);
  
      // Check if the login is successful and contains the userId
      if (res.data.userId) {
        // Store the userId in localStorage
        localStorage.setItem("adminId", res.data.userId); 
        alert("Login Successful!");
        navigate("/dashboard"); // Redirect to the dashboard page
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Error during login. Please try again.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <ImageSection>
          <img src="/3947703.jpg" alt="Admin Panel" />
        </ImageSection>

        <LoginSection>
          <Heading>Admin Login</Heading>
          {error && <ErrorText>{error}</ErrorText>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </LoginSection>
      </Container>
    </>
  );
};

export default Login;
