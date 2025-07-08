import { useEffect, useState } from "react";
import { useAppContext } from "../Context/Context";

const PrintBoard = () => {
  const { data } = useAppContext();
  const [imageMap, setImageMap] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Fetch images for all vision items
  useEffect(() => {
    if (data.length === 0) return;

    const fetchAllImages = async () => {
      const map = {};
      for (let vision of data) {
        try {
          const res = await fetch(`http://localhost:8080/api/vision/${vision.id}/image`);
          const blob = await res.blob();
          map[vision.id] = URL.createObjectURL(blob);
        } catch (err) {
          console.error(`Failed to load image for vision ${vision.id}`, err);
          map[vision.id] = null;
        }
      }
      setImageMap(map);
    };

    fetchAllImages();
  }, [data]);

  useEffect(() => {
    if (
      Object.keys(imageMap).length === data.length &&
      imagesLoaded >= data.length &&
      data.length > 0
    ) {
      // Delay ensures full paint cycle completes
      requestAnimationFrame(() => {
        setTimeout(() => window.print(), 200);
      });
    }
  }, [imageMap, imagesLoaded, data.length]);


  if (data.length === 0 || Object.keys(imageMap).length !== data.length) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading visions...
      </h2>
    );
  }

  return (
    <div className="print-area" style={printGridStyles}>
      {data.map((vision) => (
        <div key={vision.id} className="card" style={cardStyles}>
          {imageMap[vision.id] && (
            <img
              src={imageMap[vision.id]}
              alt={vision.title}
              onLoad={() => setImagesLoaded((prev) => prev + 1)}
              style={imageStyles}
            />
          )}
          <div>
            <h5 style={titleStyles}>{vision.title}</h5>
            <p style={affirmationStyles}>{vision.affirmation}</p>
            <p><strong>Deadline:</strong> {new Date(vision.deadline).toLocaleDateString()}</p>
            <p>
              <strong>Priority:</strong>{" "}
              <span style={{ color: getPriorityColor(vision.priority) }}>
                {vision.priority}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Styles ---

const printGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "2rem",
  padding: "2rem",
  background: "white",
  color: "black",
};

const cardStyles = {
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "0 0 6px rgba(0,0,0,0.1)",
  backgroundColor: "white",
  breakInside: "avoid",
  pageBreakInside: "avoid",
};

const imageStyles = {
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "0.5rem",
};

const titleStyles = {
  fontSize: "1.25rem",
  marginBottom: "0.25rem",
  textTransform: "capitalize",
};

const affirmationStyles = {
  fontStyle: "italic",
  fontSize: "1rem",
  marginBottom: "0.5rem",
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High": return "#e74c3c";
    case "Medium": return "#f39c12";
    case "Low": return "#2ecc71";
    default: return "#000";
  }
};


export default PrintBoard;
