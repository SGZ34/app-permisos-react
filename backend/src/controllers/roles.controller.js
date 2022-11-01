import { request, response } from "express";
import { db } from "../database/db.js";
export const getRoles = async (req = request, res = response) => {
  try {
    const [roles] = await db.query("SELECT * FROM roles");
    if (roles.length === 0)
      return res.status(400).json({ errorMessage: "don't exist roles in db" });

    return res.json(roles);
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const create = async (req = request, res = response) => {
  const { name, permissions } = req.body;

  try {
    const [roles] = await db.query("SELECT * FROM roles WHERE nombre = ?", [
      name,
    ]);

    if (roles.length > 0)
      return res.status(400).json({ errorMessage: "The rol already exists" });

    const rol = await db.query("INSERT INTO roles SET ?", { nombre: name });

    permissions.forEach(async (p) => {
      await db.query("INSERT INTO roles_permissions SET ?", {
        idRol: rol[0].insertId,
        id_permission: parseInt(p),
      });
    });

    return res.status(200).json({ id: rol[0].insertId });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const getPermissions = async (req, res) => {
  try {
    const [permissions] = await db.query("SELECT * FROM permissions");
    if (permissions.length === 0)
      return res
        .status(400)
        .json({ errorMessage: "don't exist permissions in db" });

    return res.json(permissions);
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

const numero = "2";
