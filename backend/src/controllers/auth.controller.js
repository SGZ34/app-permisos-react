import { response } from "express";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { db } from "../database/db.js";
import { JWT_SECRET } from "../config.js";

export const register = async (req, res = response) => {
  const { name, email, password } = req.body;

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

    const user = await db.query("INSERT INTO users SET ?", {
      name,
      email,
      password: hashPassword,
      idRol: 8,
    });

    const [permissions] = await db.query(
      "SELECT permissions.name as permiso FROM roles_permissions INNER JOIN permissions ON permissions.id = roles_permissions.id_permission WHERE roles_permissions.idRol = 8"
    );

    const token = jwt.sign(
      {
        id: user[0].insertId,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res
      .status(200)
      .cookie("x-access-token", token, {
        sameSite: "lax",
        secure: false,
        httpOnly: true,
      })
      .json({ user: { name, permisos: permissions.map((p) => p.permiso) } });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query(
      "SELECT users.id as idUser, users.name, users.password, roles.id as idRol, roles.nombre as rol FROM users INNER JOIN roles ON users.idRol = roles.id WHERE users.email = ?",
      [email]
    );

    if (user.length === 0) {
      return res
        .status(400)
        .json({ errorMessage: "The credentials are not correct" });
    }

    const validPassword = await compare(password, user[0].password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ errorMessage: "The credentials are not correct" });
    }

    const [permissions] = await db.query(
      "SELECT permissions.name as permiso FROM roles_permissions INNER JOIN permissions ON permissions.id = roles_permissions.id_permission WHERE roles_permissions.idRol = ?",
      [user[0].idRol]
    );

    user[0].permisos = permissions.map((p) => p.permiso);

    const token = jwt.sign(
      {
        id: user[0].idUser,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res
      .status(200)
      .cookie("x-access-token", token, {
        sameSite: "lax",
        secure: false,
        httpOnly: true,
      })
      .json({ user: { name: user[0].name, permisos: user[0].permisos } });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const revalidateToken = async (req, res = response) => {
  const { idUser } = req;

  const [user] = await db.query(
    "SELECT users.id as idUser, users.name, roles.id as idRol, roles.nombre as rol FROM users INNER JOIN roles ON users.idRol = roles.id WHERE users.id = ?",
    [idUser]
  );

  if (user.length === 0) {
    return res.status(404).json({ errorMessage: "the user don't exist" });
  }

  const [permissions] = await db.query(
    "SELECT permissions.name as permiso FROM roles_permissions INNER JOIN permissions ON permissions.id = roles_permissions.id_permission WHERE roles_permissions.idRol = ?",
    [user[0].idRol]
  );

  user[0].permisos = permissions.map((p) => p.permiso);
  const token = jwt.sign(
    {
      id: user[0].idUser,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return res
    .status(200)
    .cookie("x-access-token", token, {
      sameSite: "lax",
      secure: false,
      httpOnly: true,
    })
    .json({ user: { name: user[0].name, permisos: user[0].permisos } });
};

export const logout = (req, res = response) => {
  res.clearCookie("x-access-token");
  return res.sendStatus(200);
};
