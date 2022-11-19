import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import GeneralShema from './GeneralSchema';

export default class CarSchema extends GeneralShema<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  public async create(obj: ICar): Promise<ICar> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<ICar | null> {
    return this.model.findById(id);
  }
}