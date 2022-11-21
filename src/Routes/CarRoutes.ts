import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarValidations from '../Middlewares/CarValidations';

const car = Router();

car.post('/', (req, res) =>
  new CarController(req, res).createCar());

car.get(
  '/', 
  CarValidations.validateAllCars,
  (req, res) => 
    new CarController(req, res).findAllCars(),
);

car.get(
  '/:id', 
  CarValidations.validateId,
  CarValidations.validateCar,
  (req, res) =>
    new CarController(req, res).findById(),
);

car.put(
  '/:id', 
  CarValidations.validateId,
  CarValidations.validateCar,
  (req, res) =>
    new CarController(req, res).updateCar(),
);

export default car;