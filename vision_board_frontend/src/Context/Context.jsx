import axios from "../axios";
import { useState, useEffect, createContext, useContext } from "react";

// 1. Create the context with a stable shape
const AppContext = createContext({
  data: [],
  isError: "",
  home: () => { },
  refreshData: () => { },
  addVisionItem: () => { },
  deleteItem: () => { },
  markAsAchieved: () => { },
  updateVisionItem: () => { },
});

// 2. Create the provider component
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");

  const home = async () => {
    try {
      const response = await axios.get("/vision/");
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const refreshData = async () => {
    try {
      const response = await axios.get("/vision/all");
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const addVisionItem = async (item, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("imageFile", imageFile);
      formData.append("vision", new Blob([JSON.stringify(item)], { type: "application/json" }));

      await axios.post("/vision", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      home();
    } catch (error) {
      console.error("Error adding vision item:", error);
      throw error;
    }
  };

  const updateVisionItem = async (id, item, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("vision", new Blob([JSON.stringify(item)], { type: "application/json" }));
      if (imageFile) formData.append("imageFile", imageFile);

      await axios.put(`/vision/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      home();
    } catch (error) {
      console.error("Error updating vision item:", error);
      throw error;
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/vision/${id}`);
      home();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const markAsAchieved = async (id) => {
    try {
      await axios.put(`/vision/${id}/archive`);
      home();
    } catch (error) {
      console.error("Error archiving item:", error);
    }
  };

  useEffect(() => {
    home();
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
        isError,
        home,
        refreshData,
        addVisionItem,
        deleteItem,
        markAsAchieved,
        updateVisionItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook for easier access (optional)
export const useAppContext = () => useContext(AppContext);

// 4. Named context default export for SWC compatibility
export default AppContext;
