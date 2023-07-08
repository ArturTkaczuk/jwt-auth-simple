import { Request, Response } from "express";
import { UserModel as User } from "../models/user";
import { hashPassword } from "../helpers/bcrypt";

export const test = (req: Request, res: Response) => {
  res.json("Test working");
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // data validation
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    if (!password) {
      return res.json({
        error: "password is required",
      });
    }
    if (password.length < 8) {
      return res.json({
        error: "password is less than 8 characters",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ error: "email is already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
  }
};
