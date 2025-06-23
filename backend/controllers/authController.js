import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Faltan campos' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error servidor' });
  }
};

export const loginUser = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET; 

  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Faltan campos' });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error servidor' });
  }
};

export const getUserProfile = (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
};
