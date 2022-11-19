import { Router } from 'express';
import CarController from '../Controllers/CarController';

const car = Router();

car.post('/', (req, res) =>
  new CarController(req, res).create());

car.get('/', (req, res) => 
  new CarController(req, res).index());

car.get('/:id', (req, res) =>
  new CarController(req, res).show());
  
export default car;