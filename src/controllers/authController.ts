import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../models';
import { User } from '../models/User';
import {
  buildUser, filterPassword, passwordHash, userByEmail,
} from '../services/userServices';
import { generateToken } from '../utils/jwt.handle';

const createUser = async (req: Request, res: Response) => {
  const existingUser = await userByEmail(req.body.email);
  if (existingUser) {
    return res.status(409).json({ status: 409, message: 'Email already used' });
  }
  const user = buildUser(req.body);
  user.password = passwordHash(req.body.password);

  try {
    const newUser = await user.save();
    const dataUser = filterPassword(newUser);
    return res.status(201).json({ message: dataUser, status: 201 });
  } catch (error: Error | any) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user: User | null = await db.User.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      const match: boolean = bcrypt.compareSync(req.body.password, user.password);
      if (match) {
        const token = generateToken(user.id, user.roleId);
        return res.status(200).json({ message: { token }, status: 200 });
      }
    }
    return res.status(401).json({ status: 401, message: 'Invalid credentials' });
  } catch (error: Error | any) {
    return res.status(500).json({ status: 500, message: error });
  }
};

export default {
  createUser,
  login,
};
