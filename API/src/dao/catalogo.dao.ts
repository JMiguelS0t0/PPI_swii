import { IResult } from 'mssql';
import GetConnection from '../conexion/connection';
import { catalogo } from '../model/catalogo';

export const listarCatalogo = async (): Promise<catalogo[]> => {
  try {
    let sql = 'SELECT * FROM catalogo';
    const pool = await GetConnection();
    let rs = await pool.query<catalogo>(sql);
    if (rs != undefined) {
      return rs.recordset;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export const obtenerCatalogoPorId = async (id: number): Promise<catalogo> => {
  try {
    let sql = `SELECT * FROM catalogo WHERE id = ${id}`;
    const pool = await GetConnection();

    return new Promise<catalogo>((resolve, reject) => {
      pool.query<catalogo>(
        sql,
        (err?: Error, recordset?: IResult<catalogo>) => {
          if (err) {
            reject(err);
          } else {
            if (recordset && recordset.recordset.length > 0) {
              resolve(recordset.recordset[0]);
            } else {
              reject(new Error('Catálogo no encontrado')); // Lanza un error
            }
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export async function crearCatalogo(C: catalogo): Promise<boolean> {
  try {
    let sql = `INSERT INTO catalogo(nombre, descripcion, img, items) VALUES('${C.nombre}','${C.descripcion}', '${C.img}', '${C.items}')`;
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

export async function borrarCatalogo(C: number): Promise<boolean> {
  try {
    let sql = `DELETE FROM catalogo WHERE id = '${C}'`;
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

export async function actualizarCatalogo(
  Id: number,
  C: catalogo
): Promise<boolean> {
  try {
    let sql = `UPDATE catalogo  SET nombre = '${C.nombre}',descripcion = '${C.descripcion}',img = '${C.img}',items ='${C.items}' WHERE id = ${Id}`;
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
