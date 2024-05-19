import React, { useEffect, useState } from "react";
import "../css/add-scenario.css";
import ScenarioForm from "../components/form/ScenarioForm";
import { useNavigate, useParams } from "react-router-dom";

const EditVehicle = () => {
  const nagivate = useNavigate();
  const routeParams = useParams();
  const id = routeParams.id;
  const fetchVehicle = async () => {
    try {
      const response = await fetch(`http://localhost:3000/vehicles/${id}`);
      const data = await response.json();
      setVehicle(data);
    } catch (error) {
      console.error("Error fetching scenario");
    }
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

  const [vehicle, setVehicle] = useState<any>();
  const [scenarios, setScenarios] = useState([] as any[]);
  useEffect(() => {
    fetchVehicle();
    fetchScenarios();
  }, []);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (data: any) => {
    try {
      // Set loading to true
      setLoading(true);

      // Make POST request to submit the form data
      const response = await fetch(`http://localhost:3000/vehicles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        nagivate("/");
      } else {
        alert("Failed to submit form. Please try again later.");
        // If request failed, throw an error
        throw new Error("Failed to submit form.");
      }
    } catch (error) {
      // Show error toast message
      console.log("Failed to submit form. Please try again later.");
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

  const scenarioId = vehicle?.scenarioId;
  const name = vehicle?.name;
  const initialPositionX = vehicle?.initialPositionX;
  const initialPositionY = vehicle?.initialPositionY;
  const speed = vehicle?.speed;
  const direction = vehicle?.direction;

  return (
    <div className="">
      {vehicle && (
        <ScenarioForm
          pageTitle="Add Vehicle"
          fields={[
            {
              label: "Scenario List",
              type: "select",
              name: "scenarioId",
              placeholder: "Select scenario",
              defaultValue: scenarioId,
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
              defaultValue: name,
            },
            {
              label: "Initial Position X",
              type: "number",
              name: "initialPositionX",
              placeholder: "Enter initial position X",
              defaultValue: initialPositionX,
            },
            {
              label: "Initial Position Y",
              type: "number",
              name: "initialPositionY",
              placeholder: "Enter initial position Y",
              defaultValue: initialPositionY,
            },
            {
              label: "Speed",
              type: "number",
              name: "speed",
              placeholder: "Enter speed",
              defaultValue: speed,
            },
            {
              label: "Direction",
              type: "select",
              name: "direction",
              placeholder: "Enter direction",
              defaultValue: direction,
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
      )}
    </div>
  );
};

export default EditVehicle;
