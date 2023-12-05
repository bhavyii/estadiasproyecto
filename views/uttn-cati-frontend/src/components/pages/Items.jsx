import React from "react";
import { Link } from "react-router-dom";

export const Items = ({ data }) => {
  return data.map((item) => (
    <div key={item._id} className={"item " + item.estadoEquipo.estado}>
      <Link to={"/Detalles/" + item._id}>
        <div className="itemOwner">
          <h1>{item.informacionResguardo.resguardante}</h1>
        </div>
        <div className="itemDepartment">
          <h2>{item.informacionResguardo.departamentoResguardo}</h2>
        </div>
        <div className="itemImage">
          {item.informacionArticulo.articulo == "CPU" ? (
            <img
              src="../images/cpu.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Allinone" ? (
            <img
              src="../images/allinone.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "All in One" ? (
            <img
              src="../images/allinone.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Laptop" ? (
            <img
              src="../images/laptop.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Audifonos" ? (
            <img
              src="../images/headphones.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Diadema" ? (
            <img
              src="../images/headphones.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "HUB" ? (
            <img
              src="../images/hub.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Switch" ? (
            <img
              src="../images/switch.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Servidores" ? (
            <img
              src="../images/server.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Servidor" ? (
            <img
              src="../images/server.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Camarasweb" ? (
            <img
              src="../images/webcam.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Camara web" ? (
            <img
              src="../images/webcam.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Reguladores" ? (
            <img
              src="../images/regulador.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : item.informacionArticulo.articulo == "Regulador" ? (
            <img
              src="../images/regulador.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          ) : (
            <img
              src="../images/regulador.jpg"
              alt="itemImage"
              width="150"
              height="150"
            ></img>
          )}
        </div>
        <div className="itemModel">
          <h1>{item.informacionArticulo.modelo}</h1>
        </div>
        <div className="itemId">
          <h2>{item.informacionArticulo.id}</h2>
        </div>
      </Link>
    </div>
  ));
};
