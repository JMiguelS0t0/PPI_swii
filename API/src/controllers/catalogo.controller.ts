import { catalogo } from '../model/catalogo';
import * as DaoCatalogo from '../dao/catalogo.dao';

export const getCatalogo = async (): Promise<catalogo[]> => {
  try {
    let c: catalogo[] = await DaoCatalogo.listarCatalogo();
    return c;
  } catch (error) {
    throw error;
  }
};

export const getCatalogoById = async (id: number): Promise<catalogo> => {
  try {
    const catalogo = await DaoCatalogo.obtenerCatalogoPorId(id);
    return catalogo;
  } catch (error) {
    throw error;
  }
};

export const postCatalogo = async (C: catalogo): Promise<boolean> => {
  try {
    return DaoCatalogo.crearCatalogo(C);
  } catch (error) {
    throw error;
  }
};

export const DeleteCatalogo = async (Id: number): Promise<boolean> => {
  try {
    return DaoCatalogo.borrarCatalogo(Id);
  } catch (error) {
    throw error;
  }
};

export const UpdateCatalogo = async (
  Id: number,
  C: catalogo
): Promise<boolean> => {
  try {
    return DaoCatalogo.actualizarCatalogo(Id, C);
  } catch (error) {
    throw error;
  }
};
