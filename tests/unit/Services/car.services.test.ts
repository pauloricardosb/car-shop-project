import Mongoose from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai';
import mocks from '../../../src/Helpers/CarMocks'; 
import CarServices from '../../../src/Services/CarService';
import ErrorMock from '../../../src/Helpers/ErrorMock';

describe('Testa a camada Services de Cars', function () {
  const carServices = new CarServices();

  describe('findAllCars', function () {
    afterEach(sinon.restore);

    it('Se retorna um documento vazio quando não há dados', async function () {
      sinon.stub(Mongoose.Model, 'find').resolves([]);
      const cars = await carServices.findAllCars();
      expect(cars).to.be.deep.equal([]);
    });

    it('Se retorna todos os documentos quando há dados', async function () {
      sinon.stub(Mongoose.Model, 'find').resolves(mocks.allCars);
      const cars = await carServices.findAllCars();
      expect(cars).to.be.deep.equal(mocks.allCars);
    });
  });

  describe('Find', function () {
    afterEach(sinon.restore);

    it('Se retorna um documento pelo ID', async function () {
      sinon.stub(Mongoose.Model, 'findById').resolves(mocks.carById);
      const carById = await carServices.findById(mocks.carById.id);
      expect(carById).to.be.deep.equal(mocks.carById);
    });

    it('Se retorna erro ao não encontrar nenhum documento', async function () {
      sinon.stub(Mongoose.Model, 'findById').resolves(null);

      try {
        await carServices.findById('6376daa4d88bd2bf7da9c931');
      } catch (error) {
        expect(error).to.be.an.instanceof(ErrorMock);
        expect((error as ErrorMock).status).to.be.equal(404);
        expect((error as ErrorMock).message).to.be.equal('Car not found');
      }
    });
  });

  describe('Create', function () {
    it('Se retorna um documento criado', async function () {
      sinon.stub(Mongoose.Model, 'create').resolves(mocks.carCreated);
      const newCar = await carServices.createCar(mocks.newCar);
      expect(newCar).to.be.deep.equal(mocks.carCreated);
    });
  });
});