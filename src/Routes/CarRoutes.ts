import { Router } from 'express';
import CarController from '../Controllers/CarController';

const car = Router();

car.post('/', (req, res) =>
  new CarController(req, res).create());

export default car;