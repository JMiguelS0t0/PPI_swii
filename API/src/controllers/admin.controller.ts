import { Admin } from '../model/admin';
import * as DaoAdmin from '../dao/admin.dao';

export const getAdmins = async (): Promise<Admin[]> => {
  try {
    let a: Admin[] = await DaoAdmin.getAdmin();
    return a;
  } catch (error) {
    throw error;
  }
};

export const getAdmin = async (
  correo: string,
  contrasena: string
): Promise<Admin[]> => {
  try {
    let a: Admin[] = await DaoAdmin.EncontrarAdmin(correo, contrasena);
    return a;
  } catch (error) {
    throw error;
  }
};
