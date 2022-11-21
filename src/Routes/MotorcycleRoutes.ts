import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import MotorcycleValidations from '../Middlewares/MotorcycleValidations';

const motorcycle = Router();

motorcycle.post('/', (req, res) =>
  new MotorcycleController(req, res).createMotorcycle());

motorcycle.get(
  '/', 
  MotorcycleValidations.validateAllMotorcycles,
  (req, res) =>
    new MotorcycleController(req, res).findAllMotorcycles(),
);

motorcycle.get(
  '/:id', 
  MotorcycleValidations.validateId,
  MotorcycleValidations.validateMotorcycle,
  (req, res) =>
    new MotorcycleController(req, res).findById(),
);

motorcycle.put(
  '/:id',
  MotorcycleValidations.validateId,
  MotorcycleValidations.validateMotorcycle,
  (req, res) =>
    new MotorcycleController(req, res).updateMotorcycle(),
);
  
export default motorcycle;