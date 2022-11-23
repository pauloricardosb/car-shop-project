import Mongoose from 'mongoose';
import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mocks from '../../../src/Helpers/CarMocks';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('Testa se a rota de carros', function () {
  afterEach(sinon.restore);
  const { carCreated, newCar, allCars, carById } = mocks;

  it('Cria um carro', async function () {
    sinon.stub(Mongoose.Model, 'create').resolves(carCreated);

    const response = await chai.request(app).post('/cars').send(newCar);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(carCreated);
  });

  it('Retorna 422 se ID for inválido', async function () {
    const response = await chai.request(app).get('/cars/123');

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('Retorna 404 se carro não for encontrado', async function () {
    sinon.stub(Mongoose.Model, 'findById').resolves(null);

    const response = await chai.request(app).get('/cars/60e3b4f361b9730015bf60e1');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Car not found' });
  });

  it('Retorna um carro pelo id', async function () {
    sinon.stub(Mongoose.Model, 'findById').resolves(carById);

    const response = await chai.request(app).get('/cars/6376daa4d88bd2bf7da9c934');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(carById);
  });

  it('Retorna 404 se carros não forem encontrados', async function () {
    sinon.stub(Mongoose.Model, 'find').resolves([]);

    const response = await chai.request(app).get('/cars');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Car not found' });
  });

  it('Retorna todos os carros', async function () {
    sinon.stub(Mongoose.Model, 'find').resolves(allCars);

    const response = await chai.request(app).get('/cars');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allCars);
  });
});