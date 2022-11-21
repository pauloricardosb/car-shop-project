import Mongoose from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai';
import mocks from '../../../src/Helpers/MotorcycleMocks';
import MotorcycleServices from '../../../src/Services/MotorcycleService';
import ErrorMock from '../../../src/Helpers/ErrorMock';

describe('Testa a camada Services de Motorcycles', function () {
  const motorcycleServices = new MotorcycleServices();

  describe('findAllMotorcycles', function () {
    afterEach(sinon.restore);

    it('Se retorna um documento vazio quando não há dados', async function () {
      sinon.stub(Mongoose.Model, 'find').resolves([]);
      const motorcycles = await motorcycleServices.findAllMotorcycles();
      expect(motorcycles).to.be.deep.equal([]);
    });

    it('Se retorna todos os documentos quando há dados', async function () {
      sinon.stub(Mongoose.Model, 'find').resolves(mocks.allMotorcycles);
      const motorcycles = await motorcycleServices.findAllMotorcycles();
      expect(motorcycles).to.be.deep.equal(mocks.allMotorcycles);
    });
  });

  describe('Find', function () {
    afterEach(sinon.restore);

    it('Se retorna um documento pelo ID', async function () {
      sinon.stub(Mongoose.Model, 'findById').resolves(mocks.motorcycleById);
      const motorcycleById = await motorcycleServices.findById(mocks.motorcycleById.id);
      expect(motorcycleById).to.be.deep.equal(mocks.motorcycleById);
    });

    it('Se retorna erro ao não encontrar nenhum documento', async function () {
      sinon.stub(Mongoose.Model, 'findById').resolves(null);

      try {
        await motorcycleServices.findById('6376daa4d88bd2bf7da9c931');
      } catch (error) {
        expect(error).to.be.an.instanceof(ErrorMock);
        expect((error as ErrorMock).status).to.be.equal(404);
        expect((error as ErrorMock).message).to.be.equal('Motorcycle not found');
      }
    });
  });

  describe('Create', function () {
    it('Se retorna um documento criado', async function () {
      sinon.stub(Mongoose.Model, 'create').resolves(mocks.motorcycleCreated);
      const newMotorcycle = await motorcycleServices.createMotorcycle(mocks.newMotorcycle);
      expect(newMotorcycle).to.be.deep.equal(mocks.motorcycleCreated);
    });
  });

  describe('Update', function () {
    afterEach(sinon.restore);

    it('Se retorna um documento atualizado', async function () {
      sinon.stub(Mongoose.Model, 'findByIdAndUpdate').resolves(mocks.motorcycleUpdated);
      const updatedMotorcycle = await motorcycleServices
        .updateMotorcycle(mocks.motorcycleUpdated.id, mocks.motorcycleUpdated);
      expect(updatedMotorcycle).to.be.deep.equal(mocks.motorcycleUpdated);
    });

    it('Se retorna erro ao não encontrar nenhum documento', async function () {
      sinon.stub(Mongoose.Model, 'findByIdAndUpdate').resolves(null);

      try {
        await motorcycleServices
          .updateMotorcycle('6376daa4d88bd2bf7da9c931', mocks.motorcycleUpdated);
      } catch (error) {
        expect(error).to.be.an.instanceof(ErrorMock);
        expect((error as ErrorMock).status).to.be.equal(404);
        expect((error as ErrorMock).message).to.be.equal('Motorcycle not found');
      }
    });
  });
});
