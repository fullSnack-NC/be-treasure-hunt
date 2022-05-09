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
    const res = await request(app).get('/api/parks/2').expect(200);
    expect(res.body.parks).toBeInstanceOf(Object);
    expect(res.body.parks).toEqual({
      park_id: 2,
      town_id: 2,
      park_name: 'Rothwell Park',
      parks_lat: '53.76074',
      parks_long: '1.472666',
      amenities:
        '{"food": true, "lake": true, "toilets": true, "wildlife": true, "accessible": true}',
    });
  });
});

describe('ERROR HANDLING api/parks/:park_id', () => {
  test('status:400, responds with bad request message when wrong api is passed', async () => {
    const res = await request(app).get('/api/parks/VillaPark').expect(400);
    expect(res.body.msg).toEqual('Bad request');
  });
});

describe('GET api/maps/:park_id', () => {
  test('status:200, responds with maps park_id', async () => {
    const res = await request(app).get(`/api/maps/1`).expect(200);
    expect(res.body.maps).toBeInstanceOf(Object);
    res.body.maps.forEach((map) => {
      expect(map).toMatchObject({
        map_id: expect.any(Number),
        park_id: expect.any(Number),
        map_name: expect.any(String),
        length: expect.any(String),
        est_comp_time: expect.any(Number),
        age_min: expect.any(Number),
      });
    });
  });
});

describe('ERROR HANDLING api/maps/:park_id', () => {
  test('status:400, responds with bad request message when wrong api is passed', async () => {
    const res = await request(app).get('/api/maps/notnumber').expect(400);
    expect(res.body.msg).toEqual('Bad request');
  });
  test('status:404, responds with not found message for correct format but map not found', async () => {
    const res = await request(app).get('/api/maps/1000').expect(404);
    expect(res.body.msg).toEqual('Park not found');
  });
});

describe('PATCH api/user_activity/:user_id', () => {
  test('status:200, responds with updated object for useractivity', async () => {
    const updatedUA = {
      user_id: 1,
      badges: { 1: 'Rothwell Park', 2: 'Roundhay' },
      maps_attempted: 2,
      maps_completed: 2,
    };

    const res = await request(app)
      .patch(`/api/user_activity/1`)
      .send(updatedUA)
      .expect(200);
    expect(res.body.user).toBeInstanceOf(Array);
    expect(res.body.user).toEqual([
      {
        activity_id: 1,
        user_id: 1,
        badges: '{"1":"Rothwell Park","2":"Roundhay"}',
        maps_attempted: 2,
        maps_completed: 2,
      },
    ]);
  });
});

describe('ERROR HANDLING-PATCH /api/user_activity/:user_id', () => {
  test('422: Responds with Unprocessable Entity message for invalid update', async () => {
    const updatedUA = {
      user_id: 1,
      badges: { 1: 'Rothwell Park', 2: 'Roundhay' },
      maps_attempted: 'two',
      maps_completed: 'two',
    };
    const res = await request(app)
      .patch('/api/user_activity/1')
      .send(updatedUA)
      .expect(422);
    expect(res.body).toMatchObject({
      msg: 'Unprocessable Entity- Please provide correct format',
    });
  });
  test('404: Responds with message for valid but not recognised user ID', async () => {
    const updatedUA = {
      user_id: 1,
      badges: { 1: 'Rothwell Park', 2: 'Roundhay' },
      maps_attempted: 2,
      maps_completed: 2,
    };

    const res = await request(app)
      .patch('/api/user_activity/1000')
      .send(updatedUA)
      .expect(404)
      .then((res) => {
        expect(res.body).toMatchObject({ msg: 'User not found' });
      });
  });
  test('400: Responds with bad request message for invalid format', async () => {
    const updatedUA = {
      user_id: 1,
      badges: { 1: 'Rothwell Park', 2: 'Roundhay' },
      maps_attempted: 2,
      maps_completed: 2,
    };
    const res = await request(app)
      .patch('/api/user_activity/two')
      .send(updatedUA)
      .expect(400)
      .then((res) => {
        expect(res.body).toMatchObject({ msg: 'Bad request' });
      });
  });
});

describe('GET api/waypoints/:map_id', () => {
  test('status:200, responds with way points for map_id', async () => {
    const res = await request(app).get(`/api/waypoints/1`).expect(200);
    expect(res.body.waypoint).toBeInstanceOf(Object);
    res.body.waypoint.forEach((map) => {
      expect(map).toMatchObject({
        waypoint_id: expect.any(Number),
        map_id: 1,
        waypoint_lat: expect.any(String),
        waypoint_long: expect.any(String),
        waypoint_timestamp: expect.any(String),
        waypoint_ele: expect.any(String),
        image: expect.any(String),
      });
    });
  });
});

describe('Error Handling for waypoints', () => {
  test('Returns 400 for bad request', async () => {
    const res = await request(app).get(`/api/waypoints/villa-park`).expect(400);
    expect(res.body.msg).toEqual('Bad request');
  });
  test('Returns 404 for query param that does not exist', async () => {
    const res = await request(app).get(`/api/waypoints/1111`).expect(404);
    expect(res.body.msg).toEqual('Park not found');
  });
  test('Returns 404 for bad path', async () => {
    const res = await request(app).get(`/api/waypoints/`).expect(404);
    expect(res.body.msg).toEqual('Path not found');
  });
});
