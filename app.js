const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'tu_secreto', // Debe ser una cadena secreta para firmar las cookies de sesión
    resave: false,
    saveUninitialized: true
}));

// Parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar Express para usar Pug como motor de plantillas
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(__dirname));

const DB_URI = "mongodb+srv://bhaviboyy:bhavi1906@clusterestadias.vibqerh.mongodb.net/estadias";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conexión exitosa a la base de datos");
    })
    .catch((error) => {
        console.log("Error al conectar a la base de datos:", error);
    });

const usuariosSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apellidoPaterno: { type: String, default: "" },
    apellidoMaterno: { type: String, default: "" },
    correo: { type: String, default: "" },
    nombre: { type: String, default: "" },
});

const Usuarios = mongoose.model("Usuarios", usuariosSchema);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/index", (req, res) => {
    const error = req.query.error;
    res.render("index", { error });
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/inicio", (req, res) => {
    res.render("inicio");
});

app.get("/principal", (req, res) => {
    res.render("principal");
});

app.post("/index", async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuario = await Usuarios.findOne({ username });

        if (usuario) {
            bcrypt.compare(password, usuario.password, (err, result) => {
                if (err) {
                    console.error("Error al comparar contraseñas:", err);
                    res.status(500).send("Error en el servidor");
                } else if (result) {
                    req.session.usuario = usuario;
                    console.log("Inicio de sesión exitoso.");
                    res.redirect("/principal");
                } else {
                    // Redirige con un mensaje de error
                    res.redirect("/index?error=Credenciales incorrectas");
                }
            });
        } else {
            res.redirect("/index?error=Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.redirect("/index?error=Error en el servidor");
        res.status(500).send("Error en el servidor");
    }
});



app.post("/register", async (req, res) => {
    const { newUsername, password, apellidoPaterno, apellidoMaterno, nombre, correo } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await Usuarios.findOne({ username: newUsername });
        if (existingUser) {
            const error = "El usuario ya existe.";
            res.render("register", { error });
        } else {
            // Encriptar la contraseña antes de guardarla en la base de datos
            bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
                if (err) {
                    console.error("Error al encriptar la contraseña:", err);
                    res.status(500).send("Error en el servidor");
                } else {
                    const newUser = new Usuarios({
                        username: newUsername,
                        password: hashedPassword, // Usar la contraseña encriptada
                        apellidoPaterno: apellidoPaterno,
                        apellidoMaterno: apellidoMaterno,
                        nombre: nombre,
                        correo: correo
                    });
                    await newUser.save();
                    console.log("Registro exitoso.");
                    res.redirect("/");
                }
            });
        }
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).send("Error en el servidor");
    }
});


app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});