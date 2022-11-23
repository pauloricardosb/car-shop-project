import Mongoose from 'mongoose';
import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mocks from '../../../src/Helpers/MotorcycleMocks';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('Testa se a rota de motos', function () {
  afterEach(sinon.restore);
  const { motorcycleCreated, newMotorcycle, allMotorcycles, motorcycleById } = mocks;
  const motorcycles = '/motorcycles';

  it('Cria uma moto', async function () {
    sinon.stub(Mongoose.Model, 'create').resolves(motorcycleCreated);

    const response = await chai.request(app).post(motorcycles).send(newMotorcycle);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(motorcycleCreated);
  });

  it('Retorna 422 se ID for inválido', async function () {
    const response = await chai.request(app).get('/motorcycles/123');

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('Retorna 404 se moto não for encontrada', async function () {
    sinon.stub(Mongoose.Model, 'findById').resolves(null);

    const response = await chai.request(app).get('/motorcycles/60e3b4f361b9730015bf60e1');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Motorcycle not found' });
  });

  it('Retorna uma moto pelo id', async function () {
    sinon.stub(Mongoose.Model, 'findById').resolves(motorcycleById);

    const response = await chai.request(app).get('/motorcycles/6376daa4d88bd2bf7da9c934');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(motorcycleById);
  });

  it('Retorna 404 se motos não forem encontradas', async function () {
    sinon.stub(Mongoose.Model, 'find').resolves([]);

    const response = await chai.request(app).get(motorcycles);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Motorcycle not found' });
  });

  it('Retorna todas as motos', async function () {
    sinon.stub(Mongoose.Model, 'find').resolves(allMotorcycles);

    const response = await chai.request(app).get(motorcycles);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allMotorcycles);
  });
});