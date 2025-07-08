import React, { useState, useEffect } from "react";
import axios from "axios";

const priorityColors = {
  High: "#e74c3c",
  Medium: "#f39c12",
  Low: "#2ecc71",
};

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Archive = () => {
  const [achievedItems, setAchievedItems] = useState([]);

  useEffect(() => {
    const fetchAchievedGoals = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/vision/achieved`);
        const updated = await Promise.all(
          response.data.map(async (item) => {
            try {
              const imgRes = await axios.get(
                `${baseURL}/api/vision/${item.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(imgRes.data);
              return { ...item, imageUrl };
            } catch (err) {
              console.error("Error loading image", item.id, err);
              return { ...item, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setAchievedItems(updated);
      } catch (error) {
        console.error("Error fetching achieved visions:", error);
      }
    };

    fetchAchievedGoals();
  }, []);

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
      {achievedItems.length === 0 ? (
        <h4 className="text-center">No archived visions yet 🗂️</h4>
      ) : (
        achievedItems.map(({ id, title, affirmation, deadline, priority, imageUrl }) => (
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
              alt={title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px 10px 0 0",
              }}
            />
            <div className="card-body" style={{ padding: "10px" }}>
              <h6 style={{ fontWeight: "bold" }}>{title}</h6>
              <p style={{ fontSize: "0.85rem", margin: "5px 0" }}>
                {affirmation}
              </p>
              <p style={{ fontSize: "0.8rem" }}>Achieved by: {deadline}</p>
              <span
                style={{
                  backgroundColor: priorityColors[priority],
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "4px 10px",
                  fontSize: "0.8rem",
                  display: "inline-block",
                  marginTop: "6px",
                }}
              >
                {priority} Priority
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Archive;
