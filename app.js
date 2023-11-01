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

const dispositivosSchema = new mongoose.Schema({
    estadoEquipo: {
        estado: { type: String, default: "" },
        actualizacion: { type: String, default: "" },
        fechaActualizacion: { type: Date, default: "" },
        encargado: { type: String, default: "" },
    },
    informacionArticulo: {
        id: { type: String, default: "" },
        articulo: { type: String, default: "" },
        marca: { type: String, default: "" },
        modelo: { type: String, default: "" },
        numeroSerie: { type: String, default: "" },
    },
    informacionSistema: {
        nombreEquipo: { type: String, default: "" },
        sistemaOperativo: { type: String, default: "" },
        version: { type: String, default: "" },
        tipoSistema: { type: String, default: "" },
        dominio: { type: String, default: "" },
    },
    informacionProcesador: {
        marcaProcesador: { type: String, default: "" },
        modeloProcesador: { type: String, default: "" },
        generacion: { type: String, default: "" },
        ghz: { type: String, default: "" },
        graficos: { type: String, default: "" },
        modeloGraficos: { type: String, default: "" },
        GPU: { type: String, default: "" },
    },
    informacionAlmacenamiento: {
        tipoAlmacenamiento: { type: String, default: "" },
        marcaAlmacenamiento: { type: String, default: "" },
    },
    informacionRam: {
        tipoRam: { type: String, default: "" },
        velocidadRam: { type: String, default: "" },
        capacidadRam: { type: String, default: "" },
        ranurasUso: { type: String, default: "" },
        totalRam: { type: String, default: "" },
        capacidadUtilizable: { type: String, default: "" },
        marcaRam: { type: String, default: "" },
        modeloRam: { type: String, default: "" },
    },
    informacionInternet: {
        fechaTestInternet: { type: Date, default: "" },
        velocidadDescarga: { type: String, default: "" },
        velocidadSubida: { type: String, default: "" },
        ping: { type: String, default: "" },
    },
    informacionResguardo: {
        departamentoResguardo: { type: String, default: "" },
        resguardante: { type: String, default: "" },
        usoPor: { type: String, default: "" },
    },
    anotaciones: {
        observaciones: { type: String, default: "" },
        recomendaciones: { type: String, default: "" },
    }
})

const Dispositivos = mongoose.model("Dispositivos", dispositivosSchema);
const Usuarios = mongoose.model("Usuarios", usuariosSchema);

app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});

function requireLogin(req, res, next) {
    if (req.session && req.session.usuario) {
        // Si la sesión de usuario existe, continúa
        next();
    } else {
        // Si no ha iniciado sesión, redirige a la página de inicio de sesión o muestra un mensaje de error
        const error = "El usuario ya existe.";
        res.redirect('/index'); // Cambia la ruta según tu configuración
    }
}


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

app.get('/principal', requireLogin, (req, res) => {
    res.render('principal');
});

app.get('/inicio', requireLogin, (req, res) => {
    res.render('inicio');
});

app.get('/forms', requireLogin, (req, res) => {
    res.render('forms');
});

app.get('/usuarios', requireLogin, async (req, res) => {
    try {
        // Consulta la base de datos para obtener la lista de usuarios
        const usuarios = await Usuarios.find();
        res.render('usuarios', { usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la lista de usuarios');
    }
});

app.get('/cerrar-sesion', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/'); // Redirige a la página de inicio de sesión o a donde desees
        }
    });
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


app.post('/guardar', async (req, res) => {
    const { estado, actualizacion, fecha, encargado, id, articulo, marca, modelo, numeroSerie, nombreEquipo, sistemaOperativo, version, tipoSistema, dominio, marcaProcesador, modeloProcesador, generacion, ghz, graficos, modeloGraficos, GPU, tipoAlmacenamiento, marcaAlmacenamiento, tipoRam, velocidadRam, capacidadRam, ranurasUso, totalRam, capacidadUtilizable, marcaRam, modeloRam, velocidadDescarga, velocidadSubida, ping, departamentoResguardo, resguardante, usoPor, observaciones, recomendaciones } = req.body;

    const dispositivo = new Dispositivos({
        estadoEquipo: {
            estado,
            actualizacion,
            fechaActualizacion: new Date(fecha),
            encargado,
        },
        informacionArticulo: {
            id,
            articulo,
            marca,
            modelo,
            numeroSerie,
        },
        informacionSistema: {
            nombreEquipo,
            sistemaOperativo,
            version,
            tipoSistema,
            dominio,
        },
        informacionProcesador: {
            marcaProcesador,
            modeloProcesador,
            generacion,
            ghz,
            graficos,
            modeloGraficos,
            GPU,
        },
        informacionAlmacenamiento: {
            tipoAlmacenamiento,
            marcaAlmacenamiento,
        },
        informacionRam: {
            tipoRam,
            velocidadRam,
            capacidadRam,
            ranurasUso,
            totalRam,
            capacidadUtilizable,
            marcaRam,
            modeloRam,
        },
        informacionInternet: {
            fechaTestInternet: new Date(fecha),
            velocidadDescarga,
            velocidadSubida,
            ping,
        },
        informacionResguardo: {
            departamentoResguardo,
            resguardante,
            usoPor,
        },
        anotaciones: {
            observaciones,
            recomendaciones,
        }
        // Completa con las demás propiedades del dispositivo
    });


    try {
        await dispositivo.save();
        res.redirect('/forms');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar los datos');
    }
});


app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});