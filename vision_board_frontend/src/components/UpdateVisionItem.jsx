import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const UpdateVisionItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateVisionItem } = useContext(AppContext);

  const [vision, setVision] = useState({
    title: "",
    affirmation: "",
    priority: "",
    deadline: "",
  });

  const [image, setImage] = useState(null);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchVision = async () => {
      try {
        await axios.get(`${BASE_URL}/api/vision/${id}`);
        setVision(response.data);
      } catch (error) {
        console.error("Failed to fetch vision item:", error);
      }
    };

    fetchVision();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVision({ ...vision, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateVisionItem(id, vision, image);
      alert("Vision item updated successfully!");
      navigate("/"); // Navigate back to vision board
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error updating vision item.");
    }
  };

  return (
    <div className="container">
      <h2 className="pt-4">Update Vision Item</h2>
      <form className="row g-3 pt-3" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={vision.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Affirmation</label>
          <input
            type="text"
            className="form-control"
            name="affirmation"
            value={vision.affirmation}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Deadline</label>
          <input
            type="date"
            className="form-control"
            name="deadline"
            value={vision.deadline}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            name="priority"
            value={vision.priority}
            onChange={handleInputChange}
            required
          >
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Update Image (optional)</label>
          <input
            className="form-control"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateVisionItem;
