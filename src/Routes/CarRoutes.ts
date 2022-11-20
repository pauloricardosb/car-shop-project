import { Router } from 'express';
import CarController from '../Controllers/CarController';

const car = Router();

car.post('/', (req, res) =>
  new CarController(req, res).createCar());

car.get('/', (req, res) => 
  new CarController(req, res).findAllCars());

car.get('/:id', (req, res) =>
  new CarController(req, res).findById());

car.put('/:id', (req, res) =>
  new CarController(req, res).updateCar());

export default car;