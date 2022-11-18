import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarSchema from '../Models/CarSchema';

export default class CarService {
  private createCarDomain(car: ICar | null) {
    if (car) {
      return new Car(car);
    }

    return null;
  }

  public async create(car: ICar) {
    const carSchema = new CarSchema();
    const newCar = await carSchema.create(car);
    return this.createCarDomain(newCar);
  }
}