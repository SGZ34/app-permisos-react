import { response } from "express";
import { compare, hash } from "bcrypt";
import { db } from "../database/db.js";
export const profile = async (req, res = response) => {
  const { idUser } = req;

  try {
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [idUser]);
    if (user.length === 0)
      return res.status(404).json({ errorMessage: "The user don't exist" });
    return res.json(user[0]);
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const updateProfile = async (req, res = response) => {
  const { idUser } = req;

  const { name, email } = req.body;

  try {
    await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      idUser,
    ]);
    return res.status(200).json({ user: name });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const updatePassword = async (req, res = response) => {
  const { idUser } = req;

  const { password, newPassword } = req.body;

  try {
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [idUser]);

    if (user.length === 0)
      return res.status(404).json({ errorMessage: "The user don't exist" });

    if (await !compare(password, user[0].password))
      return res
        .status(400)
        .json({ errorMessage: "the password is not correct" });

    const hashPassword = await hash(newPassword, 10);

    await db.query("UPDATE users SET password = ?", [hashPassword]);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};
