import style from "./App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PagePacientes from "./Pages/PagePacientes/PagePacientes";
import PageAutenticacao from "./Pages/PageAutenticacao/PageAutenticacao";
import PageFichaClinica from "./Pages/PageFichaClinica/PageFichaClinica";
import PageEspecialidade from "./Pages/PageEspecialidade/PageEspecialidade";
import PageProcedimento from "./Pages/PageProcedimento/PageProcedimento";
import PageHome from "./Pages/PageHome/PageHome";

function App() {

  return (
    <Router>
      <div className={style.body_total}> 
        <Routes>
          <Route
            path="/"
            element={<PageAutenticacao/>}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <PageHome />
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
         
          <Route
            path="/especialidades"
            element={
              <ProtectedRoute>
                <PageEspecialidade />
              </ProtectedRoute>
            }
          />
          <Route
            path="/procedimentos"
            element={
              <ProtectedRoute>
                <PageProcedimento/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
