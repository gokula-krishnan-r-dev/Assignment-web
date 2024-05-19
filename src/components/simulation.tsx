import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Button from "./lib/button";
import "../css/simulation.css";
import { endpoint } from "../dev";
interface Scenario {
  id: number;
  name: string;
  time: string;
  vehicleCount: number;
}

interface Vehicle {
  id: number;
  name: string;
  initialPositionY: number;
  initialPositionX: number;
  speed: number;
  direction: "towords" | "backwards" | "upwards" | "downwards";
  scenarioId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const Simulation: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null
  );
  const [runningVehicles, setRunningVehicles] = useState<Vehicle[]>([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false); // State to track simulation running
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchScenarios();
    fetchVehicles();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await fetch(`${endpoint}/scenarios`);
      const data = await response.json();
      setScenarios(data);
      setSelectedScenario(data[0]);
    } catch (error) {
      console.error("Error fetching scenarios:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${endpoint}/vehicles`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleStartSimulation = () => {
    if (selectedScenario) {
      if (!isSimulationRunning) {
        setIsSimulationRunning(true); // Start simulation
        const filteredVehicles = vehicles;
        setRunningVehicles(filteredVehicles);
      }
    }
  };

  // const updateVehiclePositions = () => {
  //   setRunningVehicles((prevVehicles) =>
  //     prevVehicles.map((vehicle) => {
  //       let { initialPositionX, initialPositionY } = vehicle;
  //       switch (vehicle.direction) {
  //         case "upwards":
  //           initialPositionY -= vehicle.speed;
  //           break;
  //         case "downwards":
  //           initialPositionY += vehicle.speed;
  //           break;
  //         case "towords":
  //           initialPositionX += vehicle.speed;
  //           break;
  //         case "backwards":
  //           initialPositionX -= vehicle.speed;
  //           break;
  //       }

  //       if (containerRef.current) {
  //         const { offsetWidth, offsetHeight } = containerRef.current;
  //         if (
  //           initialPositionX < 0 ||
  //           initialPositionX > offsetWidth ||
  //           initialPositionY < 0 ||
  //           initialPositionY > offsetHeight
  //         ) {
  //           return { ...vehicle, initialPositionX: -1, initialPositionY: -1 }; // Hide vehicle if out of bounds
  //         }
  //       }

  //       return { ...vehicle, initialPositionX, initialPositionY };
  //     })
  //   );
  // };

  // useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null;
  //   if (runningVehicles.length > 0 && isSimulationRunning) {
  //     interval = setInterval(updateVehiclePositions, 1000 / 60); // 60 FPS
  //   }
  //   return () => {
  //     if (interval) clearInterval(interval);
  //   };
  // }, [runningVehicles, isSimulationRunning]);

  return (
    <div>
      <h1>Simulation Home Page</h1>
      <Button onClick={handleStartSimulation}>{"Start Simulation"}</Button>

      <div ref={containerRef} className="simulation-container">
        {runningVehicles.map((vehicle, index) =>
          vehicle.initialPositionX >= 0 && vehicle.initialPositionY >= 0 ? (
            <div
              className={
                isSimulationRunning
                  ? `vehicle-animation-${vehicle.direction}`
                  : ""
              }
              key={vehicle.id}
              style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                backgroundColor: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "10px",
                borderRadius: "50%",
                zIndex: 2,
                transform: `translate(${vehicle.initialPositionX}px, ${vehicle.initialPositionY}px)`,
                transition: `transform ${vehicle.speed}s linear`, // Adjust transition duration based on speed
                animationDuration: `${vehicle.speed}s`,
              }}
            >
              {index + 1}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Simulation;
