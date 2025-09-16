import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/profile (GET) should return 401 without token', () => {
    return request(app.getHttpServer()).get('/auth/profile').expect(401);
  });

  it('/managers/:cognitoId (GET) should return 401 without token', () => {
    return request(app.getHttpServer()).get('/managers/test-id').expect(401);
  });

  it('/tenants/:cognitoId (GET) should return 401 without token', () => {
    return request(app.getHttpServer()).get('/tenants/test-id').expect(401);
  });
});
