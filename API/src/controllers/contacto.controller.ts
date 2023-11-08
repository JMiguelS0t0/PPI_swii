import { contacto } from '../model/contacto';
import * as DaoContacto from '../dao/contacto.dao';

export const getContacto = async (): Promise<contacto[]> => {
  try {
    let c: contacto[] = await DaoContacto.obtenerContacto();
    return c;
  } catch (error) {
    throw error;
  }
};

export const getContactoById = async (id: number): Promise<contacto> => {
  try {
    const contacto = await DaoContacto.obtenerContactoPorId(id);
    return contacto;
  } catch (error) {
    throw error;
  }
};

export const postContacto = async (C: contacto): Promise<boolean> => {
  try {
    return DaoContacto.crearContacto(C);
  } catch (error) {
    throw error;
  }
};

export const DeleteContacto = async (Id: number): Promise<boolean> => {
  try {
    return DaoContacto.borrarContacto(Id);
  } catch (error) {
    throw error;
  }
};
