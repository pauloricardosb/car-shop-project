import { Request, Response, NextFunction } from 'express';
import Mongoose from 'mongoose';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleValidations {
  public service: MotorcycleService;

  constructor() {
    this.service = new MotorcycleService();
  }

  validateId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!Mongoose.isValidObjectId(id)) {
      return res.status(422).json({ message: 'Invalid mongo id' });
    }
    return next();
  };

  validateMotorcycle = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const motorcycle = await this.service.findById(id);

    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }
    return next();
  };

  validateAllMotorcycles = async (req: Request, res: Response, next: NextFunction) => {
    const motorcycles = await this.service.findAllMotorcycles();

    if (motorcycles.length === 0) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }
    return next();
  };
}

export default new MotorcycleValidations();