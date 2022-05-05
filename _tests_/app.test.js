const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const app = require('../app');
const request = require('supertest');

afterAll(() => {
	db.end();
});

beforeEach(() => seed(testData));

describe('GET api/parks', () => {
	test('status:200, responds with all parks', async () => {
		const res = await request(app).get('/api/parks').expect(200);
		expect(res.body).toBeInstanceOf(Object);
	});
});
