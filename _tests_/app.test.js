const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const app = require("../app");
const request = require("supertest");

afterAll(() => {
  db.end();
});

beforeEach(() => seed(testData));

describe("GET api/parks", () => {
  test("status:200, responds with all parks", async () => {
    const res = await request(app).get("/api/parks").expect(200);

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

describe("ERROR HANDLING api/parks", () => {
  test("status:400, responds with bad request message when wrong api is passes ", async () => {
    const res = await request(app).get("/api/10").expect(404);
    expect(res.body.msg).toEqual("Path not found");
  });
});

describe("GET api/parks/:park_id", () => {
  test("status:200, responds with 1 park by park_id", async () => {
    const res = await request(app).get("/api/parks/2").expect(200);
    expect(res.body.parks).toBeInstanceOf(Object);
    expect(res.body.parks).toEqual({
      park_id: 2,
      town_id: 2,
      park_name: "Rothwell Park",
      parks_lat: "53.76074",
      parks_long: "1.472666",
      amenities:
        '{"food": true, "lake": true, "toilets": true, "wildlife": true, "accessible": true}',
    });
  });
});

describe("ERROR HANDLING api/parks/:park_id", () => {
  test("status:400, responds with bad request message when wrong api is passed", async () => {
    const res = await request(app).get("/api/parks/VillaPark").expect(400);
    expect(res.body.msg).toEqual("Bad request");
  });
});

describe("GET api/parks/:park_id/maps", () => {
  test("status:200, responds with maps park_id", async () => {
    const res = await request(app).get(`/api/maps/1/maps`).expect(200);
    expect(res.body.parks).toBeInstanceOf(Object);
  });
});
