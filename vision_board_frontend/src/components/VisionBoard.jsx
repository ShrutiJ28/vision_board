import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const priorityColors = {
  High: "#e74c3c",
  Medium: "#f39c12",
  Low: "#2ecc71",
};

const VisionBoard = () => {
  const { data, isError, refreshData, markAsAchieved, deleteItem } = useContext(AppContext);
  const [visions, setVisions] = useState([]);

  //const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;
  const BASE_URL = 'https://vision-board-af04.onrender.com/api';
  useEffect(() => {
    const fetchImages = async () => {
      if (!data) return;

      const updated = await Promise.all(
        data.map(async (item) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/vision/${item.id}/image`,
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(response.data);
            return { ...item, imageUrl };
          } catch (error) {
            console.error("Image fetch error:", item.id, error);
            return { ...item, imageUrl: "placeholder-image-url" };
          }
        })
      );

      const sorted = updated.sort((a, b) => {
        const p = { High: 3, Medium: 2, Low: 1 };
        return p[b.priority] - p[a.priority];
      });

      setVisions(sorted);
    };

    fetchImages();
  }, [JSON.stringify(data)]); // ensures the effect runs even on deep updates

  useEffect(() => {
    console.log("✅ VisionBoard received data:", data);
  }, [data]);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: "100px", height: "100px" }} />
      </h2>
    );
  }

  return (
    <div
      className="grid"
      style={{
        marginTop: "64px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {visions.length === 0 ? (
        <h2 className="text-center">No Vision Goals Yet</h2>
      ) : (
        visions.map(({ id, affirmation, deadline, priority, imageUrl }) => (
          <div
            key={id}
            className="card"
            style={{
              width: "250px",
              height: "380px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={imageUrl}
              alt="vision"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px 10px 0 0",
              }}
            />
            <div className="card-body" style={{ padding: "10px" }}>
              <h6 style={{ fontWeight: "bold" }}>{affirmation}</h6>
              <p style={{ fontSize: "0.85rem", margin: "5px 0" }}>
                Deadline: {deadline}
              </p>
              <span
                style={{
                  backgroundColor: priorityColors[priority],
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "4px 10px",
                  fontSize: "0.8rem",
                  display: "inline-block",
                  marginBottom: "10px",
                }}
              >
                Priority: {priority}
              </span>
              <div
                className="d-flex justify-content-between"
                style={{ gap: "6px" }}
              >
                <Link to={`/update/${id}`} className="btn btn-outline-primary btn-sm w-100">
                  Edit
                </Link>
                <button
                  className="btn btn-outline-success btn-sm w-100"
                  onClick={() => markAsAchieved(id)}
                >
                  Achieved
                </button>
                <button
                  className="btn btn-outline-danger btn-sm w-100"
                  onClick={() => deleteItem(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

  );

};

export default VisionBoard;
