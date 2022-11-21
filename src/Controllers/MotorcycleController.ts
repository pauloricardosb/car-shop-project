import { Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private service: MotorcycleService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new MotorcycleService();
  }

  public async createMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    const newMotorcycle = await this.service.createMotorcycle(motorcycle);
    return this.res.status(201).json(newMotorcycle);
  }

  public async findAllMotorcycles() {
    const motorcycles = await this.service.findAllMotorcycles();
    return this.res.status(200).json(motorcycles);
  }

  public async findById() {
    const { id } = this.req.params;
    const motorcycle = await this.service.findById(id);
    return this.res.status(200).json(motorcycle);
  }

  public async updateMotorcycle() {
    const { id } = this.req.params;

    const updatedMotorcycle = await this.service
      .updateMotorcycle(id, this.req.body);
    return this.res.status(200).json(updatedMotorcycle);
  }
}