import { Bootstrapper } from "@Singletons/bootstrapper";
import supertest from "supertest";
import Container from "typedi";

const app = Container.get(Bootstrapper).start();

describe("PostController tests", () => {
  it("PostController@index: list posts", async () => {
    await supertest(app)
      .get("/posts")
      .expect(200)
      .expect(res => {
        expect(res.body.page).toEqual(1);
        expect(res.body.limit).toEqual(10);
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it("PostController@show: should get a post", async () => {
    await supertest(app)
      .get("/posts/1")
      .expect(200)
      .expect(res => {
        expect(res.body.id).toBeGreaterThanOrEqual(1);
        expect(res.body.user.id).toBeGreaterThanOrEqual(1);
      });
  });

  it("PostController@show: should be not found", async () => {
    await supertest(app).get("/posts/sdf").expect(404);
  });

  it("PostController@store: should create a post", async () => {
    const title = "Post title goes here";
    const description = "Some description goes here";

    await supertest(app)
      .post("/posts")
      .send({
        title,
        description
      })
      .expect(201)
      .expect(response => {
        expect(response.body.title).toEqual(title);
        expect(response.body.description).toEqual(description);
        expect(response.body.id).toBeGreaterThan(0);
      });
  });

  it("PostController@store: should not create a post with invalid data", async () => {
    await supertest(app)
      .post("/posts")
      .send({
        title: "T",
        description: "D"
      })
      .expect(400);
  });

  it("PostController@update: should update a post", async () => {
    const title = "Post updated title goes here";
    const description = "Some updated description goes here";

    await supertest(app)
      .patch("/posts/1")
      .send({
        title,
        description
      })
      .expect(200)
      .expect(response => {
        expect(response.body.title).toEqual(title);
        expect(response.body.description).toEqual(description);
      });
  });

  it("PostController@update: can update partial data", async () => {
    const title = "AAAAAAAAAAAAA";
    await supertest(app)
      .patch("/posts/1")
      .send({ title })
      .expect(200)
      .expect(response => {
        expect(response.body.title).toEqual(title);
      });
  });

  it("PostController@update: should validate provided data", async () => {
    await supertest(app)
      .patch("/posts/1")
      .send({
        title: "TT"
      })
      .expect(400);
  });

  it("PostController@update: can handle invalid id", async () => {
    const title = "Post updated title goes here";
    const description = "Some updated description goes here";

    await supertest(app)
      .patch("/posts/sdfds")
      .send({
        title,
        description
      })
      .expect(404);
  });

  it("PostController@destroy: can delete a post", async () => {
    await supertest(app)
      .delete("/posts/1")
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body.success)).toBe(true);
      });
  });
});
