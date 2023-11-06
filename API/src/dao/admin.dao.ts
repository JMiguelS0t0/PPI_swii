import GetConnection from '../conexion/connection';
import { Admin } from '../model/admin';

export const getAdmin = async (): Promise<Admin[]> => {
  try {
    let query = 'SELECT * FROM admin';
    const status = await GetConnection();
    let response = await status.query<Admin>(query);
    if (response != undefined) {
      return response.recordset;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export async function EncontrarAdmin(
  correo: string,
  contrasena: string
): Promise<Admin[]> {
  try {
    let query = `SELECT * FROM admin WHERE correo = '${correo}' AND contrasena = '${contrasena}'`;
    const status = await GetConnection();
    let response = await status.query(query);
    if (response != undefined) {
      return response.recordset;
    }
    return [];
  } catch (error) {
    throw error;
  }
}
