import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import GeneralShema from './GeneralSchema';

export default class MotorcycleSchema extends GeneralShema<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle');
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<IMotorcycle[]> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<IMotorcycle | null> {
    return this.model.findById(id);
  }

  public async findByIdAndUpdate(id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    return this.model.findByIdAndUpdate(id, obj as IMotorcycle, { new: true });
  }
}
