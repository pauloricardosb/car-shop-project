import { Request, Response } from 'express';
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
    const cars = await this.service.findAllCars();

    return this.res.status(200).json(cars);
  }

  public async findById() {
    const { id } = this.req.params;

    const car = await this.service.findById(id);
    return this.res.status(200).json(car);
  }

  public async updateCar() {
    const { id } = this.req.params;

    const updatedCar = await this.service.updateCar(id, this.req.body);
    return this.res.status(200).json(updatedCar);
  }
}
