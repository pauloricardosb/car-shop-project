import { Request, Response, NextFunction } from 'express';
import Mongoose from 'mongoose';
import CarService from '../Services/CarService';

class CarValidations {
  public service: CarService;

  constructor() {
    this.service = new CarService();
  }

  validateId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!Mongoose.isValidObjectId(id)) {
      return res.status(422).json({ message: 'Invalid mongo id' });
    }
    return next();
  };

  validateCar = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const car = await this.service.findById(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    return next();
  };

  validateAllCars = async (req: Request, res: Response, next: NextFunction) => {
    const cars = await this.service.findAllCars();

    if (cars.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    return next();
  };
}

export default new CarValidations();