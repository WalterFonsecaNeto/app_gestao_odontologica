// import style from "./App.module.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PagePacientes from "./Pages/PagePacientes/PagePacientes";
import PageAutenticacao from "./Pages/PageAutenticacao/PageAutenticacao";
import PageFichaClinica from "./Pages/PageFichaClinica/PageFichaClinica";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<PageAutenticacao setIsAuth={setIsAuth} />}
          />

          <Route
            path="/pagina-protegida"
            element={
              <ProtectedRoute>
                <h1>Minha página protegida</h1>
                {/*Coloco a page aqui*/}
              </ProtectedRoute>
            }
          />
          <Route
            path="/pacientes"
            element={
              <ProtectedRoute>
                <PagePacientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/ficha-clinica/:id"
            element={
              <ProtectedRoute>
                <PageFichaClinica />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
