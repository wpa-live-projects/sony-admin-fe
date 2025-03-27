import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Courgette', cursive;
    background: #f8f9fa;
  }
`;

// Keyframe Animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Main Container
const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

// Sidebar Styling
const Sidebar = styled.div`
  width: 250px;
  background: linear-gradient(135deg, #da4744, #eaae40);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.8rem;
    letter-spacing: 1px;
  }

  a {
    color: white;
    text-decoration: none;
    padding: 12px 20px;
    margin-bottom: 8px;
    border-radius: 12px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    &.active {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

// Navbar Styling
const Navbar = styled.div`
  width: 100%;
  height: 70px;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;

  h1 {
    color: #da4744;
    font-size: 1.8rem;
    margin: 0;
    white-space: nowrap;
  }

  div {
    display: flex;
    gap: 12px;
  }
`;

// Button Styling
const Button = styled.button`
  background: linear-gradient(135deg, #da4744, #eaae40);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(234, 174, 64, 0.7);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Content Wrapper
const Content = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;

// Form Styling
const Form = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    color: #da4744;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  input,
  select {
    width: 95%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background: linear-gradient(135deg, #da4744, #eaae40);
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(234, 174, 64, 0.7);
  }

  button:active {
    transform: scale(0.98);
  }
`;

// Item Grid Layout
const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ItemBox = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  div {
    text-align: center;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  button {
    background: linear-gradient(135deg, #da4744, #eaae40);
    border: none;
    color: white;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 20px rgba(234, 174, 64, 0.7);
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

// Order Grid Layout
const OrderList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const OrderBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.03);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  h3 {
    margin: 5px 0;
    color: #da4744;
    font-size: 1.2rem;
  }

  p {
    margin: 2px 0;
    font-size: 0.9rem;
    color: #555;
  }

  span {
    font-weight: bold;
  }

  .order-status {
    padding: 4px 8px;
    border-radius: 8px;
    font-weight: bold;
    display: inline-block;
  }

  .order-status.cancelled {
    background-color: #e74c3c;
    color: white;
  }

  .order-status.delivered {
    background-color: #2ecc71;
    color: white;
  }

  .order-status.pending {
    background-color: #f39c12;
    color: white;
  }

  .order-details {
    margin-top: 15px;
  }
`;

const OrdersContainer = styled.div`
  padding: 20px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #da4744;
  }
`;

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    cost: "",
    image: "",
    rating: "",
    category: "men",
    type: "shirt",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch Items
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Add or Update Item based on edit mode
  const handleSubmitItem = async () => {
    try {
      if (editingItem) {
        // Update item
        const response = await axios.put(
          `http://localhost:5000/api/update/${editingItem._id}`,
          newItem
        );
        if (response.status === 200) {
          alert("Item updated successfully!");
          setEditingItem(null);
        }
      } else {
        // Add new item
        const response = await axios.post("http://localhost:5000/api/add", newItem);
        if (response.status === 200 || response.status === 201) {
          alert("Item added successfully!");
        }
      }
      setNewItem({
        name: "",
        cost: "",
        image: "",
        rating: "",
        category: "men",
        type: "shirt",
      });
      fetchItems();
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  // Trigger edit mode with selected item data
  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      cost: item.cost,
      image: item.image,
      rating: item.rating,
      category: item.category,
      type: item.type,
    });
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/${id}`);
      if (response.status === 200) {
        alert("Item deleted successfully!");
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
  
    const adminId = localStorage.getItem("adminId"); // Get adminId from localStorage
  
    if (!adminId) {
      alert("Admin ID not found. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/change-password", {
        adminId,
        oldPassword,
        newPassword,
        confirmPassword,
      });
  
      if (response.status === 200) {
        alert("Password changed successfully!");
        setShowModal(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(response.data.message || "Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password. Please check your current password.");
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/orders");
      if (response.status === 200) {
        setOrders(response.data.orders);
      } else {
        alert("No orders found!");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Error fetching orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        {/* Sidebar */}
        <Sidebar>
          <h2>Admin Panel</h2>
          <a
            onClick={() => setActiveTab("dashboard")}
            className={activeTab === "dashboard" ? "active" : ""}
          >
            Dashboard
          </a>
          <a
            onClick={() => setActiveTab("items")}
            className={activeTab === "items" ? "active" : ""}
          >
            Items
          </a>
          <a
            onClick={() => {
              setActiveTab("orders");
              fetchOrders();
            }}
            className={activeTab === "orders" ? "active" : ""}
          >
            Get Orders
          </a>
        </Sidebar>

        {/* Content Section */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Navbar */}
          <Navbar>
            <h1>Admin Dashboard</h1>
            <div>
              <Button onClick={() => setShowModal(true)}>Change Password</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </Navbar>

          {/* Main Content */}
          <Content>
            {activeTab === "dashboard" && (
              <div>
                <h2 style={{ textAlign: "center", marginTop: "2rem", color: "#da4744" }}>
                  Welcome to SONY READYMATES
                </h2>
              </div>
            )}

            {activeTab === "items" && (
              <>
                <Form>
                  <h2>{editingItem ? "Edit Item" : "Add New Item"}</h2>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    name="cost"
                    value={newItem.cost}
                    onChange={handleInputChange}
                    placeholder="Cost"
                  />
                  <input
                    type="text"
                    name="image"
                    value={newItem.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                  />
                  <input
                    type="number"
                    name="rating"
                    value={newItem.rating}
                    onChange={handleInputChange}
                    placeholder="Rating (0-5)"
                  />
                  <select name="category" value={newItem.category} onChange={handleInputChange}>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="unisex">Unisex</option>
                  </select>
                  <select name="type" value={newItem.type} onChange={handleInputChange}>
                    <option value="shirt">Shirt</option>
                    <option value="tshirt">T-shirt</option>
                    <option value="pant">Pant</option>
                  </select>
                  <button onClick={handleSubmitItem}>
                    {editingItem ? "Update Item" : "Add Item"}
                  </button>
                </Form>

                <h2>All Items</h2>
                <ItemList>
                  {items.map((item) => (
                    <ItemBox key={item._id}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong> - ${item.cost}
                        <p>
                          Rating: {item.rating} | Category: {item.category} | Type: {item.type}
                        </p>
                      </div>
                      <BtnWrapper>
                        <Button onClick={() => handleEditItem(item)}>Edit</Button>
                        <Button
                          style={{ backgroundColor: "#da4744" }}
                          onClick={() => handleDeleteItem(item._id)}
                        >
                          Delete
                        </Button>
                      </BtnWrapper>
                    </ItemBox>
                  ))}
                </ItemList>
              </>
            )}

            {activeTab === "orders" && (
              <OrdersContainer>
                <h2>All Orders</h2>
                {loading ? (
                  <p style={{ textAlign: "center" }}>Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#555" }}>No orders found.</p>
                ) : (
                  <OrderList>
                    {orders.map((order) => (
                      <OrderBox key={order.orderId}>
                        <img src={order.itemImage} alt={order.itemName} />
                        <h3>{order.itemName}</h3>
                        <p>
                          <span>Quantity:</span> {order.quantity}
                        </p>
                        <p>
                          <span>Size:</span> {order.size}
                        </p>
                        <p>
                          <span>Total Amount:</span> ₹{order.totalAmount}
                        </p>
                        <p>
                          <span>Status:</span>{" "}
                          <span className={`order-status ${order.status}`}>
                            {order.status}
                          </span>
                        </p>
                        <p>
                          <span>Address:</span> {order.address}
                        </p>
                        <p>
                          <span>User:</span> {order.username} ({order.email})
                        </p>
                      </OrderBox>
                    ))}
                  </OrderList>
                )}
              </OrdersContainer>
            )}
          </Content>
        </div>

        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                width: "400px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2 style={{ color: "#da4744", marginBottom: "1rem" }}>Change Password</h2>

              <input
                type="password"
                placeholder="Current Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <button
                  onClick={handleChangePassword}
                  style={{
                    background: "linear-gradient(135deg, #da4744, #eaae40)",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Change Password
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "#ccc",
                    color: "#333",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </MainContainer>
    </>
  );
};

export default Dashboard;