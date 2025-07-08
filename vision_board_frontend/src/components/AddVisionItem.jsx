import React, { useState, useContext } from "react";
import AppContext from "../Context/Context";

const AddVisionItem = () => {
  const { addVisionItem } = useContext(AppContext);

  const [vision, setVision] = useState({
    title: "",
    affirmation: "",
    priority: "",
    deadline: "",
  });
  const [image, setImage] = useState(null);

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
      await addVisionItem(vision, image);
      alert("Vision goal added successfully!");
    } catch (err) {
      alert("Error occurred while adding vision.");
    }
  };

  return (
    <div className="container">
      <form className="row g-3 pt-5" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label className="form-label"><h6>Title</h6></label>
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
          <label className="form-label"><h6>Affirmation</h6></label>
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
          <label className="form-label"><h6>Deadline</h6></label>
          <input
            type="date"
            className="form-control"
            name="deadline"
            value={vision.deadline || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label"><h6>Priority</h6></label>
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
          <label className="form-label"><h6>Image</h6></label>
          <input
            className="form-control"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisionItem;
