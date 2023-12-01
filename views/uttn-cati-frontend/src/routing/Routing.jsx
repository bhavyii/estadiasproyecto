import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Details } from "../components/pages/Details";
import { Search } from "../components/pages/Search";
import { ViewSelection } from "../components/pages/ViewSelection";

export const Routing = () => {
  
  
      return (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ViewSelection />} />
            <Route path="/:seleccion" element={<Home />} />
            <Route path="/Detalles/:id" element={<Details />} />
            <Route path="/Buscar/:busqueda" element={<Search />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      );
  };
