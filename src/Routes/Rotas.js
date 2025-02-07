import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PagePacientes from "../Pages/PagePacientes/PagePacientes";
import PageAutenticacao from "../Pages/PageAutenticacao/PageAutenticacao";
import PageFichaClinica from "../Pages/PageFichaClinica/PageFichaClinica";
import PageEspecialidade from "../Pages/PageEspecialidade/PageEspecialidade";
import PageProcedimento from "../Pages/PageProcedimento/PageProcedimento";
import PageHome from "../Pages/PageHome/PageHome";
import PageFormaPagamento from "../Pages/PageFormaPagamento/PageFormaPagamento";
import PageAgendamentosPaciente from "../Pages/PageAgendamentosPaciente/PageAgendamentosPaciente";
import PageCalendarioAgendamento from "../Pages/PageCalendarioAgendamentos/PageCalendarioAgendamentos";

function Rotas() {

  return (
    <Router>
    
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
            path="/paciente/agendamentos/:id"
            element={
              <ProtectedRoute>
                <PageAgendamentosPaciente />
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
          <Route
            path="/formaspagamento"
            element={
              <ProtectedRoute>
                <PageFormaPagamento/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendarioAgendamentos"
            element={
              <ProtectedRoute>
                <PageCalendarioAgendamento/>
              </ProtectedRoute>
            }
          />
        </Routes>
    </Router>
  );
}

export default Rotas;
