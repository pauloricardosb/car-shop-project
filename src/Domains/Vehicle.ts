import IVehicle from '../Interfaces/IVehicle';

export default class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;

  constructor(vehicleObj: IVehicle) {
    this.id = vehicleObj.id;
    this.model = vehicleObj.model;
    this.year = vehicleObj.year;
    this.color = vehicleObj.color;
    this.status = vehicleObj.status || false;
    this.buyValue = vehicleObj.buyValue;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setModel(vModel: string) {
    this.model = vModel;
  }

  public getModel() {
    return this.model;
  }

  public setYear(vYear: number) {
    this.year = vYear;
  }

  public getYear() {
    return this.year;
  }

  public setColor(vColor: string) {
    this.color = vColor;
  }

  public getColor() {
    return this.color;
  }

  public setStatus(vStatus: boolean) {
    this.status = vStatus;
  }

  public getStatus() {
    return this.status || false;
  }

  public setBuyValue(vBuyValue: number) {
    this.buyValue = vBuyValue;
  }

  public getBuyValue() {
    return this.buyValue;
  }
}