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

		expect(res.body.parks).toBeInstanceOf(Object);
		res.body.parks.forEach((park) => {
			expect(park).toMatchObject({
				park_id: expect.any(Number),
				town_id: expect.any(Number),
				park_name: expect.any(String),
				parks_lat: expect.any(String),
				parks_long: expect.any(String),
				amenities: expect.any(String),
			});
		});
	});
});

describe('ERROR HANDLING api/parks', () => {
	test('status:400, responds with bad request message when wrong api is passes ', async () => {
		const res = await request(app).get('/api/10').expect(404);
		expect(res.body.msg).toEqual('Path not found');
	});
});

describe('GET api/parks/:park_id', () => {
	test('status:200, responds with 1 park by park_id', async () => {
		const res = await request(app).get('/api/parks/1').expect(200);
		expect(res.body.parks).toBeInstanceOf(Object);
		expect(res.body.parks).toMatchObject({
			park_id: 1,
			town_id: 4,
			park_name: 'Roundhay Park',
			parks_lat: '53.83767',
			parks_long: '-1.495378',
			amenities: {"{
				"wildlife": true,
				"lake": true,
				"toilets": true,
				"food": true,
				"accessible": false,
			}"
		});
	});
});
