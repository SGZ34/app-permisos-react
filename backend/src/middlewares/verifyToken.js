import { request, response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const verifyToken = async (req = request, res = response, next) => {
  const token = req.cookies["x-access-token"];
  if (!token) {
    return res.sendStatus(204);
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  req.idUser = decoded.id;

  next();
};
