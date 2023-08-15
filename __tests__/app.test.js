const app = require("../db/app");
const request = require("supertest");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index");
const localEndPointsJSON = require("../endpoints.json");

afterAll(() => {
  return connection.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api/topics", () => {
  test("200: responds with an array of the correct length", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).toBe(3);
      });
  });
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

describe("/api", () => {
  test("200: responds with object describing all available end points", () => {
    return request(app)
      .get("/api")
      .then(({ body }) => {
        const { endpoints } = body;
        for (key in endpoints) {
          expect(Object.keys(endpoints[key])).toEqual([
            "description",
            "queries",
            "exampleResponse",
          ]);
        }
      });
  });
  test("local JSON matches one returned from server", () => {
    return request(app)
      .get("/api")
      .then(({ body }) => {
        const { endpoints } = body;
        expect(endpoints).toEqual(localEndPointsJSON);
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("200: returns an article object with the correct properties for a specific article_id", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty("author", "rogersop");
        expect(article).toHaveProperty("title", "Student SUES Mitch!");
        expect(article).toHaveProperty("article_id", 4);
        expect(article).toHaveProperty(
          "body",
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages"
        );
        expect(article).toHaveProperty("topic", "mitch");
        expect(article).toHaveProperty(
          "created_at",
          "2020-05-06T01:14:00.000Z"
        );
        expect(article).toHaveProperty("votes", 0);
        expect(article).toHaveProperty(
          "article_img_url",
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("200: returns an object with the correct properties for a random article", () => {
    article_id = 1 + Math.floor(Math.random() * 12);
    return request(app)
      .get(`/api/articles/${article_id}`)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty("author", expect.any(String));
        expect(article).toHaveProperty("title", expect.any(String));
        expect(article).toHaveProperty("article_id", expect.any(Number));
        expect(article).toHaveProperty("body", expect.any(String));
        expect(article).toHaveProperty("topic", expect.any(String));
        expect(article).toHaveProperty("created_at", expect.any(String));
        expect(article).toHaveProperty("votes", expect.any(Number));
        expect(article).toHaveProperty("article_img_url", expect.any(String));
      });
  });
  test("400: returns a custom error when given a non-numeric article_id", () => {
    return request(app)
      .get("/api/articles/article4")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request: path is invalid");
      });
  });
  test("404: returns an error when given a numeric article_id that doesn't exist", () => {
    return request(app)
      .get("/api/articles/14340975")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request: Article does not exist");
      });
  });
});

describe("/api/articles", () => {
  test("200: returns an array of article objects with the correct properties", () => {
    const desiredArticle = {
      author: expect.any(String),
      title: expect.any(String),
      article_id: expect.any(Number),
      topic: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
      article_img_url: expect.any(String),
      comment_count: expect.any(String),
    };

    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(13);
        expect(articles).toBeSortedBy('created_at', {descending: true})
        articles.forEach((article) => {
          expect(article).toMatchObject(desiredArticle)
        });
      });
  });
});
