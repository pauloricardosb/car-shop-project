import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleSchema from '../Models/MotorcycleSchema';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null) {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }

    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleSchema = new MotorcycleSchema();
    const newMotorcycle = await motorcycleSchema.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAllMotorcycles() {
    const motorcycleSchema = new MotorcycleSchema();
    const motorcycles = await motorcycleSchema.find();
    return motorcycles.map((motorcycle: IMotorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async findById(id: string) {
    const motorcycleSchema = new MotorcycleSchema();
    const motorcycle = await motorcycleSchema.findById(id);
    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateMotorcycle(id: string, motorcycle: IMotorcycle) {
    const motorcycleSchema = new MotorcycleSchema();
    const updatedMotorcycle = await motorcycleSchema.findByIdAndUpdate(id, motorcycle);
    return this.createMotorcycleDomain(updatedMotorcycle);
  }
}