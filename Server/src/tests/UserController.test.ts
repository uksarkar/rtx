import { Bootstrapper } from "@Singletons/bootstrapper";
import supertest from "supertest";
import Container from "typedi";

const app = Container.get(Bootstrapper).start();

describe("UserController tests", () => {
  it("UserController@index: list users", async () => {
    await supertest(app)
      .get("/users")
      .expect(200)
      .expect(res => {
        expect(res.body.page).toEqual(1);
        expect(res.body.limit).toEqual(10);
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it("UserController@show: should get a user", async () => {
    await supertest(app)
      .get("/users/1")
      .expect(200)
      .expect(res => {
        expect(res.body.id).toBeGreaterThanOrEqual(1);
      });
  });

  it("UserController@show: should be not found", async () => {
    await supertest(app).get("/users/sdf").expect(404);
  });

  it("UserController@store: should create a user", async () => {
    await supertest(app)
      .post("/users")
      .send({
        firstname: "Utpal",
        lastname: "Sarkar"
      })
      .expect(201)
      .expect(response => {
        expect(response.body.firstname).toEqual("Utpal");
        expect(response.body.lastname).toEqual("Sarkar");
        expect(response.body.id).toBeGreaterThan(0);
      });
  });

  it("UserController@store: should not create a user with invalid data", async () => {
    await supertest(app)
      .post("/users")
      .send({
        firstname: "U",
        lastname: "S"
      })
      .expect(400);
  });

  it("UserController@update: should update a user", async () => {
    await supertest(app)
      .patch("/users/1")
      .send({
        firstname: "AAAAAAAAA",
        lastname: "BBBBB"
      })
      .expect(200)
      .expect(response => {
        expect(response.body.firstname).toEqual("AAAAAAAAA");
        expect(response.body.lastname).toEqual("BBBBB");
      });
  });

  it("UserController@update: can update partial data", async () => {
    await supertest(app)
      .patch("/users/1")
      .send({
        firstname: "RRRRRRR"
      })
      .expect(200)
      .expect(response => {
        expect(response.body.firstname).toEqual("RRRRRRR");
      });
  });

  it("UserController@update: should validate provided data", async () => {
    await supertest(app)
      .patch("/users/1")
      .send({
        firstname: "RR"
      })
      .expect(400);
  });

  it("UserController@update: can handle invalid id", async () => {
    await supertest(app)
      .patch("/users/sdfds")
      .send({
        firstname: "AAAAAAAAA",
        lastname: "BBBBB"
      })
      .expect(404);
  });

  it("UserController@posts: user posts endpoint", async () => {
    await supertest(app)
      .get("/users/1/posts")
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it("UserController@destroy: can delete a user", async () => {
    await supertest(app)
      .delete("/users/1")
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body.success)).toBe(true);
      });
  });
});
