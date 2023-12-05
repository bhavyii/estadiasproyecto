const express = require("express");
const deviceSchema = require("../models/deviceModel");
const router = express.Router();

// Get all devices
router.get("/device", (req, res) => {
  deviceSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Get a device
router.get("/device/:id", (req, res) => {
  const { id } = req.params;
  deviceSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Update status of a device
router.put("/device/status/:id", (req, res) => {
  const { id } = req.params;
  const { estado } = req.body.estadoEquipo;
  deviceSchema
    .findByIdAndUpdate(
      id,
      { $set: { "estadoEquipo.estado": estado } },
      { new: true }
    )
    .then((updatedDevice) => {
      res.json(updatedDevice);
    })
    .catch((error) => res.json({ message: error }));
});

// Update the device life span
router.put("/device/lifespan/:id", (req, res) => {
  const { id } = req.params;
  const { tiempoVida } = req.body.informacionArticulo;
  deviceSchema
    .findByIdAndUpdate(
      id,
      { $set: { "informacionArticulo.tiempoVida": tiempoVida } },
      { new: true }
    )
    .then((updatedDevice) => {
      res.json(updatedDevice);
    })
    .catch((error) => res.json({ message: error }));
});

// Get all computers
router.get("/device/search/:selection", (req, res) => {
  const selection = req.params.selection;

  let query = {};

  switch (selection) {
    case "Todos":
      
      break;

    case "Computadoras":
        query = {
          $or: [
            {
              "informacionArticulo.articulo": { $regex: "CPU", $options: "i" },
            },
            {
              "informacionArticulo.articulo": {
                $regex: "Laptop",
                $options: "i",
              },
            },
            {
              "informacionArticulo.articulo": {
                $regex: "Allinone" || "All in one",
                $options: "i",
              },
            },
          ],
        };
      break;

    case "Redes":
      query = {
        $or: [
          {
            "informacionArticulo.articulo": {
              $regex: "Servidores",
              $options: "i",
            },
          },
          {
            "informacionArticulo.articulo": {
              $regex: "Switch",
              $options: "i",
            },
          },
          {
            "informacionArticulo.articulo": { $regex: "HUB", $options: "i" },
          },
        ],
      };
      break;

    case "Otros":
      query = {
        $or: [
          {
            "informacionArticulo.articulo": {
              $regex: "Reguladores",
              $options: "i",
            },
          },
          {
            "informacionArticulo.articulo": {
              $regex: "Camarasweb",
              $options: "i",
            },
          },
          {
            "informacionArticulo.articulo": {
              $regex: "Audifonos",
              $options: "i",
            },
          },
        ],
      };
      break;

    default:
      break;
  }
  deviceSchema
  .find(query)
  .sort({"historial.fecha": -1})
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error}));
});

// Search
router.get("/search/:keyword", (req, res) => {
  const keyword = req.params.keyword || parseInt(req.params.keyword, 10);
  
  deviceSchema
    .find({
      $or: [
        { "estadoEquipo.estado": { $regex: keyword, $options: "i" } },
        {
          "informacionResguardo.departamentoResguardo": {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          "informacionResguardo.resguardante": {
            $regex: keyword,
            $options: "i",
          },
        },
        { "informacionArticulo.modelo": { $regex: keyword, $options: "i" } },
        { "informacionArticulo.marca": { $regex: keyword, $options: "i" } },
        { "informacionArticulo.numeroSerie": { $regex: keyword, $options: "i" } },
        { "informacionArticulo.id": { $regex: keyword, $options: "i" } },
      ],
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
