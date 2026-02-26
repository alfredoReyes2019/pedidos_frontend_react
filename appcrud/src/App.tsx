import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import { NuevoUsuario } from "./components/NuevoUsuario"
import { NuevoPedido } from "./components/NuevoPedido"
import { EditarUsuario } from "./components/EditarUsuario"
import { EditarPedido } from "./components/EditarPedido"
import {Autenticar} from "./components/Autenticar";
import {ListaUsuario} from "./components/ListaUsuarios";
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
        <Route path="/autenticar" element={<Autenticar />} />
        <Route path="/nuevousuario" element={<NuevoUsuario />}/>
        {/* Rutas protegidas */}
        <Route path="/" element={<PrivateRoute><Lista /></PrivateRoute>}/>
        <Route path="/nuevopedido" element={<PrivateRoute><NuevoPedido /></PrivateRoute>}/>
        <Route path="/editarpedido/:id" element={<PrivateRoute><EditarPedido /></PrivateRoute>}/>
        <Route path="/listausuarios" element={<PrivateRoute><ListaUsuario /></PrivateRoute>}/>
        <Route path="/editarusuario/:id" element={<PrivateRoute><EditarUsuario /></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
