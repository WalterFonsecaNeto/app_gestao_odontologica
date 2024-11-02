// import style from "./App.module.css";
import { useState, } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageAutenticacao from "./Pages/PageAutenticacao/PageAutenticacao";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const [isAuth, setIsAuth] = useState(false);
 
  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<PageAutenticacao setIsAuth={setIsAuth} />} />

          <Route
            path="/pagina-protegida"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <h1>Minha página protegida</h1>
                {/*Coloco a page aqui*/}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
