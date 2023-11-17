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

app.get('/forms', requireLogin, (req, res) => {
    res.render('forms');
});

app.get('/formsnolap', requireLogin, (req, res) => {
    res.render('formsnolap');
});

app.get('/detallesnolap', requireLogin, (req, res) => {
    res.render('detallesnolap');
});

app.get('/editarnolap', requireLogin, (req, res) => {
    res.render('editarnolap');
});

app.get('/menu', requireLogin, (req, res) => {
    res.render('menu');
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

app.get('/inicio', requireLogin, async (req, res) => {
    try {
        // Consulta la base de datos para obtener la lista de dispositivos
        const dispositivos = await Dispositivos.find();
        res.render('inicio', { dispositivos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la lista de dispositivos');
    }
});

app.get('/detalles', requireLogin, (req, res) => {
    res.render('detalles');
});

app.get('/historial', requireLogin, (req, res) => {
    res.render('historial');
});

app.get('/historialdetodo', requireLogin, async (req, res) => {
    try {
        const dispositivos = await Dispositivos.find();
        if (dispositivos && dispositivos.length > 0) {
            // Ordenar los cambios de más nuevo a más viejo
            dispositivos.forEach(dispositivo => {
                if (dispositivo.historial) {
                    dispositivo.historial.sort((a, b) => b.fecha - a.fecha);
                }
            });
            res.render('historialdetodo', { dispositivos });
        } else {
            res.status(404).send('Dispositivo no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el historial del dispositivo');
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

app.get('/historial/:dispositivoId', requireLogin, async (req, res) => {
    try {
        const dispositivoId = req.params.dispositivoId;
        // Busca el dispositivo por su ID en la base de datos
        const dispositivo = await Dispositivos.findById(dispositivoId);
        if (dispositivo) {
            res.render('historial', { dispositivo });
        } else {
            res.status(404).send('Dispositivo no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el historial del dispositivo');
    }
});

app.get('/detalles/:dispositivoId', requireLogin, async (req, res) => {
    try {
        const dispositivoId = req.params.dispositivoId;
        // Busca el dispositivo por su ID en la base de datos
        const dispositivo = await Dispositivos.findById(dispositivoId);
        
        if (dispositivo) {
            let detallesPageRoute = 'detalles'; // Ruta por defecto

            // Verifica si el artículo no es CPU, Laptop o Allinone
            if (!['CPU', 'Laptop', 'Allinone'].includes(dispositivo.informacionArticulo.articulo)) {
                detallesPageRoute = 'detallesnolap';
            }

            res.render(detallesPageRoute, { dispositivo });
        } else {
            res.status(404).send('Dispositivo no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los detalles del dispositivo');
    }
});

app.get('/editar/:dispositivoId', requireLogin, async (req, res) => {
    try {
        const dispositivoId = req.params.dispositivoId;
        // Busca el dispositivo por su ID en la base de datos
        const dispositivo = await Dispositivos.findById(dispositivoId);
        if (dispositivo) {
            let editarPageRoute = 'editar';

            if (!['CPU', 'Laptop', 'Allinone'].includes(dispositivo.informacionArticulo.articulo)) {
                editarPageRoute = 'editarnolap';
            }

            res.render(editarPageRoute, { dispositivo });
        } else {
            res.status(404).send('Dispositivo no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los detalles del dispositivo');
    }
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

app.delete('/borrar-usuario/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Realiza una consulta para encontrar y eliminar al usuario por su ID
        const result = await Usuarios.findByIdAndDelete(userId);
        if (result) {
            res.json({ success: true });
        } else {
            res.json({ success: false, error: 'El usuario no fue encontrado' });
        }
    } catch (error) {
        console.error("Error al borrar el usuario:", error);
        res.json({ success: false, error: 'Error al borrar el usuario' });
    }
});

app.delete('/borrar-dispositivo/:dispositivoId', async (req, res) => {
    const dispositivoId = req.params.dispositivoId;

    try {
        // Realiza una consulta para encontrar y eliminar el dispositivo por su ID
        const result = await Dispositivos.findByIdAndDelete(dispositivoId);
        if (result) {
            res.json({ success: true });
        } else {
            res.json({ success: false, error: 'El dispositivo no fue encontrado' });
        }
    } catch (error) {
        console.error("Error al borrar el dispositivo:", error);
        res.json({ success: false, error: 'Error al borrar el dispositivo' });
    }
});

app.post('/guardar', async (req, res) => {
    const { estado, actualizacion, fecha, encargado, id, articulo, marca, modelo, numeroSerie, nombreEquipo, sistemaOperativo, version, tipoSistema, dominio, marcaProcesador, modeloProcesador, generacion, ghz, graficos, modeloGraficos, almacenamientoGB, tipoAlmacenamiento, marcaAlmacenamiento, tipoRam, velocidadRam, capacidadRam, ranurasUso, totalRam, marcaRam, modeloRam, departamentoResguardo, resguardante, usoPor, observaciones, recomendaciones } = req.body;

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
            numeroSerie,
            modelo,
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
        },
        informacionAlmacenamiento: {
            almacenamientoGB,
            tipoAlmacenamiento,
            marcaAlmacenamiento,
        },
        informacionRam: {
            tipoRam,
            velocidadRam,
            capacidadRam,
            ranurasUso,
            totalRam,
            marcaRam,
            modeloRam,
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

app.post('/guardarnolap', async (req, res) => {
    const { estado, actualizacion, fecha, encargado, id, articulo, marca, modelo, numeroSerie, departamentoResguardo, resguardante, usoPor, observaciones, recomendaciones } = req.body;

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
            numeroSerie,
            modelo,
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
        res.redirect('/formsnolap');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar los datos');
    }
});

app.post('/actualizar/:dispositivoId', async (req, res) => {
    const dispositivoId = req.params.dispositivoId;
    const { estado, actualizacion, encargado, id, articulo, marca, modelo, numeroSerie, nombreEquipo, sistemaOperativo, version, tipoSistema, dominio, marcaProcesador, modeloProcesador, generacion, ghz, graficos, modeloGraficos, almacenamientoGB, tipoAlmacenamiento, marcaAlmacenamiento, tipoRam, velocidadRam, capacidadRam, ranurasUso, totalRam, marcaRam, modeloRam, departamentoResguardo, resguardante, usoPor, observaciones, recomendaciones } = req.body;

    try {
        const dispositivo = await Dispositivos.findById(dispositivoId);
        if (!dispositivo) {
            return res.status(404).send('Dispositivo no encontrado');
        }

        const cambios = [];

        // Función para agregar cambios al historial
        const agregarCambio = (propiedad, valorAnterior, valorNuevo) => {
            if (valorAnterior !== valorNuevo) {
                cambios.push({
                    propiedad,
                    valorAnterior,
                    valorNuevo
                });
            }
        };

        agregarCambio('Estado', dispositivo.estadoEquipo.estado, estado);
        agregarCambio('Actualización', dispositivo.estadoEquipo.actualizacion, actualizacion);
        agregarCambio('Encargado', dispositivo.estadoEquipo.encargado, encargado);
        agregarCambio('Id', dispositivo.informacionArticulo.id, id);
        agregarCambio('Articulo', dispositivo.informacionArticulo.articulo, articulo);
        agregarCambio('Marca', dispositivo.informacionArticulo.marca, marca);
        agregarCambio('Modelo', dispositivo.informacionArticulo.modelo, modelo);
        agregarCambio('Numero de serie', dispositivo.informacionArticulo.numeroSerie, numeroSerie);
        agregarCambio('Nombre de equipo', dispositivo.informacionSistema.nombreEquipo, nombreEquipo);
        agregarCambio('Sistema operativo', dispositivo.informacionSistema.sistemaOperativo, sistemaOperativo);
        agregarCambio('Version', dispositivo.informacionSistema.version, version);
        agregarCambio('Tipo de sistema', dispositivo.informacionSistema.tipoSistema, tipoSistema);
        agregarCambio('Dominio', dispositivo.informacionSistema.dominio, dominio);
        agregarCambio('Marca del procesador', dispositivo.informacionProcesador.marcaProcesador, marcaProcesador);
        agregarCambio('Modelo de procesador', dispositivo.informacionProcesador.modeloProcesador, modeloProcesador);
        agregarCambio('Generacion', dispositivo.informacionProcesador.generacion, generacion);
        agregarCambio('Ghz', dispositivo.informacionProcesador.ghz, ghz);
        agregarCambio('Graficos', dispositivo.informacionProcesador.graficos, graficos);
        agregarCambio('Modelo de graficos', dispositivo.informacionProcesador.modeloGraficos, modeloGraficos);
        agregarCambio('Almacenamiento', dispositivo.informacionAlmacenamiento.almacenamientoGB, almacenamientoGB);
        agregarCambio('Tipo de almacenamiento', dispositivo.informacionAlmacenamiento.tipoAlmacenamiento, tipoAlmacenamiento);
        agregarCambio('Marca del almacenamiento', dispositivo.informacionAlmacenamiento.marcaAlmacenamiento, marcaAlmacenamiento);
        agregarCambio('Tipo de RAM', dispositivo.informacionRam.tipoRam, tipoRam);
        agregarCambio('Velocidad de la RAM', dispositivo.informacionRam.velocidadRam, velocidadRam);
        agregarCambio('Capacidad de la RAM', dispositivo.informacionRam.capacidadRam, capacidadRam);
        agregarCambio('Ranuras en uso', dispositivo.informacionRam.ranurasUso, ranurasUso);
        agregarCambio('Total de RAM', dispositivo.informacionRam.totalRam, totalRam);
        agregarCambio('Marca de la RAM', dispositivo.informacionRam.marcaRam, marcaRam);
        agregarCambio('Modelo de la RAM', dispositivo.informacionRam.modeloRam, modeloRam);
        agregarCambio('Departamento de resguardo', dispositivo.informacionResguardo.departamentoResguardo, departamentoResguardo);
        agregarCambio('Resguardante', dispositivo.informacionResguardo.resguardante, resguardante);
        agregarCambio('En uso por', dispositivo.informacionResguardo.usoPor, usoPor);
        agregarCambio('Observaciones', dispositivo.anotaciones.observaciones, observaciones);
        agregarCambio('Recomendaciones', dispositivo.anotaciones.recomendaciones, recomendaciones);

        // Verifica si hay cambios antes de agregar al historial y guardar en la base de datos
        if (cambios.length > 0) {
            dispositivo.historial.push({
                fecha: new Date(),
                cambios
            });

            // Actualiza las propiedades del dispositivo
            dispositivo.estadoEquipo.estado = estado;
            dispositivo.estadoEquipo.actualizacion = actualizacion;
            dispositivo.estadoEquipo.encargado = encargado;
            dispositivo.informacionArticulo.id = id;
            dispositivo.informacionArticulo.articulo = articulo;
            dispositivo.informacionArticulo.marca = marca;
            dispositivo.informacionArticulo.numeroSerie = numeroSerie;
            dispositivo.informacionArticulo.modelo = modelo;
            dispositivo.informacionSistema.nombreEquipo = nombreEquipo;
            dispositivo.informacionSistema.sistemaOperativo = sistemaOperativo;
            dispositivo.informacionSistema.version = version;
            dispositivo.informacionSistema.tipoSistema = tipoSistema;
            dispositivo.informacionSistema.dominio = dominio;
            dispositivo.informacionProcesador.marcaProcesador = marcaProcesador;
            dispositivo.informacionProcesador.modeloProcesador = modeloProcesador;
            dispositivo.informacionProcesador.generacion = generacion;
            dispositivo.informacionProcesador.ghz = ghz;
            dispositivo.informacionProcesador.graficos = graficos;
            dispositivo.informacionProcesador.modeloGraficos = modeloGraficos;
            dispositivo.informacionAlmacenamiento.almacenamientoGB = almacenamientoGB;
            dispositivo.informacionAlmacenamiento.tipoAlmacenamiento = tipoAlmacenamiento;
            dispositivo.informacionAlmacenamiento.marcaAlmacenamiento = marcaAlmacenamiento;
            dispositivo.informacionRam.tipoRam = tipoRam;
            dispositivo.informacionRam.velocidadRam = velocidadRam;
            dispositivo.informacionRam.capacidadRam = capacidadRam;
            dispositivo.informacionRam.ranurasUso = ranurasUso;
            dispositivo.informacionRam.totalRam = totalRam;
            dispositivo.informacionRam.marcaRam = marcaRam;
            dispositivo.informacionRam.modeloRam = modeloRam;
            dispositivo.informacionResguardo.departamentoResguardo = departamentoResguardo;
            dispositivo.informacionResguardo.resguardante = resguardante;
            dispositivo.informacionResguardo.usoPor = usoPor;
            dispositivo.anotaciones.observaciones = observaciones;
            dispositivo.anotaciones.recomendaciones = recomendaciones;
            // Actualiza otras propiedades

            // Guarda el dispositivo actualizado en la base de datos
            await dispositivo.save();
        }

        res.redirect('/inicio'); // Redirige a la página deseada después de la actualización
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la información');
    }
});

app.post('/actualizarnolap/:dispositivoId', async (req, res) => {
    const dispositivoId = req.params.dispositivoId;
    const { estado, actualizacion, encargado, id, articulo, marca, modelo, numeroSerie, departamentoResguardo, resguardante, usoPor, observaciones, recomendaciones } = req.body;

    try {
        const dispositivo = await Dispositivos.findById(dispositivoId);
        if (!dispositivo) {
            return res.status(404).send('Dispositivo no encontrado');
        }

        const cambios = [];

        // Función para agregar cambios al historial
        const agregarCambio = (propiedad, valorAnterior, valorNuevo) => {
            if (valorAnterior !== valorNuevo) {
                cambios.push({
                    propiedad,
                    valorAnterior,
                    valorNuevo
                });
            }
        };

        agregarCambio('Estado', dispositivo.estadoEquipo.estado, estado);
        agregarCambio('Actualización', dispositivo.estadoEquipo.actualizacion, actualizacion);
        agregarCambio('Encargado', dispositivo.estadoEquipo.encargado, encargado);
        agregarCambio('Id', dispositivo.informacionArticulo.id, id);
        agregarCambio('Articulo', dispositivo.informacionArticulo.articulo, articulo);
        agregarCambio('Marca', dispositivo.informacionArticulo.marca, marca);
        agregarCambio('Modelo', dispositivo.informacionArticulo.modelo, modelo);
        agregarCambio('Numero de serie', dispositivo.informacionArticulo.numeroSerie, numeroSerie);
        agregarCambio('Departamento de resguardo', dispositivo.informacionResguardo.departamentoResguardo, departamentoResguardo);
        agregarCambio('Resguardante', dispositivo.informacionResguardo.resguardante, resguardante);
        agregarCambio('En uso por', dispositivo.informacionResguardo.usoPor, usoPor);
        agregarCambio('Observaciones', dispositivo.anotaciones.observaciones, observaciones);
        agregarCambio('Recomendaciones', dispositivo.anotaciones.recomendaciones, recomendaciones);

        // Verifica si hay cambios antes de agregar al historial y guardar en la base de datos
        if (cambios.length > 0) {
            dispositivo.historial.push({
                fecha: new Date(),
                cambios
            });

            // Actualiza las propiedades del dispositivo
            dispositivo.estadoEquipo.estado = estado;
            dispositivo.estadoEquipo.actualizacion = actualizacion;
            dispositivo.estadoEquipo.encargado = encargado;
            dispositivo.informacionArticulo.id = id;
            dispositivo.informacionArticulo.articulo = articulo;
            dispositivo.informacionArticulo.marca = marca;
            dispositivo.informacionArticulo.numeroSerie = numeroSerie;
            dispositivo.informacionArticulo.modelo = modelo;
            dispositivo.informacionResguardo.departamentoResguardo = departamentoResguardo;
            dispositivo.informacionResguardo.resguardante = resguardante;
            dispositivo.informacionResguardo.usoPor = usoPor;
            dispositivo.anotaciones.observaciones = observaciones;
            dispositivo.anotaciones.recomendaciones = recomendaciones;
            // Actualiza otras propiedades

            // Guarda el dispositivo actualizado en la base de datos
            await dispositivo.save();
        }

        res.redirect('/inicio'); // Redirige a la página deseada después de la actualización
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la información');
    }
});

app.get('/search/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const resultados = await Dispositivos.find({
            $or: [
                { 'informacionResguardo.resguardante': { $regex: keyword, $options: 'i' } },
                { 'informacionArticulo.modelo': { $regex: keyword, $options: 'i' } },
                { 'informacionArticulo.articulo': { $regex: keyword, $options: 'i' } },
                { 'informacionArticulo.marca': { $regex: keyword, $options: 'i' } },
                { 'informacionArticulo.id': { $regex: keyword, $options: 'i' } },
                // Agrega más condiciones según sea necesario
            ]
        });

        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar dispositivos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});