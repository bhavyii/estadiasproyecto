import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { usePut } from "../../hooks/usePut";
import { Loading } from "./Loading";

export const Details = () => {
  const params = useParams();
  const { data, loading } = useFetch(
    "http://localhost:3000/api/device/" + params.id
  );

  const [setActiveOption] = useState(null);
  const { updateData } = usePut();

  const handleStatusUpdate = (newStatus) => {
    window.location.reload();
    updateData(`http://localhost:3000/api/device/status/${params.id}`, {
      estadoEquipo: { estado: newStatus },
    });
    setActiveOption(newStatus);
  };

  const lifeSpan = (e) => {
    e.preventDefault();
    if (
      data.informacionProcesador.marcaProcesador == "AMD" &&
      data.informacionRam.capacidadRam == "8 GB" &&
      data.informacionAlmacenamiento.tipoAlmacenamiento == "HDD"
    ) {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "3-4 años" },
      });
    } else if (
      data.informacionProcesador.marcaProcesador == "AMD" &&
      data.informacionRam.capacidadRam == "16 GB" &&
      data.informacionAlmacenamiento.tipoAlmacenamiento == "HDD"
    ) {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "3-4 años" },
      });
    } else if (
      data.informacionProcesador.marcaProcesador == "AMD" &&
      data.informacionRam.capacidadRam == "8 GB" &&
      data.informacionAlmacenamiento.tipoAlmacenamiento == "SSD"
    ) {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "4-6 años" },
      });
    } else if (
      data.informacionProcesador.marcaProcesador == "AMD" &&
      data.informacionRam.capacidadRam == "16 GB" &&
      data.informacionAlmacenamiento.tipoAlmacenamiento == "SSD"
    ) {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "4-6 años" },
      });
    } else if (
      data.informacionProcesador.marcaProcesador == "Intel" || "INTEL" &&
      data.informacionRam.capacidadRam == "8 GB" &&
      data.informacionAlmacenamiento.tipoAlmacenamiento == "HDD"
    ) {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "3-4 años" },
      });
    } else if (
      data.informacionProcesador.marcaProcesador == "Intel" || "INTEL" &&
      data.informacionRam.capacidadRam == "16 GB" &&
      data.informacionAlmacenamiento.tipoAlmacenamiento == "HDD"
    ) {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "3-4 años" },
      });
    } else if (
      data.informacionProcesador.marcaProcesador == "Intel" || "INTEL" &&
      data.informacionRam.capacidadRam == "8 GB" &&
      data.informacionAlmacenamiento.tipoAlmacenamiento == "SSD"
    ) {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "4-6 años" },
      });
    } else if (
      data.informacionProcesador.marcaProcesador == "Intel" || "INTEL" &&
      data.informacionRam.capacidadRam == "16 GB" &&
      data.informacionAlmacenamiento.tipoAlmacenamiento == "SSD"
    ) {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "4-6 años" },
      });
    } else {
      updateData(`http://localhost:3000/api/device/lifespan/${params.id}`, {
        informacionArticulo: { tiempoVida: "3-5 años" },
      });
    }
  };

  const goBack = (e) => {
    e.stopPropagation();
    history.back();
  };

  return (
    <div className="content">
      <div className="filter">
        <button onClick={goBack} className="primaryButton">
          <img src="../icons/back.png" alt="" />
        </button>
      </div>
      {loading == true ? (
        <Loading />
      ) : (
        <div className="form-section">
          <div className="sidebar">
            <div className="status">
              <div className="title">
                <h1 className="title">Definir Estado</h1>
              </div>
              <div className="options">
                <p
                  className={`excelent ${
                    data.estadoEquipo.estado === "Excelente" ? "active" : ""
                  }`}
                  onClick={() => handleStatusUpdate("Excelente")}
                >
                  Excelente
                </p>
              </div>
              <div className="options">
                <p
                  className={`good ${
                    data.estadoEquipo.estado === "Buena" ? "active" : ""
                  }`}
                  onClick={() => handleStatusUpdate("Buena")}
                >
                  Buena
                </p>
              </div>
              <div className="options">
                <p
                  className={`bad ${
                    data.estadoEquipo.estado === "Mala" ? "active" : ""
                  }`}
                  onClick={() => handleStatusUpdate("Mala")}
                >
                  Mala
                </p>
              </div>
              <div className="options">
                <p
                  className={`deficient ${
                    data.estadoEquipo.estado === "Deficiente" ? "active" : ""
                  }`}
                  onClick={() => handleStatusUpdate("Deficiente")}
                >
                  Deficiente
                </p>
              </div>
              <div className="options">
                <p
                  className={`pending ${
                    data.estadoEquipo.estado === "Pendiente" ? "active" : ""
                  }`}
                  onClick={() => handleStatusUpdate("Pendiente")}
                >
                  Pendiente
                </p>
              </div>
              <div className="options">
                <p
                  className={`no-data ${
                    data.estadoEquipo.estado === "Sin información"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleStatusUpdate("Sin información")}
                >
                  Sin Datos
                </p>
              </div>
            </div>
          </div>
          <div className="main-form">
            <span className="title">Detalles</span>
            {data.informacionArticulo.articulo == "CPU" ||
            data.informacionArticulo.articulo == "Laptop" ||
            data.informacionArticulo.articulo == "Allinone" ? (
              <form>
                <div className="input-box">
                  <span className="details">ID</span>
                  <input
                    type="text"
                    placeholder={data.informacionArticulo.id}
                    disabled
                  />
                </div>
                <div className="input-box">
                  <span className="details">Modelo</span>
                  <input
                    type="text"
                    placeholder={data.informacionArticulo.modelo}
                    disabled
                  />
                </div>
                <div className="input-box">
                  <span className="details">Número de Serie</span>
                  <input
                    type="text"
                    placeholder={data.informacionArticulo.numeroSerie}
                    disabled
                  />
                </div>
                <div className="input-box">
                  <span className="details">Sistema Operativo</span>
                  <input
                    type="text"
                    placeholder={data.informacionSistema.sistemaOperativo}
                    disabled
                  />
                </div>
                <div className="input-box">
                  <span className="details">Procesador</span>
                  <input
                    type="text"
                    placeholder={
                      data.informacionProcesador.marcaProcesador +
                      " " +
                      data.informacionProcesador.modeloProcesador +
                      " " +
                      data.informacionProcesador.generacion
                    }
                    disabled
                  />
                </div>
                <div className="input-box">
                  <span className="details">Almacenamiento</span>
                  <input
                    type="text"
                    placeholder={
                      data.informacionAlmacenamiento.almacenamientoGB
                    }
                    disabled
                  />
                </div>
                <div className="input-box">
                  <span className="details">Tipo de Almacenamiento</span>
                  <input
                    type="text"
                    placeholder={
                      data.informacionAlmacenamiento.tipoAlmacenamiento
                    }
                    disabled
                  />
                </div>
                <div className="input-box">
                  <span className="details">RAM</span>
                  <input
                    type="text"
                    placeholder={data.informacionRam.capacidadRam}
                    disabled
                  />
                </div>
                <div className="input-box">
                  <span className="details">Tiempo de Vida Útil</span>
                  <div className="lifetime">
                    <input
                      type="text"
                      defaultValue={data.informacionArticulo.tiempoVida}
                      disabled
                    />
                    <button onClick={lifeSpan}>
                      <img src="../icons/calculator.png" alt="" />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form>
                <div className="input-box">
                  <span className="details">ID</span>
                  <input
                    type="text"
                    placeholder={data.informacionArticulo.id}
                    disabled
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
