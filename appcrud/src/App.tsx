import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import { NuevoEmpleado } from "./components/NuevoEmpleado"
import { EditarEmpleado } from "./components/EditarEmpleado"
import {Autenticar} from "./components/Autenticar";
import {React} from "react";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/Autenticar" />;
};



function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/Autenticar" element={<Autenticar />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Lista />
            </PrivateRoute>
          }
        />
        <Route
          path="/nuevoempleado"
          element={
            <PrivateRoute>
              <NuevoEmpleado />
            </PrivateRoute>
          }
        />
        <Route
          path="/editarempleado/:id"
          element={
            <PrivateRoute>
              <EditarEmpleado />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>

  )
}

export default App
