import { IResult } from 'mssql';
import GetConnection from '../conexion/connection';
import { contacto } from '../model/contacto';

export const obtenerContacto = async (): Promise<contacto[]> => {
  try {
    let sql = 'SELECT * FROM contacto';
    const pool = await GetConnection();
    let rs = await pool.query<contacto>(sql);
    if (rs != undefined) {
      return rs.recordset;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export const obtenerContactoPorId = async (id: number): Promise<contacto> => {
  try {
    let sql = `SELECT * FROM contacto WHERE id = ${id}`;
    const pool = await GetConnection();

    return new Promise<contacto>((resolve, reject) => {
      pool.query<contacto>(
        sql,
        (err?: Error, recordset?: IResult<contacto>) => {
          if (err) {
            reject(err);
          } else {
            if (recordset && recordset.recordset.length > 0) {
              resolve(recordset.recordset[0]);
            } else {
              reject(new Error('Contacto no encontrado')); // Lanza un error
            }
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export async function crearContacto(C: contacto): Promise<boolean> {
  try {
    let sql = `INSERT INTO contacto(nombre, telefono, correo, mensaje) VALUES('${C.nombre}','${C.telefono}', '${C.correo}', '${C.mensaje}')`;
    const pool = await GetConnection();
    let rs = await pool.query(sql);
    if (rs != undefined) {
      return rs.rowsAffected.length == 1;
    }
    return false;
  } catch (error) {
    throw error;
  }
}

export async function borrarContacto(C: number): Promise<boolean> {
  try {
    let sql = `DELETE FROM contacto WHERE id = '${C}'`;
    const pool = await GetConnection();
    let rs = await pool.query(sql);
    if (rs != undefined) {
      return rs.rowsAffected.length == 1;
    }
    return false;
  } catch (error) {
    throw error;
  }
}
