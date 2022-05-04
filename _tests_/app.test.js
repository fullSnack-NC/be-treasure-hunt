const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const app = require('../app');
const request = require('supertest');

afterAll(() => {
	db.end();
});

beforeEach(() => seed(testData));

describe('GET /api/:town_id/parks');
test('200 blah blah blah ', () => {
	console.log('testing');
});

describe('ERROR HANDLING /api/:town_id/parks');
test('404 blah blah blah ', () => {
	console.log('testing');
});
