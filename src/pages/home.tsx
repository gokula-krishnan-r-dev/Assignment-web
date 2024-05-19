import React from "react";
import "../css/all-scenario.css";
import { useNavigate } from "react-router-dom";
import Simulation from "../components/simulation";

interface Vehicle {
  id: number;
  name: string;
  initialPositionY: number;
  initialPositionX: number;
  speed: number;
  direction: "Towards" | "Backwards" | "Upwards" | "Downwards";
  scenarioId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const Home = () => {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = React.useState<Vehicle[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const handletoDeleteId = (id: number) => async () => {
    try {
      const response = await fetch(`http://localhost:3000/vehicles/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      fetchVehicle();
    } catch (error) {
      setError("Error fetching vehicle");
    }
  };

  const fetchVehicle = async () => {
    try {
      const response = await fetch("http://localhost:3000/vehicles");
      const data = await response.json();
      setVehicle(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching vehicle");
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchVehicle();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="scenario-table onscroll">
      <div className="table-header">
        <h2>Vehicle</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Vehicle Name</th>
            <th>PositionX</th>
            <th>PositionY</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vehicle.length === 0 && (
            <tr>
              <td colSpan={7}>No vehicle found</td>
            </tr>
          )}
          {vehicle.map((vehicle, index) => (
            <tr key={vehicle.id}>
              <td>{index + 1}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.initialPositionX}</td>
              <td>{vehicle.initialPositionY}</td>
              <td>{vehicle.speed}</td>
              <td>{vehicle.direction}</td>

              <td>
                <button
                  onClick={() => navigate(`/edit/vehicle/${vehicle.id}`)}
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
                <button onClick={handletoDeleteId(vehicle.id)} className="">
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

      <Simulation />
    </div>
  );
};

export default Home;
