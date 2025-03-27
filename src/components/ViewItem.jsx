import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/get");
        if (!response.ok) {
          throw new Error(`Error fetching items: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  if (items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <Link to={`/view-item/${item._id}`}>{item.name} - ${item.cost}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAllItems;
