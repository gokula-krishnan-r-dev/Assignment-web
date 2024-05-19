# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# About Project

### Project Overview: Scenario and Vehicle Simulation Application

This project involves creating a web application using React.js for the frontend and Node.js for the backend. The application allows users to create, display, update, and delete scenarios and vehicles, and simulate vehicle movements within defined scenarios. Here is a detailed breakdown of the project's key components and functionalities:

#### Frontend (React.js)

1. **Home Page**:
   - Displays a list of scenarios created by the user.
   - Allows users to select a scenario and start the simulation.
   - Contains a container (graph) where vehicles move based on their parameters.

2. **Scenario Management**:
   - Users can create, view, update, and delete scenarios.
   - Each scenario has an ID, name, and a time duration for the simulation.

3. **Vehicle Management**:
   - Users can add vehicles to scenarios with specified attributes: ID, name, initial position (X, Y), speed, and direction (Towards, Backwards, Upwards, Downwards).
   - Proper validation ensures that vehicles' initial positions are within the container boundaries.

4. **Simulation**:
   - Upon starting the simulation, vehicles move according to their direction and speed.
   - The simulation runs for the duration specified in the scenario.
   - Vehicles hide when they move outside the container boundaries.

5. **Sidebar Navigation**:
   - Provides easy navigation between different sections of the application (e.g., home, create scenario, manage vehicles).

#### Backend (Node.js)

1. **Data Storage**:
   - Utilizes JSON files to store data persistently.
   - Data includes details of scenarios and vehicles.

2. **API Endpoints**:
   - **GET**: Fetch existing scenarios and vehicles.
   - **POST**: Add new scenarios and vehicles.
   - **PUT**: Update existing scenarios and vehicles.
   - **DELETE**: Remove scenarios and vehicles.

3. **Data Handling**:
   - Reads from and writes to JSON files to handle data storage and retrieval.
   - Ensures data consistency and handles CRUD operations.

#### Workflow

1. **Creating Scenarios and Vehicles**:
   - Users can create new scenarios and vehicles via forms.
   - Data is validated and sent to the Node.js server, where it is stored in JSON files.

2. **Starting the Simulation**:
   - Users select a scenario and start the simulation.
   - Vehicles move within the container based on their parameters, and the simulation runs for the specified scenario time.

3. **Updating and Deleting**:
   - Users can update scenario and vehicle details or delete them as needed.
   - Changes are reflected in the frontend and persisted in the JSON files via the Node.js server.

4. **API Interaction**:
   - The frontend communicates with the backend through RESTful API requests.
   - The backend responds with the necessary data or confirmation of actions (creation, update, deletion).

This project provides a comprehensive demonstration of CRUD operations, real-time simulations, and interaction between a React.js frontend and a Node.js backend, highlighting essential skills in Full Stack developer web development and application architecture.
