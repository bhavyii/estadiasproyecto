const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    cambios: [{
        propiedad: String,
        valorAnterior: String,
        valorNuevo: String
    }]
});

const dispositivosSchema = new mongoose.Schema({
    estadoEquipo: {
        estado: { type: String, default: "Sin información" },
        actualizacion: { type: String, default: "Sin información" },
        fechaActualizacion: { type: Date, default: "" },
        encargado: { type: String, default: "Sin información" },
    },
    informacionArticulo: {
        id: { type: String, default: "Sin información" },
        articulo: { type: String, default: "Sin información" },
        marca: { type: String, default: "Sin información" },
        modelo: { type: String, default: "Sin información" },
        numeroSerie: { type: String, default: "Sin información" },
        tiempoVida: { type: String, default: "Por definir" },
    },
    informacionSistema: {
        nombreEquipo: { type: String, default: "Sin información" },
        sistemaOperativo: { type: String, default: "Sin información" },
        version: { type: String, default: "Sin información" },
        tipoSistema: { type: String, default: "Sin información" },
        dominio: { type: String, default: "Sin información" },
    },
    informacionProcesador: {
        marcaProcesador: { type: String, default: "Sin información" },
        modeloProcesador: { type: String, default: "Sin información" },
        generacion: { type: String, default: "Sin información" },
        ghz: { type: String, default: "Sin información" },
        graficos: { type: String, default: "Sin información" },
        modeloGraficos: { type: String, default: "Sin información" },
    },
    informacionAlmacenamiento: {
        almacenamientoGB: { type: String, default: "Sin información" },
        tipoAlmacenamiento: { type: String, default: "Sin información" },
        marcaAlmacenamiento: { type: String, default: "Sin información" },
    },
    informacionRam: {
        tipoRam: { type: String, default: "Sin información" },
        velocidadRam: { type: String, default: "Sin información" },
        capacidadRam: { type: String, default: "Sin información" },
        ranurasUso: { type: String, default: "Sin información" },
        totalRam: { type: String, default: "Sin información" },
        marcaRam: { type: String, default: "Sin información" },
        modeloRam: { type: String, default: "Sin información" },
    },
    informacionResguardo: {
        departamentoResguardo: { type: String, default: "Sin información" },
        resguardante: { type: String, default: "Sin información" },
        usoPor: { type: String, default: "Sin información" },
    },
    anotaciones: {
        observaciones: { type: String, default: "Sin observaciones" },
        recomendaciones: { type: String, default: "Sin recomendaciones" },
    },
    historial: [historialSchema]
});

module.exports = mongoose.model('dispositivos', dispositivosSchema)