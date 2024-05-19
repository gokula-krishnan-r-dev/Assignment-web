import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import AddScenario from "./pages/add-scenario";
import AddVehicle from "./pages/add-vehicle";
import ScenarioTable from "./pages/all-scenario";
import EditScenario from "./pages/edit-scenario";
import Home from "./pages/home";
import EditVehicle from "./pages/edit-vehicle";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/add/scenario" element={<AddScenario />} />
      <Route path="/all/scenario" element={<ScenarioTable />} />
      <Route path="/edit/scenario/:id" element={<EditScenario />} />
      <Route path="/all/vehicle" element={<App />} />
      <Route path="/add/vehicle" element={<AddVehicle />} />
      <Route path="/edit/vehicle/:id" element={<EditVehicle />} />
    </>
  )
);
