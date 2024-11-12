import style from "./App.module.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PagePacientes from "./Pages/PagePacientes/PagePacientes";
import PageAutenticacao from "./Pages/PageAutenticacao/PageAutenticacao";
import PageFichaClinica from "./Pages/PageFichaClinica/PageFichaClinica";
import PageNovoPaciente from "./Pages/PageNovoPaciente/PageNovoPaciente";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <div className={style.body_total}> 
        <Routes>
          <Route
            path="/"
            element={<PageAutenticacao setIsAuth={setIsAuth} />}
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
          <Route
            path="/paciente/novo"
            element={
              <ProtectedRoute>
                <PageNovoPaciente/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
