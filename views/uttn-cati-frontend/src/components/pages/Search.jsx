import React from "react";
import { useParams } from "react-router-dom";
import { useSearchFetch } from "../../hooks/useSearchFetch";
import { Items } from "./Items";
import { Loading } from "./Loading";
import { NoData } from "./NoData";
import * as XLSX from "exceljs";

export const Search = () => {
  const params = useParams();
  const { data, loading } = useSearchFetch(params.busqueda);

  const goBack = (e) => {
    e.stopPropagation();
    history.back();
  };

  const handleOnExport = (e) => {
    e.stopPropagation();
    const workbook = new XLSX.Workbook(),
      sheet = workbook.addWorksheet("Sheet1");
    sheet.properties = {
      defaultRowHeight: 52.5,
      defaultColWidth: 15,
      horizontal: "center",
      vertical: "middle",
    };

    // Estado del equipo
    sheet.mergeCells("A1:D1");
    sheet.getCell("A1").value = "EQUIPO";
    sheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Informacion del articulo
    sheet.mergeCells("E1:J1");
    sheet.getCell("E1").value = "ARTÍCULO";
    sheet.getCell("E1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Informacion del sistema
    sheet.mergeCells("K1:O1");
    sheet.getCell("K1").value = "SISTEMA";
    sheet.getCell("K1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Informacion del procesador
    sheet.mergeCells("P1:U1");
    sheet.getCell("P1").value = "PROCESADOR";
    sheet.getCell("P1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Informacion del almacenamiento
    sheet.mergeCells("V1:X1");
    sheet.getCell("W1").value = "ALMACENAMIENTO";
    sheet.getCell("W1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Informacion de memoria RAM
    sheet.mergeCells("Y1:AE1");
    sheet.getCell("Z1").value = "RAM";
    sheet.getCell("Z1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Informacion de resguardo
    sheet.mergeCells("AF1:AH1");
    sheet.getCell("AG1").value = "RESGUARDO";
    sheet.getCell("AG1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    const colParams = [
      "Estado",
      "Actualización",
      "Fecha",
      "Encargado",
      "ID",
      "Artículo",
      "Marca",
      "Modelo",
      "S/N",
      "Tiempo de Vida",
      "Nombre",
      "Sistema Operativo",
      "Version",
      "Tipo",
      "Dominio",
      "Marca",
      "Modelo",
      "Generación",
      "GHz",
      "Gráficos",
      "Modelo",
      "Cantidad",
      "Tipo",
      "Marca",
      "Tipo",
      "Velocidad",
      "Capacidad",
      "Ranuras",
      "Total",
      "Marca",
      "Modelo",
      "Departamento",
      "Resguardo",
      "En uso por",
    ];

    const getColumnLabel = (index) => {
      let label = "";
      while (index >= 0) {
        label = String.fromCharCode(65 + (index % 26)) + label;
        index = Math.floor(index / 26) - 1;
      }
      return label;
    };

    colParams.forEach((param, index) => {
      let columnLabel = getColumnLabel(index);
      let cellReference = columnLabel + "2  ";

      sheet.getCell(cellReference).value = param;
      sheet.getCell(cellReference).alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      sheet.getCell(cellReference).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "000000" },
      };
      sheet.getCell(cellReference).font = { color: { argb: "ffffff" } };
      sheet.getCell(cellReference).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
        color: { argb: "ffffff" },
      };
    });

    sheet.columns = [
      // Estado
      { key: "estado" },
      { key: "actualizacion" },
      { key: "fechaActualizacion" },
      { key: "encargado" },
      // Articulo
      { key: "id" },
      { key: "articulo" },
      { key: "marca" },
      { key: "modelo" },
      { key: "numeroSerie" },
      { key: "tiempoVida" },
      // Sistema
      { key: "nombreEquipo" },
      { key: "sistemaOperativo" },
      { key: "version" },
      { key: "tipoSistema" },
      { key: "dominio" },
      // Procesador
      { key: "marcaProcesador" },
      { key: "modeloProcesador" },
      { key: "generacion" },
      { key: "ghz" },
      { key: "graficos" },
      { key: "modeloGraficos" },
      // Almacenamiento
      { key: "almacenamientoGB" },
      { key: "tipoAlmacenamiento" },
      { key: "marcaAlmacenamiento" },
      // RAM
      { key: "tipoRam" },
      { key: "velocidadRam" },
      { key: "capacidadRam" },
      { key: "ranurasUso" },
      { key: "totalRam" },
      { key: "marcaRam" },
      { key: "modeloRam" },
      // Resguardo
      { key: "departamentoResguardo" },
      { key: "resguardante" },
      { key: "usoPor" },
    ];

    data?.map((device) => {
      sheet.insertRow(3, {
        // Estado
        estado: device.estadoEquipo.estado,
        actualizacion: device.estadoEquipo.actualizacion,
        fechaActualizacion: device.estadoEquipo.fechaActualizacion,
        encargado: device.estadoEquipo.encargado,
        // Articulo
        id: device.informacionArticulo.id,
        articulo: device.informacionArticulo.articulo,
        marca: device.informacionArticulo.marca,
        modelo: device.informacionArticulo.modelo,
        numeroSerie: device.informacionArticulo.numeroSerie,
        tiempoVida: device.informacionArticulo.tiempoVida,
        // Sistema
        nombreEquipo: device.informacionSistema.nombreEquipo,
        sistemaOperativo: device.informacionSistema.sistemaOperativo,
        version: device.informacionSistema.version,
        tipoSistema: device.informacionSistema.tipoSistema,
        dominio: device.informacionSistema.dominio,
        // Procesador
        marcaProcesador: device.informacionProcesador.marcaProcesador,
        modeloProcesador: device.informacionProcesador.modeloProcesador,
        generacion: device.informacionProcesador.generacion,
        ghz: device.informacionProcesador.ghz,
        graficos: device.informacionProcesador.graficos,
        modeloGraficos: device.informacionProcesador.modeloGraficos,
        // Almacenamiento
        almacenamientoGB: device.informacionAlmacenamiento.almacenamientoGB,
        tipoAlmacenamiento: device.informacionAlmacenamiento.tipoAlmacenamiento,
        marcaAlmacenamiento:
          device.informacionAlmacenamiento.marcaAlmacenamiento,
        // RAM
        tipoRam: device.informacionRam.tipoRam,
        velocidadRam: device.informacionRam.velocidadRam,
        capacidadRam: device.informacionRam.capacidadRam,
        ranurasUso: device.informacionRam.ranurasUso,
        totalRam: device.informacionRam.totalRam,
        marcaRam: device.informacionRam.marcaRam,
        modeloRam: device.informacionRam.modeloRam,
        // Resguardo
        departamentoResguardo:
          device.informacionResguardo.departamentoResguardo,
        resguardante: device.informacionResguardo.resguardante,
        usoPor: device.informacionResguardo.usoPor,
      }).alignment = {
        horizontal: "center",
        vertical: "middle",
      };
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = params.busqueda + ".xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return loading == true ? (
    <Loading />
  ) : data.length > 0 ? (
    <div className="content">
      <div className="filter">
        <button onClick={goBack} className="primaryButton">
          <img src="../icons/back.png" alt="" />
        </button>
        <button onClick={handleOnExport} className="primaryButton">
          <img src="../icons/excel.png" alt="" />
        </button>
      </div>
        <div className="section">
          <Items data={data} />
        </div>
    </div>
  ) : (
    <NoData />
  );
};
