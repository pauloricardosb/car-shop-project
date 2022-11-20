import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
  }

  public async createCar() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    const newCar = await this.service.createCar(car);
    return this.res.status(201).json(newCar);
  }

  public async findAllCars() {
    try {
      const cars = await this.service.findAllCars();

      if (cars.length === 0) {
        return this.res.status(404).json({ message: 'Car not found' });
      }

      return this.res.status(200).json(cars);
    } catch (err) {
      return this.res.status(500).json({ message: 'Internal Error' });
    }
  }

  public async findById() {
    const { id } = this.req.params;

    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }

      const car = await this.service.findById(id);

      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }

      return this.res.status(200).json(car);
    } catch {
      return this.res.status(500).json({ message: 'Internal Error' });
    }
  }

  public async updateCar() {
    const { id } = this.req.params;

    const updatedCar = await this.service.updateCar(id, this.req.body);
    return this.res.status(200).json(updatedCar);
  }
}
