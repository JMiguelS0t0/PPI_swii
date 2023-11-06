import * as DaoServicio from '../dao/servicio.dao';
import { servicios } from '../model/servicios';

export const getServicios = async (): Promise<servicios[]> => {
  try {
    let s: servicios[] = await DaoServicio.listarServicio();
    return s;
  } catch (error) {
    throw error;
  }
};

export const getServicioById = async (id: number): Promise<servicios> => {
  try {
    const servicio = await DaoServicio.obtenerServicioPorId(id);
    return servicio;
  } catch (error) {
    throw error;
  }
};

export const PostServicio = async (S: servicios): Promise<boolean> => {
  try {
    return DaoServicio.crearServicio(S);
  } catch (error) {
    throw error;
  }
};

export const DeleteServicio = async (Id: number): Promise<boolean> => {
  try {
    return DaoServicio.borrarServicio(Id);
  } catch (error) {
    throw error;
  }
};

export const UpdateServicio = async (
  Id: number,
  S: servicios
): Promise<boolean> => {
  try {
    return DaoServicio.actualizarServicio(Id, S);
  } catch (error) {
    throw error;
  }
};
