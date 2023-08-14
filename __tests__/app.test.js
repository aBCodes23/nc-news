const app = require("../db/app");
const request = require("supertest");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return connection.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api/topics", () => {
    test('200: responds with an array of the correct length', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body})=>{
            const {topics} = body
            expect(topics.length).toBe(3)
        })
    })
  test("200: responds with topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});
