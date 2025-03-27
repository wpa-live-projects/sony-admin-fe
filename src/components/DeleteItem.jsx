import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteItem = async () => {
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        alert("Failed to delete item");
      }
    };

    deleteItem();
  }, [id, navigate]);

  return <div>Deleting item...</div>;
};

export default DeleteItem;
