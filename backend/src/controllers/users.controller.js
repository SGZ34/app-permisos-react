import { response } from "express";
import { db } from "../database/db.js";
import { hash } from "bcrypt";

export const get = async (req, res) => {
  const { idUser } = req;
  const [users] = await db.query(
    "SELECT users.id, users.name,users.email,roles.nombre as rol FROM users INNER JOIN roles ON users.idRol = roles.id WHERE users.id <> ?",
    [idUser]
  );
  return res.json(users);
};

export const create = async (req, res = response) => {
  const { name, email, password, rol } = req.body;

  try {
    const [userValidate] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (userValidate.length > 0) {
      return res
        .status(400)
        .json({ errorMessage: "User already exists with that email" });
    }
    const hashPassword = await hash(password, 10);

    await db.query("INSERT INTO users SET ?", {
      name,
      email,
      password: hashPassword,
      idRol: rol,
    });

    const [rolName] = await db.query("SELECT nombre FROM roles WHERE id = ?", [
      rol,
    ]);

    return res.status(200).json({ rolUser: rolName[0].nombre });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};
