import React from "react";
import { Link } from "react-router-dom";

export const ViewSelection = () => {
  return (
    <div className="content">
      <div className="card-seletion-title">
        <h1>Selección de Información</h1>
      </div>
      <div className="card-section">
        <div className="card">
          <Link to="/Todos" reloadDocument>
            <div className="card-image">
              <img src="images/all.jpg" alt="" />
            </div>
            <div className="card-title">
              <h2>Todos</h2>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link to="/Computadoras" reloadDocument>
            <div className="card-image">
              <img src="images/laptop.jpg" alt="" />
            </div>
            <div className="card-title">
              <h2>Computadoras</h2>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link to="/Redes" reloadDocument>
            <div className="card-image">
              <img src="images/router.jpg" alt="" />
            </div>
            <div className="card-title">
              <h2>Redes</h2>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link to="/Otros" reloadDocument>
            <div className="card-image">
              <img src="images/headphones.jpg" alt="" />
            </div>
            <div className="card-title">
              <h2>Otros</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
