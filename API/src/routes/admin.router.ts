import express from 'express';
import * as adminController from '../controllers/admin.controller';
import { Admin } from '../model/admin';

const router = express.Router();

router.get('/admin', (_, res) => {
  adminController
    .getAdmins()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.get(
  '/admin/:correo/:contrasena',
  (req: express.Request, res: express.Response) => {
    adminController
      .getAdmin(req.params.correo, req.params.contrasena)
      .then((newdata) => {
        res.json(newdata);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
);

export default router;
