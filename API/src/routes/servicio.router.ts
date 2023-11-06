import express from 'express';
import * as ServicioController from '../controllers/servicio.controller';
import { servicios } from '../model/servicios';

const router = express.Router();

router.get('/servicios', (_, res) => {
  ServicioController.getServicios()
    .then((obj) => {
      res.json(obj);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.get('/servicios/:id', (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  ServicioController.getServicioById(id)
    .then((servicios) => {
      if (servicios) {
        res.json(servicios);
      } else {
        res.status(404).send('Servicio no encontrado');
      }
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.post('/servicios', (req: express.Request, res: express.Response) => {
  ServicioController.PostServicio(req.body as servicios)
    .then((f) => {
      if (f) res.status(201).json({ message: 'Inserted' });
      else res.status(500).send();
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.delete(
  '/servicios/:Id',
  (req: express.Request, res: express.Response) => {
    const Id = parseInt(req.params.Id);
    ServicioController.DeleteServicio(Id)
      .then((f) => {
        if (f) res.status(201).json({ message: 'Deleted' });
        else res.status(500).send();
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
);

router.put('/servicios/:Id', (req: express.Request, res: express.Response) => {
  const Id = parseInt(req.params.Id);
  const updatedServicio = req.body as servicios;
  ServicioController.UpdateServicio(Id, updatedServicio)
    .then((updated) => {
      if (updated) {
        res.status(201).json({ message: 'Updated' });
      } else {
        res.status(500).send();
      }
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

export default router;
