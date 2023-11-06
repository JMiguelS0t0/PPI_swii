import { IResult } from 'mssql';
import GetConnection from '../conexion/connection';
import { servicios } from '../model/servicios';

export const listarServicio = async (): Promise<servicios[]> => {
  try {
    let sql = 'SELECT * FROM servicios';
    const pool = await GetConnection();
    let rs = await pool.query<servicios>(sql);
    if (rs != undefined) {
      return rs.recordset;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export const obtenerServicioPorId = async (id: number): Promise<servicios> => {
  try {
    let sql = `SELECT s.*, c.nombre AS nombre_paquete
    FROM servicios s
    INNER JOIN catalogo c ON s.paquete = c.id
    WHERE s.id = ${id}`;
    const pool = await GetConnection();

    return new Promise<servicios>((resolve, reject) => {
      pool.query<servicios>(
        sql,
        (err?: Error, recordset?: IResult<servicios>) => {
          if (err) {
            reject(err);
          } else {
            if (recordset && recordset.recordset.length > 0) {
              resolve(recordset.recordset[0]);
            } else {
              reject(new Error('Servicio no encontrado')); // Lanza un error
            }
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export async function crearServicio(S: servicios): Promise<boolean> {
  try {
    let sql = `INSERT INTO servicios(descripcion, paquete, personalizacion, img) VALUES('${S.descripcion}', '${S.paquete}','${S.personalizacion}','${S.img}')`;
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

export async function borrarServicio(S: number): Promise<boolean> {
  try {
    let sql = `DELETE FROM servicios WHERE id = '${S}'`;
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

export async function actualizarServicio(
  Id: number,
  S: servicios
): Promise<boolean> {
  try {
    let sql = `UPDATE servicios SET descripcion = '${S.descripcion}', paquete = '${S.paquete}',personalizacion = '${S.personalizacion}',img = '${S.img}' WHERE id = ${Id}`;
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
