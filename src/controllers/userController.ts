import { Request, Response } from 'express';
import db from '../models';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll();
    if (!users) {
      return res.status(404).json({ message: 'Not found users', status: 404 });
    }
    return res.status(200).json({ message: users, status: 200 });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

export default {
  getUsers,
};
