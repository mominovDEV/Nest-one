import { AppModule } from '../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('User (e23', () => {
  let app: INestApplication;
  let token: String;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'badmin@mail.uz',
        password: '12345M@qwe',
      });
    token = response.body.token;
    console.log(token);
  });
  it('/users(GET)-->200 OK', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/users(GET)-->401 "Unauthorized"error', () => {
    return (
      request(app.getHttpServer())
        .get('/users')
        // .set('Authorization', `Bear${token}`)
        .expect('Content-Type', /json/)
        .expect(401)
    );
  });

  //   it('/auth/registration (POST) --> 201 ', async () => {
  //     return request(app.getHttpServer())
  //       .post('/auth/registration')
  //       .send({
  //         name: 'qwerbekk',
  //         email: 'bbaadmin@mail.uz',
  //         password: '1122345M@qwe',
  //       })
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toMatchObject({
  //           token: expect.any(String),
  //         });
  //       });
  //   });

  it('/auth/registration (POST) --> 400 ', async () => {
    return request(app.getHttpServer())
      .post('/auth/registration')
      .send({
        name: 'qwerbekk',
        email: 'bbaadmin@mail.uz',
        password: '1122345M@qwe',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bunday foydalanuvchi mavjud',
      });
  });

  //   it('/auth/registration (POST) --> 400 on Validation error ', () => {
  //     return request(app.getHttpServer())
  //       .post('/users')
  //       .send({
  //         name: '23df',
  //         password: '112',
  //         email: 'sddghjf@mail.uz',
  //       })
  //       .expect('Content-Type', /json/)
  //       .expect(400)
  //       .expect({
  //         statusCode: 400,
  //         message: ['password is not strong enough'],
  //         error: 'Bad Request',
  //       });
  //   });
  it('/users/activate (POST) --> 404 ', async () => {
    return request(app.getHttpServer())
      .post('/users/activate')
      .send({
        userId: 2342,
      })
      .expect('Content-Type', /json/)
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'foydalanuvchi topilmadi',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
