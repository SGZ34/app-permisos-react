import { db } from "../database/db.js";

export const validatePermission = (permission) => async (req, res, next) => {
  const { idUser } = req;

  const [user] = await db.query(
    "SELECT users.id as idUser, users.name, roles.id as idRol, roles.nombre as rol FROM users INNER JOIN roles ON users.idRol = roles.id WHERE users.id = ?",
    [idUser]
  );

  if (user.length === 0) {
    return res.status(404).json({ errorMessage: "the user don't exist" });
  }

  let [permissions] = await db.query(
    "SELECT permissions.name as permiso FROM roles_permissions INNER JOIN permissions ON permissions.id = roles_permissions.id_permission WHERE roles_permissions.idRol = ?",
    [user[0].idRol]
  );

  permissions = permissions.map((p) => p.permiso);

  if (!permissions.includes(permission))
    return res
      .status(401)
      .json({ errorMessage: "You don't have authorization" });

  next();
};
