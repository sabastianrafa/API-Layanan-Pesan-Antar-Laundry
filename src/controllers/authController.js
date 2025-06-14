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
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};