import bcrypt from 'bcryptjs'; //libreria para hashear (encriptar) contraseñas y comparar hashes.
import jwt from 'jsonwebtoken'; //para crear tokens jwt usados en autenticacion.
import User from '../models/User.js'; // los uusuarios de mongo en la base de datos

// cuando el usuario hace click en register en el formulario de register.jsx pasa lo siguiente:
// el usuario escribio un username y un password, eso se envia a la base de datos, toda la logica
// la hace el register.. entonces esta funcion de register user lo que hace es:
// un nuevo usuaroi se quiere registrar entonces ingresa usuario y contraseña y toca registrar
// cuando toca el boton se dispara esta funcion que pregunta en la base de datos, che este username
// esta registrado en la base de datos ? si el usuario no escribio nada tira error de faltan camps
// si el usuario esta registrado entonces tira che el usuario ya existe.. y si el usuario no estaba registrado
// ahi si encripta la contraseña y setea o guarda un nuevo usuario. como lo guarda? a traves del await newUser.save();
// ese save() es un metodo de mongoose la libreria de mongodb, el cual se conecta a la base de datos prepara un insert con 
// los datos y lo ejecuta direcamente... el front end ya esta haciendo el POST a traves del componente register, es decir
// cuando alguien se quiere registrar ejecuta el post que desde el auth.js indica que cuando alguien le hagaa un post a register
// ejecutá la funcion registerUser que se encuentra dentro del authController.js y ahi es cuando esta funcion entra en accion.
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Faltan campos' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10); // el numero 10 es el nivel de seguridad (cuantas vueltas hace para cifrar)
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Error servidor' });
  }
};


// esta funcion de login hace excatamente lo mismo que la otra, primero guarda en jwt_secret el jwt_secret que tengo en el .env  
// q pongamosle que es "pepito", entonces jwt_secret ahora es pepito.. luego se fija en la base de datos username y password , 
// si lo que escribio el nuevo usuario esta vacio arroja faltan campos, si escsribio mal te tira que no coincide, 
// si lo que escribio coindice con la base de datos entonces te logea, pero todo esto lo hace a traves del bycprypt.compare 
// que hashea la contraseña del front end para compararla..  ademas una vez que el usuario se logea crea un token jwt que es como
// una tarjeta de identificion digital firmada por el servidor, y sirve para no tener que volver a pedirle usuario y contraseña al nuevo
// usuario en cada paso. el token que se genera contiene "id: user._id, username: user.username"(mongodb guarda asi el campo para 
// identificar correctamente el usuario que se registro. no falla. como si fuese un dni) y finalmente queda firmado con mi jwt_secret 
// osea mi secreto, que en este caso es pepito, y esto se guarda en localstorage o sessiontorage y se manda al servidor 
// en cada request protegida todo eso lo hace a traves de authMiddleware(Authorization: Bearer <token>)

export const loginUser = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const { username, password } = req.body;

    // 1. Log para verificar qué llega desde el frontend
    console.log("Intento de login recibido para el usuario:", username);

    if (!username || !password) {
      return res.status(400).json({ message: 'Faltan campos' });
    }

    // 2. Buscamos en la base de datos
    // Usamos .trim() para evitar problemas con espacios accidentales
    const user = await User.findOne({ username: username.trim() });

    // 3. Si no existe, lo logueamos en consola para confirmar la conexión a la DB
    if (!user) {
      console.log(`Error: El usuario '${username}' no existe en la base de datos conectada.`);
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // 4. Comparación de contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Error: Contraseña incorrecta para el usuario '${username}'`);
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // 5. Generación del token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log(`Login exitoso para: ${username}`);
    res.json({ token, username: user.username });

  } catch (error) {
    console.error("Error crítico en loginUser:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

//esta funcion es para saber quien es el usuario autenticado basicamente, yo podria crear en el auth.js lo siguiente
//router.get('/profile', authMiddleware, getUserProfile); y con esto veria en dicha ruta algo como el id y el username del usuario
// basicamente estoy guardando en req los datos decodificados del token.. este proceso lo realiza el authmiddleware.. 
// entonces req.user.id tendra la id del usuario y el req.user.username tendra el nombre del usuario. tan sencillo como eso.
export const getUserProfile = (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
};
