import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("men");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = { name, cost, image, rating, category };

    try {
      const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        alert("Item added Sucessfully");
        navigate("/dashboard");
      } else {
        alert("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          min="0"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating (0-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="5"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="unisex">Unisex</option>
        </select>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
