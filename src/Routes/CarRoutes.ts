import { Router } from 'express';
import { CarController } from '../Controllers/CarController';

const car = Router();

car.post('/', CarController.create());

export default car;