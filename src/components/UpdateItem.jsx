import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("men");

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`http://localhost:5000/items/get/${id}`);
      const data = await response.json();
      setItem(data);
      setName(data.name);
      setCost(data.cost);
      setImage(data.image);
      setRating(data.rating);
      setCategory(data.category);
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedItem = { name, cost, image, rating, category };

    try {
      const response = await fetch(`http://localhost:5000/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        navigate(`/view-item/${id}`);
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Item</h1>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;
