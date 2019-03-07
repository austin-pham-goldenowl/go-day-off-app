export const getIdFromToken = token => {
  if (!token) return null;
  return (token.userId && token.userId.fUserId) || null;
};

import {
  users as userModel,
  userPermission as permissionModel
} from "../models/";
export const getPermissionByUserId = userId =>
  new Promise(async (resolve, reject) => {
    try {
      if (!userId) throw new Error("");
      const users = await userModel.loadAll(["fTypeId"], {
        where: { fId: userId }
      });
      if (!users || users.length !== 1) throw new Error("");
      const { fTypeId } = users[0].get({ plain: true });

      const permissions = await permissionModel.loadAll(["fUserType"], {
        where: { fId: fTypeId }
      });
      if (!permissions || permissions.length !== 1) throw new Error("");

      resolve(permissions[0].get({ plain: true }).fUserType);
    } catch (err) {
      err.code = 401;
      err.msg = "NO_PERMISSION";
      reject(err);
    }
  });

export const getPermissionByToken = token =>
  getPermissionByUserId(getIdFromToken(token));
