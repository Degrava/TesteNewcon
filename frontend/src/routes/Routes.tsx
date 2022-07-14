import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Cadastro from "../pages/CadastrarPage";
import Detalhes from "../pages/DetalhesPage";
import { Home } from "../pages/HomePage";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/cadastrar" element={<Cadastro />}/>
                <Route path="/detalhes/:_id" element={<Detalhes />}/>
            </Routes>
        </Router>
    )
}