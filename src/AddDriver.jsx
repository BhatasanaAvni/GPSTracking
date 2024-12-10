import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import database from "./FirebaseConfig";

const AddDriver = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    carModel: "",
    licenseNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const dbRef = ref(database, "drivers");
      await push(dbRef, formData);
      alert("Driver added successfully!");
      setFormData({ name: "", mobile: "", carModel: "", licenseNumber: "" });
    } catch (error) {
      console.error("Error adding driver: ", error);
      alert("Failed to add driver. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Driver</h2>
        {["name", "mobile", "carModel", "licenseNumber"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              placeholder={`Enter ${field}`}
              className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
