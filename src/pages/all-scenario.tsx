import React from "react";
import "../css/all-scenario.css";
import Button from "../components/lib/button";
import { Link, useNavigate } from "react-router-dom";

interface Scenario {
  id: number;
  name: string;
  time: string;
  vehicleCount: number;
}

const ScenarioTable = () => {
  const navigate = useNavigate();
  const [scenarios, setScenarios] = React.useState<Scenario[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const fetchScenarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/scenarios");
      const data = await response.json();
      setScenarios(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching scenarios");
      setLoading(false);
    }
  };
  const handletoDeleteId = (id: number) => async () => {
    try {
      const response = await fetch(`http://localhost:3000/scenarios/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data) {
        fetchScenarios();
      }
    } catch (error) {
      setError("Error fetching scenarios");
    }
  };

  const handletoDelete = async () => {
    try {
      const response = await fetch("http://localhost:3000/scenarios/all", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        fetchScenarios();
      }
    } catch (error) {
      setError("Error fetching scenarios");
    }
  };

  React.useEffect(() => {
    fetchScenarios();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="scenario-table">
      <div className="table-header">
        <h2>Scenario List</h2>
        <div className="buttons">
          <Link to={"/add/scenario"} className="btn bg-blue">
            New Scenario
          </Link>
          <Link to={"/add/vehicle"} className="btn bg-blue">
            Add Vehicle
          </Link>
          <Button
            onClick={handletoDelete}
            backgroundColor="orange"
            className="btn"
          >
            Delete All
          </Button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Scenario ID</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Number of Vehicles</th>
            <th>Add Vehicles</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.length === 0 && (
            <tr>
              <td colSpan={7}>No scenarios found</td>
            </tr>
          )}
          {scenarios.map((scenario, index) => (
            <tr key={scenario.id}>
              <td>{index + 1}</td>
              <td>{scenario.name}</td>
              <td>{scenario.time}</td>
              <td>{scenario.vehicleCount}</td>
              <td>
                <button onClick={() => navigate(`/add/vehicle`)} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-badge-plus"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <line x1="12" x2="12" y1="8" y2="16" />
                    <line x1="8" x2="16" y1="12" y2="12" />
                  </svg>
                </button>
              </td>
              <td>
                <button
                  onClick={() => navigate(`/edit/scenario/${scenario.id}`)}
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pencil"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
              </td>
              <td>
                <button onClick={handletoDeleteId(scenario.id)} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScenarioTable;
