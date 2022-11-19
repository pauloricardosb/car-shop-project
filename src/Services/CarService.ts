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

  public async createCar(car: ICar) {
    const carSchema = new CarSchema();
    const newCar = await carSchema.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAllCars() {
    const carSchema = new CarSchema();
    const cars = await carSchema.find();
    return cars.map((car: ICar) => this.createCarDomain(car));
  }

  public async findById(id: string) {
    const carSchema = new CarSchema();
    const car = await carSchema.findById(id);
    return this.createCarDomain(car);
  }
}