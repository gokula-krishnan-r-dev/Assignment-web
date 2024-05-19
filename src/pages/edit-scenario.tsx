import React, { useEffect, useState } from "react";
import "../css/add-scenario.css";
import ScenarioForm from "../components/form/ScenarioForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { endpoint } from "../dev";

const EditScenario = () => {
  const nagivate = useNavigate();
  const routeParams = useParams();
  const searchParams = useSearchParams();
  const id = routeParams.id;
  const fetchScenario = async () => {
    try {
      const response = await fetch(`${endpoint}/scenarios/${id}`);
      const data = await response.json();
      setScenario(data);
    } catch (error) {
      console.error("Error fetching scenario");
    }
  };

  const [scenario, setScenario] = useState<any>();
  useEffect(() => {
    fetchScenario();
  }, []);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (data: any) => {
    try {
      // Set loading to true
      setLoading(true);

      // Make POST request to submit the form data
      const response = await fetch(`${endpoint}/scenarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if request was successful (status code 2xx)
      if (response.ok) {
        // Show success toast message
        // toast.success("Form submitted successfully!");

        // alert("Form submitted successfully! Redirecting to scenarios page.");
        nagivate("/all/scenario");
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
  const name = scenario?.name;
  const time = scenario?.time;

  return (
    <div className="">
      {scenario && (
        <ScenarioForm
          pageTitle="Add Scenario"
          fields={[
            {
              label: "Scenario Name",
              type: "text",
              name: "name",
              placeholder: "Enter scenario name",
              defaultValue: name,
            },
            {
              label: "Scenario Time (seconds)",
              type: "number",
              name: "time",
              placeholder: "Enter scenario time",
              defaultValue: time,
            },
          ]}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditScenario;
