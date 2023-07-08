import { Request, Response } from "express";
import { UserModel as User } from "../models/user";
import { comparePassword, hashPassword } from "../helpers/bcrypt";

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

    const userFoundInDB = await User.findOne({ email });
    if (userFoundInDB) {
      return res.json({ error: "email is already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(newUser);
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userFoundInDB = await User.findOne({ email });
    const userWasNotFoundInDB = !userFoundInDB;
    if (userWasNotFoundInDB) {
      return res.json({ error: "user doesn't exist" });
    }

    const hashedPassword = userFoundInDB.password as string;
    const passwordsMatch = await comparePassword(password, hashedPassword);
    if (passwordsMatch) {
      return res.json({ message: "password correct" });
    } else {
      return res.json({ error: "incorrect password" });
    }
  } catch (error) {
    console.error(error);
  }
};
