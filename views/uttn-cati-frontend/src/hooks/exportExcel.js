import * as XLSX from 'exceljs';

export function handleOnExport(data, params, e) {
    
    e.stopPropagation();

    const workbook = new XLSX.Workbook(),
    sheet = workbook.addWorksheet('Sheet1');
    sheet.properties = {
      defaultRowHeight: 52.5,
      defaultColWidth: 10.71,
    }
  
    const parameters = [
      'Estado', 'Actualizacion', 'Fecha', 'Encargado',
      'ID', 'Articulo', 'Marca', 'Modelo', 'S/N', 'Tiempo de Vida',
      'Nombre', 'Sistema Operativo', 'Version', 'Tipo', 'Dominio',
      'Marca', 'Modelo', 'Generacion', 'GHz', 'Graficos',
      'Modelo', 'Cantidad', 'Tipo', 'Marca',
      'Tipo', 'Velocidad', 'Capacidad', 'Ranuras', 'Total',
      'Marca', 'Modelo', 'Departamento', 'Resguardo', 'En uso por'
    ];

    const getColumnLabel = (index) => {
      let label = '';
      while (index >= 0) {
        label = String.fromCharCode(65 + (index % 26)) + label;
        index = Math.floor(index / 26) - 1;
      }
      return label;
    }
    
    parameters.forEach((param, index) => {
      let columnLabel = getColumnLabel(index);
      let cellReference = columnLabel + '2';
    
      sheet.getCell(cellReference).value = param;
      sheet.getCell(cellReference).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // Estado del equipo
    sheet.mergeCells('A1:D1');
    sheet.getCell('A1').value = 'EQUIPO';
    sheet.getCell('A1').alignment = { horizontal: 'center' };

    // Informacion del articulo
    sheet.mergeCells('E1:J1');
    sheet.getCell('E1').value = 'ARTICULO';
    sheet.getCell('E1').alignment = { horizontal: 'center' };

    // Informacion del sistema
    sheet.mergeCells('K1:O1');
    sheet.getCell('K1').value = 'SISTEMA';
    sheet.getCell('K1').alignment = { horizontal: 'center' };
    
    // Informacion del procesador
    sheet.mergeCells('P1:U1');
    sheet.getCell('P1').value = 'PROCESADOR';
    sheet.getCell('P1').alignment = { horizontal: 'center' };

    // Informacion del almacenamiento
    sheet.mergeCells('V1:X1');
    sheet.getCell('W1').value = 'ALMACENAMIENTO';
    sheet.getCell('W1').alignment = { horizontal: 'center' };

    // Informacion de memoria RAM
    sheet.mergeCells('Y1:AE1');
    sheet.getCell('Z1').value = 'RAM';
    sheet.getCell('Z1').alignment = { horizontal: 'center' };

    // Informacion de resguardo
    sheet.mergeCells('AF1:AH1');
    sheet.getCell('AG1').value = 'RESGUARDO';
    sheet.getCell('AG1').alignment = { horizontal: 'center' };

    sheet.columns = [
      // Estado
      { header: 'Estado', key: 'estado' },
      { header: 'Actualizacion', key: 'actualizacion' },
      { header: 'Fecha', key: 'fechaActualizacion' },
      { header: 'Encargado', key: 'encargado' },
      // Articulo
      { header: 'ID', key: 'id' },
      { header: 'Articulo', key: 'articulo' },
      { header: 'Marca', key: 'marca' },
      { header: 'Modelo', key: 'modelo' },
      { header: 'S/N', key: 'numeroSerie' },
      { header: 'Tiempo de Vida', key: 'tiempoVida' },
      // Sistema
      { header: 'Nombre', key: 'nombreEquipo' },
      { header: 'Sistema Operativo', key: 'sistemaOperativo' },
      { header: 'Version', key: 'version' },
      { header: 'Tipo', key: 'tipoSistema' },
      { header: 'Dominio', key: 'dominio' },
      // Procesador
      { header: 'Marca', key: 'marcaProcesador' },
      { header: 'Modelo', key: 'modeloProcesador' },
      { header: 'Generacion', key: 'generacion' },
      { header: 'GHz', key: 'ghz' },
      { header: 'Graficos', key: 'graficos' },
      { header: 'Modelo', key: 'modeloGraficos' },
      // Almacenamiento
      { header: 'Cantidad', key: 'almacenamientoGB' },
      { header: 'Tipo', key: 'tipoAlmacenamiento' },
      { header: 'Marca', key: 'marcaAlmacenamiento' },
      // RAM
      { header: 'Tipo', key: 'tipoRam' },
      { header: 'Velocidad', key: 'velocidadRam' },
      { header: 'Capacidad', key: 'capacidadRam' },
      { header: 'Ranuras', key: 'ranurasUso' },
      { header: 'Total', key: 'totalRam' },
      { header: 'Marca', key: 'marcaRam' },
      { header: 'Modelo', key: 'modeloRam' },
      // Resguardo
      { header: 'Departamento', key: 'departamentoResguardo' },
      { header: 'Resguardo', key: 'resguardante' },
      { header: 'En uso por', key: 'usoPor' },
    ];

    data?.map(device => {
      sheet.insertRow(3,{
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
        marcaAlmacenamiento: device.informacionAlmacenamiento.marcaAlmacenamiento,
        // RAM
        tipoRam: device.informacionRam.tipoRam,
        velocidadRam: device.informacionRam.velocidadRam,
        capacidadRam: device.informacionRam.capacidadRam,
        ranurasUso: device.informacionRam.ranurasUso,
        totalRam: device.informacionRam.totalRam,
        marcaRam: device.informacionRam.marcaRam,
        modeloRam: device.informacionRam.modeloRam,
        // Resguardo
        departamentoResguardo: device.informacionResguardo.departamentoResguardo,
        resguardante: device.informacionResguardo.resguardante,
        usoPor: device.informacionResguardo.usoPor,
      });
    });

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = params.seleccion + '.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }