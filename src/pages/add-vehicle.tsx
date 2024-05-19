import React, { useEffect, useState } from "react";
import "../css/add-vehicle.css";
import ScenarioForm from "../components/form/ScenarioForm";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const nagivate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState([] as any[]);
  const handleSubmit = async (data: any) => {
    try {
      // Set loading to true
      setLoading(true);

      // Make POST request to submit the form data
      const response = await fetch("http://localhost:3000/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if request was successful (status code 2xx)
      if (response.ok) {
        // Show success toast message
        // toast.success("Form submitted successfully!");
        alert("Form submitted successfully! Redirecting to scenarios page.");
        nagivate("/");
      } else {
        alert("Failed to submit form. Please try again later.");
        // If request failed, throw an error
        throw new Error("Failed to submit form.");
      }
    } catch (error) {
      // Show error toast message
      // toast.error("Failed to submit form. Please try again later.");
    } finally {
      // Set loading to false
      setLoading(false);
    }
  };
  const handleCancel = () => {
    // Handle cancel action
    console.log("Cancel action");
    nagivate(-1);
  };
  const fetchScenarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/scenarios");
      if (response.ok) {
        const data = await response.json();
        setScenarios(data);
      }
    } catch (error) {
      console.error("Failed to fetch scenarios:", error);
    }
  };
  useEffect(() => {
    fetchScenarios();
  }, []);

  return (
    <ScenarioForm
      pageTitle="Add Scenario"
      fields={[
        {
          label: "Scenario List",
          type: "select",
          name: "scenarioId",
          placeholder: "Select scenario",
          defaultValue: "",
          option: scenarios.map((scenario) => ({
            value: scenario.id,
            label: scenario.name,
          })),
        },
        {
          label: "Vehicle Name",
          type: "text",
          name: "name",
          placeholder: "Enter scenario name",
          defaultValue: "",
        },
        {
          label: "Initial Position X",
          type: "number",
          name: "initialPositionX",
          placeholder: "Enter initial position X",
          defaultValue: "",
        },
        {
          label: "Initial Position Y",
          type: "number",
          name: "initialPositionY",
          placeholder: "Enter initial position Y",
          defaultValue: "",
        },
        {
          label: "Speed",
          type: "number",
          name: "speed",
          placeholder: "Enter speed",
          defaultValue: "",
        },
        {
          label: "Direction",
          type: "select",
          name: "direction",
          placeholder: "Enter direction",
          defaultValue: "",
          option: [
            { value: "towords", label: "Towards" },
            { value: "backwards", label: "Backwards" },
            { value: "upwards", label: "Upwards" },
            { value: "downwards", label: "Downwards" },
          ],
        },
      ]}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default AddVehicle;
