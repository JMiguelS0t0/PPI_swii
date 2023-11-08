import express from 'express';
import * as ContactoController from '../controllers/contacto.controller';
import { contacto } from '../model/contacto';

const router = express.Router();

router.get('/contacto', (_, res) => {
  ContactoController.getContacto()
    .then((obj) => {
      res.json(obj);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.get('/contacto/:id', (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  ContactoController.getContactoById(id)
    .then((contacto) => {
      if (contacto) {
        res.json(contacto);
      } else {
        res.status(404).json({ message: 'Contacto no encontrado' });
      }
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.post('/contacto', (req: express.Request, res: express.Response) => {
  ContactoController.postContacto(req.body as contacto)
    .then((f) => {
      if (f) res.status(201).json({ message: 'Inserted' });
      else res.status(500).send();
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.delete(
  '/contacto/:Id',
  (req: express.Request, res: express.Response) => {
    const Id = parseInt(req.params.Id);
    ContactoController.DeleteContacto(Id)
      .then((f) => {
        if (f) res.status(201).json({ message: 'Deleted' });
        else res.status(500).send();
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
);

export default router;
