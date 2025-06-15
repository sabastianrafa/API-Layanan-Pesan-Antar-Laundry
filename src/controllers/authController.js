import { register, login } from '../services/authService.js';

export const registerController = async (req, res, next) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    // Tidak perlu pengecekan manual lagi karena sudah dihandle oleh validate middleware
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (err) {
    if (err.message === 'Invalid email or password') {
      return res.status(401).json({
        success: false,
        message: err.message
      });
    }
    next(err);
  }
};