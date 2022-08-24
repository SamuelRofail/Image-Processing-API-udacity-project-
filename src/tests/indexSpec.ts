import app from '../index';
import fileHandler from '../util/fileHandler';
import supertest from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test the responses from the endpoint', (): void => {
  describe('endpoint: /', (): void => {
    it('should redirect to /api', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(302);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('gets /api/images?filename=fjord (valid parameters)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=250&height=250 (valid parameters)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord&width=250&height=250'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=-250&height=250 (invalid parameters)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord&width=-250&height=250'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images (no parameters)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /boo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/boo');

      expect(response.status).toBe(404);
    });
  });
});

// Erase test files.
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    fileHandler.imagesThumbsPath,
    'fjord-250x250.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // do nothing
  }
});
